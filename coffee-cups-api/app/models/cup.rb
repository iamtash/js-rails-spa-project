class Cup < ApplicationRecord
  belongs_to :user
  belongs_to :coffee
  belongs_to :brew
  belongs_to :rating
end
