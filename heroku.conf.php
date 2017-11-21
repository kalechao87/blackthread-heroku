http {
  gzip         on;
  gzip_vary    on;
  gzip_proxied any;
  gzip_comp_level 2;
  gzip_static on;
  gzip_types   text/plain text/css application/json application/x-javascript application/javascript text/xml application/xml application/rss+xml text/javascript image/svg+xml application/vnd.ms-fontobject application/x-font-ttf font/opentype;

  server {

    listen <?=getenv('PORT')?:'8080'?>;

    root /app/_site/;

    add_header Strict-Transport-Security max-age=31536000;

    location / {

      include mime.types;

      if ($request_uri = /index.html) {
        return 301 https://www.blackthreaddesign.com/;
      }

    }

    location ~* \.(?:ico|css|js|gif|jpe?g|png|json)$ {

      include mime.types;
      expires 30d;
      add_header Pragma public;
      add_header Cache-Control "public";
    }

  }
}