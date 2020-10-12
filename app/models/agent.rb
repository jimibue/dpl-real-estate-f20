class Agent < ApplicationRecord
  has_many :properties
  has_many :buyers
end
