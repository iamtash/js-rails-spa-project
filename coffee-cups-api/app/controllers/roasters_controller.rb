class RoastersController < ApplicationController
    def index
        roasters = Roaster.all
        render json: RoasterSerializer.new(roasters).to_serialized_json
    end
end
