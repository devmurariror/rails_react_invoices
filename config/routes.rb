Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :companies, only: [:index]
      resources :invoices, only: [:index]
      resources :checks, only: [:index]
      resources :check_invoices, only: [:create]
    end
  end

  root 'homepage#index'
  get '/*path', to: 'homepage#index'  # Catch-all route for React frontend
end