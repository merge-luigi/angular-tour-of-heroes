                     
            ╔═══════════════════════════════════════════════════════════════════════╗
            ║                                                                       ║
            ║           GUÍA BÁSICA DE GIT - COMANDOS ESENCIALES                   ║
            ║                                                                       ║
            ╚═══════════════════════════════════════════════════════════════════════╝


Primero, para eliminar esas horribles líneas que aparecen en los banners debes de:

    1. Ir a los settings de Visual Studio Code  ------> Crl +
    2. Pegar en el buscador ------> unicodeHighlight
    3. Cambia el valor del dropdown de "inUntrustedWorkspace" a false (o desmarca la casilla si la tiene)

Para levantar las terminales, recomendado hacer (ANGULAR):
ng serve --host 0.0.0.0 --port 4200 --poll 700 # el pool obliga a Angular a revisar cambios cada 7seg (ajustar según tu potencia de cpu)

Para crear Componentes:
ng generate component nombre-del-componente  -------> Crea Componentes enteros (.html, .ts, .css, .spec.ts)
ng g c nombre-del-componente  -------> Forma abreviada de crear 1 componente

Para crear Servicios:
ng generate service nombre-del-service -------> crear Servicios
ng g s nombre-del-servicio -------> Forma abreviada de crear 1 servicio
═══════════════════════════════════════════════════════════════════════
📊 GIT ESTADOS
═══════════════════════════════════════════════════════════════════════

git status          → Ver en qué rama estoy posicionado
git log --oneline   → Historial de commits (hash + mensaje)
git diff            → Ver cambios aún no sellados
git branch          → Listar ramas (* indica la actual)

Ver commits por fecha:
git log --oneline --since="today"      → Commits de hoy
git log --oneline --since="midnight"   → Desde medianoche
git log --oneline --since="2025-01-19" → Fecha específica

═══════════════════════════════════════════════════════════════════════
💾 Salvar los cambios
═══════════════════════════════════════════════════════════════════════
Flujo básico de commit
git add .                    # Agregar TODOS los archivos modificados
git add nombre-archivo       # Agregar un archivo específico
git add -p                   # Agregar cambios de forma interactiva

Crear Commit
git commit -m "mensaje"      # Crear commit con mensaje
git commit -am "mensaje"     # Add + commit en un solo paso (solo archivos tracked)

Comandos útiles adicionales
git commit --amend           # Modificar el último commit
git reset HEAD archivo       # Quitar archivo del staging area
git restore archivo          # Descartar cambios en archivo (cuidado!)


═══════════════════════════════════════════════════════════════════════
🪵 Ramificaciones del proyecto
═══════════════════════════════════════════════════════════════════════
Crear y moverte entre ramas
git branch nombre-rama       # Crear nueva rama
git checkout nombre-rama     # Cambiar a una rama existente
git checkout -b nombre-rama  # Crear rama Y moverte a ella (atajo)
git switch nombre-rama       # Alternativa moderna a checkout

Gestión de ramas
git branch                   # Listar ramas locales
git branch -a                # Listar todas (locales + remotas)
git branch -d nombre-rama    # Eliminar rama (solo si está mergeada)
git branch -D nombre-rama    # Forzar eliminación de rama

Fusionar ramas
git merge nombre-rama        # Traer cambios de otra rama a la actual
git merge --no-ff nombre     # Merge creando siempre un commit de merge


═══════════════════════════════════════════════════════════════════════
⏰ MANIPULACIÓN DEL TIEMPO - Viajes y Restauraciones
═══════════════════════════════════════════════════════════════════════
Volver atrás en el tiempo
git checkout hash-commit     # Viajar a un commit específico (detached HEAD)
git checkout nombre-rama     # Volver a la rama actual

git revert hash-commit       # Crear nuevo commit que deshace cambios
git reset --soft HEAD~1      # Volver 1 commit atrás (mantiene cambios staged)
git reset --hard HEAD~1      # Volver 1 commit atrás (BORRA cambios) ⚠️

Navegar por el historial
git reflog                   # Ver TODO el historial de movimientos
git show hash-commit         # Ver detalles de un commit específico


═══════════════════════════════════════════════════════════════════════
🔄 SINCRONIZACIÓN - Trabajo Remoto
═══════════════════════════════════════════════════════════════════════
Descargar cambios
git fetch                    # Descargar info del remoto (sin merge)
git pull                     # Descargar + fusionar (fetch + merge)
git pull --rebase            # Descargar + rebase (historial más limpio)

Subir cambios
git push                     # Subir commits al remoto
git push origin nombre-rama  # Subir rama específica
git push -u origin rama      # Subir y trackear rama nueva
git push --force             # Forzar push (cuidado!) ⚠️

Configurar remotos
git remote -v                # Ver remotos configurados
git remote add origin URL    # Agregar nuevo remoto
git remote remove origin     # Eliminar remoto


═══════════════════════════════════════════════════════════════════════
💡 TIPS Y TRUCOS
═══════════════════════════════════════════════════════════════════════
Aliases útiles
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm "commit -m"

Configuración recomendada
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
git config --global core.editor "code --wait"  # VS Code como editor

Guardar trabajo temporal
# CUÁNDO USAR STASH:
# - Necesitas cambiar de rama pero tienes cambios sin commitear
# - Quieres probar algo rápido sin perder tu trabajo actual
# - Te piden revisar otra rama urgente

git stash                    # Guardar cambios temporalmente
git stash save "mensaje"     # Guardar con descripción (mejor)
git stash pop                # Recuperar último stash
git stash list               # Ver todos los stashes
git stash apply stash@{0}    # Aplicar stash específico sin eliminarlo
git stash drop stash@{0}     # Eliminar stash específico
git stash clear              # Eliminar TODOS los stashes

# Ver diferencias visuales
git diff --staged            # Ver qué vas a commitear
git diff HEAD~1              # Comparar con commit anterior

# Historial bonito
git log --graph --oneline --all --decorate

# Buscar en el historial
git log --grep="palabra"     # Buscar commits por mensaje
git log -S "código"          # Buscar commits que agregaron/quitaron código

git reset --soft HEAD~1 # Deshacer el último commit (sin perder cambios)
git blame archivo.txt # Ver quién modificó cada línea
git log --graph --pretty=format:"%C(red)%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%Creset"

═══════════════════════════════════════════════════════════════════════
🔥 HECHIZOS PROHIBIDOS - Usar con precaución
═══════════════════════════════════════════════════════════════════════
git reset --hard             # BORRA todos los cambios locales
git clean -fd                # ELIMINA archivos no trackeados
git push --force             # Reescribe historial remoto
git rebase                   # Reescribe historial local


