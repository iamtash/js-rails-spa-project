class User < ApplicationRecord
    has_many :cups, dependent: :destroy
    has_many :coffees, through: :cups
    has_many :ratings, through: :cups
    has_secure_password
    validates :name, presence: true
    validates :email, presence: true, uniqueness: true
end
