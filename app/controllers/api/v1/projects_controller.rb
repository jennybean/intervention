module Api
  module V1
    class ProjectsController < V1::ApiController

      def show
        project = Project.find_by_id(params[:id])

        render json: project
      end

      def index
        projects = Project.where("#{@current_user&.id} = ANY(team_lead_user_ids)").or(Project.where("#{@current_user&.id} = ANY(team_member_user_ids)"))

        render json: projects
      end

      def create
        project = Project.create!(**project_params)

        render json: project
      end

      def update
        project = Project.find_by_id(params[:id])
        project.update!(**project_params)

        render json: project
      end

      def destroy
        project = Project.find_by_id(params[:id])
        project.destroy!

        render json: project
      end

      def project_params
        params.permit(:name, team_lead_user_ids: [], team_member_user_ids: [])&.to_h&.symbolize_keys
      end

    end
  end
end
