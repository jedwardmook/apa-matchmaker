class CreateMatches < ActiveRecord::Migration[7.0]
  def change
    create_table :matches do |t|
      t.integer :player_1_id
      t.integer :player_2_id
      t.integer :lag_winner_id
      t.integer :lag_loser_id
      t.integer :lag_winner_points_earned
      t.integer :lag_loser_points_earned
      t.integer :lag_winner_games_won
      t.integer :lag_loser_games_won
      t.integer :session_id
      t.date :match_date

      t.timestamps
    end

    add_foreign_key :matches, :players, column: :player_1_id
    add_foreign_key :matches, :players, column: :player_2_id
    add_foreign_key :matches, :players, column: :lag_winner_id
    add_foreign_key :matches, :players, column: :lag_loser_id
    add_foreign_key :matches, :sessions
  end
end
