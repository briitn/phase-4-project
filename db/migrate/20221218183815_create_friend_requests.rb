class CreateFriendRequests < ActiveRecord::Migration[6.1]
  def change
    create_table :friend_requests do |t|
t.string :requester
t.integer :user_id
      t.timestamps
    end
  end
end
