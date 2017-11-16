#daemon off;
#Heroku dynos have at least 4 cores.
#worker_processes <%= ENV['NGINX_WORKERS'] || 4 %>;

#events {
#  use epoll;
#  accept_mutex on;
#  worker_connections 1024;
#}

http {
  gzip on;
  gzip_comp_level 2;
  gzip_min_length 512;

  server_tokens off;

  log_format l2met 'measure#nginx.service=$request_time request_id=$http_x_request_id';
  access_log logs/nginx/access.log l2met;
  error_log logs/nginx/error.log;

  include mime.types;
  default_type application/octet-stream;
  sendfile on;

  #Must read the body in 5 seconds.
  client_body_timeout 5;

  upstream app_server {
    server unix:/tmp/nginx.socket fail_timeout=0;
  }

  server {

    listen 80;
    #listen <%= ENV["PORT"] %>;

    server_name www.blackthreaddesign.com;
    keepalive_timeout 5;
    add_header Strict-Transport-Security max-age=31536000;

    <!-- if ($request_uri = /index.html) {
      return 301 https://www.blackthreaddesign.com/;
    } -->

    location / {
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $http_host;
      proxy_redirect off;
      if ($http_x_forwarded_proto != 'https') {
        rewrite ^ https://$host$request_uri? permanent;
      }

      auth_basic              "Restricted";
      auth_basic_user_file    basic.htpasswd;
      proxy_pass http://app_server;
    }
    location /unauthenticated {
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $http_host;
      proxy_redirect off;
      proxy_pass http://app_server;
    }
  }
}