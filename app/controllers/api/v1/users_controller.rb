module Api
  module V1
    class UsersController < V1::ApiController
      skip_before_action :check_basic_auth, only: [:create]

      def show
        user = User.find_by_id(params[:id])

        render json: user
      end

      def index
        user_ids = Project.where("#{@current_user&.id} = ANY(team_lead_user_ids)").or(Project.where("#{@current_user&.id} = ANY(team_member_user_ids)")).pluck(:team_lead_user_ids, :team_member_user_ids).flatten
        users = User.where(id: user_ids)

        render json: users
      end

      def create
        user = User.create!(**user_params&.to_h&.symbolize_keys)

        render json: user
      end

      def update
        user = User.find_by_id(params[:id])
        user.update!(**user_params&.to_h&.symbolize_keys)

        render json: user
      end

      def destroy
        user = User.find_by_id(params[:id])
        user.destroy!

        render json: user
      end

      private

      def user_params
        params.permit(:email, :password, :password_confirmation, :first_name, :last_name)
      end

    end
  end
end
