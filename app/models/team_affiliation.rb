class TeamAffiliation < ApplicationRecord
  belongs_to :team
  belongs_to :player
  belongs_to :session
end
