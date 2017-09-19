# require 'rack/jekyll'
# require 'rack/rewrite'
require 'rack/contrib/try_static'

# use Rack::Rewrite do
#   rewrite "/", "/index.html"
# end

# run Rack::Jekyll.new

# use Rack::TryStatic,
#   urls: %w[/],
#   root: '',
#   try: ['.html', 'index.html', '/index.html'],
#   header_rules: [
#     [:all, {
#       'Strict-Transport-Security' => 'max-age=31536000; preload',
#       'X-Xss-Protection' => '1; mode=block',
#       'X-Content-Type-Options' => 'nosniff',
#       'X-Frame-Options' => 'DENY',
#       'Content-Security-Policy' => "default-src 'self'; font-src data: https://fonts.typekit.net; img-src 'self' https://danielgroves-net.imgix.net https://danielgroves-net-2.imgix.net https://d1238u3jnb0njy.cloudfront.net https://p.typekit.net https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://d1238u3jnb0njy.cloudfront.net https://use.typekit.net; script-src 'self' 'unsafe-inline' https://d1238u3jnb0njy.cloudfront.net https://use.typekit.net https://www.google-analytics.com; child-src https://a.tiles.mapbox.com; frame-src https://a.tiles.mapbox.com;"
#     }],
#     [['html'], { 'Content-Type' => 'text/html; charset=utf-8'}],
#     [['css'], { 'Content-Type' => 'text/css'}],
#     [['js'], { 'Content-Type' => 'text/javascript' }],
#     [['json'], { 'Content-Type' => 'application/json' }],
#     [['png'], { 'Content-Type' => 'image/png' }],
#     [['gif'], { 'Content-Type' => 'image/gif' }],
#     [['jpeg'], { 'Content-Type' => 'image/jpeg' }],
#     [['jpg'], { 'Content-Type' => 'image/jpeg' }],
#     [['zip'], { 'Content-Type' => 'application/zip' }],
#     [['pdf'], { 'Content-Type' => 'application/pdf' }],
#     [['/assets'], { 'Cache-Control' => 'public', 'Vary' => 'Accept-Encoding' }]
#   ]

#   run lambda { |env|
#     [404, { 'Content-Type' => 'text/html' }, File.open('build/404.html', File::RDONLY)]
#   }



# app = Rack::Builder.app do

app = Rack::Builder.new do
  use Rack::TryStatic,
    root: '/',
    urls: %w[/],
    try: ['.html', 'index.html', '/index.html']

  run lambda{ |env|
    four_oh_four_page = File.expand_path("/404.html", __FILE__)
    [ 404, { 'Content-Type'  => 'text/html'}, [ File.read(four_oh_four_page) ]]
  }
end

run app
