require 'sinatra'

before do
  cache_control :public, :max_age => 31557600
end

get '/' do
  send_file(File.join(settings.public, 'index.html'), :disposition => nil)
end

get '/*' do
  send_file(File.join(settings.public, params[:splat]), :disposition => nil)
end

set :public, Proc.new {File.join(root, '_site')}
disable :static

run Sinatra::Application