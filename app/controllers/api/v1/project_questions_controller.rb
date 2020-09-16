module Api
  module V1
    class ProjectQuestionsController < V1::ApiController

      def show
        project_question = ProjectQuestion.find_by_id(params[:id])

        render json: project_question
      end

      def index
        project_id = Project.where("#{@current_user&.id} = ANY(team_lead_user_ids)").or(Project.where("#{@current_user&.id} = ANY(team_member_user_ids)"))
        project_questions = ProjectQuestion.where(project_id: project_id)

        render json: project_questions
      end

      def create
        project_question = ProjectQuestion.create!(**project_question_params)

        render json: project_question
      end

      def update
        project_question = ProjectQuestion.find_by_id(params[:id])
        if single_user_params[:user_id]

          render json: { message: 'Invalid user id' }, status: 404 and return unless valid_user_id?(single_user_params[:user_id])
          yes_votes = project_question.yes_votes.reject { |id| id == single_user_params[:user_id]}
          no_votes = project_question.no_votes.reject { |id| id == single_user_params[:user_id]}
          single_user_params[:vote] == 'yes' ? yes_votes << single_user_params[:user_id] : no_votes << single_user_params[:user_id]
          project_question.update!(yes_votes: yes_votes, no_votes: no_votes)
        else
          yes_votes = project_question_params[:yes_votes].select { |id| valid_user_id?(id) }
          no_votes = project_question_params[:no_votes].select { |id| valid_user_id?(id) }
          project_question_params.merge!(yes_votes: yes_votes, no_votes: no_votes)
          project_question.update!(**project_question_params)
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
        project_question = ProjectQuestion.find_by_id(single_user_params[:question_id])
        vote = project_question.yes_votes.include?(single_user_params[:user_id]) ? 'yes' : 'no'
        single_user_question_data = { id: project_question.id, question_text: project_question.question_text, project_id: project_question.project_id, vote: vote }

        render json: single_user_question_data
      end

      private

      def project_question_params
        params.permit(:project_id, :question_text, yes_votes: [], no_votes: [])&.to_h&.symbolize_keys
      end

      def single_user_params
        params.permit(:user_id, :question_id, :vote)&.to_h&.symbolize_keys # vote options are 'yes' or 'no'
      end

      def valid_user_id?(user_id)
        # Make sure we're only updating with a real user who is either a member or team lead on the project
        Project.where("#{user_id} = ANY(team_lead_user_ids)").or(Project.where("#{user_id} = ANY(team_member_user_ids)")).any?
      end

    end
  end
end
