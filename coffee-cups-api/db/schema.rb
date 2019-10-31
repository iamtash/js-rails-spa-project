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

ActiveRecord::Schema.define(version: 2019_10_30_212606) do

  create_table "brews", force: :cascade do |t|
    t.string "method"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "coffees", force: :cascade do |t|
    t.string "name"
    t.string "roast"
    t.integer "roaster_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["roaster_id"], name: "index_coffees_on_roaster_id"
  end

  create_table "cups", force: :cascade do |t|
    t.integer "user_id"
    t.integer "coffee_id"
    t.integer "brew_id"
    t.integer "rating_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["brew_id"], name: "index_cups_on_brew_id"
    t.index ["coffee_id"], name: "index_cups_on_coffee_id"
    t.index ["rating_id"], name: "index_cups_on_rating_id"
    t.index ["user_id"], name: "index_cups_on_user_id"
  end

  create_table "ratings", force: :cascade do |t|
    t.integer "rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "roasters", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
