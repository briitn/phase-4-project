class HashtagsController < ApplicationController
    def create
       tag= Hashtag.find_by(name: params[:name] )
      if tag
        hashtag=tag.posts.create(bark: params[:bark], user_id: params[:user_id])
      
        render json: hashtag
      else
        posts=@current_user.posts.create(bark: params[:bark], user_id: params[:user_id])
        session[:post_id]=posts.id
         post=Post.find(session[:post_id])
post.hashtags.create(name: params[:name])
render json: post
      end
    end

    def index
        hashtag=Hashtag.find(session[:hashtag_id])
     post= hashtag.posts
     render json: post.order(created_at: :asc).limit(20)

    end

end
h