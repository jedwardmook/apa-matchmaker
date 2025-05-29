class Match < ApplicationRecord
  belongs_to :player_1, class_name: 'Player', foreign_key: 'player_1_id'
  belongs_to :player_2, class_name: 'Player', foreign_key: 'player_2_id'

  def players_in_match
    [player_1, player_2]
  end

  def match_winner
    if match_winner_id == 0
      nil
    else
      Player.find(match_winner_id).full_name
    end
  end
  
end
