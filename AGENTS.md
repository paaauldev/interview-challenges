<!-- BEGIN GIT SYNC POLICY -->
## Sincronización obligatoria de Git

- Antes de modificar archivos al iniciar o retomar una tarea, identificar la rama, su upstream y el estado del árbol con `git status --short --branch`; ejecutar `git fetch` del remoto correspondiente (`git fetch origin` cuando sea origin) y comprobar los commits por delante y por detrás. Un fetch fallido no permite afirmar que la rama está actualizada.
- Si la rama solo está atrasada respecto a su upstream y el árbol está limpio, actualizar con `git pull --ff-only` antes de trabajar. No hacer pull sin comprobar primero el estado.
- Si hay divergencia o cambios pendientes que impiden actualizar, preservar los commits y archivos del usuario y resolver la situación antes de continuar con cambios de código. No usar `reset --hard`, descartar archivos, hacer force-push ni aplicar stash/rebase de trabajo ajeno automáticamente. Resolver dentro de la autorización existente; pedir una decisión concreta solo si hace falta para conservar el trabajo.
- Si la rama no tiene upstream, identificar la base remota prevista; no asumir que sigue main ni configurar otro upstream sin verificarlo. Las ramas de trabajo también deben comprobar su base remota antes de empezar.
- Repetir fetch y comprobación antes de commitear y antes de publicar cambios. Si aparecen commits nuevos, integrarlos de forma segura y repetir las verificaciones afectadas. Informar de cualquier sincronización pendiente.
<!-- END GIT SYNC POLICY -->
