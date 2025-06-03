class Player < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :player_number, presence: true
  has_many :player_skill_levels
  has_many :team_affiliations
  has_many :teams, through: :team_affiliations
  has_many :sessions, through: :team_affiliations
  has_many :matches, foreign_key: 'player_1_id'
  has_many :matches_as_player_2, class_name: 'Match', foreign_key: 'player_2_id'
  belongs_to :team

  def latest_skill_level
    if player_skill_levels.empty?
      return 3 # Default skill level if none exists
    end
    player_skill_levels.last.skill_level
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  def all_matches
    Match.where("player_1_id = ? OR player_2_id = ?", id, id)
  end

end
