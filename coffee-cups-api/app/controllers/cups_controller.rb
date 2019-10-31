class CupsController < ApplicationController
    def index
        cups = Cup.all
        render json: CupSerializer.new(cups).to_serialized_json
    end
end
