source 'https://rubygems.org'

# Heroku uses the ruby version to configure your application's runtime.
ruby '2.2.1'

gem 'unicorn'
gem 'rack-canonical-host'
gem 'rails', '~> 4.2.0'
gem 'pg'

gem 'slim-rails'
gem 'bootstrap-sass'
gem 'sass-rails'
gem 'jquery-rails'
gem 'coffee-rails'
gem 'simple_form'
gem 'uglifier'

gem 'awesome_print'

# Heroku suggests that these gems aren't necessary, but they're required to compile less assets on deploy.
gem 'therubyracer', platforms: :ruby
#gem 'libv8'#, '~> 3.11.8'

group :test, :development do
  gem 'pry'
  # gem 'pry-debugger'
  gem 'rspec-rails'
  gem 'capybara'
  gem 'poltergeist'
  gem 'factory_girl_rails'
  gem 'database_cleaner'
  gem 'fuubar'
  gem 'jasminerice', github: 'bradphelan/jasminerice' # Latest release still depends on haml.
  gem 'simplecov'
  gem 'foreman'
  gem 'quiet_assets'
end

group :development do
  gem 'launchy'
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'guard'
  gem 'guard-rspec'
  gem 'guard-jasmine'
  gem 'guard-livereload'
  gem 'rb-fsevent'
  gem 'growl'
end

group :production do
  gem 'rails_12factor'
end
