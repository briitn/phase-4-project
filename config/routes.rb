Rails.application.routes.draw do

#Create a custom route that uses a parameter to search the text content of the post (in the bark field) to find all the posts that meet that requirement. Then return all the hashtags connected to all the posts that meet this requirement.  . If there are no matches, return a json message that says so.
  resources :post_hashtags
  resources :hashtags
  resources :posts
  resources :sessions

post '/tagsesh', to: "sessions#index"
get '/most_active_user', to: "posts#most_active_user"
  post "users/signup", to: "users#create"
  post "users/login", to: "sessions#create"
patch '/users/', to: "users#update"
get '/users', to: "users#index"
  get "/home", to: "users#show"
  delete '/users/', to: "users#destroy"
  delete "/logout", to: "sessions#destroy"
get '/alpha', to: "posts#alpha"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
 get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
