module Api
  module V1
    class ProjectQuestionsController < V1::ApiController

      def show
        project_question = ProjectQuestion.find_by_id(params[:id])

        render json: project_question
      end

      def index
        project_ids = Project.where("#{@current_user&.id} = ANY(team_lead_user_ids)").or(Project.where("#{@current_user&.id} = ANY(team_member_user_ids)"))
        project_questions = ProjectQuestion.where(project_id: project_ids)

        render json: project_questions
      end

      def create
        questions = project_question_params[:question_text].map do |question|
          project_question = ProjectQuestion.create!(project_id: project_question_params[:project_id], question_text: question)
        end

        render json: questions
      end

      def update
        project_question = ProjectQuestion.find_by_id(params[:id])

        if single_user_params[:user_id] && single_user_params[:vote]
          render json: { message: 'Invalid user id' }, status: 404 and return unless valid_user_id?(single_user_params[:user_id])

          yes_votes = project_question.yes_votes.reject { |id| id == single_user_params[:user_id] }&.uniq
          no_votes = project_question.no_votes.reject { |id| id == single_user_params[:user_id] }&.uniq
          single_user_params[:vote] == 'yes' ? yes_votes << single_user_params[:user_id] : no_votes << single_user_params[:user_id]
          project_question.update!(yes_votes: yes_votes, no_votes: no_votes)
        else
          yes_votes = project_question_params[:yes_votes]&.select { |id| valid_user_id?(id) } || project_question.yes_votes
          no_votes = project_question_params[:no_votes]&.select { |id| valid_user_id?(id) } || project_question.no_votes

          if project_question_params[:no_votes]
            yes_votes = yes_votes - project_question_params[:no_votes]
          elsif project_question_params[:yes_votes]
            no_votes = no_votes - project_question_params[:yes_votes]
          end

          question_text = project_question_params[:question_text]&.first || project_question.question_text

          project_question.update!(question_text: question_text, yes_votes: yes_votes&.uniq, no_votes: no_votes&.uniq)
        end

        # TODO
        # Check vote counts and if a majority votes yes, send email to all team leads
        render json: project_question
      end

      def destroy
        project_question = ProjectQuestion.find_by_id(params[:id])
        project_question.destroy!

        render json: project_question
      end

      def single_user
        project_ids = Project.where("#{@current_user&.id} = ANY(team_lead_user_ids)").or(Project.where("#{@current_user&.id} = ANY(team_member_user_ids)"))
        project_questions = ProjectQuestion.where(project_id: project_ids)
        single_user_question_data = project_questions.map do |project_question|
          vote = project_question.yes_votes.include?(single_user_params[:user_id]) ? 'yes' : 'no'
          { id: project_question.id, question_text: project_question.question_text, project_id: project_question.project_id, vote: vote }
        end

        render json: single_user_question_data
      end

      private

      def project_question_params
        params.permit(:project_id, question_text: [], yes_votes: [], no_votes: [])&.to_h&.symbolize_keys
      end

      def single_user_params
        params.permit(:user_id, :vote)&.to_h&.symbolize_keys # vote options are 'yes' or 'no'
      end

      def valid_user_id?(user_id)
        # Make sure we're only updating with a real user who is either a member or team lead on the project
        Project.where("#{user_id} = ANY(team_lead_user_ids)").or(Project.where("#{user_id} = ANY(team_member_user_ids)")).any?
      end

    end
  end
end
