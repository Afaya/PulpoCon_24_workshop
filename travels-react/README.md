# Travels-react

Este es el proyecto React creado para el Taller PulpoCon2024. Es muy similar a sus otros "hermanos", hechos con Angular y Vue, por lo que puedes tener una base muy sencilla para seguir el taller.

## Introducción

[documentación oficial](https://es.react.dev/)

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

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

Además puedes usar otros comandos:

- Compilar proyecto --> `npm run build`
- Iniciar proyecto --> `npm start`

## Cómo se creó este proyecto

Lo hemos creado con Next.js para lo que utilizamos el siguiente comando:
`npx create-next-app@latest`

Luego a las siguientes preguntas vamos respondiendo lo siguiente:

    - Pregunta:
    ```text
        Need to install the following packages:
        create-next-app@14.2.5
        Ok to proceed? (y)
    ```
    - Respuesta: y

    - Pregunta:
    ```text
        ? What is your project named? » my-app
    ```
    - Respuesta: travels-react

    - Pregunta:
    ```text
        ? Would you like to use TypeScript? » No / Yes
    ```
    - Respuesta: selecciona yes

    - Pregunta:
    ```text
        ? Would you like to use ESLint? » No / Yes
    ```
    - Respuesta: selecciona yes

    - Pregunta:
    ```text
        ? Would you like to use Tailwind CSS? » No / Yes
    ```
    - Respuesta: selecciona No

    - Pregunta:
    ```text
        ? Would you like to use `src/` directory? » No / Yes
    ```
    - Respuesta: selecciona Yes

    - Pregunta:
    ```text
       ? Would you like to use App Router? (recommended) » No / Yes
    ```
    - Respuesta: selecciona No

    - Pregunta:
    ```text
       ? Would you like to customize the default import alias (@/*)? » No / Yes
    ```
    - Respuesta: selecciona No

### SASS

Para diseñar el HTML utilizamos [SASS](https://sass-lang.com/). Lo hemos instalado a través de npm con el siguiente comando:

```
npm i -D sass
```

Hemos declarado variables globales en app.scss dentro de la carpeta assets y también breakpoints para responsive en el archivo de medias.scss. Por su parte, los mixins se encuentran dentro de la carpeta assets, en el archivo mixins.scss.

Los archivos sass se importan en los correspondientes tsx y se llama a las clases con la siguiente estructura:

```
import styles from "@/styles/Home.module.scss";

...

className={styles.home__quote}
```

## Arquitectura inicial del Taller

### Routing

Al seleccionar crear el proyecto con NextJS, el propio framework nos provee dos tipos de enrutamiento: App Router o Page Router. Nosotros elegimos Page Router para este ejemplo.

También podríamos haber creado el proyecto con solo React y usar un router del tipo react-router-dom.

### SASS

Para diseñar el HTML utilizamos [SASS](https://sass-lang.com/). Lo hemos instalado a través de npm con el siguiente comando:

```
npm i -D sass
```

Hemos declarado variables globales en app.scss dentro de la carpeta assets y también breakpoints para responsive en el archivo de medias.scss. Por su parte, los mixins se encuentran dentro de la carpeta assets, en el archivo mixins.scss.

### Páginas

Hemos decidido agregar las siguientes páginas:

- Inicio, la página principal (src/pages/index);
- TravelEdition, el formulario para crear o añadir un nuevo viaje.
- TravelList, la página donde se muestran todos los viajes (src/pages/travels).
- Página404, la página que se muestra si la ruta no existe (src/pages/404).

### Components

Hemos añadido los siguientes componentes:

- TopBar, la barra que aparece en la parte superior de todas las páginas de la aplicación. Muestra el logo, el título y dos RouterLink que funcionan como opciones de menú.

- TravelDetail, el componente que contiene la "card" con la información de cada viaje.

## Paso a paso taller

### 1. Entendemos la arquitectura base

Al haber seleccionado crear el proyecto React con NextJS, la arquitectura varía a proyectos React sin este framework (uno de los que recomienda el propio React). Dentro del proyecto si lo observas con detenimiento verás que tienes los siguientes archivos de configuración:

- package.json, donde encontramos los diferentes paquetes a instalar que se usan en el proyecto.
- tsconfig.json, con configuraciones de compilación.
- next.config.mjs, con la configuración de NextJs.

Después dentro de src encontrarás las siguientes carpetas:

- components, aquí están los diferentes componentes. Por ahora tenemos, la TopBar que es la barra de navegación común a todas las páginas y el TravelDetail, que es la "card" del detalle de un viaje.

- pages, aquí están las diferentes páginas de nuestra aplicación. Hemos creado una Home, una página de Error, otra para el formulario de edición/creación de viajes y una de listado de viajes.

- styles, aquí tenemos los diferentes scss de nuestra aplicación. Tendremos uno con variables generales, otro para las medias de responsive y otro para los mixins.

Al mismo nivel que la carpeta src tendremos la carpeta public donde alojamos las diferentes imágenes e iconos de la aplicación.

### 2. Como funciona el enrutamiento

Para enrutar páginas, utilizamos [Page Router]('https://nextjs.org/docs/pages/building-your-application/routing'), para que se asemeje más al de Vue y al de Angular. También tienes la opción de utilizar el App Router.

Con el Page Router lo único que necesitas es una carpeta dentro de src pages que contenga los siguientes archivos:
\_app.tsx: página que contiene la estructura de una app react.
\_document.tsx: página que crea un archivo html válido.
index.tsx: nuestra home.

Luego por cada página que quiera añadir simplemente tienes que crear tu archivo tsx con el nombre que quieras que tenga la ruta, por ejemplo travels.tsx.

Ahora sí, si necesitas que una página acepte parámetros entonces debes crear dentro de src/pages una carpeta con el nombre de la ruta, por ejemplo /travel-edit y luego dentro de ella un archivo que se llame [parametro].tsx. Y la ruta será /travel-edit/parametro.

Por ahora, sólo tenemos codificada la navegación de la barra superior, TopBar, y lo hemos hecho usando la etiqueta Link en lugar de utilizar etiquetas `<a>` normales. Esto permite al router cambiar la URL sin recargar la página, manejar la generación de URL, la codificación y varias otras funciones. Lo único que necesita es una url válida en la propiedad "href".

```
<Link href="/travels" className="topbar__menuOption">Travels List</Link>
```

### 3. Añade funcionalidad a los botones de la Home

Comenzamos con algo sencillo, como hemos visto antes podríamos enlazar desde la Home tanto la pantalla del listado de viajes, como la de añadir uno nuevo con un elemento de tipo <Link>, pero como lo que queremos es que sea un botón y que tenga esta apariencia, vamos a usar un botón. ¿Te preguntas por qué? Pues porque simplemente es un detalle que mejora la accesibilidad web.

En este taller no tenemos mucho tiempo para profundizar en los fundamentos de la accesibilidad web, pero te recomendamos encarecidamente que le dediques un tiempo, si no los conoces. Personalmente nos gustan mucho los recursos de [Olga Carreras](https://olgacarreras.blogspot.com/).

Vamos con el paso a paso de hacer funcionar el botón "Ver viajes":

1. En primer lugar necesitamos que el botón detecte el evento click. En Vue los eventos se vinculan con los diferentes elementos gracias a la sintaxis '@nombreEvento'. Así que simplemente añadimos un @click en el que declaramos el nombre del método y el parámetro que queremos:

```html
<button className={styles.home__actionsBtn} onClick={() => goTo('list')}>Ver viajes</button>
```

2. Ahora necesitamos crear ese método dentro de nuestro script, para ello declaramos nuestro método como una const y seguimos la sintaxis de Typescript:

```typescript
const goTo = (page: string) => console.log('navegamos a ', page);
```

3. Si ejecutamos ahora nuestra aplicación podremos ver por consola el mensaje que hemos escrito cuando hacemos click en el botón.

4. Ahora vamos a crear un enumerado con las rutas apropiadas según el parámetro que pasemos. Esto puede ser un dato que se use en varias pantallas o componentes, así que lo mejor será crearlo en un sitio compartido. Así que a nivel de src, vamos a crear la carpeta data y dentro el archivo AppUrls.ts. En el crearemos un enumerado de strings:

```typescript
export enum URLS {
  LIST = '/travels',
  EDIT = '/travel-edit/',
  ADD = '/travel-edit/0',
  HOME = '/',
}
```

El siguiente paso es importarlo en nuestra página Home. También necesitaremos importar el useRouter de next:

```typescript
import { useRouter } from 'next/navigation';
import { URLS } from '../data/AppUrls';
```

5. Ahora modificaremos nuestro método goTo para hacer un push al router de la ruta específica del enumerado. Esto se hace así:

```typescript
const goTo = (url: string) => {
  router.push(url);
};
```

6. Ahora vamos a añadir el evento click al otro botón, con su enumerado específico (acuerdate de modificar el 'list' del otro botón por un valor correcto del enumerado):

```html
<button className={styles.home__actionsSecondaryBtn} onClick={() => goTo(URLS.ADD)}>Nuevo viaje</button>
```

7. El archivo index.tsx al final nos quedará así:

```tsx
import styles from '@/styles/Home.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { URLS } from '../data/AppUrls';

export default function Home() {
  const router = useRouter();

  const goTo = (pageUrl: string) => router.push(pageUrl);
  return (
    <>
      <main className={styles.home}>
        <Image
          src="/Pulpi-React.png"
          alt="Logo de React encima del pulpo de la pulpoConf"
          width="200"
          height="300"
        />

        <q className={styles.home__quote}>
          La vida, o es una aventura o no es nada
        </q>

        <p className={styles.home__subquote}>Hellen Keller</p>

        <div className={styles.home__actions}>
          <button
            className={styles.home__actionsSecondaryBtn}
            onClick={() => goTo(URLS.ADD)}
          >
            Nuevo viaje
          </button>

          <button
            className={styles.home__actionsBtn}
            onClick={() => goTo(URLS.LIST)}
          >
            Ver viajes
          </button>
        </div>
      </main>
    </>
  );
}
```

### 4. Vincula el listado con datos almacenados en frontend

Lo primero de todo, vamos a ver que tenemos en el listado. Partimos de que llamamos al componente TravelDetail en el siguiente código:

```html
<div className="{styles.travelList__wrapper}">
  <div className="{styles.travelList__travel}">
    <TravelDetail></TravelDetail>
  </div>
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
    image: '/city.webp',
  },
];
```

El siguiente paso es vincular los datos del objeto con los campos del HTML. Así que primero (momentáneamente porque luego los vamos a traer del listado), importamos el objeto desde el archivo ts. Vamos a crear una variable que contenga el primer viaje de nuestro listado y también una con la fecha formateada (toLocaleString).

Total que dentro del export default function pondremos el siguiente código:

```typescript
const currentTravel: ITravel = myTravels[0];

const currentTravelDate = currentTravel.date.toLocaleString('es-ES');
```

Acuérdate de importar tanto el type, como el data. Quedará así:

```tsx
import { myTravels } from '@/data/Travel';
import styles from './TravelDetail.module.scss';
import Image from 'next/image';
import { ITravel } from '@/types/Travel';

export default function TravelDetail() {
  const currentTravel: ITravel = myTravels[0];

  const currentTravelDate = currentTravel.date.toLocaleString('es-ES');

  return (
    <>
      <main className={styles.travelDetail}>
        <div className={styles.travelDetail__actions}>
          <button className={styles.travelDetail__actionsEdit}>Edit</button>
        </div>

        <Image
          src="/city.webp"
          alt="Imagen de viaje"
          className={styles.travelDetail__image}
          width="500"
          height="500"
        />

        <div className={styles.travelDetail__textWrapper}>
          <span className={styles.travelDetail__mainText}>Country:</span>
          <span>EEUU</span>
        </div>

        <div className={styles.travelDetail__textWrapper}>
          <span className={styles.travelDetail__mainText}>City:</span>
          <span>Nueva York</span>
        </div>

        <div className={styles.travelDetail__textWrapper}>
          <span className={styles.travelDetail__mainText}>Date:</span>
          <span>21-01-2020</span>
        </div>

        <div
          className={`${styles.travelDetail__textWrapper}${styles.travelDetail__textWrapperDescription}`}
        >
          <span className={styles.travelDetail__mainText}>Description:</span>
          <span>
            Viaje sorpresa a Nueva York en Enero para descubrir la ciudad. En el
            viaje no nos nevó y pudimos visitar varios museos: el de Ciencias
            Naturales, el MOMA, el MET. También pudimos ver la Estatua de La
            Libertad e ir de compras.
          </span>
        </div>
      </main>
    </>
  );
}
```

Ahora ya sólo nos queda vincular el HTML con los datos del Typescript y como sabrás, cada framework tiene su sintaxis. En el caso de React esto se hace poniendo la propiedad entre llaves:

- Si queremos añadir a una prop de un objeto, una referencia al typescript sería tal que así:

```html
<Image src={currentTravel.image ?? ''} alt="Imagen de viaje"
className={styles.travelDetail__image} width="500" height="500" />
```

- Si queremos añadirlo dentro del html como texto, se haría con esta estructura:

```html
<span>{ currentTravel.country }</span>
```

Con esto ya puedes completar todas las propiedades. Si ejecutas, verás que no ha cambiado la visualización pero ahora ya está cogiendo los datos del objeto. De todas formas, realmente no lo podemos dejar así, sino que TravelDetail deberá recibir los datos mediante una propiedad, para poder reusarlo con cada viaje.

Así que vamos a definirle las propiedades que va a recibir. Para pasar propiedades a un componente en React lo declaramos de esta forma:

```tsx
interface MyProps {
 myProp: MyInterface
}

export const MyComponent = ({myProp}: MyProps) => {

...
}
```

Además como ahora ya le pasamos el currentTravel, tenemos que eliminarlo del Typescript dentro del componente, de forma que el TravelDetail nos quedaría así:

```tsx
import styles from './TravelDetail.module.scss';
import Image from 'next/image';
import { ITravel } from '@/types/Travel';

interface TravelDetailProps {
  currentTravel: ITravel;
}

export const TravelDetail = ({ currentTravel }: TravelDetailProps) => {
  const currentTravelDate = currentTravel.date.toLocaleString('es-ES');

  return (
    <>
      <main className={styles.travelDetail}>
        <div className={styles.travelDetail__actions}>
          <button className={styles.travelDetail__actionsEdit}>Edit</button>
        </div>

        <Image
          src={currentTravel.image ?? ''}
          alt="Imagen de viaje"
          className={styles.travelDetail__image}
          width="500"
          height="500"
        />

        <div className={styles.travelDetail__textWrapper}>
          <span className={styles.travelDetail__mainText}>Country:</span>
          <span>{currentTravel.country}</span>
        </div>

        <div className={styles.travelDetail__textWrapper}>
          <span className={styles.travelDetail__mainText}>City:</span>
          <span>{currentTravel.city}</span>
        </div>

        <div className={styles.travelDetail__textWrapper}>
          <span className={styles.travelDetail__mainText}>Date:</span>
          <span>{currentTravelDate}</span>
        </div>

        <div
          className={`${styles.travelDetail__textWrapper}${styles.travelDetail__textWrapperDescription}`}
        >
          <span className={styles.travelDetail__mainText}>Description:</span>
          <span>{currentTravel.description}</span>
        </div>
      </main>
    </>
  );
};
```

Ahora nos falta pasarle el viaje concreto al componente desde el pagers/travels/index.tsx y además necesitamos usar un bucle. Así que vamos a necesitar sintaxis específica de React:

- Los bucles se usan añadiendo en el return una llama y dentro el bucle o map:

```typescript
{
  myTravels.map((travel) => <div>travel.city</div>);
}
```

- Las propiedades se pasan como una propiedad normal, dentro de llaves.

Así que lo único que necesitamos es importar la lista de viajes del data y luego ya crear el bucle, dentro del cual vamos a llamar al TravelDetail pasándole la prop. Y también cada div del listado que se genera necesitará una key única:

```tsx
import { TravelDetail } from '@/components/travelDetail/index';
import styles from './Travels.module.scss';
import { myTravels } from '@/data/Travel';

export default function Travels() {
  return (
    <>
      <main className={styles.travelList}>
        <button className={styles.travelList__add}>New Travel</button>

        <div className={styles.travelList__wrapper}>
          {myTravels.map((travel) => (
            <div key={travel.id} className={styles.travelList__travel}>
              <TravelDetail currentTravel={travel}></TravelDetail>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
```

Con esto si ejecutas verás que ya funciona a la perfección. Pruébalo añadiendo un nuevo viaje al archivo data.

### 5. Vamos a añadir lógica y validaciones al formulario.

Comenzamos en el archivo [id].tsx de src/pages/travel-edit. Lo idóneo es que tuviésemos el formulario en otro componente aparte, pero para este taller vamos a simplificar y dejarlo en la misma vista. Lo primero que vamos a necesitar son variables en las que guardar los datos del formulario, así que voy a crear un objeto de tipo ITravel que se inicializará con un valor por defecto vacío y también un tipo de viaje. Así que antes de nada voy a crear en el archivo src/data/Travel, un objeto ITravel vacío:

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

En React, las propiedades se declaran utilizando los state. Así que voy a crear mi propiedad currentTravel y currentType.

```typescript
const [currentTravel, setCurrentTravel] = useState(
  structuredClone(defaultTravel)
);

const [currentType, setCurrentType] = useState('');
```

Si te fijas, he añadido el structureClone para crear una copia de un objeto pero sin que quede vinculado al original. Ahora, el siguiente paso es ir vinculando los diferentes campos del formulario con el valor del objeto. En la versión actual de React todavía no tenemos Canary y por tanto usamos los formularios de HTML directamente. Para vincular los campos con los valores de nuestro objeto usaremos la propiedad value y el onChange.

```html
<div className={styles.travelEdit__row}>
            <label htmlFor="country">País:</label>

            <input
              className={styles.travelEdit__rowField}
              type="text"
              id="country"
              name="country"
              value={currentTravel.country}
              onChange={(e) => setCurrentTravel({...currentTravel, country: e.target.value})}
            />
          </div>

          <div className={styles.travelEdit__row}>
            <label htmlFor="city">Ciudad:</label>

            <input className={styles.travelEdit__rowField} type="text" id="city" name="city" value={currentTravel.city}
              onChange={(e) => setCurrentTravel({...currentTravel, city: e.target.value})} />
          </div>

          <div className={styles.travelEdit__row}>
            <label htmlFor="date">Fecha:</label>

            <input className={styles.travelEdit__rowField} type="date" id="date" name="date" value={currentTravel.date.toString()}
              onChange={(e) => setCurrentTravel({...currentTravel, date: e.target.value})} />
          </div>

          <div className={styles.travelEdit__row}>
            <label htmlFor="description">Descripción:</label>

            <textarea
              className={styles.travelEdit__rowField}
              id="description"
              name="description"
              rows={20}
              value={currentTravel.description}
              onChange={(e) => setCurrentTravel({...currentTravel, description: e.target.value})}
            ></textarea>
          </div>

```

Si te fijas, la propiedad de fecha nos marca error porque espera un string y, sin embargo, recibe un objeto Date, es por eso que para el value vamos a formatearla con un toString() y en el onChange convertir a Date el String que recibe.

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
import { defaultTravel, TravelTypeOptions } from '../../data/Travel';
```

Y lo que necesitamos es tener un bucle para cargar las opciones, lo vamos a hacer igual que cargamos antes el listado de viajes dentro de un map, pero en este caso de TravelTypeOptions y vamos a vincular el value a option.id y el texto a mostrar que sea option.value

```html
<div className={styles.travelEdit__row}>
    <label htmlFor="type">Tipo de viaje:</label>

    <select className={styles.travelEdit__rowField} name="select" value={currentType} onChange={(e) => setCurrentType(e.target.value)}>
        {TravelTypeOptions.map(option =>
            <option key={option.id} value={option.id}>{option.value}</option>
        )}
    </select>
</div>
```

Supuestamente ya tenemos vinculados los distintos campos con el formulario pero ¿cómo lo comprobamos? Pues vamos a añadir "funcionalidad" a los botones. En React para vincular los eventos de botones se usa el método onclick de la siguiente forma: onClick={miMétodo}.

Tenemos que tener también la precaución de sacar los botones del formulario para que no tomen las acciones por defecto de HTML. Así que los pongo en un nuevo div fuera del form y actualizo los estilos.

```html
<div className="{styles.travelEdit__actions}">
  <button
    className="{styles.travelEdit__actionsSecondaryBtn}"
    onClick="{onCancel}"
  >
    Cancelar
  </button>
  <button className="{styles.travelEdit__actionsBtn}" onClick="{onSave}">
    Guardar
  </button>
</div>
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

Ahora si lo pruebas, verás que al apretar alguno de los dos botones, tenemos la funcionalidad que esperamos.

Pero, ¿no sería interesante tener validaciones? ¿Cómo las hacemos en React? Pues una de las cosas que podemos usar es [React hook form](https://react-hook-form.com/get-started).
Es una librería muy sencilla de usar, así que vamos a ir paso a paso.

Lo primero de todo es instalarla con:

```
npm i react-hook-form
```

Una vez que la tenemos instalada, vamos a usar las utilidades que necesitamos. Por un lado, para que detecte nuestro formulario necesita una interfaz con los campos que va a recibir. En nuestro caso tenemos el objeto ITravel, pero también la propiedad currentType, así que creamos una nueva interface en nuestro archivo [id].tsx que extienda la ITravel:

```typescript
interface ITravelEdit extends ITravel {
  currentType: string;
}
```

Después dentro de nuestro componente vamos a usar el react-hook-form, para ello llamaremos a useForm, indicándole la interfaz nueva que creamos y los defaultValues que tenemos. Vamos a tomar de las variables que nos devuelve: register, handleSubmit y formState. Además vamos a declarar el método onSave (eliminando el anterior que teníamos). El código sería tal que así:

```typescript
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<ITravelEdit>({
  defaultValues: { ...structuredClone(defaultTravel), currentType: 'nature' },
});

const onSave: SubmitHandler<ITravel> = (data) => console.log(data);
```

Luego en nuestro html tenemos que quitar de cada campo las propiedades name, value y handleChange y sustituirlo por un {...register("nombreDelCampo")}. Además en el caso de ciudad, fecha y tipo de viaje vamos a poner que son requeridas (y ciudad que requiere al menos 3 letras). Para esto react-hook-form tiene la sintaxis de: {...register("nombreDelCampo", { required: true, minLength: 3 })}.

También vamos a calcular las clases de los campos requeridos para que si tienen error pongan un clase que se llame rowFieldError, esto lo haremos con la siguiente sintaxis: className={errors.city ? styles.travelEdit**rowFieldError : styles.travelEdit**rowField}

Por último vamos a añadir un mensaje que se muestre cuando haya campos obligatorios no rellenos. En conjunto el html quedaría así:

```tsx
return (
  <>
    <main className={styles.main}>
      <form className={styles.travelEdit}>
        <div className={styles.travelEdit__row}>
          <label htmlFor="type">Tipo de viaje:</label>

          <select
            className={
              errors.currentType
                ? styles.travelEdit__rowFieldError
                : styles.travelEdit__rowField
            }
            {...register('currentType', { required: true })}
          >
            {TravelTypeOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.travelEdit__row}>
          <label htmlFor="country">País:</label>

          <input
            className={styles.travelEdit__rowField}
            type="text"
            id="country"
            {...register('country')}
          />
        </div>

        <div className={styles.travelEdit__row}>
          <label htmlFor="city">Ciudad:</label>

          <input
            className={
              errors.city
                ? styles.travelEdit__rowFieldError
                : styles.travelEdit__rowField
            }
            type="text"
            id="city"
            {...register('city', { required: true, minLength: 3 })}
          />
        </div>

        <div className={styles.travelEdit__row}>
          <label htmlFor="date">Fecha:</label>

          <input
            className={
              errors.date
                ? styles.travelEdit__rowFieldError
                : styles.travelEdit__rowField
            }
            type="date"
            id="date"
            {...register('date', { required: true })}
          />
        </div>

        <div className={styles.travelEdit__row}>
          <label htmlFor="description">Descripción:</label>

          <textarea
            className={styles.travelEdit__rowField}
            id="description"
            rows={20}
            {...register('description')}
          ></textarea>
        </div>

        <label className={styles.travelEdit__error}>
          {Object.keys(errors).length ? 'Completa los campos obligatorios' : ''}
        </label>
      </form>

      <div className={styles.travelEdit__actions}>
        <button
          className={styles.travelEdit__actionsSecondaryBtn}
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          className={styles.travelEdit__actionsBtn}
          onClick={handleSubmit(onSave)}
        >
          Guardar
        </button>
      </div>
    </main>
  </>
);
```

Ahora al archivo de src/pages/travel-edit/TravelEdit.module.scss vamos a añadir los estilos para los errores:

```scss
&__rowField,
&__rowFieldError {
  min-width: 20rem;
}

&__rowFieldError {
  border-color: red;
}

&__error {
  color: red;
}
```

Recuerda que tenemos que eliminar los useState que ya no usamos, al utilizar el react-hook-form. En completo el archivo [id].tsx te quedaría tal que así:

```tsx
import styles from './TravelEdit.module.scss';
import { defaultTravel, TravelTypeOptions } from '../../data/Travel';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ITravel } from '@/types/Travel';

interface ITravelEdit extends ITravel {
  currentType: string;
}

export default function Travels() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITravelEdit>({
    defaultValues: { ...structuredClone(defaultTravel), currentType: 'nature' },
  });

  const onSave: SubmitHandler<ITravel> = (data) => console.log(data);

  const onCancel = () => console.log('he cancelado');

  return (
    <>
      <main className={styles.main}>
        <form className={styles.travelEdit}>
          <div className={styles.travelEdit__row}>
            <label htmlFor="type">Tipo de viaje:</label>

            <select
              className={
                errors.currentType
                  ? styles.travelEdit__rowFieldError
                  : styles.travelEdit__rowField
              }
              {...register('currentType', { required: true })}
            >
              {TravelTypeOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.travelEdit__row}>
            <label htmlFor="country">País:</label>

            <input
              className={styles.travelEdit__rowField}
              type="text"
              id="country"
              {...register('country')}
            />
          </div>

          <div className={styles.travelEdit__row}>
            <label htmlFor="city">Ciudad:</label>

            <input
              className={
                errors.city
                  ? styles.travelEdit__rowFieldError
                  : styles.travelEdit__rowField
              }
              type="text"
              id="city"
              {...register('city', { required: true, minLength: 3 })}
            />
          </div>

          <div className={styles.travelEdit__row}>
            <label htmlFor="date">Fecha:</label>

            <input
              className={
                errors.date
                  ? styles.travelEdit__rowFieldError
                  : styles.travelEdit__rowField
              }
              type="date"
              id="date"
              {...register('date', { required: true })}
            />
          </div>

          <div className={styles.travelEdit__row}>
            <label htmlFor="description">Descripción:</label>

            <textarea
              className={styles.travelEdit__rowField}
              id="description"
              rows={20}
              {...register('description')}
            ></textarea>
          </div>

          <label className={styles.travelEdit__error}>
            {Object.keys(errors).length
              ? 'Completa los campos obligatorios'
              : ''}
          </label>
        </form>

        <div className={styles.travelEdit__actions}>
          <button
            className={styles.travelEdit__actionsSecondaryBtn}
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className={styles.travelEdit__actionsBtn}
            onClick={handleSubmit(onSave)}
          >
            Guardar
          </button>
        </div>
      </main>
    </>
  );
}
```

### 6. ¿Y si queremos editar? Vincula con los datos recibidos.

Antes de comenzar a vincular el formulario con los datos recibidos... ¿No estaría bien tener los datos almacenados en el frontend durante la sesión? Pues eso en NextJS se hace con stores. En muchos proyectos se usa [Redux](https://redux.js.org/usage/nextjs), pero a nosotros nos resulta mas claro [Zustand](https://zustand.docs.pmnd.rs/guides/nextjs) y es el que vamos a utilizar.

Lo primero es instalarlo:

```
npm install zustand
```

Luego abrimos nuestro archivo tsconfig.json y lo sustituimos por este:

```ts
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

El siguiente paso es crear el archivo src/stores/travel-store.ts que tiene que tener la siguiente estructura:

```typescript
import { myTravels } from '@/data/Travel';
import { ITravel } from '@/types/Travel';
import { createStore } from 'zustand/vanilla';

export type TravelState = {
  travelList: ITravel[];
};

export type TravelActions = {
  addTravel: (currentTravel: ITravel) => void;
};

export type TravelStore = TravelState & TravelActions;

export const defaultInitState: TravelState = {
  travelList: [],
};

export const initTravelStore = (): TravelState => {
  return { travelList: structuredClone(myTravels) };
};

export const createTravelStore = (
  initState: TravelState = defaultInitState
) => {
  return createStore<TravelStore>()((set) => ({
    ...initState,
    addTravel: (currentTravel: ITravel) =>
      set((state) => ({ travelList: [...state.travelList, currentTravel] })),
  }));
};
```

Si te fijas, aquí lo que hacemos es crear dos types, uno para los datos que va a tener el store y otro para las acciones. Luego ya se le pone el initialState y el crear el Store. Esta es la estructura base de un Store en Zustand, no hemos modificado nada, solo añadido que el initTravelStore lo que haga es clonar myTravels y declarar el método addTravel.

Después de tener el store, necesitamos crear el archivo src/providers/travel-store-provider.tsx y de nuevo vamos a tomar la configuración base de un provider de Zustand:

```typescript
import { myTravels } from '@/data/Travel';
import { ITravel } from '@/types/Travel';
import { createStore } from 'zustand/vanilla';

export type TravelState = {
  travelList: ITravel[];
};

export type TravelActions = {
  addTravel: (currentTravel: ITravel) => void;
};

export type TravelStore = TravelState & TravelActions;

export const defaultInitState: TravelState = {
  travelList: [],
};

export const initTravelStore = (): TravelState => {
  return { travelList: structuredClone(myTravels) };
};

export const createTravelStore = (
  initState: TravelState = defaultInitState
) => {
  return createStore<TravelStore>()((set) => ({
    ...initState,
    addTravel: (currentTravel: ITravel) =>
      set((state) => ({ travelList: [...state.travelList, currentTravel] })),
  }));
};
```

Ahora como usamos PageRouter, tenemos que ir a src/pages/\_app.tsx e instanciarlo ahí, envolviendo a la etiqueta <Component>:

```tsx
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { TravelStoreProvider } from '@/providers/travel-store-provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Mis viajes</title>
      </Head>

      <TravelStoreProvider>
        <Component {...pageProps} />
      </TravelStoreProvider>
    </>
  );
}
```

Y ahora ya podemos ir a nuestro listado y en lugar de leer los datos del archivo data, leerlos de nuestro store. Para ello ponemos este import:

```typescript
import { useTravelStore } from '@/providers/travel-store-provider';
```

Y después tomamos el listado así:

```typescript
const { travelList } = useTravelStore((state) => state);
```

Acuérdate de cambiar en el HTML el myTravels por travelList. Ahora si ejecutas ya te debería funcionar.

Nos queda una cosa en este listado, que los botones nuevo y editar funcionen. Esto es muy similar a lo que habíamos hecho en la home, primero vamos a poner el añadir que hay en el listado:

```tsx
import { TravelDetail } from '@/components/travelDetail/index';
import styles from './Travels.module.scss';
import { useTravelStore } from '@/providers/travel-store-provider';
import { useRouter } from 'next/navigation';
import { URLS } from '@/data/AppUrls';

export default function Travels() {
  const { travelList } = useTravelStore((state) => state);

  const router = useRouter();

  const addTravel = () => router.push(URLS.ADD);

  return (
    <>
      <main className={styles.travelList}>
        <button className={styles.travelList__add} onClick={() => addTravel()}>
          New Travel
        </button>

        <div className={styles.travelList__wrapper}>
          {travelList.map((travel) => (
            <div key={travel.id} className={styles.travelList__travel}>
              <TravelDetail currentTravel={travel}></TravelDetail>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
```

Y luego vamos a añadirlo al Edit del componente TravelDetail:

```tsx
import styles from './TravelDetail.module.scss';
import Image from 'next/image';
import { ITravel } from '@/types/Travel';
import { useRouter } from 'next/navigation';
import { URLS } from '@/data/AppUrls';

interface TravelDetailProps {
  currentTravel: ITravel;
}

export const TravelDetail = ({ currentTravel }: TravelDetailProps) => {
  const currentTravelDate = currentTravel.date.toLocaleString('es-ES');

  const router = useRouter();

  const editTravel = () => router.push(`${URLS.EDIT}${currentTravel.id}`);

  return (
    <>
      <main className={styles.travelDetail}>
        <div className={styles.travelDetail__actions}>
          <button
            className={styles.travelDetail__actionsEdit}
            onClick={() => editTravel()}
          >
            Edit
          </button>
        </div>

        <Image
          src={currentTravel.image ?? ''}
          alt="Imagen de viaje"
          className={styles.travelDetail__image}
          width="500"
          height="500"
        />

        <div className={styles.travelDetail__textWrapper}>
          <span className={styles.travelDetail__mainText}>Country:</span>
          <span>{currentTravel.country}</span>
        </div>

        <div className={styles.travelDetail__textWrapper}>
          <span className={styles.travelDetail__mainText}>City:</span>
          <span>{currentTravel.city}</span>
        </div>

        <div className={styles.travelDetail__textWrapper}>
          <span className={styles.travelDetail__mainText}>Date:</span>
          <span>{currentTravelDate}</span>
        </div>

        <div
          className={`${styles.travelDetail__textWrapper}${styles.travelDetail__textWrapperDescription}`}
        >
          <span className={styles.travelDetail__mainText}>Description:</span>
          <span>{currentTravel.description}</span>
        </div>
      </main>
    </>
  );
};
```

Ahora ya lo último será que cuando nos llegue un id por la url lo tomemos y carguemos sus datos. Los pasos que vamos a seguir son:

- Importar useRouter de next/router y lo vamos a instanciar
- Instanciar el useTravelStore para tomar el travelList
- Tomar la propiedad setValue junto con el resto que ya teníamos del useForm
- Tomar el id de la url de este form con lo siguiente: Number(router.query.id as string);
- Crear una constante que cargue el viaje actual buscándolo de travelList por id;
- Poner un if para que si tenemos el currentId y el currentTravel vayamos seteando los valores iniciales de nuestro formulario con: setValue("city", currentTravel.city).

El código total del [id].tsx queda así:

```tsx
import styles from './TravelEdit.module.scss';
import { defaultTravel, TravelTypeOptions } from '../../data/Travel';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ITravel } from '@/types/Travel';
import { useRouter } from 'next/router';
import { useTravelStore } from '@/providers/travel-store-provider';

interface ITravelEdit extends ITravel {
  currentType: string;
}

export default function Travels() {
  const NATURE_OPTION = 'nature';

  const router = useRouter();

  const { travelList } = useTravelStore((state) => state);

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITravelEdit>({
    defaultValues: {
      ...structuredClone(defaultTravel),
      currentType: NATURE_OPTION,
    },
  });

  const currentId = Number(router.query.id as string);

  const currentTravel = travelList.find((travel) => travel.id === currentId);

  if (currentId > 0 && currentTravel) {
    const currentType = currentTravel.image
      ? currentTravel.image.replace('/', '').replace('.webp', '')
      : NATURE_OPTION;
    setValue('city', currentTravel.city);
    setValue('country', currentTravel.country);
    setValue('date', currentTravel.date);
    setValue('description', currentTravel?.description);
    setValue('currentType', currentType);
  }

  const onSave: SubmitHandler<ITravel> = (data) => console.log(data);

  const onCancel = () => console.log('he cancelado');

  return (
    <>
      <main className={styles.main}>
        <form className={styles.travelEdit}>
          <div className={styles.travelEdit__row}>
            <label htmlFor="type">Tipo de viaje:</label>

            <select
              className={
                errors.currentType
                  ? styles.travelEdit__rowFieldError
                  : styles.travelEdit__rowField
              }
              {...register('currentType', { required: true })}
            >
              {TravelTypeOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.travelEdit__row}>
            <label htmlFor="country">País:</label>

            <input
              className={styles.travelEdit__rowField}
              type="text"
              id="country"
              {...register('country')}
            />
          </div>

          <div className={styles.travelEdit__row}>
            <label htmlFor="city">Ciudad:</label>

            <input
              className={
                errors.city
                  ? styles.travelEdit__rowFieldError
                  : styles.travelEdit__rowField
              }
              type="text"
              id="city"
              {...register('city', { required: true, minLength: 3 })}
            />
          </div>

          <div className={styles.travelEdit__row}>
            <label htmlFor="date">Fecha:</label>

            <input
              className={
                errors.date
                  ? styles.travelEdit__rowFieldError
                  : styles.travelEdit__rowField
              }
              type="date"
              id="date"
              {...register('date', { required: true })}
            />
          </div>

          <div className={styles.travelEdit__row}>
            <label htmlFor="description">Descripción:</label>

            <textarea
              className={styles.travelEdit__rowField}
              id="description"
              rows={20}
              {...register('description')}
            ></textarea>
          </div>

          <label className={styles.travelEdit__error}>
            {Object.keys(errors).length
              ? 'Completa los campos obligatorios'
              : ''}
          </label>
        </form>

        <div className={styles.travelEdit__actions}>
          <button
            className={styles.travelEdit__actionsSecondaryBtn}
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className={styles.travelEdit__actionsBtn}
            onClick={handleSubmit(onSave)}
          >
            Guardar
          </button>
        </div>
      </main>
    </>
  );
}
```

Si te fijas nos falta solo una cosa: la fecha no se está vinculando perfectamente y eso es porque el input de tipo fecha está esperando una fecha como string. Así que lo que tenemos que hacer, es convertirla a string con el formato correcto para pasársela al campo input. Así que crearemos una nuva propiedad en la interfaz:

```typescript
interface ITravelEdit extends ITravel {
  currentType: string;
  dateAsString: string;
}
```

Luego en el if donde cargamos los datos al formulario modificamos el set:

```typescript
const currentDateAsString = currentTravel.date.toISOString().split('T')[0];
setValue('dateAsString', currentDateAsString);
```

Y por último, modificamos el register en el input:

```html
<input className={errors.date ? styles.travelEdit__rowFieldError :
styles.travelEdit__rowField} type="date" id="date" {...register("dateAsString",
{ required: true})} />
```

### 7. Crea la funcionalidad de guardar cambios.

Te estarás planteando, cómo React es reactivo si yo edito un campo del objeto Viaje, ya se guardará. Sí, esto es así, pero no olvides que estamos transformando ciertos campos para el formulario y que además el objeto que se crea para el formulario no es directamente el que recibimos de la lista. Así que vamos a ir por partes, en primer lugar recuerda que al store le creamos un método para añadir viajes:

```typescript
 addTravel: (currentTravel: ITravel) => {
      set((state) => ({ travelList: [...state.travelList, currentTravel] }));
    },
```

Así que lo que vamos a hacer en nuestro archivo src/Pages/travel-edit/[id].tsx, es lo siguiente:

- Crearemos una constante para saber si hay errores (podemos luego usarla en donde lo comprobamos para ver si mostramos el mensaje de error):

```typescript
const hasErrors = Object.keys(errors).length;
```

- Vamos a coger y en la instancia del store en nuestro archivo añadir que nos devuelva el método addTravel.
- Ahora vamos a modificar el método onSave para que si no hay errores nos detecte primero si está editando (el id es distinto de 0)
- Después calcularemos el id actual que si es edición es el mismo, pero si es añadir debe ser el siguiente al máximo que ya haya creado.
- El siguiente paso es crear un objeto new Travel pasando las propiedades del data y mapeando las props Date e image.
- Luego si es un edición llamaremos a un nuevo método editar que vamos a crear y sino que llame a addTravel.
- Por último le diremos que nos lleve de vuelta al listado.

En total el método onSave queda así:

```typescript
const onSave: SubmitHandler<ITravelEdit> = (data: ITravelEdit) => {
  if (!hasErrors) {
    const isEdition = data.id !== 0;

    const currentId = !isEdition
      ? Math.max.apply(
          null,
          travelList.map((travel) => travel.id)
        ) + 1
      : data.id;

    const newTravel: ITravel = {
      id: currentId,
      description: data.description,
      city: data.city,
      country: data.country,
      date: new Date(data.dateAsString),
      image: `/${data.currentType}.webp`,
    };

    isEdition ? editTravel(newTravel, currentId) : addTravel(newTravel);

    router.push(URLS.LIST);
  }
};
```

Y nuestro editTravel será:

```typescript
const editTravel = (newTravel: ITravel, currentId: Number) => {
  const currentListIndex = travelList.findIndex(
    (travel) => travel.id === currentId
  );
  travelList[currentListIndex] = newTravel;
};
```

Ejecuta y prueba.

¿Has notado algo? Puede que si hayas querido navegar con los links de la barra superior hayas notado que desaparecen los cambios y eso es porque los link en el Page Router de NextJs están haciendo realmente una recarga. Esto es porque la Topbar la estamos importando y declarando en el \_document.tsx y no dentro del \_app.tsx para que esté dentro de nuestro StoreProvider. Así que vamos a solucionarlo y hacerlo bien.

Lo primero de todo es crear un componente en src/components llamado layout.tsx y que contendrá nuestra topbar. Este sería su código:

```tsx
import { ReactNode } from 'react';
import Topbar from './topbar';

interface LayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Topbar />
      <main>{children}</main>
    </>
  );
};

export default RootLayout;
```

Después tenemos que instanciarlo en nuestro \_app.tsx y este Layout deberá contener a nuestro <Component>. El \_app.tsx quedaría así:

```tsx
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { TravelStoreProvider } from '@/providers/travel-store-provider';
import RootLayout from '@/components/layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Mis viajes</title>
      </Head>

      <TravelStoreProvider>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </TravelStoreProvider>
    </>
  );
}
```

Con esto ya estaría funcionando bien y podemos ir al siguiente paso.

### 8. Crea la funcionalidad de cancelar cambios.

Para cancelar cambios, lo que queremos es que nos elimine los datos nuevos que hayamos introducido, para eso simplemente tendremos que volver a rellenar el formulario o bien con los datos recibidos del store o bien con el objeto vacío. Así que como vamos a reutilizar el código del inicio vamos a crear un método fillForm que lo contenga. Además le añadiremos que si se llama al método y estamos en modo Añadir nuevo viaje, recargue el formulario con los valores del objeto por defecto:

```typescript
const fillForm = () => {
  const initialData =
    currentId === 0 ? structuredClone(defaultTravel) : currentTravel;

  if (initialData) {
    const currentType = initialData.image
      ? initialData.image.replace('/', '').replace('.webp', '')
      : NATURE_OPTION;
    const currentDateAsString = initialData?.date.toISOString().split('T')[0];
    setValue('id', initialData.id);
    setValue('city', initialData.city);
    setValue('country', initialData.country);
    setValue('dateAsString', currentDateAsString);
    setValue('description', initialData?.description);
    setValue('currentType', currentType);
  }
};

if (currentId > 0 && currentTravel) {
  fillForm();
}
```

Por último vamos a llamar a fillForm en nuestro onCancel:

```typescript
const onCancel = () => fillForm();
```

Te dejo por aquí todo el código de nuestro archivo [id].tsx:

```tsx
import styles from './TravelEdit.module.scss';
import { defaultTravel, TravelTypeOptions } from '../../data/Travel';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ITravel } from '@/types/Travel';
import { useRouter } from 'next/router';
import { useTravelStore } from '@/providers/travel-store-provider';
import { URLS } from '@/data/AppUrls';

interface ITravelEdit extends ITravel {
  currentType: string;
  dateAsString: string;
}

export default function Travels() {
  const NATURE_OPTION = 'nature';

  const router = useRouter();

  const { travelList, addTravel } = useTravelStore((state) => state);

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITravelEdit>({
    defaultValues: {
      ...structuredClone(defaultTravel),
      currentType: NATURE_OPTION,
    },
  });

  const currentId = Number(router.query.id as string);

  const currentTravel = travelList.find((travel) => travel.id === currentId);

  const fillForm = () => {
    const initialData =
      currentId === 0 ? structuredClone(defaultTravel) : currentTravel;

    if (initialData) {
      const currentType = initialData.image
        ? initialData.image.replace('/', '').replace('.webp', '')
        : NATURE_OPTION;
      const currentDateAsString = initialData?.date.toISOString().split('T')[0];
      setValue('id', initialData.id);
      setValue('city', initialData.city);
      setValue('country', initialData.country);
      setValue('dateAsString', currentDateAsString);
      setValue('description', initialData?.description);
      setValue('currentType', currentType);
    }
  };

  if (currentId > 0 && currentTravel) {
    fillForm();
  }

  const hasErrors = Object.keys(errors).length;

  const onSave: SubmitHandler<ITravelEdit> = (data: ITravelEdit) => {
    if (!hasErrors) {
      const isEdition = data.id !== 0;

      const currentId = !isEdition
        ? Math.max.apply(
            null,
            travelList.map((travel) => travel.id)
          ) + 1
        : data.id;

      const newTravel: ITravel = {
        id: currentId,
        description: data.description,
        city: data.city,
        country: data.country,
        date: new Date(data.dateAsString),
        image: `/${data.currentType}.webp`,
      };

      isEdition ? editTravel(newTravel, currentId) : addTravel(newTravel);

      router.push(URLS.LIST);
    }
  };

  const editTravel = (newTravel: ITravel, currentId: Number) => {
    const currentListIndex = travelList.findIndex(
      (travel) => travel.id === currentId
    );
    travelList[currentListIndex] = newTravel;
  };

  const onCancel = () => fillForm();

  return (
    <>
      <main className={styles.main}>
        <form className={styles.travelEdit}>
          <div className={styles.travelEdit__row}>
            <label htmlFor="type">Tipo de viaje:</label>

            <select
              className={
                errors.currentType
                  ? styles.travelEdit__rowFieldError
                  : styles.travelEdit__rowField
              }
              {...register('currentType', { required: true })}
            >
              {TravelTypeOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.travelEdit__row}>
            <label htmlFor="country">País:</label>

            <input
              className={styles.travelEdit__rowField}
              type="text"
              id="country"
              {...register('country')}
            />
          </div>

          <div className={styles.travelEdit__row}>
            <label htmlFor="city">Ciudad:</label>

            <input
              className={
                errors.city
                  ? styles.travelEdit__rowFieldError
                  : styles.travelEdit__rowField
              }
              type="text"
              id="city"
              {...register('city', { required: true, minLength: 3 })}
            />
          </div>

          <div className={styles.travelEdit__row}>
            <label htmlFor="date">Fecha:</label>

            <input
              className={
                errors.date
                  ? styles.travelEdit__rowFieldError
                  : styles.travelEdit__rowField
              }
              type="date"
              id="date"
              {...register('dateAsString', { required: true })}
            />
          </div>

          <div className={styles.travelEdit__row}>
            <label htmlFor="description">Descripción:</label>

            <textarea
              className={styles.travelEdit__rowField}
              id="description"
              rows={20}
              {...register('description')}
            ></textarea>
          </div>

          <label className={styles.travelEdit__error}>
            {hasErrors ? 'Completa los campos obligatorios' : ''}
          </label>
        </form>

        <div className={styles.travelEdit__actions}>
          <button
            className={styles.travelEdit__actionsSecondaryBtn}
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className={styles.travelEdit__actionsBtn}
            onClick={handleSubmit(onSave)}
          >
            Guardar
          </button>
        </div>
      </main>
    </>
  );
}
```

Y con esto, todo listo!

### 9. ¿Qué nos falta?

Pues este ejemplo no estaría listo para desplegar sin que añadamos varios puntos indispensables:

- Testing, lo suyo sería añadir tests tanto unitarios como end-to-end para asegurar el correcto funcionamiento. No nos vamos a meter aquí porque sobre todo, tienes a continuación el pulpoCon un taller muy interesante sobre ello.
- Revisar la accesibilidad y añadir las ARIAs necesarias. Te recomendamos encarecidamente que le dediques un tiempo.
- Realmente no hemos necesitado usar ningún useEffect que actúan como "escuchadores", puedes echarles un vistazo a la [documentación oficial](https://react.dev/reference/react/useEffect)
