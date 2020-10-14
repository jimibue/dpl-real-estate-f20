class Agent < ApplicationRecord
  has_many :properties
  has_many :buyers

  # SELECT agents.id, first_name, last_name, sold, COUNT(*) as frequency
  # FROM agents
  # INNER JOIN properties as p ON p.agent_id = agents.id
  # WHERE sold <> true
  # GROUP BY agents.id, first_name, last_name, email, sold
  # ORDER BY COUNT(*) DESC
  def self.unsold_homes
    select("agents.id, first_name, last_name, sold, COUNT(*) as frequency")
      .joins("INNER JOIN properties as p ON p.agent_id = agents.id")
      .where(" sold <> true")
      .group("agents.id, first_name, last_name, email, sold")
      .order("COUNT(*) DESC")
  end
end
