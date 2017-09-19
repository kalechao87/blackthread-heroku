# require 'rack/jekyll'
# require 'rack/rewrite'

# use Rack::Rewrite do
#   rewrite "/", "/index.html"
# end

# run Rack::Jekyll.new

require 'sinatra/base'

class MyApp < Sinatra::Base
  get '/' do
    "Hello, Phusion Passenger #{PhusionPassenger::VERSION_STRING}!"
  end
end

run MyApp