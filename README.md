# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
### 🚀 Setup Commands

```bash
# 1. Install Ruby gems
bundle install

# 2. Database setup: structure create database + seed data. Ideal after cloning!
rails db:setup

# 3. Run database migrations
rails db:migrate

# 4. Precompile assets (only if needed in production/local server setup)
rails assets:precompile

# 5. Start the full stack (Rails API + React frontend)
bin/dev
