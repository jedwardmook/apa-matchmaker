class Team < ApplicationRecord
  has_many :team_affiliations
  has_many :players, through: :team_affiliations
  has_many :sessions, through: :team_affiliations
end
