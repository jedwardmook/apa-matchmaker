# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2025_05_28_183644) do
  create_table "matches", force: :cascade do |t|
    t.integer "player_1_id"
    t.integer "player_2_id"
    t.integer "home_player_id"
    t.integer "away_player_id"
    t.integer "home_player_points_earned"
    t.integer "away_player_points_earned"
    t.integer "home_player_games_won"
    t.integer "away_player_games_won"
    t.integer "session_id"
    t.date "match_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "player_1_skill_level", default: 0, null: false
    t.integer "player_2_skill_level", default: 0, null: false
    t.integer "match_winner_id", default: 0, null: false
    t.integer "lag_winner_id", default: 0, null: false
  end

  create_table "player_skill_levels", force: :cascade do |t|
    t.integer "player_id", null: false
    t.integer "skill_level"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "match_id", default: 0, null: false
    t.index ["player_id"], name: "index_player_skill_levels_on_player_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "player_number"
  end

  create_table "sessions", force: :cascade do |t|
    t.string "season"
    t.string "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "team_affiliations", force: :cascade do |t|
    t.integer "team_id", null: false
    t.integer "player_id", null: false
    t.integer "session_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["player_id"], name: "index_team_affiliations_on_player_id"
    t.index ["session_id"], name: "index_team_affiliations_on_session_id"
    t.index ["team_id"], name: "index_team_affiliations_on_team_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "team_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "matches", "players", column: "away_player_id"
  add_foreign_key "matches", "players", column: "home_player_id"
  add_foreign_key "matches", "players", column: "player_1_id"
  add_foreign_key "matches", "players", column: "player_2_id"
  add_foreign_key "matches", "sessions"
  add_foreign_key "player_skill_levels", "players"
  add_foreign_key "team_affiliations", "players"
  add_foreign_key "team_affiliations", "sessions"
  add_foreign_key "team_affiliations", "teams"
end
