# Política de seguridad

## Versiones soportadas

Mientras el proyecto permanezca antes de `v1.0.0`, solamente la versión más reciente recibe
correcciones de seguridad.

## Reportar una vulnerabilidad

No publiques vulnerabilidades, credenciales ni datos privados en un issue. Comunícate de forma
privada con la persona responsable del repositorio y proporciona:

- Descripción del problema.
- Pasos mínimos para reproducirlo.
- Impacto esperado.
- Una propuesta de corrección, si existe.

No incluyas tokens, contraseñas, identificadores privados de Google ni información de clientes.

## Principios del proyecto

- La hoja de producción permanece privada.
- La API pública es únicamente de lectura.
- La respuesta de la API contiene una lista explícita de campos permitidos.
- Los secretos no se guardan en Git ni en variables `VITE_*`.
- Todo cambio debe superar las verificaciones automatizadas antes de publicarse.
