class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :image_url, :password_digest

  has_many :posts
end
