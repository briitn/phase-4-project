class Post < ApplicationRecord

    belongs_to :user
    has_many :post_hashtags
    validates :bark, presence: true
validates :bark, length: {maximum: 280}

    has_many :hashtags, through: :post_hashtags
end
