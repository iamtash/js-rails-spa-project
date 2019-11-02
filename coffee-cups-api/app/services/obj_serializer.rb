class ObjSerializer 
    def initialize(obj)
        @object = obj
    end

    def to_serialized_json
        @object.to_json(only: [:id, :name])
    end
end