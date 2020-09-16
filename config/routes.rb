Rails.application.routes.draw do
  # get 'home/index'

  resources :users
  resources :sessions, only: [:new, :create, :destroy]

  get '/', to: 'home#index', as: '/'
  get 'signup', to: 'users#new', as: 'signup'
  get 'login', to: 'sessions#new', as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'

  namespace :api do
    namespace :v1 do
      resources :logins, only: [:create, :destroy]
      resources :users
      resources :projects
      resources :project_questions
    end
  end
end
