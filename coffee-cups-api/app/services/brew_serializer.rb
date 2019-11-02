class BrewSerializer 
    def initialize(brew_object)
        @brew = brew_object
    end

    def to_serialized_json
        @brew.to_json(only: [:id, :method])
    end
end