source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
gem "jekyll", "3.5.2"

# Server for Heroku
gem 'puma'
gem 'rack-jekyll'
gem 'rack-rewrite'
gem 'rack-contrib'

# gem "minima"

require 'rbconfig'
gem 'tzinfo-data' if RbConfig::CONFIG['target_os'] =~ /mswin|mingw|cygwin/i

# If you have any plugins, put them here!
group :jekyll_plugins do
	gem "jekyll-seo-tag"
	gem "jekyll-sitemap"
	gem "jekyll-livereload"
	gem "jekyll-gist"
  gem "jemoji"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
