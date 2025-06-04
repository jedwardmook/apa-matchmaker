Rails.application.routes.draw do
  resources :player_skill_levels, only: [:index, :show, :create, :update]
  resources :matches
  resources :team_affiliations

  #SESSION ROUTES
  resources :sessions
  #Custom route for getting teams of a specific session
  resources :sessions do
    member do 
      get 'teams'
    end
  end
  #Custom route for getting players of a specific session
   resources :sessions do
    member do 
      get 'players'
    end
  end

  #TEAM ROUTES
  resources :teams
  # Custom route for getting players of a specific team
  resources :teams do
    member do
      get 'players'
    end
  end

  #PLAYER ROUTES
  resources :players
  # Custom route for getting teams of a specific player
  resources :players do
    member do
      get 'teams'
    end
  end
  # Custom route for getting matches of a specific player
  resources :players do
    member do
      get 'matches'
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end

