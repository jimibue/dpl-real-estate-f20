class Property < ApplicationRecord
  belongs_to :agent
  has_one :address

  # SELECT properties.id, price, beds, baths, sq_ft, ad.city, ad.street, ad.zip, a.first_name, a.last_name, a.id AS agent_id
  # FROM properties
  # INNER JOIN agents as a ON a.id = properties.agent_id
  # INNER JOIN addresses as ad ON ad.property_id = properties.id
  # WHERE SOLD <> true
  # ORDER BY a.id
  def self.available
    select("properties.id, price, beds, baths, sq_ft, ad.city, ad.street, ad.zip, a.first_name, a.last_name, a.id AS agent_id")
      .joins("INNER JOIN agents as a ON a.id = properties.agent_id
        INNER JOIN addresses as ad ON ad.property_id = properties.id")
      .where("SOLD <> true")
      .order("a.id")
  end

  # THIS IS THE ORIGINAL SQL CODE
  # SELECT properties.id, price, beds, baths, sq_ft, city, sold
  # FROM properties
  # INNER JOIN addresses as a ON a.property_id = properties.id
  # WHERE LOWER(a.city) = 'sandy' AND properties.sold <> true

  def self.by_city(city)
    select("properties.id, price, beds, baths, sq_ft, city, sold")
      .joins("INNER JOIN addresses as a ON a.property_id = properties.id")
      .where("LOWER(a.city) = ? AND properties.sold <> true", city)
  end
end
