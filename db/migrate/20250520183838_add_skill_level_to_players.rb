class AddSkillLevelToPlayers < ActiveRecord::Migration[7.0]
  def change
    add_column :players, :skill_level, :integer
  end
end
