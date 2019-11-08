class ApplicationController < ActionController::API
    def login(email:, password:)
        user = User.find_by(email: email)
        if user && user.authenticate(password)
            render json: ObjSerializer.new(user).to_serialized_json
        else
          render json: 'user login failed'
        end
      end
end
