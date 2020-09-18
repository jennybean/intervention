module Api
  module V1
    class ProjectsController < V1::ApiController

      def show
        project = Project.find_by_id(params[:id])

        render json: projects_with_emails(project.as_json)
      end

      def index
        projects = Project.where("#{@current_user&.id} = ANY(team_lead_user_ids)").or(Project.where("#{@current_user&.id} = ANY(team_member_user_ids)"))

        render json: projects_with_emails(projects.as_json)
      end

      def create
        project = Project.create!(**project_params)

        render json: projects_with_emails(project.as_json)
      end

      def update
        project = Project.find_by_id(params[:id])

        name = project_params[:name] || project.name
        team_lead_user_ids = team_lead_user_ids_from_emails || project_params[:team_lead_user_ids] || project.team_lead_user_ids
        team_member_user_ids = team_member_user_ids_from_emails || project_params[:team_member_user_ids] || project.team_member_user_ids

        project.update!(name: name, team_lead_user_ids: team_lead_user_ids, team_member_user_ids: team_member_user_ids)

        render json: projects_with_emails(project.as_json)
      end

      def destroy
        project = Project.find_by_id(params[:id])
        project.destroy!

        render json: project
      end

      private

      def project_params
        params.permit(:name, team_lead_user_ids: [], team_member_user_ids: [])&.to_h&.symbolize_keys
      end

      def email_params
        params.permit(team_lead_emails: [], team_member_emails: [])&.to_h&.symbolize_keys
      end

      def team_lead_user_ids_from_emails
        User.where(email: email_params[:team_lead_emails]).pluck(:id) unless email_params[:team_lead_emails].blank?
      end

      def team_member_user_ids_from_emails
        User.where(email: email_params[:team_member_emails]).pluck(:id) unless email_params[:team_member_emails].blank?
      end

      def projects_with_emails(projects)
        if projects.is_a?(Array)
          projects.map do |project|
            project.merge!(team_lead_emails: team_lead_emails(project['team_lead_user_ids']), team_member_emails: team_member_emails(project['team_member_user_ids']))
          end
        else
          projects.merge!(team_lead_emails: team_lead_emails(projects['team_lead_user_ids']), team_member_emails: team_member_emails(projects['team_member_user_ids']))
        end
      end

      def team_lead_emails(ids)
        User.where(id: ids).pluck(:email)
      end

      def team_member_emails(ids)
        User.where(id: ids).pluck(:email)
      end

    end
  end
end
