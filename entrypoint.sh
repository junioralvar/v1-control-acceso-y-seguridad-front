#!/bin/sh

# Escribe la contraseña en un archivo
echo "Cdlim@2022" > /usr/local/apache2/conf/clave_privada.pass

# Inicia el servidor httpd
httpd-foreground
