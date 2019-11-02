class RoastersController < ApplicationController
    def index
        roasters = Roaster.all
        render json: ObjSerializer.new(roasters).to_serialized_json
    end
end
