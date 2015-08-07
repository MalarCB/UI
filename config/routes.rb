Rails.application.routes.draw do
  namespace :api, path: '/api/' do
    match '/create', to: 'experiment#create' ,via: :post
    get '/exp1', to: 'experiment#test', via: :get, as: :experiment
  end

end
