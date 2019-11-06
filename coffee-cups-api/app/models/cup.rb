class Cup < ApplicationRecord
  belongs_to :user
  belongs_to :coffee
  belongs_to :brew
  belongs_to :rating
  # validates :user, presence: true
  # validates_associated :coffee

  def rating_attributes=(rating_attributes)
      self.rating = Rating.new(rating_attributes)
  end

end
