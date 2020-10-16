class ChangeSoldPriceTypeToIntegerInProperties < ActiveRecord::Migration[6.0]
  def change
    change_column :properties, :sold_price, :integer
  end
end
