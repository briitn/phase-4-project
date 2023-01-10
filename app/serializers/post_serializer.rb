class PostSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :bark

  belongs_to :user
has_many :post_hashtags
  has_many :hashtags, through: :post_hashtags
end
