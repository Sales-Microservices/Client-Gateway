# API Gateway

API Gateway desarrollado con NestJS que actúa como punto de entrada único para el ecosistema de microservicios, gestionando las comunicaciones con el microservicio de productos.

## 🚀 Características

- **Framework**: NestJS
- **Arquitectura**: API Gateway pattern
- **Comunicación**: TCP transport para microservicios
- **Validación**: DTOs con class-validator
- **Manejo de errores**: Filtro personalizado para excepciones RPC
- **Prefijo global**: Todas las rutas tienen el prefijo `/api`

## 📋 Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Microservicio de productos ejecutándose

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd api-gateway
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.template .env
```

4. Edita el archivo `.env`:
```env
PORT=3000
PRODUCT_MICROSERVICE_HOST=localhost
PRODUCT_MICROSERVICE_PORT=3001
```

## 🎯 Uso

### Desarrollo
```bash
npm run start:dev
```

### Producción
```bash
npm run build
npm run start:prod
```

El gateway se ejecutará en el puerto especificado (por defecto 3000) y estará disponible en: `http://localhost:3000/api`

## 📡 Endpoints API

### Productos

Todas las rutas están disponibles bajo el prefijo `/api/products`

#### Crear Producto
```http
POST /api/products
Content-Type: application/json

{
  "name": "Producto Ejemplo",
  "price": 29.99
}
```

#### Obtener Todos los Productos
```http
GET /api/products?page=1&limit=10
```

**Query Parameters:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Productos por página (default: 10)

#### Obtener Producto por ID
```http
GET /api/products/{id}
```

#### Actualizar Producto
```http
PATCH /api/products/{id}
Content-Type: application/json

{
  "name": "Nuevo nombre",
  "price": 35.50
}
```

#### Eliminar Producto (Soft Delete)
```http
DELETE /api/products/{id}
```

## 🏗️ Estructura del Proyecto

```
src/
├── common/
│   ├── dto/
│   │   └── pagination.dto.ts         # DTO para paginación
│   ├── exceptions/
│   │   └── rpc-custom-exception.filter.ts  # Filtro de excepciones RPC
│   └── index.ts
├── config/
│   ├── envs.ts                       # Configuración de variables de entorno
│   ├── service.ts                    # Constantes de servicios
│   └── index.ts
├── products/
│   ├── dto/
│   │   ├── create-product.dto.ts
│   │   └── update-product.dto.ts
│   ├── products.controller.ts
│   └── products.module.ts
├── app.module.ts
└── main.ts
```

## ⚙️ Configuración

### Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto del gateway | `3000` |
| `PRODUCT_MICROSERVICE_HOST` | Host del microservicio de productos | `localhost` |
| `PRODUCT_MICROSERVICE_PORT` | Puerto del microservicio de productos | `3001` |

## 🔧 Funcionalidades

### Filtro de Excepciones RPC
El gateway incluye un filtro personalizado (`RpcCustomExceptionFilter`) que maneja automáticamente las excepciones provenientes de los microservicios y las convierte en respuestas HTTP apropiadas.

### Validación Global
- Pipes de validación configurados globalmente
- `whitelist: true` - Solo permite propiedades definidas en los DTOs
- `forbidNonWhitelisted: true` - Rechaza requests con propiedades no permitidas

### Comunicación con Microservicios
- Utiliza TCP transport para comunicación síncrona
- Cliente proxy configurado para el servicio de productos
- Manejo de errores con RxJS operators

## 📝 DTOs y Validaciones

### CreateProductDto
```typescript
{
  name: string;        // Requerido
  price: number;       // Número positivo, máximo 3 decimales
}
```

### UpdateProductDto
```typescript
{
  name?: string;       // Opcional
  price?: number;      // Opcional, número positivo, máximo 3 decimales
}
```

### PaginationDto
```typescript
{
  page?: number;       // Opcional, número positivo
  limit?: number;      // Opcional, número positivo
}
```

## 🚦 Códigos de Respuesta

- **200**: Operación exitosa
- **201**: Recurso creado exitosamente
- **400**: Datos de entrada inválidos
- **404**: Recurso no encontrado
- **500**: Error interno del servidor

## 🛡️ Manejo de Errores

El gateway incluye un sistema robusto de manejo de errores:

1. **Validación de entrada**: Los DTOs validan automáticamente los datos
2. **Excepciones RPC**: Convertidas a respuestas HTTP apropiadas
3. **Errores de microservicio**: Propagados correctamente al cliente

## 📚 Tecnologías Utilizadas

- **NestJS**: Framework de Node.js
- **@nestjs/microservices**: Comunicación entre microservicios
- **class-validator**: Validación de DTOs
- **RxJS**: Manejo de streams y observables
- **Joi**: Validación de configuración

## 🔄 Flujo de Comunicación

```
Cliente HTTP → Gateway → Microservicio Productos → Base de Datos
                ↓
Cliente HTTP ← Gateway ← Microservicio Productos ← Base de Datos
```

## 🚀 Despliegue

### Docker (Recomendado)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

### Variables de Entorno de Producción
```env
PORT=3000
PRODUCT_MICROSERVICE_HOST=products-service
PRODUCT_MICROSERVICE_PORT=3001
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.