Rails.application.routes.draw do
  namespace :api, path: '/api/' do
    match '/create', to: 'experiment#create', via: [:post, :patch, :put], format: :json
    match '/update', to: 'experiment#update', via: [:post, :patch, :put], format: :json
    get '/exp1', to: 'experiment#test', via: :get, as: :experiment
    get '/experiments', to: 'experiment#index', via: :get, as: :experiment_list

  end

  resources :users
end
