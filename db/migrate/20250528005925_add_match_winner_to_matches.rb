class AddMatchWinnerToMatches < ActiveRecord::Migration[7.0]
  def change
    add_column :matches, :match_winner_id, :integer, null: false, default: 0
  end
end
