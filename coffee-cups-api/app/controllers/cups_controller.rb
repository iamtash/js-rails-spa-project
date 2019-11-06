class CupsController < ApplicationController
    def index
        cups = Cup.all
        render json: CupSerializer.new(cups).to_serialized_json
    end

    def create
        cup = Cup.new(cup_params)
        if cup.save
            render json: CupSerializer.new(cup).to_serialized_json
        end
    end

    private 
        def cup_params
            params.require(:cup).permit(
                :user_id,
                :brew_id,
                :coffee_id,
                rating_attributes: [
                    :rating
                ]
            )
        end
end
