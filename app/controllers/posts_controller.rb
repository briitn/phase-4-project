class PostsController < ApplicationController
   
  
    def create
 post=@current_user.posts.create!(post_params)
        session[:post_id]=post.id
        
        render json: post, status: :created
    end;
        
     def index
        posts=Post.all.order(created_at: :desc).limit(20)
    
        render json: posts.uniq { |h| h[:bark] }

  end;
   

def alpha
    posts=@current_user.posts
    render json:  posts.sort_by{|p| p.bark}

end

    private

    def post_params
params.permit(:user_id, :bark)
    end

end
