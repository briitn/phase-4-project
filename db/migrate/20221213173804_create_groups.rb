class CreateGroups < ActiveRecord::Migration[6.1]
  def change
    create_table :groups do |t|
t.integer :friend_id
t.integer :user_id
      t.timestamps
    end
  end
end
