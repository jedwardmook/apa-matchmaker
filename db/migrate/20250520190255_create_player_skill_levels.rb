class CreatePlayerSkillLevels < ActiveRecord::Migration[7.0]
  def change
    create_table :player_skill_levels do |t|
      t.references :player, null: false, foreign_key: true
      t.integer :skill_level

      t.timestamps
    end
  end
end
