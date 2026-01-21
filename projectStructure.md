
//Estructura del proeyecto

proyecto-angular/
│
├── 📂 src/
│   │
│   ├── 📂 app/
│   │   │
│   │   ├── 📂 begin/                    [Vista inicial con video]
│   │   │   ├── begin.component.ts       # Lógica: reproducción fragmentada
│   │   │   ├── begin.component.html     # Template: video player
│   │   │   ├── begin.component.scss     # Estilos
│   │   │   └── begin.component.spec.ts  # Tests
│   │   │
│   │   ├── 📂 heroes/                   [Componente heroes]
│   │   │   └── ...
│   │   │
│   │   ├── 📂 home/                     [Vista principal]
│   │   │   └── ...
│   │   │
│   │   ├── 📂 image-expand/             [Componente de imágenes]
│   │   │   └── ...                      # Pantalla que mostraría las imagenes ampliadas [inProgress]                    
│   │   │
│   │   ├── 📂 models/                   [Interfaces y tipos]
│   │   │   └── heroes.ts                # modelo para los heroes  
│   │   │   └── powers.ts                # modelo para los poderes  
│   │   │   └── Stories.ts               # modelo para los historias  
│   │   │
│   │   ├── 📂 service/                  [Servicios compartidos]
│   │   │   ├── audio.service.ts         # Gestión de audio global
│   │   │   └── video.service.ts         # Gestión de video
│   │   │
│   │   ├── 📂 start/                    [Pantalla de inicio]
│   │   │   ├── start.component.ts       # Lógica: desbloqueo de audio
│   │   │   ├── start.component.html     # Template: botón start
│   │   │   ├── start.component.scss     # Estilos
│   │   │   └── start.component.spec.ts  # Tests
│   │   │
│   │   ├── 📂 stories/                  [Componente stories]
│   │   │   └── ...
│   │   │
│   │   ├── 📄 app-routing.module.ts     # Configuración de rutas
│   │   ├── 📄 app.component.ts          # Componente raíz
│   │   ├── 📄 app.component.html        # Template raíz
│   │   ├── 📄 app.component.scss        # Estilos globales
│   │   └── 📄 app.module.ts             # Módulo principal
│   │
│   ├── 📂 assets/
│   │   │
│   │   ├── 📂 audio/                    [Archivos de sonido]
│   │   │   └── (pendiente)
│   │   │
│   │   ├── 📂 images/                   [Imágenes estáticas]
│   │   │   └── nyc-static.jpg
│   │   │
│   │   └── 📂 video/                    [Archivos de video]
│   │       └── A leap of Faith.mp4      # Video principal (35-82s)
│   │
│   ├── 📂 theme/                        [Temas y estilos globales]
│   │   └── ...
│   │
│   ├── 📄 index.html                    # HTML principal
│   ├── 📄 main.ts                       # Entry point
│   └── 📄 styles.scss                   # Estilos globales
│
├── 📂 .devcontainer/                    [Configuración Docker]
│   └── ...
│
├── 📄 angular.json                      # Configuración Angular
├── 📄 package.json                      # Dependencias
├── 📄 tsconfig.json                     # TypeScript config
├── 📄 ionic.config.json                 # Ionic config
├── 📄 ngsw-config.json                  # Service Worker config
├── 📄 .editorconfig                     # Editor config
├── 📄 .projectStructure.md              # Estás aquí!
├── 📄 .gitignore                        # Git ignore
├── 📄 README.md                         # Documentación principal
└── 📄 git tips.md                       # Tips de Git