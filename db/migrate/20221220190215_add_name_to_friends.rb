class AddNameToFriends < ActiveRecord::Migration[6.1]
  def change
    add_column :friends, :name, :string
  end
end
