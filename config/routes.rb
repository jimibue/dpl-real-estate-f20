Rails.application.routes.draw do
  mount_devise_token_auth_for "User", at: "api/auth"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :things
    get "properties", to: "properties#index"
    get "cities/:city", to: "properties#city"

    get "agents", to: "agents#index"
    get "agents/:id", to: "agents#show"

    get "buyers/:id", to: "buyers#show"

    get "p/city_cost", to: "properties#city_cost"

    # resources :agents, only: [:index, :show]
  end
end
