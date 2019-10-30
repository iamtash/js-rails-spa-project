class CreateCups < ActiveRecord::Migration[5.2]
  def change
    create_table :cups do |t|
      t.references :user, foreign_key: true
      t.references :coffee, foreign_key: true
      t.references :brew, foreign_key: true
      t.references :rating, foreign_key: true

      t.timestamps
    end
  end
end
