json.array!(@experiments) do |experiment|
  json.extract! experiment, :id, :email, :first_name, :last_name, :phone_number, :address_1, :address_2, :address_3, :country, :token, :ip_address
  json.url experiment_url(experiment, format: :json)
end
