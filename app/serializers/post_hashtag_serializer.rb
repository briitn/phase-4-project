class PostHashtagSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :post
  belongs_to :hashtag
  
end
