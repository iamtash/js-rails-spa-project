class SessionsController < ApplicationController
  def create
    login(email: user_params[:email], password: user_params[:password])
  end

  private
  def user_params
      params.require(:user).permit(:email, :password)
  end
end



