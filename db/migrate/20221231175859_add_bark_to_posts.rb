class AddBarkToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :bark, :string
  end
end
