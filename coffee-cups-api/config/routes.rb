Rails.application.routes.draw do
  resources :cups
  resources :ratings
  resources :brews
  resources :coffees
  resources :roasters
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
