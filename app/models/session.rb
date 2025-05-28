class Session < ApplicationRecord
  has_many :team_affiliations
  has_many :teams, through: :team_affiliations
  has_many :players, through: :team_affiliations
end
