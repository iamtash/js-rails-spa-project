class CreateBrews < ActiveRecord::Migration[5.2]
  def change
    create_table :brews do |t|
      t.string :method

      t.timestamps
    end
  end
end
