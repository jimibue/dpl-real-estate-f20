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
end
