class Buyer < ApplicationRecord
  belongs_to :agent
  serialize :cities, Array # store cities as text as DB but can use it as array in rails
end
