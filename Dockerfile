# building phase
FROM node:16-alpine3.18 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

# execute phase
FROM nginx:alpine

RUN apk add --no-cache bash dos2unix

ARG PORT
ENV PORT=$PORT

# Establecer permisos del archivo de registro
RUN touch /var/log/nginx/access.log \
    && chown nginx:nginx /var/log/nginx/access.log \
    && chmod 640 /var/log/nginx/access.log

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./configure-nginx.sh /usr/src/app/configure-nginx.sh
# Usar env.sh para remplazar variables REACR_APP_ antes de levantar el proyecto.
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

RUN dos2unix /usr/src/app/configure-nginx.sh \
    && chmod +x /usr/src/app/configure-nginx.sh

COPY --from=build /usr/src/app/build /usr/share/nginx/html
RUN ls -l /usr/src/app > /usr/src/app/app_contents.log

CMD ["/bin/sh","/usr/src/app/configure-nginx.sh"]