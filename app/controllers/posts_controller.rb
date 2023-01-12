class PostsController < ApplicationController
    def index
        posts=Post.all
        render json: posts.order(created_at: :desc).limit(20)
        end
   
    def create
post=@current_user.posts.create!(post_params)
session[:post_id]=post.id
render json: post
    end

j

    private

    def post_params
params.permit(:user_id, :bark)
    end

end
