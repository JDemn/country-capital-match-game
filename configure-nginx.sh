#!/bin/sh

PORT="${PORT:-3003}"
echo "Valor del puerto: $PORT"

NGINX_CONFIG="/etc/nginx/conf.d/default.conf"

# Reemplaza la marca de posición con el puerto deseado de nginx.conf
sed -i "s/__PORT__/$PORT/g" "$NGINX_CONFIG"

echo "Archivo de configuración de Nginx actualizado."

# Inicia Nginx
nginx -g "daemon off;"
