class CreateCoffees < ActiveRecord::Migration[5.2]
  def change
    create_table :coffees do |t|
      t.string :name
      t.references :roaster, foreign_key: true

      t.timestamps
    end
  end
end
