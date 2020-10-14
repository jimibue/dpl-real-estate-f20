class Buyer < ApplicationRecord
  belongs_to :agent
  serialize :cities, Array # store cities as text as DB but can use it as array in rails

  #   Select p.id, price, city, street, sold, buyers.id as buyers_id
  # FROM buyers
  # INNER JOIN agents as a ON a.id = buyers.agent_id
  # INNER JOIN properties as p ON p.agent_id = a.id AND p.price <= buyers.max_price
  # INNER JOIN addresses  as ad ON ad.property_id = p.id AND city = ANY('{Ogden,Orem,Provo}')
  # WHERE buyers.id = 1 AND p.sold <> true
  def self.my_homes(id, cities)
    select("p.id, price, city, street, sold, buyers.id as buyers_id")
      .joins("INNER JOIN agents as a ON a.id = buyers.agent_id 
      INNER JOIN properties as p ON p.agent_id = a.id AND p.price <= buyers.max_price
      INNER JOIN addresses  as ad ON ad.property_id = p.id AND city = ANY('{#{cities.join(",")}}')")
      .where("buyers.id = ? AND p.sold <> true", id)
  end
end
