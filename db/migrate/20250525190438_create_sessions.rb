class CreateSessions < ActiveRecord::Migration[7.0]
  def change
    create_table :sessions do |t|
      t.string :season
      t.string :location

      t.timestamps
    end
  end
end
