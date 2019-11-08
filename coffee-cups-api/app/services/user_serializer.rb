class UserSerializer 
    def initialize(user)
        @user = user
    end

    def to_serialized_json
        @user.to_json(only: [:id, :name, :email])
    end
end