class RemoveColumn < ActiveRecord::Migration[6.1]
  def change
    remove_column :likes, :post_id
    remove_column :posts, :likes
  end
end
