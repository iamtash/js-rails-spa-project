class SessionsController < ApplicationController
  def create
    user = User.find_by(email: user_params[:email])
    if user && user.authenticate(user_params[:password])
      render json: UserSerializer.new(user).to_serialized_json
    else
      render json: 'user login failed'
    end
  end

  private
  def user_params
      params.require(:user).permit(:email, :password)
  end
end




