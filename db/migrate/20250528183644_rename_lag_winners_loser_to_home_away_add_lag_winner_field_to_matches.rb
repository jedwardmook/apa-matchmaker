class RenameLagWinnersLoserToHomeAwayAddLagWinnerFieldToMatches < ActiveRecord::Migration[7.0]
  def change
    rename_column :matches, :lag_winner_id, :home_player_id
    rename_column :matches, :lag_loser_id, :away_player_id
    rename_column :matches, :lag_winner_points_earned, :home_player_points_earned
    rename_column :matches, :lag_loser_points_earned, :away_player_points_earned
    rename_column :matches, :lag_winner_games_won, :home_player_games_won
    rename_column :matches, :lag_loser_games_won, :away_player_games_won
    add_column :matches, :lag_winner_id, :integer, default: 0, null: false
  end
end
