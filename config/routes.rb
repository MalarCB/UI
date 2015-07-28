Rails.application.routes.draw do
  namespace :api, path: '/api/' do
    match '/create' => 'experiment#create' ,:via => :post
  end
end
