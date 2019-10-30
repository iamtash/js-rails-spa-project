class Brew < ApplicationRecord
    has_many :cups
    validates :method, presence: true, uniqueness: {case_sensitive: false}
end
