class AddPlayerNumberToPlayers < ActiveRecord::Migration[7.0]
  def change
    add_column :players, :player_number, :integer
  end
end
