class AddMatchIdPlayerSkillLevel < ActiveRecord::Migration[7.0]
  def change
    add_column :player_skill_levels, :match_id, :integer, null: false, default: 0
  end
end
