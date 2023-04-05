class HashtagsController < ApplicationController
    def create
      hold_tags=params[:tags]
      post=Post.create(bark: params[:bark],
             user_id: params[:user_id])
      

hold_tags.each do |t|
  tag=Hashtag.find_by(name:t)

  if tag
      post.hashtags << tag

  else

      post.hashtags.create(name: t )
  end
end
render json: post
 
    end

    def index
        hashtag=Hashtag.find(session[:hashtag_id])
     post= hashtag.posts
     render json: post.order(created_at: :asc).limit(20)

    end

end
