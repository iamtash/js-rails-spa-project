class Roaster < ApplicationRecord
    has_many :coffees
    validates :name, :location, presence: true
end
