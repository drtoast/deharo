# De Haro

De Haro is a system for sharing expenses in a communal household. It was inspired by the venerable [Norfolk](http://sourceforge.net/projects/norfolk/) household financial manager.

It was written over a few days as a proof of concept, so there are some things missing and things to clean up. Issues and pull requests gladly accepted! Known issues:

* Many more tests need to be written, and then a big refactor.
* Naive rounding of cents for shared transactions means that individual shares sometimes don't add up to the total expense.
* Either add individual authenticated user accounts, each authorized for one or more financial accounts, or add HTTP basic auth for the site and trust the crap out of users.


# Thanks

Inspired by [Norfolk](http://sourceforge.net/projects/norfolk/) household financial manager, by [Ben Chun](http://benchun.net).

Initial app generated with [Raygun](https://github.com/carbonfive/raygun).

# Requirements

To run the specs or fire up the server, be sure you have these:

* Ruby 1.9.3-p327
* PostgreSQL 9.x with superuser 'postgres' with no password (```createuser -s postgres```)
* PhantomJS for JavaScript testing (```brew install phantomjs```)

# Development

### First Time Setup

After cloning, run these commands to install missing gems and prepare the database.

    $ gem install bundler
    $ bundle update
    $ rake db:setup db:sample_data

### Running the Specs

To run all ruby and jasmine specs.

    $ rake

Again, with coverage for the ruby specs:

    $ rake spec:coverage

### Running the Application Locally

    $ foreman start
    $ open http://0.0.0.0:3000

### Using Guard

Guard is configured to run ruby and jasmine specs, and also listen for livereload connections. Growl is used for notifications.

    $ bundle exec guard

### Using Mailcatcher

    $ gem install mailcatcher
    $ mailcacher
    $ open http://localhost:1080/

Learn more at [mailcatcher.me](http://mailcatcher.me/). And please don't add mailcatcher to the Gemfile.

### Deploying to Heroku

Install the heroku toolbelt if you don't already have it (https://toolbelt.heroku.com/).

    $ heroku apps:create deharo
    $ git push heroku master
    $ heroku run rake db:setup

### Environment Variables

Several common features and operational parameters can be set using environment variables. These are all optional.

* ```HOSTNAME``` - Canonical hostname for this application. Other incoming requests will be redirected to this hostname.
* ```BASIC_AUTH_PASSWORD``` - Enable basic auth with this password.
* ```BASIC_AUTH_USER``` - Set a basic auth username (not required, password enables basic auth).
* ```PORT``` - Port to listen on (default: 3000).
* ```UNICORN_WORKERS``` - Number of unicorn workers to spawn (default: development 1, otherwisee 3) .
* ```UNICORN_BACKLOG``` - Depth of unicorn backlog (default: 16).

# Considerations

...
