# 💰 Sistema Web de Cobros Municipal

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)](https://mysql.com/)
[![Express](https://img.shields.io/badge/Express-4.18-lightgrey)](https://expressjs.com/)

**Solución integral para la gestión de cobros municipales** - Sistema web moderno que optimiza los procesos de recaudación, emisión de comprobantes y control financiero para administraciones municipales.

## ✨ Características Principales

### 📊 Gestión de Contribuyentes
- Registro de contribuyentes
- Historial de pagos y adeudos

### 🧾 Comprobantes
- Emisión de recibos oficiales
- Reimpresión de comprobantes
- Reportes de ingresos diarios (corte de caja)

### 💳 Sistema de Pagos
- Múltiples métodos de pago (efectivo, transferencia)
- Cálculo automático de recargos y descuentos

### 🏦 Control de Caja
- Arqueo de caja diario
- Control de turnos por cajero
- Auditoría de transacciones
- Cierre de turnos automático

## 🛠 Stack Tecnológico

| **Cap** | **Tecnologías** |
|---------|----------------|
| **Frontend** | React 18 + Vite, JavaScript, Tailwind CSS, React Query |
| **Backend** | Node.js, Express.js, Sequelize ORM, JWT Authentication |
| **Base de Datos** | MySQL 8.0, Redis (cache) |
| **Seguridad** | Bcrypt |

## 📁 Estructura del Proyecto

```
sistema-cobros-municipal/
├── 📂 backend/
│   ├── src/
│   │   ├── controllers/     # Lógica de negocio
│   │   ├── models/          # Modelos de base de datos
│   │   ├── routes/          # Rutas de la API
│   │   ├── middleware/      # Autenticación y validaciones
│   │   └── config/          # Configuración DB y entorno
│   ├── package.json
│   └── server.js
├── 📂 frontend/
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── pages/           # Vistas principales
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # Conexión con API
│   │   └── styles/          # Estilos globales
│   ├── package.json
│   └── vite.config.js
└── 📂 docs/
    ├── api/                 # Documentación API
    └── database/            # Esquemas y migraciones
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18 o superior
- MySQL 8.0 o superior
- npm o yarn

### 1. Clonar el Repositorio
```bash
git clone https://github.com/RafaelDiaz01/sistema-cobros-municipal.git
cd sistema-cobros-municipal
```

### 2. Configurar Backend
```bash
cd backend
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con credenciales de MySQL
```

### 3. Configurar Base de Datos
```sql
CREATE DATABASE db_cobros_municipal;
-- Ejecutar scripts de inicialización en /database/
```

### 4. Ejecutar Backend
```bash
npm run dev
# Servidor disponible en http://localhost:3001
```

### 5. Configurar Frontend
```bash
cd ../frontend
npm install
npm run dev
# Aplicación disponible en http://localhost:5173
```

## 👥 Equipo de Desarrollo

- **Kevin Rafael Díaz López** - *Desarrollador Full Stack* - [RafaelDiaz01](https://github.com/RafaelDiaz01)

---

**¡Optimizando la gestión municipal en Ixtlán de Juárez!**