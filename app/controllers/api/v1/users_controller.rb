module Api
  module V1
    class UsersController < V1::ApiController
      skip_before_action :check_basic_auth, only: [:create]

      def show
        user = User.find_by_id(params[:id])

        render json: user
      end

      def index
        users = User.all

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

      # Only allow a list of trusted parameters through.
      def user_params
        params.permit(:email, :password, :password_confirmation, :first_name, :last_name)
      end

    end
  end
end
