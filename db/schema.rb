# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_14_212228) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "project_questions", force: :cascade do |t|
    t.integer "project_id", null: false
    t.text "question_text"
    t.integer "yes_votes", default: [], null: false, array: true
    t.integer "no_votes", default: [], null: false, array: true
  end

  create_table "projects", force: :cascade do |t|
    t.text "name", null: false
    t.integer "team_lead_user_ids", default: [], null: false, array: true
    t.integer "team_member_user_ids", array: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "first_name"
    t.text "last_name"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end
