module Api
  module V1
    class ProjectQuestionsController < V1::ApiController

      def show
        project_question = ProjectQuestion.find_by_id(params[:id])

        render json: project_question
      end

      def index
        project_questions = ProjectQuestion.all

        render json: project_questions
      end

      def create
        project_question = ProjectQuestion.create!(**project_question_params&.to_h&.symbolize_keys)

        render json: project_question
      end

      def update
        project_question = ProjectQuestion.find_by_id(params[:id])
        project_question.update!(**project_question_params&.to_h&.symbolize_keys)

        render json: project_question
      end

      def destroy
        project_question = ProjectQuestion.find_by_id(params[:id])
        project_question.destroy!

        render json: project_question
      end

      def project_question_params
        params.permit(:project_id, :question_text, yes_votes: [], no_votes: [])
      end

    end
  end
end
