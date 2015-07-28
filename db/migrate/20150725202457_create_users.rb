class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :first_name
      t.string :last_name
      t.integer :phone_number
      t.string :address1
      t.string :address2
      t.string :address3
      t.string :country
      t.string :token
      t.string :ip_address
      t.string :ip_address

      t.timestamps null: false
    end
  end
end
