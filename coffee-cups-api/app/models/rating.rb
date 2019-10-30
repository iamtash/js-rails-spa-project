class Rating < ApplicationRecord
  belongs_to :user
  has_one :cup
  has_one :coffee, through: :cup
  validates_associated :coffee
end
