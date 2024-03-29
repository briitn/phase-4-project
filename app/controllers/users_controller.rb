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

  user.destroy
head :no_content

end
def update
  user=User.find(session[:user_id])
 if params[:image_url].length>0
  new_image= params[:image_url]
  user.image_url= new_image
  user.save(validate: false)
 
  render json: user
elsif params[:username].length>0
    users=User.find_by(username: params[:username])
    if users

    render json: {errors: ["Username already taken"]},status: :unprocessable_entity
    else
        new_username= params[:username]
        user.username= new_username
        user.save(validate: false)
 
      render json: user
  end
end
 
end
private
def user_params
  params.permit(:username, :password, :image_url) 
end
end
