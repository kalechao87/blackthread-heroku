require 'acme_challenge'
require 'sinatra'
require './sendgrid.rb'

use AcmeChallenge, ENV['ACME_CHALLENGE'] if ENV['ACME_CHALLENGE']

set :public_dir, Proc.new { File.join(root, "_site") }
set :views, Proc.new { File.join(File.dirname(__FILE__), "views") }

before do
  response.headers['Cache-Control'] = 'public, max-age=36000'
end

# remove all trailing slashes
# get %r{(/.*)\/$} do
#   redirect "#{params[:captures].first}"
# end

# serve the jekyll site from the _site folder
get '/*' do
  file_name = "_site#{request.path_info}/*.html".gsub(%r{\/+},'/')
  if File.exists?(file_name)
File.read(file_name)
  else
raise Sinatra::NotFound
  end
end

run Sinatra::Application