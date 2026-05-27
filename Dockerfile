FROM nginx:latest

COPY assets /usr/share/nginx/html/assets
COPY lib /usr/share/nginx/html/lib
COPY manifest /usr/share/nginx/html/manifest
COPY src /usr/share/nginx/html/src
COPY types /usr/share/nginx/html/types

COPY index.html style.css timer.html /usr/share/nginx/html/