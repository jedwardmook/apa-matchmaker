class RemoveSkillLevelFromPlayers < ActiveRecord::Migration[7.0]
  def change
    remove_column :players, :skill_level, :integer
  end
end
