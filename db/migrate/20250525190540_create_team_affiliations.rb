class CreateTeamAffiliations < ActiveRecord::Migration[7.0]
  def change
    create_table :team_affiliations do |t|
      t.references :team, null: false, foreign_key: true
      t.references :player, null: false, foreign_key: true
      t.references :session, null: false, foreign_key: true

      t.timestamps
    end
  end
end
