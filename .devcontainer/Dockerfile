FROM mcr.microsoft.com/devcontainers/javascript-node
RUN apt update && apt install -y mkcert
RUN mkcert -install
RUN mkcert localhost && sudo chmod a+r /localhost-key.pem