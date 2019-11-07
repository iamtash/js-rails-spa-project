class UsersController < ApplicationController
    def create
        user = User.new(user_params)
        if user.save
            render json: ObjSerializer.new(user).to_serialized_json
        end
    end

    private
        def user_params
            params.require(:user).permit(:name, :email, :password)
        end
end
