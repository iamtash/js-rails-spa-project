class CoffeesController < ApplicationController
    def index
        roaster = Roaster.find_by(id: params[:roaster_id])
        render json: ObjSerializer.new(roaster.coffees).to_serialized_json
    end
end
