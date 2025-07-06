# Sistema de Registro Estudiantil - Frontend

## 📋 Descripción

Sistema web para gestión de estudiantes, materias y profesores desarrollado en Angular con Material Design. Aplicación frontend completa con simulación de datos para demostración.

## 🚀 Requisitos Previos

Antes de ejecutar este proyecto, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **npm** (viene con Node.js)
- **Angular CLI** (versión 15 o superior)

### Verificar instalaciones:
```bash
node --version
npm --version
ng version
```

## 📦 Instalación

1. **Clonar el repositorio** (si no lo tienes ya):
```bash
git clone [URL_DEL_REPOSITORIO]
cd FrontStudentRegistration/student-registration-app-frontend/student-registration
```

2. **Instalar dependencias**:
```bash
npm install
```

## 🏃‍♂️ Ejecutar el Proyecto

### Desarrollo Local
```bash
ng serve
```
El proyecto estará disponible en: `http://localhost:4200`

### Con puerto específico
```bash
ng serve --port 4200
```

## 🏗️ Arquitectura del Proyecto

### 📁 Estructura de Carpetas:
```
src/app/
├── features/                    # Módulos de funcionalidad
│   ├── auth/                   # Autenticación y login
│   │   ├── auth.component.ts   # Componente principal de auth
│   │   └── auth.module.ts      # Módulo de autenticación
│   ├── dashboard/              # Panel principal
│   │   ├── dashboard.component.ts
│   │   ├── pages/
│   │   │   └── home/           # Página de inicio
│   │   └── dashboard.module.ts
│   ├── students/               # Gestión de estudiantes
│   │   ├── pages/
│   │   │   ├── student-list/   # Lista de estudiantes
│   │   │   ├── student-form/   # Formulario de estudiante
│   │   │   └── student-detail/ # Detalle de estudiante
│   │   ├── services/
│   │   │   └── students.service.ts
│   │   ├── models/
│   │   │   └── student.interface.ts
│   │   └── students.module.ts
│   ├── subjects/               # Gestión de materias
│   │   ├── pages/
│   │   │   ├── subject-list/   # Lista de materias
│   │   │   └── subject-detail/ # Detalle de materia
│   │   ├── services/
│   │   │   └── subjects.service.ts
│   │   └── subjects.module.ts
│   └── teachers/               # Gestión de profesores
│       ├── pages/
│       │   ├── teacher-list/   # Lista de profesores
│       │   └── teacher-detail/ # Detalle de profesor
│       ├── services/
│       │   └── teachers.service.ts
│       └── teachers.module.ts
├── shared/                     # Componentes compartidos
└── core/                      # Servicios core y utilidades
```

### 🧩 Patrones de Arquitectura:

#### **Feature Modules**
- Cada funcionalidad es un módulo independiente
- Lazy loading para optimizar carga
- Separación clara de responsabilidades

#### **Component Architecture**
- **Smart Components**: Manejan lógica de negocio
- **Presentational Components**: Solo muestran datos
- **Container Components**: Coordinan otros componentes

#### **Service Layer**
- **Data Services**: Manejan comunicación con APIs
- **State Management**: Gestión de estado de la aplicación
- **Utility Services**: Funciones auxiliares

#### **Routing Strategy**
- **Lazy Loading**: Carga módulos bajo demanda
- **Child Routes**: Navegación anidada
- **Route Guards**: Protección de rutas

## 🎯 Funcionalidades Implementadas

### ✅ Módulos Completados:
- **🔐 Autenticación**: Login funcional con simulación de datos
- **📊 Dashboard**: Panel principal con navegación lateral
- **👥 Gestión de Estudiantes**: Lista, detalle y acciones CRUD
- **📚 Gestión de Materias**: Lista, detalle y gestión completa
- **👨‍🏫 Gestión de Profesores**: Lista, detalle y gestión completa

### 🎨 Características Técnicas:
- **Angular Material**: Componentes UI modernos
- **Responsive Design**: Adaptable a todos los dispositivos
- **TypeScript**: Tipado estático para mejor desarrollo
- **Reactive Forms**: Validación de formularios robusta
- **HTTP Client**: Comunicación con APIs
- **Router**: Navegación SPA optimizada

### 🎨 Características de UX:
- **Diseño Responsivo** - Funciona en desktop, tablet y móvil
- **Material Design** - Interfaz moderna y atractiva
- **Navegación Intuitiva** - Sidebar con módulos organizados
- **Estados de Carga** - Indicadores visuales durante operaciones
- **Mensajes de Error/Éxito** - Feedback claro al usuario
- **Animaciones Suaves** - Transiciones fluidas

## 🛠️ Comandos Útiles

### Desarrollo:
```bash
ng serve                    # Servidor de desarrollo
ng build                    # Compilar para producción
ng test                     # Ejecutar pruebas
ng lint                     # Verificar código
```

### Generar componentes:
```bash
ng generate component [nombre]
ng generate service [nombre]
ng generate module [nombre]
```

## 📱 Cómo Usar

1. **Acceder al sistema**: Ve a `http://localhost:4200`
2. **Hacer login**: Usa cualquier usuario/contraseña (simulado)
3. **Navegar**: Usa el sidebar para acceder a los módulos
4. **Gestionar datos**: Usa los botones de acción en cada módulo

## 🐛 Solución de Problemas

### Error: "ng command not found"
```bash
npm install -g @angular/cli
```

### Error: "Port 4200 is already in use"
```bash
ng serve --port 4201
```

### Error: "Cannot find module"
```bash
npm install
```

### Error: "Compilation failed"
```bash
npm cache clean --force
npm install
```

## 📞 Soporte

Si encuentras algún problema:
1. Verifica que tienes las versiones correctas de Node.js y Angular CLI
2. Ejecuta `npm install` para asegurar que todas las dependencias estén instaladas
3. Revisa la consola del navegador para errores específicos

## 🚀 Despliegue

### Para producción:
```bash
ng build --configuration production
```

Los archivos generados estarán en la carpeta `dist/`

---

**¡Listo! El proyecto está configurado y listo para usar. 🎉**
