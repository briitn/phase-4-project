class SessionsController < ApplicationController
    skip_before_action :authorize, only: :create
   
    def create 
        user= User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id]= user.id
            render json: user
        else
            render json: {errors: ["Invalid username or password"]}, status: :unauthorized
        end
    end

    def index
tag= Hashtag.find_by(name: params[:name])

session[:hashtag_id]= tag.id
render json: tag.posts.order(created_at: :desc).limit(20)
    end
    def destroy
        session.delete :user_id
        head :no_content
    end

end
