# Versionamiento y entregas

## Estrategia Git

`main` representa producción. El trabajo se realiza en ramas cortas:

- `feat/nombre-corto`
- `fix/nombre-corto`
- `security/nombre-corto`
- `docs/nombre-corto`

No se utiliza una rama `develop` mientras el equipo sea pequeño.

## Commits

Se usan commits convencionales: `feat`, `fix`, `security`, `docs`, `test`, `refactor` y `chore`.

## Versiones

El repositorio utiliza SemVer:

- `0.x.y`: desarrollo inicial.
- `1.0.0`: primer catálogo público estable.
- Incremento PATCH: corrección compatible.
- Incremento MINOR: funcionalidad compatible.
- Incremento MAJOR: cambio incompatible.

La versión del repositorio, el `CHANGELOG.md` y la versión visible de la aplicación deben coincidir.

## Apps Script

Cada publicación de producción utiliza un despliegue versionado, nunca el despliegue HEAD. La
descripción de la versión debe incluir la etiqueta Git correspondiente, por ejemplo `v0.2.0`.

Procedimiento manual inicial:

```bash
npm run gas:push
npm run gas:version -- "v0.2.0"
```

Después se actualiza el despliegue existente desde la cuenta propietaria. La automatización de
despliegues se agregará únicamente cuando las credenciales estén almacenadas en secretos del
repositorio propiedad de la empresa.
