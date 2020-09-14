Rails.application.routes.draw do
  get 'home/index'

  resources :users
  resources :sessions, only: [:new, :create, :destroy]

  get 'signup', to: 'users#new', as: 'signup'
  get 'login', to: 'sessions#new', as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'

  namespace :api do
    namespace :v1 do
      resources :logins, only: [:create, :destroy]
      resources :users
    end
  end
end
