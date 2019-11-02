class RoasterSerializer 
    def initialize(roaster_object)
        @roaster = roaster_object
    end

    def to_serialized_json
        @roaster.to_json(only: [:id, :name])
    end
end