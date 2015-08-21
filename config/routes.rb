Rails.application.routes.draw do
  namespace :api, path: '/api/' do
    match '/create', to: 'experiment#create', via: [:post, :patch, :put]
    match '/update', to: 'experiment#update', via: [:post, :patch, :put]
    get '/exp1', to: 'experiment#test', via: :get, as: :experiment

  end

  resources :users
end
