Rails.application.routes.draw do
  get 'cups' => 'cups#index'
  get 'brews' => 'brews#index'
  get 'roasters' => 'roasters#index'

  resources :roasters, only: [:index] do
    resources :coffees, only: [:index]
  end
end
