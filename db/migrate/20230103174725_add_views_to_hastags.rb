class AddViewsToHastags < ActiveRecord::Migration[6.1]
  def change
    add_column :hashtags, :views, :integer
  end
end
