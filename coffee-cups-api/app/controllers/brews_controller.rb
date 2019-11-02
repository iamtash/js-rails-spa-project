class BrewsController < ApplicationController
    def index
        brews = Brew.all
        render json: BrewSerializer.new(brews).to_serialized_json
    end
end
