Rails.application.routes.draw do
  get 'cups' => 'cups#index'
  get 'brews' => 'brews#index'
  get 'roasters' => 'roasters#index'
end
