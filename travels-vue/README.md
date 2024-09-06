# Travels-vue

Este es el proyecto Vue creado para el Taller PulpoCon2024. Es muy similar a sus otros "hermanos", hechos con Angular y React, por lo que puedes tener una base muy sencilla para seguir el taller.

## Introducción

Vue es un framework accesible, eficaz y versátil para crear interfaces web. Tiene una muy buena [documentación oficial](https://vuejs.org/guide/introduction.html) que te puede ayudar mucho con el desarrollo. Sus principales ventajas son su arquitectura simple y bien organizada

## Requisitos

- El principal requisito es tener una versión de Node.js version 18+

### Instalar dependencias y ejecutar el proyecto.

Lo primero de todo, para instalar las dependencias es necesario lanzar el siguiente comando:

```
npm i
```

Luego para compilar y lanzar el proyecto, se usa el siguiente comando:

```
npm run dev
```

## Cómo se creó este proyecto

Este proyecto se creó desde cero usando compilación Vite. Pero también puedes crear un proyecto Vue básico sin esta herramienta, utilizando Vue cli. Las guías generales se incluyen en la [documentación de Vue cli](https://cli.vuejs.org/guide/creating-a-project.html#vue-create).

### Creación del proyecto con Vite

En primer lugar, decidimos utilizar Vite porque es una herramienta de compilación que proporciona una experiencia de desarrollo más rápida y sencilla. Consta de dos partes principales:

- un servidor de desarrollo que proporciona mejoras de funcionalidades sobre módulos ES nativos, por ejemplo Hot Module Replacement extremadamente rápido.
- un comando de compilación que empaqueta tu código con Rollup, preconfigurado para generar recursos estáticos altamente optimizados para producción.

Para crear un proyecto con Vite, sólo necesitas ejecutar este comando:

```
npm create vite@latest my-vue-app -- --template vue
```

### Vue Router

Para enrutar páginas, utilizamos [Vue Router]('https://router.vuejs.org/'), un enrutamiento expresivo, configurable y conveniente diseñado para Vue.

```
npm install vue-router@4
```

Después de agregarlo, lo configuramos, con los archivos de índice y rutas que puedes encontrar en la carpeta del enrutador dentro de src. También se agrega a la aplicación después de crearla en main.ts.

### SASS

Para diseñar el HTML utilizamos [SASS](https://sass-lang.com/). Lo hemos instalado a través de npm con el siguiente comando:

```
npm i -D sass
```

Hemos declarado variables globales en app.scss dentro de la carpeta assets y también breakpoints para responsive en el archivo de medias.scss. Por su parte, los mixins se encuentran dentro de la carpeta assets, en el archivo mixins.scss.

## Arquitectura inicial del Taller

### Páginas

Hemos decidido agregar las siguientes páginas:

- Inicio, la página principal
- TravelEdition, el formulario para crear o añadir un nuevo viaje.
- TravelList, la página donde se muestran todos los viajes.
- Página404, la página que se muestra si la ruta no existe.

### Components

Hemos añadido los siguientes componentes:

- TopBar, la barra que aparece en la parte superior de todas las páginas de la aplicación. Muestra el logo, el título y dos RouterLink que funcionan como opciones de menú.

- TravelDetail, el componente que contiene la "card" con la información de cada viaje.

## Paso a paso taller

### 1. Entendemos la arquitectura base

Al crear un proyecto de Vue con compilación Vite, al mismo nivel de src tenemos varios archivos de configuración:

- package.json, donde encontramos los diferentes paquetes a instalar que se usan en el proyecto.

- tsconfig.json, que actua de índice para los dos archivos siguientes.

- tsconfig.app.json, con las configuraciones del bundler y del linter, entre otras.

- tsconfig.node.json, con las configuraciones base de compilación

- vite.config.ts, la definición y configuración de Vite

El proyecto consta de los siguientes archivos:

- main.ts, en este archivo se crea la aplicación (si fuese necesario aquí se podrían añadir con 'use' diferentes librerías) y se monta.

- app.vue, aquí tenemos el contenido general para todas las vistas de nuestra aplicación. En nuestro caso hemos puesto una barra de navegación central TopBar que es común para todas y luego ya un RouterView que nos permitirá ir navegando entre páginas y mostrar su contenido.

- style.css, archivo general de estilos que nosotros hemos dejado vacío pero que se crea por defecto.

- vite-env.d.ts, archivo de tipo entorno de vue. Las variables que se declaran de entorno se accede a ellas con import.meta.env

- .env, nuestro propio archivo de entorno

- index.html, es el archivo html base que crea la aplicación para generarse. El contenido de nuestra aplicación irá sobre el div con id app, en el que se 'inyecta' nuestra App.vue.

Además tenemos las siguientes carpetas:

- assets, aquí tendremos almacenados los recursos de la aplicación. En nuestro caso están las imágenes y los scss, donde tendremos uno con variables generales, otro para las medias de responsive y otro para los mixins.

- components, aquí están los diferentes componentes. Por ahora tenemos, la TopBar que es la barra de navegación común a todas las páginas y el TravelDetail, que es la "card" del detalle de un viaje.

- router, en esta carpeta es donde configuramos el enrutamiento (en la siguiente sección lo explicamos con más detalle).

- views, aquí están las diferentes páginas de nuestra aplicación. Hemos creado una Home, una página de Error, otra para el formulario de edición/creación de viajes y una de listado de viajes.

Y por último, la estructura de un archivo Vue. Estos archivos tienen la extensión .vue y se componen de tres partes:

- script, donde se contiene el código Typescript.
- template, que contiene el código html
- style, que contiene o bien el código scss (en nuestro caso) o se declara el enlace al archivo que lo contenga.

Además en Vue 3 puedes utilizar la sintaxis de Composition API o de Options API para la parte del código Typescript. Si quieres entrar en más detalle te dejamos este enlace de la [Vue school](https://vueschool.io/articles/vuejs-tutorials/options-api-vs-composition-api). El caso, es que nosotros usamos Composition API (CAPI) así que los scripts se crean de la siguiente forma:

```vue
<script setup lang="ts">
//Aquí va nuestro código
</script>
```

Otra peculiaridad que puedes encontrar es que nuestros archivos style, los hemos codificado como scoped, esto quiere decir que su CSS se aplicará únicamente a los elementos del componente actual.

```vue
<style lang="scss" scoped>
// Aquí tu código scss
<style>
```

### 2. Como funciona el enrutamiento

En el caso de Vue, utilizamos [vue-router](https://router.vuejs.org/) por lo que tenemos un archivo index.ts y un archivo routes.ts.

Dentro del archivo index.ts creamos el router añadiendo la opción de historia: createWebHistory. Esto nos permite que la url cambie cuando navegamos y también poder navegar escribiendo una url en el navegador.

Además antes de navegar a cada página, buscamos si tiene algún título definido en su ruta, para ponerlo en la pestaña del navegador. En el archivo rutas, creamos las diferentes rutas que tendrá nuestra aplicación. Si te fijas, cada ruta consta de la siguiente información: path, name, component (cual es la página enlazada con esa ruta) e información de tipo meta que en nustro caso solo contiene el título.

Por ahora, sólo tenemos codificada la navegación de la barra superior, TopBar, y lo hemos hecho usando la etiqueta RouterLink en lugar de utilizar etiquetas `<a>` normales. Esto permite a Vue Router cambiar la URL sin recargar la página, manejar la generación de URL, la codificación y varias otras funciones. Lo único que necesita es una url válida en la propiedad "to" (una url que se corresponda con una de las que configuramos en el archivo rutas).

```vue
<RouterLink to="/travels" class="top-bar__menu-option">
  Travels List
</RouterLink>
```

### 3. Añade funcionalidad a los botones de la Home

Comenzamos con algo sencillo, como hemos visto antes podríamos enlazar desde la Home tanto la pantalla del listado de viajes, como la de añadir uno nuevo con un elemento de tipo <RouterLink>, pero como lo que queremos es que sea un botón y que tenga esta apariencia, vamos a usar un botón. ¿Te preguntas por qué? Pues porque simplemente es un detalle que mejora la accesibilidad web.

En este taller no tenemos mucho tiempo para profundizar en los fundamentos de la accesibilidad web, pero te recomendamos encarecidamente que le dediques un tiempo, si no los conoces. Personalmente nos gustan mucho los recursos de [Olga Carreras](https://olgacarreras.blogspot.com/).

Vamos con el paso a paso de hacer funcionar el botón "Ver viajes":

1. En primer lugar necesitamos que el botón detecte el evento click. En Vue los eventos se vinculan con los diferentes elementos gracias a la sintaxis '@nombreEvento'. Así que simplemente añadimos un @click en el que declaramos el nombre del método y el parámetro que queremos:

```vue
<button class="home__actions-btn" @click="goTo('list')">Ver viajes</button>
```

2. Ahora necesitamos crear ese método dentro de nuestro script, para ello declaramos nuestro método como una const y seguimos la sintaxis de Typescript:

```typescript
const goTo = (page: string) => console.log('navegamos a ', page);
```

3. Si ejecutamos ahora nuestra aplicación podremos ver por consola el mensaje que hemos escrito cuando hacemos click en el botón.

4. Ahora vamos a crear un enumerado con las rutas apropiadas según el parámetro que pasemos. Esto puede ser un dato que se use en varias pantallas o componentes, así que lo mejor será crearlo en un sitio compartido. Así que a nivel de src, vamos a crear la carpeta data y dentro el archivo Urls.ts. En el crearemos el enumerado de strings:

```typescript
export enum URLS {
  LIST = '/travels',
  EDIT = '/travel-edit/',
  ADD = '/travel-edit/0',
  HOME = '/',
}
```

El siguiente paso es importarlo en nuestra página Home. También necesitaremos importar el router de nuestro proyecto:

```typescript
import { URLS } from '../data/AppUrls';
import router from '../router';
```

5. Ahora modificaremos nuestro método goTo para hacer un push al router de la ruta específica del enumerado. Esto se hace así:

```typescript
const goTo = (url: string) => {
  router.push(url);
};
```

6. Ahora vamos a añadir el evento click al otro botón, con su enumerado específico (acuerdate de modificar el 'list' del otro botón por un valor correcto del enumerado):

```html
<button class="home__actions-secondary-btn" @click="goTo(URLS.ADD)">
  Nuevo viaje
</button>
```

7. El archivo Home.vue al final nos quedará así:

```vue
<script setup lang="ts">
import { URLS } from '../data/AppUrls';
import router from '../router';

const goTo = (pageKey: string) => {
  router.push(url);
};
</script>

<template>
  <div class="home">
    <img
      class="home__image"
      src="../assets/images/Pulpi-Vue.png"
      alt="logo de vue sobre el pulpo de la pulpoconf"
    />

    <q class="home__quote">La vida, o es una aventura o no es nada</q>
    <p class="home__subquote">Hellen Keller</p>

    <div class="home__actions">
      <button class="home__actions-secondary-btn" @click="goTo(URLS.ADD)">
        Nuevo viaje
      </button>
      <button class="home__actions-btn" @click="goTo(URLS.LIST)">
        Ver viajes
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/mixins';

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xl);
  margin-top: var(--space-xl);

  &__actions {
    display: flex;
    gap: var(--space-lg);
  }

  &__actions-btn {
    @include buttonStyle();
  }

  &__actions-secondary-btn {
    @include secondaryButton();
  }

  &__image {
    width: 20rem;
  }

  &__quote {
    font-size: var(--text-xl);
    font-weight: var(--text-bold);
    color: var(--light-green);
  }

  &__subquote {
    font-size: var(--text-md);
    font-weight: var(--text-bold);
    color: var(--dark-green);
  }
}
</style>
```

### 4. Vincula el listado con datos almacenados en frontend

Lo primero de todo, vamos a ver que tenemos en el listado. Partimos de que llamamos al componente TravelDetail en el siguiente código:

```html
<div class="travel-list__wrapper">
  <TravelDetail></TravelDetail>
</div>
```

Si vemos el componente TravelDetail veremos que tenemos en el html introducidos los datos, "a piñón". Así que lo primero que vamos a hacer es crearnos un archivo con los datos de inicio, los cuales vamos a tipar. Así que vamos a comenzar por añadir a nivel de src, dos carpetas: data y types. Dentro de ambos añadimos dos archivos que se puedes llamar igual Travel.ts. En el de types, creamos la siguiente interfaz:

```typescript
export interface ITravel {
  id: number;
  country?: string;
  description?: string;
  city: string;
  date: Date;
  image?: string;
}
```

Luego en el de data, añadimos el siguiente array con los datos del viaje que tenemos en TravelDetail:

```typescript
export const myTravels: ITravel[] = [
  {
    id: 1,
    country: 'EEUU',
    description: `Viaje sorpresa a Nueva York en Enero para descubrir la ciudad. En el
        viaje no nos nevó y pudimos visitar varios museos: el de Ciencias
        Naturales, el MOMA, el MET. También pudimos ver la Estatua de La
        Libertad e ir de compras.`,
    city: 'Nueva York',
    date: new Date('2020-01-21'),
    image: 'src/assets/images/city.webp',
  },
];
```

El siguiente paso es vincular los datos del objeto con los campos del HTML. Así que primero (momentáneamente porque luego los vamos a traer del listado), importamos el objeto desde el archivo ts. Vamos a crear una variable que contenga el primer viaje de nuestro listado y también una con la fecha formateada. Para formatear la fecha voy a usar el toLocaleString, pero si quieres seguir profundizando en Vue, hay una librería que provee de muchas utilidades y es específica para Vue. Se trata de [VueUse]('https://vueuse.org/shared/useDateFormat/').

Total que la parte del script de Typescript queda así:

```vue
<script setup lang="ts">
import { myTravels } from '../../data/Travel';
import { ITravel } from '../../types/Travel';

const currentTravel: ITravel = myTravels[0];

const currentTravelDate = currentTravel.date.toLocaleString('es-ES');
</script>
```

Ahora ya sólo nos queda vincular el HTML con los datos del Typescript y como sabrás, cada framework tiene su sintaxis. En el caso de Vue, podemos hacerlo de dos formas:

- Si queremos añadir a una prop de un objeto, una referencia al typescript hay que ponerle dos puntos a esa propiedad, tal que así:

```html
<img
  alt="imagen de viaje"
  class="travel-detail__image"
  :src="currentTravel.image"
/>
```

- Si queremos añadirlo dentro del html como texto, se haría con esta estructura:

```html
<span>{{ currentTravel.country }}</span>
```

Con esto ya puedes completar todas las propiedades. Si ejecutas, verás que no ha cambiado la visualización pero ahora ya está cogiendo los datos del objeto. De todas formas, realmente no lo podemos dejar así, sino que TravelDetail deberá recibir los datos mediante una propiedad, para poder reusarlo con cada viaje.

La template quedará así:

```vue
<template>
  <div class="travel-detail">
    <div class="travel-detail__actions">
      <button class="travel-detail__actions-edit" @click="onEdit">Edit</button>
    </div>

    <img
      alt="imagen de viaje"
      class="travel-detail__image"
      :src="currentTravel.image"
    />

    <div class="travel-detail__text-wrapper">
      <span class="travel-detail__main-text">Country:</span>
      <span>{{ currentTravel.country }}</span>
    </div>

    <div class="travel-detail__text-wrapper">
      <span class="travel-detail__main-text">City:</span>
      <span>{{ currentTravel.city }}</span>
    </div>

    <div class="travel-detail__text-wrapper">
      <span class="travel-detail__main-text">Date:</span>
      <span>{{ currentTravelDate }}</span>
    </div>

    <div
      class="travel-detail__text-wrapper travel-detail__text-wrapper--description"
    >
      <span class="travel-detail__main-text">Description:</span>
      <span>{{ currentTravel.description }}</span>
    </div>
  </div>
</template>
```

Así que vamos a definirle las propiedades que va a recibir. En Vue podemos definir en cada componente una interfaz que contenga propiedades que pueden ser requeridas o no y también una propiedad que sea el "modelo". Todas las propiedades son reactivas y van a estar siempre "escuchando" los cambios que les llegan desde el padre, pero el modelo a su vez cuando lo definamos va a emitir un update de forma automática.

Te pongo aquí el código final de la parte del script de TravelDetail y ahora te lo explico:

```vue
<script setup lang="ts">
import { myTravels } from '../../data/Travel';
import { ITravel } from '../../types/Travel';
import { computed, withDefaults, defineProps, defineModel } from 'vue';

interface TravelDetail {
  modelValue: ITravel;

  tag?: string;
}

const props = withDefaults(defineProps<TravelDetail>(), {
  tag: 'Soy una tag',
});

const currentTravel = defineModel<ITravel>({ required: true });

const currentTravelDate = computed(
  () => currentTravel.value.date.toLocaleString('es-ES').split(',')[0]
);
</script>
```

Lo primero que tenemos es una interfaz que recibe como modelo el objeto de tipo Itravel y una propiedad nullable que he llamado tag.

La siguiente línea declara las props, y lo que hace es además decirle que le vamos a pasar un valor default a las propiedades nullables, en nuestro caso la tag. Fíjate que tanto withDefaults, como defineProps son ya utilidades que nos provee Vue.

Después lo que hacemos es definir el modelo al que llamamos currentTravel, que era el nombre de nuestra anterior constante, así no tocamos el html. También usamos la utilidad defineModel de Vue, a la que le especificamos el tipo y que va a ser requerida. [Más info aquí](https://vuejs.org/guide/components/v-model.html).

También podrás tener más de un model-value por componente, pero eso para un taller más avanzado.

Ahora lo que necesitamos es que la propiedad de fecha también cambie cuando cambie el objeto viaje que recibe este componente. Vue tiene dos tipos de variables reactivas: las ref, que son aquellas propiedades que usaremos como reactivas pero que mutaremos nosotros (ya las usaremos más adelante) y las computed, como en este caso, que se asemejan a los getters de otros lenguajes. [Mas info aquí](https://vuejs.org/api/reactivity-core.html);

También voy a añadir la tag para visualizarla y que veas que no te engaño en el html:

```html
<div class="travel-detail__text-wrapper">
  <span class="travel-detail__chip">{{ tag }}</span>
</div>
```

Y este SCSS:

```scss
&__chip {
  background-color: var(--yellow);
  border-radius: 2em;
  padding: var(--space-sm);
}
```

Ahora nos falta pasarle el viaje concreto al componente desde el TravelList.vue y además necesitamos usar un bucle. Así que vamos a necesitar sintaxis específica de Vue:

- Los bucles se usan con v-for"objeto in listado" y siempre necesitan una propiedad :key única.
- Los modelValue se le pasan como :modelValue y el resto de props o bien como habitualmente si son de tipo texto o con los dos puntos si queremos pasar un valor desde el typescript.

Con todo ello lo que vamos a necesitar aquí en el Typescript es importar nuestros archivos data y types, y luego en el template crear el bucle de viajes y pasarle las propiedades:

```vue
<script setup lang="ts">
import { TravelDetail } from '../components/TravelDetail';
import { myTravels } from '../data/Travel';
import { ITravel } from '../types/Travel';
</script>

<template>
  <div class="travel-list">
    <button class="travel-list__add">New Travel</button>

    <div class="travel-list__wrapper">
      <div
        class="travel-list__travel"
        v-for="travel in myTravels"
        :key="travel.id"
      >
        <TravelDetail :modelValue="travel" tag="viaje realizado"></TravelDetail>
      </div>
    </div>
  </div>
</template>
```

Con esto si ejecutas verás que ya funciona a la perfección. Pruébalo añadiendo un nuevo viaje al archivo data.

### 5. Vamos a añadir lógica y validaciones al formulario.

Comenzamos en la View TravelEdition.vue. Lo idóneo es que tuviésemos el formulario en otro componente aparte, pero para este taller vamos a simplificar y dejarlo en la misma vista. Lo primero que vamos a necesitar son variables en las que guardar los datos del formulario, así que voy a crear un objeto de tipo IDate que se inicializará con un valor por defecto vacío y también un tipo de viaje. Así que antes de nada voy a crear en el archivo src/data/Travel, un objeto ITravel vacío:

```typescript
export const defaultTravel: ITravel = {
  id: 0,
  country: '',
  description: '',
  city: '',
  date: new Date(),
  image: '',
};
```

En Vue, las propiedades que van a cambiar son propiedades reactivas y se declaran como 'ref'. Así que voy a crear mi propiedad currentTravel y currentType.

```typescript
const currentTravel = ref<ITravel>(structuredClone(defaultTravel));

const currentType = ref('');
```

Si te fijas, he añadido el structureClone para crear una copia de un objeto pero sin que quede vinculado al original. Ahora, el siguiente paso es ir vinculando los diferentes campos del formulario con el valor del objeto. Esto se realizada utilizando la propiedad v-model, que indica a la etiqueta html cual es la propiedad modelo a usar. Vamos a hacerlo en todas, salvo en el combo:

```html
<div class="travel-edit__row">
  <label for="country">País:</label>

  <input
    v-model="currentTravel.country"
    class="travel-edit__row-field"
    type="text"
    id="country"
    name="country"
  />
</div>

<div class="travel-edit__row">
  <label for="city">Ciudad:</label>

  <input
    v-model="currentTravel.city"
    class="travel-edit__row-field"
    type="text"
    id="city"
    name="city"
  />
</div>

<div class="travel-edit__row">
  <label for="date">Fecha:</label>

  <input
    v-model="currentTravel.date"
    class="travel-edit__row-field"
    type="date"
    id="date"
    name="date"
  />
</div>

<div class="travel-edit__row">
  <label for="description">Descripción:</label>

  <textarea
    v-model="currentTravel.description"
    class="travel-edit__row-field"
    type="text"
    id="description"
    name="description"
    rows="20"
  ></textarea>
</div>
```

Ahora que las tenemos todas, vamos a pensar... ¿qué necesitamos hacer con el combo? Por un lado, no es una propiedad que se guarde en el objeto, el tipo de viaje, sino que es una propiedad que sirve para saber que tipo de foto asociar: playa, campo o ciudad. Así que vamos a vincularla con la propiedad currentType que hemos creado, con v-model. Esta parte no entraña ninguna complejidad, pero y ¿las opciones?

Pues lo primero es crear un tipo para el objeto opción, así que vamos a src/types y creamos el archivo General.ts con la siguiente interfaz:

```typescript
export interface ComboboxOption {
  id: string;
  value: string;
}
```

Y vamos a crear nuestras opciones en el archivo src/data/Travel.ts, (no te olvides de importar correctamente la nueva interfaz):

```typescript
export const TravelTypeOptions: ComboboxOption[] = [
  {
    id: 'city',
    value: 'Cultural',
  },
  {
    id: 'nature',
    value: 'Naturaleza salvaje',
  },
  {
    id: 'beach',
    value: 'Desconexión relax',
  },
];
```

Ahora que ya las tenemos, vamos a importarlas en nuestra vista TravelEdition:

```typescript
import { defaultTravel, TravelTypeOptions } from '../data/Travel';
```

Y lo que necesitamos es tener un bucle para cargar las opciones, sería un bucle for, que en el caso de Vue usa la sintaxis :v-for="elemento in listado" y también requiere pasarle a la etiqueta html una propiedad key única. Además debemos decirle a la option que ahora su value será el id de la option que toque, esto sería vinculando con los dos puntos como hemos visto antes de esta forma :value="option.id".

```html
<div class="travel-edit__row">
  <label for="type">Tipo de viaje:</label>

  <select v-model="currentType" class="travel-edit__row-field" name="select">
    <option
      v-for="option in TravelTypeOptions"
      :key="option.id"
      :value="option.id"
    >
      {{ option.value }}
    </option>
  </select>
</div>
```

Supuestamente ya tenemos vinculados los distintos campos con el formulario pero ¿cómo lo comprobamos? Pues vamos a añadir "funcionalidad" a los botones. En Vue para vincular los eventos de los inputs se utiliza la @, de forma que para indicar que el click de un botón haga una determinada acción usamos el @click="nombreDeMiMetodo".

Tenemos que tener también la precaución de sacar los botones del formulario para que no tomen las acciones por defecto de HTML. Así que los pongo en un nuevo div fuera del form y actualizo los estilos.

```vue
<template>
  <div class="travel-edit">
    <form class="travel-edit__form">
      //Aquí todo el contenido que ya tenías, salvo los botones
    </form>

    <div class="travel-edit__actions">
      <button
        class="travel-edit__actions-secondary-btn"
        type="reset"
        @click="onCancel"
      >
        Cancelar
      </button>

      <button class="travel-edit__actions-btn" @click="onSave">Guardar</button>
    </div>
  </div>
</template>
```

Así que ya solo nos queda crear esas funciones en nuestro typescript:

```typescript
const onCancel = () => console.log('he cancelado');

const onSave = () =>
  console.log(
    'he actualizado el viaje a',
    currentTravel.value,
    currentType.value
  );
```

Ahora si lo pruebas, verás que al apretar alguno de los dos botones, tenemos la funcionalidad que esperamos. ¿Has visto algo más por consola? ¿Quizas un warning de que hay un tipo que no concuerda?

Se trata de nuestro input de tipo Date, que está esperando un string pero nuestra fecha es un objeto tipo Date. Lo que vamos a necesitar es convertirla a string y almacenarlo en una nueva variable de tipo ref, para que pueda actualizarse por nuestro formulario. Así que también necesitaremos que cuando nuestra vista esté montada, se calcule. Esto se hace gracias al método del ciclo de vida onMounted de Vue.

```typescript
const currentDateString = ref('');

onMounted(() => formatTravelDate(currentTravel.value.date));

const formatTravelDate = (newDate: Date) =>
  (currentDateString.value = newDate.toISOString().split('T')[0]);
```

Pero ¿si el objeto del viaje cambia mientras estamos editando, como sabrá esta propiedad que debe recalcularse? Pues no lo sabe, así que vamos a tener que escuchar los cambios que sufra. Esto en Vue, se hace con watchers y se escriben así:

```typescript
watch(
  () => currentTravel.value.date,
  (newValue: Date) => formatTravelDate(newValue)
);
```

Por último, vamos a vincular el input con esta nueva propiedad currentDateString:

```html
<div class="travel-edit__row">
  <label for="date">Fecha:</label>

  <input
    v-model="currentDateString"
    class="travel-edit__row-field"
    type="date"
    id="date"
    name="date"
  />
</div>
```

Ahora si quieres, puedes añadir el currentDateString.value al console.log del método onSave y probar que además de desaparecer el error se están "almacenando", los datos.

Pero, ¿no sería interesante tener validaciones? ¿Cómo las hacemos en Vue? Pues una de las formas más sencillas es ayudarnos de Vee-validate y Yup. El ejemplo más claro nos lo muestra su [documentación oficial](https://vee-validate.logaretm.com/v4/guide/composition-api/handling-forms/).

El primer paso es instalar tanto Vee-Validate como Yup, así que lanzamos los siguientes comandos por la terminal:

```
npm i vee-validate --save
npm i yup
```

Ahora que ya lo tenemos instalado todo, vamos a decidir que validaciones ponemos. Las esenciales serían las de campos obligatorios que en nuestro caso en el objeto tenemos que deben ser la fecha y la ciudad. Añadiremos también el tipo y vamos a probar a poner que la ciudad necesite al menos 3 caracteres.

Así que vamos a importar Vee-validate y Yup. Luego vamos a declarar el useForm y crear el schema de nuestra validación, dentro del TypeScript de nuestro TravelEdition.vue:

```typescript
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const { errors, meta, defineField } = useForm({
  validationSchema: yup.object({
    currentType: yup.string().required(),
    currentDateString: yup.string().required(),
    currentCity: yup.string().min(3).required(),
  }),
});

const [currentType, currentTypeAttrs] = defineField('currentType');

const [currentDateString, currentDateStringAttrs] =
  defineField('currentDateString');

const [currentCity, currentCityAttrs] = defineField('currentCity');
```

Vale por ahora solo le hemos dicho que tipo de validaciones queremos y sobre que campos, siguiendo la documentación oficial de Vue. Lo primero de todo te darás cuenta de que tienes que eliminar las variables de tipo ref que habíamos creado antes para currentType y currenDateString o te dirá el editor de código que están repetidas.

El siguiente paso es calcular el valor de currentCity porque tenemos que asociarle el que nos venga en el objeto. Para ello, vamos a adaptar tanto el onMounted como el watch,para que actualizen tanto la fecha como la ciudad:

```typescript
onMounted(() => initializeValues(currentTravel.value));

const initializeValues = (newTravel: ITravel) => {
  currentCity.value = newTravel.city;
  currentDateString.value = newTravel.date.toISOString().split('T')[0];
};

watch(
  () => currentTravel.value,
  (newValue: ITravel) => initializeValues(newValue)
);
```

El siguiente paso es vincular nuestros inputs con las validaciones de Vue, para eso necesitan que les añadamos una propiedad v-bind="nombreDeLosAtributos", por ejemplo:

```html
<label for="type">Tipo de viaje*:</label>
<select
  v-model="currentType"
  v-bind="currentTypeAttrs"
  class="travel-edit__row-field"
  name="select"
>
  <option
    v-for="option in TravelTypeOptions"
    :key="option.id"
    :value="option.id"
  >
    {{ option.value }}
  </option>
</select>
```

Como ves, también he aprovechado a ponerles el \* de obligatorio a la label. Hazlo para los tres y asegúrate también de cambiar el v-model a la city, para que su valor sea currentCity.

Además para enterarnos de que hay errores, vamos a poner debajo de los botones un mensaje de texto que sólo se muestre si hay errores. Para esto usaremos la sintaxis de condicionales que en Vue es tan fácil como v-if="miCondición":

```html
<span v-if="hasErrors" class="travel-edit__error">
  Completa los campos obligatorios
</span>
```

Ahora necesitamos crear la variable hasErrors, que debería ser un getter y si te acuerdas eso se hacía con variables computadas. En nuestro caso será:

```typescript
const hasErrors = computed(() => Object.keys(errors.value).length);
```

De paso, crearemos la clase \_\_error, que tenga color y border-color(porque la aprovecharemos para los componentes) de valor "red":

```scss
&__error {
  color: red;
  border-color: red;
}
```

Para aplicar esta clase a nuestros tres elementos vamos a cambiar su clase, y necesitamos que sea una clase que cambie dependiendo de si tiene errores o no. Así que la vamos a calcular con un método y vincularla al atributo class usando los :

```html
<select
  v-model="currentType"
  v-bind="currentTypeAttrs"
  :class="getInputClass('currentType')"
  name="select"
></select>
```

Creamos ahora el método getInputClass tal que así:

```typescript
const getInputClass = (fieldName: string) => ({
  'travel-edit__row-field': true,
  'travel-edit__error':
    meta.value.touched && errors.value && errors.value[fieldName],
});
```

Este método siempre nos devolverá la clase base y las error sólo si el meta está touched (es decir hemos tocado los campos con validación) y si existen errores asociados a ese campo. Recuerda que tanto meta, como errors son las constantes que nos devuelve useForm de Vee-validate.

Ahora ya puedes probarlo, verás como salen los errores y se marcan en rojo los campos que no están rellenados.

Antes de terminar, a mí me gusta siempre bloquear el botón Guardar, si el formulario no es válido. Esto sería tan sencillo como pasarle al botón la propiedad disabled si el meta del useForm no es válido:

```html
<button
  class="travel-edit__actions-btn"
  :disabled="!meta.valid"
  @click="onSave"
>
  Guardar
</button>
```

Y para que se distinga que el botón está deshabilitado añadimos los estilos de disabled a los del actions-btn:

```scss
&__actions-btn {
  @include buttonStyle();

  &:disabled {
    background-color: var(--disabled-color);
    border-color: var(--disabled-color);
    color: white;
  }
}
```

### 6. ¿Y si queremos editar? Vincula con los datos recibidos.

Antes de comenzar a vincular el formulario con los datos recibidos... ¿No estaría bien tener los datos almacenados en el frontend durante la sesión? Pues eso en Vue, lo podemos hacer con los Stores y una forma sencilla de implementarloes en con [Pinia](https://pinia.vuejs.org/core-concepts/).

Así que lo primero es instalar Pinia:

```
npm install pinia
```

Luego debemos instanciarla en el main.ts

```typescript
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

import './assets/scss/app.scss';

const pinia = createPinia();

export const app = createApp(App);

app.use(router).use(pinia).mount('#app');
```

Y ya podemos crear nuestro store. Creamos la carpeta src/store y dentro el archivo Travel.ts. En él simplemente tendremos que definir un store como:

```typescript
import { defineStore } from 'pinia';

export const useTravelStore = defineStore('travel', () => {
  //Aquí las variables y métodos que queramos
  return {};
});
```

En nuestro caso lo que vamos a hacer es generar una variable de tipo ref que almacene los viajes, llamada \_travelList y una computada que devuelva la anterior llamada travelList. Además de los métodos para añadir un viaje nuevo y devolver un viaje por id de viaje.

```typescript
import { defineStore } from 'pinia';
import { myTravels } from '../data/Travel';
import { ITravel } from '../types/Travel';
import { computed, ref } from 'vue';

export const useTravelStore = defineStore('travel', () => {
  const _travelList = ref(structuredClone(myTravels));

  const travelList = computed(() => _travelList.value);

  const addTravel = (currentTravel: ITravel) => {
    const maxTravelIndex = Math.max.apply(
      null,
      _travelList.value.map((travel) => travel.id)
    );

    currentTravel.id = maxTravelIndex + 1;

    _travelList.value.push(currentTravel);
  };

  const getTravelById = (travelId: number): ITravel | undefined =>
    _travelList.value.find((travel) => travel.id === travelId);

  return {
    travelList,
    addTravel,
    getTravelById,
  };
});
```

Una vez que ya lo tenemos, vamos a usarlo. En primer lugar nos vamos al listado de viajes, src/views/TravelList.vue y aquí en lugar de importar los viajes del archivo data, nos lo vamos a traer del store. Esto se hace instanciando el store y luego en una computada, para que siempre esté a la escucha de cambios, devolviendo el listado del store:

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { TravelDetail } from '../components/TravelDetail';
import { useTravelStore } from '../store/Travel';

const useTravel = useTravelStore();

const myTravels = computed(() => useTravel.travelList);
</script>
```

Como el nombre del listado no lo hemos tocado, el HTML no sufre ningún cambio. Ahora lo que queremos es poder editar un viaje, para eso en src/components/TravelDetail.vue tenemos que añadirle funcionalidad al botón Editar. Será similar a lo que hicimos en la home, llamar al router y hacerle push de la ruta de editar pero con el id que corresponda.

```typescript
import router from '../../router';
import { URLS } from '../../data/AppUrls';

const onEdit = () => router.push(`${URLS.EDIT}${currentTravel.value.id}`);
```

Y el botón quedaría así:

```html
<button class="travel-detail__actions-edit" @click="onEdit">Edit</button>
```

Por último tenemos que modificar la vista del formulario para que en lugar de inicializar siempre un viaje vacío, tome el que corresponda. Para eso, lo que hacemos es importar por un lado el useRoute de vue-router y el store que hemos creado. También instanciamos el store y el useRoute. En el onMounted vamos a cambiar nuestro contenido.

Ahora lo que necesitamos es tomar el id que pasamos como parámetro en la ruta esto lo tenemos dentro de route.params.id, nos vendrá como un string que deberemos parsear a Number. Una vez con él, podemos buscar en el store este viaje (si el id es mayor de 0), sino inicializamos el viaje por defecto como hacíamos antes. Lo siguiente es inicializar los valores como ya habíamos hecho.

```typescript
import { useRoute } from 'vue-router';
import { useTravelStore } from '../store/Travel';

const useTravel = useTravelStore();
const route = useRoute();

onMounted(() => {
  const currentId = Number(route.params.id as string);

  getTravel(currentId);
});

const getTravel = (currentId: number) => {
  let travelFromList = structuredClone(defaultTravel);

  if (currentId > 0) {
    travelFromList = useTravel.getTravelById(currentId) ?? travelFromList;
  }
  currentTravel.value = travelFromList;

  initializeValues(currentTravel.value);
};
```

Ahora el último paso es eliminar el watch que teníamos escuchando por el currentTravel, ya que ya no nos hace falta porque cada vez que navegue en el onMounted cargaremos unos datos u otros. Pero además observarás que momentaneamente, nuestro currentTravel puede ser undefined hasta que el onMounted termine, es por eso que como en el form estamos accediendo a él, vamos a decirle que se muestre solo si tiene datos, esto se hace con un v-if

```html
<form v-if="currentTravel" class="travel-edit__form"></form>
```

Si lo ejecutas, comprobarás que se levanta sin problemas pero no se rellena el tipo de viaje ¿por qué?. Pues porque es un campo calculado que depende de la imagen que tengamos cargada, así que vamos a tener que calcularlo en el initializeValues.

La forma "fácil" es tomar la ruta de la imagen y como el tipo corresponde con el nombre, quitamos la parte de la ruta relativa y también la extensión y nos quedamos sólo con el string del tipo:

```typescript
const initializeValues = (newTravel: ITravel) => {
  currentCity.value = newTravel.city;
  currentDateString.value = newTravel.date.toISOString().split('T')[0];
  currentType.value = newTravel.image
    ? newTravel.image.replace('src/assets/images/', '').replace('.webp', '')
    : '';
};
```

Con esto ya estás visualizando todos tus datos.

### 7. Crea la funcionalidad de guardar cambios.

Te estarás planteando, cómo Vue es reactivo si yo edito un campo del objeto Viaje, ya se guardará. Sí, esto es así, pero no olvides que estamos transformando ciertos campos para el formulario, así que tenemos que asegurarnos de que esta información también se guarda en el objeto. Para ello vamos a hacer lo siguiente, en el método click del botón de guardar vamos a decirle que si no tenemos errores nos actualize los datos:

```typescript
const onSave = () => {
  if (!errors.value.length && currentTravel.value) {
    updateData();
  }
};
```

Este updateData, calculará los valores para ciudad, fecha e imagen tanto si es editar como añadir. Además nos interesa también poder añadir un nuevo viaje al listado, por lo que tendremos que llamar al método añadir del store.

```typescript
const updateData = () => {
  if (currentTravel.value) {
    currentTravel.value.image = `src/assets/images/${currentType.value}.webp`;
    currentTravel.value.city = currentCity.value;
    currentTravel.value.date = new Date(currentDateString.value);

    currentTravel.value.id === 0 && useTravel.addTravel(currentTravel.value);
  }
};
```

Por último, nos gustaría que al añadir/editar volviese la página al listado, así que deberemos de nuevo trabajar con el router.push... pero ¿para qué repetir código?. Así que vamos a ir a la home, coger el método de goTo y llevarlo a un helper.

Creamos el archivo src/helpers/routes.ts y le añadimos el siguiente código:

```typescript
import { URLS } from '../data/AppUrls';
import router from '../router';

export const navigateTo = (url: string) => {
  router.push(url);
};
```

y el script del archivo Home.vue nos quedará así:

```vue
<script setup lang="ts">
import { navigateTo } from '../helpers/routes';

const goTo = (pageUrl: string) => navigateTo(pageUrl);
</script>
```

Ahora ya podemos aprovechar ese método navigateTo en nuestro formulario, modificamos el onSave para añadirlo:

```typescript
const onSave = () => {
  if (!errors.value.length && currentTravel.value) {
    updateData();
    navigateTo(URLS.LIST);
  }
};
```

### 8. Crea la funcionalidad de cancelar cambios.

Antes comentábamos que Vue es reactivo, así que si editas un viaje y modificas uno de los campos no calculados como por ejemplo la descripción y luego navegas a la lista de viajes... ¿qué ocurre? Pues que el cambio se ha guardado sin dar a guardar. Esto es algo que nosotros no queremos, porque queremos dar la opción de cancelar cambios o simplemente de navegar fuera y perderlos.

Empecemos porque no se guarden los cambios hasta que demos al botón. Esto es tan fácil como desvincular el objeto que editamos del que tenemos en el listado y lo vamos a conseguir modificando el método getTravel de nuestro src/views/TravelEdition.vue. Lo que vamos a hacer es crear una nueva constante de tipo ref que se llamará travelFromList:

```typescript
const travelFromList = ref<ITravel>();
```

Luego vamos a tomar el viaje que recibimos del store y guardarlo aquí y antes de asignarlo al currentTravel vamos a usar Object.assign para hacer una clonación y no una copia enlazada:

```typescript
const getTravel = (currentId: number) => {
  travelFromList.value = structuredClone(defaultTravel);

  if (currentId > 0) {
    travelFromList.value =
      useTravel.getTravelById(currentId) ?? travelFromList.value;
  }
  currentTravel.value = Object.assign({}, travelFromList.value);

  initializeValues(currentTravel.value);
};
```

Con esto si pruebas a cambiar de nuevo la descripción y navegar al listado verás que no hay problema alguno. Así que vamos a por el último paso, la función de cancelar cambios. Queremos que se borren los cambios y aparezca el objeto como al inicio, así que lo que tenemos que hacer es volver a clonar nuestro travelFromList en nuestro currentTravel, y calcular de nuevo los valores calculados:

```typescript
const onCancel = () => {
  currentTravel.value = Object.assign({}, travelFromList.value);
  initializeValues(currentTravel.value);
};
```

Pero ahora si probamos, cuando editamos los cambios no se están guardando, porque hemos perdido esa reactividad que teníamos. De mano, esto no tiene porque ser malo y se soluciona muy fácil. Vamos al src/store/Travel.ts y creamos un método de editar:

```typescript
const editTravel = (currentTravel: ITravel) => {
  const travelToEditIndex = _travelList.value.findIndex(
    (travel) => travel.id === currentTravel.id
  );
  _travelList.value[travelToEditIndex] = currentTravel;
};
```

Ahora modificamos nuestro método updateData de src/views/TravelEdition.vue, para que llame a editar cuando proceda:

```typescript
const updateData = () => {
  if (currentTravel.value) {
    currentTravel.value.image = `src/assets/images/${currentType.value}.webp`;
    currentTravel.value.city = currentCity.value;
    currentTravel.value.date = new Date(currentDateString.value);

    currentTravel.value.id === 0
      ? useTravel.addTravel(currentTravel.value)
      : useTravel.editTravel(currentTravel.value);
  }
};
```

Y con esto, todo listo!

### 9. ¿Qué nos falta?

Pues este ejemplo no estaría listo para desplegar sin que añadamos varios puntos indispensables:

- Testing, lo suyo sería añadir tests tanto unitarios como end-to-end para asegurar el correcto funcionamiento. No nos vamos a meter aquí porque sobre todo, tienes a continuación el pulpoCon un taller muy interesante sobre ello.
- Revisar la accesibilidad y añadir las ARIAs necesarias. Te recomendamos encarecidamente que le dediques un tiempo.

Además de la parte de Vue, algo muy interesante que puedes mirarte y que puede que uses mucho en aplicaciones algo más complejas son los Composables, que permiten compartir funcionalidad más compleja entre componentes o vistas. Tienes aquí la [documentación oficial](https://vuejs.org/guide/reusability/composables)
