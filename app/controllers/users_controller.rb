class UsersController < ApplicationController
  skip_before_action :authorize, only: :create
   
def create
    user=User.create!(user_params)
    session[:user_id] = user.id 
    render json: user, status: :created
end

def show
  user=User.find_by(id: session[:user_id])
  render json: user
end

def index
  user= User.all 
  render json: user
end

def destroy
  user=User.find(session[:user_id])
  user.posts.destroy_all
  user.destroy
  posts=Post.all
  render json: posts

end
def update
  user=User.find(session[:user_id])
  if params[:image_url]
    user.update(image_url: params[:image_url])
    render json: user
  elsif params[:username]
    users=User.find_by(username: params[:username])
    if users

    render json: {errors: ["Username already taken"]},status: :unprocessable_entity
    else
      user.update(username: params[:username])
      render json: user
  end
end
 
end
private
def user_params
  params.permit(:username, :password, :image_url) h
end
end
