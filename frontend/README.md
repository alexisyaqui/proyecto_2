# frontend
src/
api/ : auth.axios.ts, index.ts (axios instances/adapters)
assets/
  components/ (componentes globales reutilizables)
  modules/
    auth/
      components/
      views/
      store/ (o useAuth.ts si usas composables/Pinia)
      services.ts
      types.ts
      routes.ts
      index.ts
    usuario/ (misma estructura que arriba)
    producto/ (misma estructura que arriba)
    ventas/ (misma estructura que arriba)
  composables/ (composables reutilizables y helper hooks)
  layouts/
  plugins/
  router/ (index.ts que importa features/*/routes.ts)
store/ (config global / stores compartidos)
types/ (tipos globales)
utils/ o helpers/
main.ts, App.vue


## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
