class RemoveTeamNumberFromTeam < ActiveRecord::Migration[7.0]
  def change
    remove_column :teams, :team_number, :integer
  end
end
