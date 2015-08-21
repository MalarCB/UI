class CreateExperiments < ActiveRecord::Migration
  def change
    create_table :experiments do |t|
      t.text :page
      t.string :site_domain
      t.text :content
      t.references :users, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
