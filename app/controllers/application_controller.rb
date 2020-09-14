class ApplicationController < ActionController::Base
  helper_method :current_user

  def current_user
    if session[:user_id]
      @current_user ||= User.where(id: session[:user_id]).first
    else
      @current_user = nil
    end
  end

end
