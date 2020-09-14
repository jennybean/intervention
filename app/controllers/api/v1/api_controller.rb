module Api
  module V1
    class ApiController < ActionController::API
      before_action :check_basic_auth

      def check_basic_auth
        unless session[:user_id].present? && User.find_by_id(session[:user_id]).present?
          render json: { message: 'Unauthenticated' }, status: 401
        end

        @current_user = User.find_by_id(session[:user_id])
      end
    
    end
  end
end
