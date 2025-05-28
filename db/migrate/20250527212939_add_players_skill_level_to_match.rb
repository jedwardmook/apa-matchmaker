class AddPlayersSkillLevelToMatch < ActiveRecord::Migration[7.0]
  def change
    add_column :matches, :player_1_skill_level, :integer, null: false, default: 0
    add_column :matches, :player_2_skill_level, :integer, null: false, default: 0
  end
end
