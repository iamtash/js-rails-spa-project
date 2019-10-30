class Coffee < ApplicationRecord
  belongs_to :roaster
  has_many :cups
  has_many :users, through: :cups
  has_many :ratings, through: :cups
  validates :name, presence: true, uniqueness: {scope: :roaster, case_sensitive: false}
  validates :roast, presence: true
  validates_associated :roaster
end
