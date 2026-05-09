# Food Store - Evaluación 1 Programación 3

Aplicación frontend para una tienda de comida, con catálogo, búsqueda, filtros por categoría y carrito de compras persistente en `localStorage`.

## Tecnologías

- HTML5
- CSS3
- TypeScript
- Vite (bundler)

## Funcionalidades implementadas

- ✅ Catálogo de productos cargado dinámicamente desde `data.ts`.
- ✅ Búsqueda por nombre (case-insensitive, parcial). [HU-P1-01]
- ✅ Filtrado por categoría desde el sidebar. [HU-P1-02]
- ✅ Botón "Agregar al carrito" en cada producto, con feedback visual (toast). [HU-P1-03]
- ✅ Productos repetidos no se duplican: se incrementa la cantidad.
- ✅ Vista del carrito con nombre, precio y cantidad. [HU-P1-04]
- ✅ Mensaje cuando el carrito está vacío.
- ✅ Total del carrito calculado y mostrado. [HU-P1-05]
- ✅ Modificar cantidad y eliminar productos desde el carrito.
- ✅ Persistencia en `localStorage`.

## Estructura del proyecto

```
src/
├── pages/
│   └── store/
│       ├── home/
│       │   ├── home.html      ← catálogo
│       │   └── home.ts        ← render, búsqueda, filtros
│       └── cart/
│           ├── cart.html      ← vista del carrito
│           └── cart.ts        ← render, cantidades, total
├── types/
│   ├── product.ts             ← interfaces Product y CartItem
│   └── category.ts            ← interface ICategory
├── data/
│   └── data.ts                ← PRODUCTS y getCategories()
├── utils/
│   └── cart.ts                ← lógica del carrito + localStorage
└── styles/
    └── global.css             ← estilos compartidos
```

## Ejecución

```bash
# 1. Instalar dependencias
pnpm install

# 2. Levantar el servidor de desarrollo
pnpm dev
```

El servidor estará disponible en `http://localhost:5173`.

Si no tenés `pnpm`, podés instalarlo con `npm install -g pnpm`, o reemplazar los comandos por `npm install` y `npm run dev`.

## Build de producción

```bash
pnpm build
```

## Presentación

🔗 **Link al video demostrativo:** [https://drive.google.com/drive/folders/1DhWLSKAERJpsOdrCuN2GcJ-kKthfklH5?usp=drive_link]

## Autor

* **Fabián Ignacio Cardozo**
* Tecnicatura Universitaria en Programación (UTN)
* Programacion III
