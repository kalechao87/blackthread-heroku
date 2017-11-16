#events {
#  use epoll;
#  accept_mutex on;
#}

http {
  gzip on;
  gzip_comp_level 2;
  gzip_min_length 512;

  #log_format l2met 'measure#nginx.service=$request_time request_id=$http_x_request_id';
  #access_log logs/nginx/access.log l2met;
  #error_log logs/nginx/error.log;

  #Must read the body in 5 seconds.
  #client_body_timeout 5;

  #upstream app_server {
  #  server unix:/tmp/nginx.socket fail_timeout=0;
  #}

  server {

    #listen 80;
    listen <?=getenv('PORT')?:'8080'?>;

    #server_name www.blackthreaddesign.com;

    root /app/_site/;

    add_header Strict-Transport-Security max-age=31536000;

    location / {

      include mime.types;

      #proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      #proxy_set_header Host $http_host;
      #proxy_redirect off;

      #if ($http_x_forwarded_proto != 'https') {
      #  rewrite ^ https://$host$request_uri? permanent;
      #}

      if ($request_uri = /index.html) {
        return 301 https://www.blackthreaddesign.com/;
      }

      #auth_basic              "Restricted";
      #auth_basic_user_file    basic.htpasswd;
      #proxy_pass http://app_server;
    }

    #location /unauthenticated {
    #  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    #  proxy_set_header Host $http_host;
    #  proxy_redirect off;
    #  proxy_pass http://app_server;
    #}
  }
}