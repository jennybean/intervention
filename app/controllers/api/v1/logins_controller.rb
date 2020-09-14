module Api
  module V1
    class LoginsController < V1::ApiController

      skip_before_action :check_basic_auth

      def create
        user = User.find_by_email(params[:email])
        if user && user.authenticate(params[:password])
          session[:user_id] = user.id
          @current_user = user
          render json: { message: 'Logged in' }
        else
          render json: { message: 'Login failed, please try again' }, status: 404
        end
      end

      def destroy
        session[:user_id] = nil
        render json: { message: 'Logged out' }
      end

    end
  end
end
