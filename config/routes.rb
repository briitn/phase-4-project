Rails.application.routes.draw do


  resources :post_hashtags
  resources :hashtags
  resources :posts
  
  resources :sessions
post '/tagsesh', to: "sessions#index"
post '/multiple', to: "hashtags#multi_tags"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
patch '/users/', to: "users#update"
get '/users', to: "users#index"
  get "/home", to: "users#show"
  delete '/users/', to: "users#destroy"
  delete "/logout", to: "sessions#destroy"
 post "request", to: "friend_requests#create"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
 get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
