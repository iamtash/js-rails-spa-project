class CupSerializer 
    def initialize(cup_object)
        @cup = cup_object
    end

    def to_serialized_json
        @cup.to_json(include: {
            user: {only: [:name]},
            coffee: {only: [:name]},
            brew: {only: [:method]},
            rating: {only: [:rating]}
        }, only: [:created_at])
    end
end