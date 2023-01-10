class CreateGroupMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :group_messages do |t|
t.string :group_text
t.integer :group_id
      t.timestamps
    end
  end
end
