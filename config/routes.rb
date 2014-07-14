Rails.application.routes.draw do

  root "maps#index"
  get "/maps" => "maps#index"

end
