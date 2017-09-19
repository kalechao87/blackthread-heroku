require 'sinatra'

before do
  cache_control :public_folder, :max_age => 31557600
end

get '/*' do
  file_name = "_site#{request.path_info}/index.html".gsub(%r{\/+},'/')
  if File.exists?(file_name)
    File.read(file_name)
  else
    raise Sinatra::NotFound
  end
end

set :public_folder, Proc.new {File.join(root, '_site')}
disable :static

run Sinatra::Application