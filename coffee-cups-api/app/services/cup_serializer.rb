class CupSerializer 
    def initialize(cup_object)
        @cup = cup_object
    end

    def to_serialized_json
        @cup.to_json(include: {
            user: {only: [:id, :name, :email]},
            coffee: {include: {
                roaster: {only: [:id, :name]}
            }, only: [:id, :name]},
            brew: {only: [:id, :method]},
            rating: {only: [:rating]}
        }, only: [:id, :created_at])
    end
end