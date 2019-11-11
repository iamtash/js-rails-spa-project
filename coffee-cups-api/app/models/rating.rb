class Rating < ApplicationRecord
  has_one :cup
  has_one :user, through: :cup
  has_one :coffee, through: :cup
  validates :rating, numericality: { only_integer: true }
end
