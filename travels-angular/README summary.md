## Paso a paso taller

### 1. Entendemos la arquitectura base

### 2. Como funciona el enrutamiento

### 3. Añade funcionalidad a los botones de la Home

Comenzamos con algo sencillo, como hemos visto antes, podríamos enlazar desde la Home tanto la pantalla del listado de viajes. Como la de añadir uno nuevo con un elemento de tipo `RouterLink`, pero como lo que queremos es que sea un botón y que tenga esta apariencia, vamos a usar un botón. 


Vamos con el paso a paso de hacer funcionar el botón "Ver viajes":

1. En primer lugar necesitamos que el botón detecte el evento click. En angular los eventos se indican encerrandolos entre parentesis, en este caso seria:

```html
<button class="home__actions-btn" (click)="goTo('travels')">Ver viajes</button>
```

2. Ahora necesitamos crear ese método dentro de nuestro component de la home, para ello declaramos nuestro método de la siguiente manera:

```typescript
  goTo(url: string): void {
    console.log('navegamos a ', url);
  }
```

3. Si ejecutamos ahora nuestra aplicación podremos ver por consola el mensaje que hemos escrito cuando hacemos click en el botón.

4. Ahora vamos a crear un enumerado con las rutas apropiadas según el parámetro que pasemos. Esto puede ser un dato que se use en varias pantallas o componentes, así que lo mejor será crearlo en un sitio compartido. Así que dentro de la carpeta app, vamos a crear la carpeta data y dentro el archivo `urls.ts`. En el crearemos el enumerado de strings:

```typescript
export enum URLS {
  LIST = "/travels",
  EDIT = "/travel-edit/",
  ADD = "/travel-edit/0",
  HOME = "/",
}
```

El siguiente paso es importarlo en nuestra página Home. También necesitaremos importar el elemento Router:

```typescript
import { Router } from "@angular/router";
import { URLS } from "../../data/urls";
```

Deberemos crear una propiedad en el componente para usar el enum en nuestro html y en el constructor del componente añadir el Router, quedaría así:

```typescript
  urlsEnum = URLS;
  constructor(private router: Router) {}
```

5. Ahora modificaremos nuestro método goTo para usar el metodo `navigate` que nos proporcinar el elemento Router de angular para navegar:

```typescript
  goTo(url: string): void {
    this.router.navigate([url]);
  }
```

6. Vamos a añadir el evento click al otro botón, con su enumerado específico (acuerdate de modificar el 'travels' del anterior botón por un valor correcto del enumerado):

```html
<button class="home__actions-secondary-btn" (click)="goTo(urlsEnum.ADD)">Nuevo viaje</button>
```

7. El archivo home.component.html al final nos quedará así:

```html
<div class="home">
  <img class="home__image" src="images/Pulpi-Angular.png" alt="logo de angular encima del pulpo de la pulpoConf" />

  <q class="home__quote">La vida, o es una aventura o no es nada</q>
  <p class="home__subquote">Hellen Keller</p>

  <div class="home__actions">
    <button class="home__actions-secondary-btn" (click)="goTo(urlsEnum.ADD)">Nuevo viaje</button>
    <button class="home__actions-btn" (click)="goTo(urlsEnum.LIST)">Ver viajes</button>
  </div>
</div>
```

8. El archivo home.component.ts al final nos quedará así:

```typescript
import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { URLS } from "../../data/urls";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  urlsEnum = URLS;
  constructor(private router: Router) {}

  goTo(url: string): void {
    this.router.navigate([url]);
  }
}
```

### 4. Vincula el listado con datos almacenados en frontend

Lo primero de todo, vamos a ver que tenemos en el listado. Partimos de que llamamos al componente TravelDetail en el siguiente código en el fichero `travel-list.component.html`:

```html
<div class="travel-list__travel">
  <app-travel-detail></app-travel-detail>
</div>
```

Si vemos el componente TravelDetail veremos que tenemos en el html introducidos los datos, "a piñón". Así que lo primero que vamos a hacer es crearnos un archivo con los datos de inicio, los cuales vamos a tipar. Así que vamos a comenzar por añadir en la carpeta `app` la carpeta `types` junto la carpeta `data`. Dentro de ambas carpetas añadimos el archivo travel.ts. En el de types, creamos la siguiente interfaz:

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

Luego en el de data, añadimos el siguiente array con los datos del viaje que tenemos en TravelDetail (acordaros de importar el interface del tipo ITravel):

```typescript
import { ITravel } from "../types/travel";

export const myTravels: ITravel[] = [
  {
    id: 1,
    country: "EEUU",
    description: `Viaje sorpresa a Nueva York en Enero para descubrir la ciudad. En el
          viaje no nos nevó y pudimos visitar varios museos: el de Ciencias
          Naturales, el MOMA, el MET. También pudimos ver la Estatua de La
          Libertad e ir de compras.`,
    city: "Nueva York",
    date: new Date("2020-01-21"),
    image: "images/city.webp",
  },
];
```

El siguiente paso es vincular los datos del objeto con los campos del HTML en el fichero `travel-detail.component.html`. Así que primero (momentáneamente porque luego los vamos a traer del listado), importamos el objeto desde el archivo ts en el fichero `travel-detail.component.ts`. Vamos a crear una variable que contenga el primer viaje de nuestro listado y para la fecha usaremos una [pipe de fecha](https://angular.dev/api/common/DatePipe?tab=usage-notes).

Quedaria de momento así el fichero `travel-detail.component.ts`:

```typescript
import { Component } from "@angular/core";
import { DatePipe } from "@angular/common";
import { ITravel } from "../../types/travel";
import { myTravels } from "../../data/travel";

@Component({
  selector: "app-travel-detail",
  standalone: true,
  imports: [DatePipe],
  templateUrl: "./travel-detail.component.html",
  styleUrl: "./travel-detail.component.scss",
})
export class TravelDetailComponent {
  currentTravel: ITravel = myTravels[0];
}
```

Ahora ya sólo nos queda vincular el HTML con los datos del componente y como sabrás, cada framework tiene su sintaxis.

Para el caso de angular haremos lo siguiente:

- Usaremos la propiedad `currentTravel` rodeada por doble llaves tanto para asignarlo a la propiedad `src` de la tag de imagen como para el texto que va en los span:

```html
<img alt="imagen de viaje" class="travel-detail__image" src="{{currentTravel.image}}" />
```

```html
<div class="travel-detail__text-wrapper">
  <span class="travel-detail__main-text">Country:</span>
  <span>{{currentTravel.country}}</span>
</div>
```

- Para la fecha como comentamos usaremos la pipe de date de la siguiente manera:

```html
<div class="travel-detail__text-wrapper">
  <span class="travel-detail__main-text">Date:</span>
  <span>{{currentTravel.date| date:"short"}}</span>
</div>
```

Con esto ya puedes completar todas las propiedades, nos quedaría algo asi el html.

```html
<div class="travel-detail">
  <div class="travel-detail__actions">
    <button class="travel-detail__actions-edit">Edit</button>
  </div>

  <img alt="imagen de viaje" class="travel-detail__image" src="{{currentTravel.image}}" />

  <div class="travel-detail__text-wrapper">
    <span class="travel-detail__main-text">Country:</span>
    <span>{{currentTravel.country}}</span>
  </div>

  <div class="travel-detail__text-wrapper">
    <span class="travel-detail__main-text">City:</span>
    <span>{{currentTravel.city}}</span>
  </div>

  <div class="travel-detail__text-wrapper">
    <span class="travel-detail__main-text">Date:</span>
    <span>{{currentTravel.date| date:"dd/MM/yyyy hh:mm a"}}</span>
  </div>

  <div class="travel-detail__text-wrapper travel-detail__text-wrapper--description">
    <span class="travel-detail__main-text">Description:</span>
    <span>{{currentTravel.description}}</span>
  </div>
</div>
```

Si ejecutas, verás que no ha cambiado la visualización pero ahora ya está cogiendo los datos del objeto. De todas formas, realmente no lo podemos dejar así, sino que TravelDetail deberá recibir los datos mediante una propiedad, para poder reusarlo con cada viaje.

A continuación lo que haremos sera modificar el componente para recibir una propiedad desde el elemento padre que lo instancie.

Para ello en angular se usa el [binding](https://angular.dev/guide/templates/two-way-binding#), el binding puede ser bidireccional. Uno el que recibe información y otro el que la emite y asi manejar propiedades y eventos.

Así que vamos a definirle las propiedades que va a recibir. Para ello usaremos la tag reservada `@Input()` para indicar que recibiremos un objeto de tipo `ITravel`

```typescript
  @Input() currentTravel!: ITravel;
```

Tenemos que recordar importar `Input` desde la libreria core de angular:

```typescript
import { Component, Input } from "@angular/core";
```

Nos quedaría asi el componente:

```typescript
import { Component, Input } from "@angular/core";
import { DatePipe } from "@angular/common";
import { ITravel } from "../../types/travel";

@Component({
  selector: "app-travel-detail",
  standalone: true,
  imports: [DatePipe],
  templateUrl: "./travel-detail.component.html",
  styleUrl: "./travel-detail.component.scss",
})
export class TravelDetailComponent {
  @Input() currentTravel!: ITravel;
}
```

Ahora nos falta pasarle el viaje concreto al componente desde el componente travel-list, como en este tendremos un listado de viajes deberemos generar 'x' componentes de travel-detail como elemento de viaje tengamos en la lista, para ello en angular lo podemos hacer de la siguiente manera:

- Usando la directiva [NgFor](https://angular.dev/api/common/NgFor?tab=usage-notes)

- Usando el nuevo sistema de ([Condicionales y bucles en angular](https://angular.dev/essentials/conditionals-and-loops)) mediante `@for`

Para comenzar importaremos en el componente `travel-list.component.ts` el fichero `myTravels` con el listado de viajes.

```typescript
import { Component } from "@angular/core";
import { TravelDetailComponent } from "../../components/travel-detail/travel-detail.component";
import { ITravel } from "../../types/travel";
import { myTravels } from "../../data/travel";

@Component({
  selector: "app-travel-list",
  standalone: true,
  imports: [TravelDetailComponent],
  templateUrl: "./travel-list.component.html",
  styleUrl: "./travel-list.component.scss",
})
export class TravelListComponent {
  travelList: ITravel[] = myTravels;
}
```

Ahora modificaremos el html en `travel-list.component.html` 

- Usando `@for`:

Para este caso no necesitamos añadir ningún import en el componente por lo que este lo deberiamos tener como sigue:

```typescript
import { Component } from "@angular/core";
import { TravelDetailComponent } from "../../components/travel-detail/travel-detail.component";
import { ITravel } from "../../types/travel";
import { myTravels } from "../../data/travel";

@Component({
  selector: "app-travel-list",
  standalone: true,
  imports: [TravelDetailComponent],
  templateUrl: "./travel-list.component.html",
  styleUrl: "./travel-list.component.scss",
})
export class TravelListComponent {
  travelList: ITravel[] = myTravels;
}
```

En nuestro html, `travel-list.component.html`, usaremos el @for de la siguiente manera:

```html
<div class="travel-list">
  <button class="travel-list__add">New Travel</button>

  <div class="travel-list__wrapper">
    @for (travel of travelList; track travel.id) {
    <div class="travel-list__travel">
      <app-travel-detail [currentTravel]="travel"></app-travel-detail>
    </div>
    } @empty {
    <span>No hay viajes.</span>
    }
  </div>
</div>
```

- El `@empty` es opcional pero podemos ver que de la forma actual es más facil el controlar el mensaje si el listado estuviera vacio.

Con esto si ejecutas verás que ya funciona a la perfección. Pruébalo añadiendo un nuevo viaje al archivo data.

### 5. Vamos a añadir lógica y validaciones al formulario.

Para ello comenzaremos trabajando en el componente de `travel-edition`.
Lo idóneo es que tuviésemos el formulario en otro componente aparte, pero para este taller vamos a simplificar y dejarlo en la misma vista. Lo primero que vamos a necesitar son variables en las que guardar los datos del formulario, así que vamos a crear un objeto de tipo IDate que se inicializará con un valor por defecto vacío y también un tipo de viaje. Así que antes de nada vamos a crear en el archivo `app/data/travel.ts`, un objeto ITravel vacío:

```typescript
export const defaultTravel: ITravel = {
  id: 0,
  country: "",
  description: "",
  city: "",
  date: new Date(),
  image: "",
};
```

Ahora en `travel-edition.component.ts` vamos añadir dos nuevas propiedades:

```typescript
currentTravel: ITravel = defaultTravel;
currentType: string = "";
```

Deberemos de acordarnos de añadir las importaciones para `ITravel` y `defaulTravel`:

```typescript
import { ITravel } from "../../types/travel";
import { defaultTravel } from "../../data/travel";
```

- Antes de continuar para facilitarnos a lo largo del tiempo el trabajo, haremos algunos cambios para cambiar el formulario actual al uso de un formulario de angular. En angular existen dos tipos de [formulario](https://angular.dev/guide/forms) pero en nuestro caso usaremos el [formulario de tipo reactivo](https://angular.dev/guide/forms/reactive-forms) junto un `grupo de formulario` que tiene más sentido al editar las propiedades de un objeto; para ello haremos los siguientes pasos:

  - Importaremos el modulo para el formulario reactivo `ReactiveFormsModule` añadiendolo en la seccion de `imports` de nuestro componente `travel-edition.component.ts`.

  - Crearemos una propiedad llamada `travelForm` que sera de tipo `FormGroup`:

    ```typescript
    travelForm = new FormGroup({});
    ```

  - Asociaremos el formulario de angular con el formulario en el html añadiendo `formGroup` en la etiqueta `<form`:

    ```html
    <form [formGroup]="travelForm" class="travel-edit"></form>
    ```

  - Ahora crearemos propiedades de tipo `FormControl` por cada propiedad de la interfaz travel (menos el id) al crear el objeto `FormGroup` por ejemplo de la siguiente manera:

    ```typescript
    travelForm = new FormGroup({
      id: new FormControl(this.currentTravel.id),
      country: new FormControl(this.currentTravel.country),
      description: new FormControl(this.currentTravel.description),
      city: new FormControl(this.currentTravel.city, [Validators.required, Validators.minLength(3)]),
      date: new FormControl(this.currentTravel.date.toISOString().split("T")[0], Validators.required),
      image: new FormControl(this.currentTravel.image),
    });
    ```

    Al crear cada FormControl estamos usando el currentTravel que seria el viaje por defecto para inicializar cada propiedad del formulario.

  - Ahora tenemos que relacionar cada input en nuestro form del html con cada una de las anteriores propiedades del formulario, para ello usaremos `formControlName`, por ejemplo:

    ```html
    <input class="travel-edit__row-field" type="text" id="city" name="city" formControlName="city" />
    ```

Ahora que tenemos lo básico del formulario montado, vamos a pensar... ¿qué necesitamos hacer con el combo?
Por un lado, no es una propiedad que se guarde en el objeto, el tipo de viaje, sino que es una propiedad que sirve para saber que tipo de foto asociar: playa, campo o ciudad.

Así que vamos a vincular el combo con la propiedad currentType que hemos creado; para ello usaremo la propiedad `ngModel` de angular e indicandole que sera bidireccional el binding de esta (deberemos sacar el select del formulario para evitar errores de conflicto entre el uso del ngModel y el form). Quedaria algo así:

```html
<select [(ngModel)]="currentType" class="travel-edit__row-field" name="select"></select>
```

Y en el componente `travel-edition.component.ts` deberemos añadir a los imports del componente el modulo `FormsModule` e importarlo.

```typescript
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
```

```typescript
imports: [ReactiveFormsModule, FormsModule];
```

Ahora añadiremos más opciones la combo; lo primero es crear un tipo para el objeto opción, así que vamos a `app/types` y creamos el archivo `general.ts` con la siguiente interfaz:

```typescript
export interface ComboboxOption {
  id: string;
  value: string;
}
```

Y vamos a crear nuestras opciones en el archivo `app/data/travel.ts`, (no te olvides de importar correctamente la nueva interfaz):

```typescript
import { ComboboxOption } from "../types/general";

export const TravelTypeOptions: ComboboxOption[] = [
  {
    id: "city",
    value: "Cultural",
  },
  {
    id: "nature",
    value: "Naturaleza salvaje",
  },
  {
    id: "beach",
    value: "Desconexión relax",
  },
];
```

Ahora que ya las tenemos, vamos crearnos una propiedad en nuestro componente para usar las opciones creadas:

```typescript
  travelTypeOptions: ComboboxOption[] = TravelTypeOptions;
```

Acordaros de importar `TravelTypeOptions`:

```typescript
import { defaultTravel, TravelTypeOptions } from "../../data/travel";
```

Ahora como ya hicimos anteriormente usando el `@for` de angular en nuestro html crearemos un bucle para generar en nuestro combo las diferentes opciones, quedando asi el select:

```typescript
  <select [(ngModel)]="currentType" class="travel-edit__row-field" name="select">
    @for (option of travelTypeOptions; track option.id) {
    <option [value]="option.id">{{option.value}}</option>
    }
  </select>
```

Supuestamente ya tenemos vinculados los distintos campos con el formulario pero ¿cómo lo comprobamos? Pues vamos a añadir "funcionalidad" a los botones.

En este caso con el formulario de angular según tenemos declarados los dos botones del formulario con sus type es suficiente al tener el de type `reset` y el de type `submit` en cuanto se pulsen el formulario de angular reseteara los campos o lanzara la llamada a la accion asignada en el `ngSubmit` del form.

- Para ello haremos lo siguiente:

  - Indicaremos la opción para guardar el formulario, para ello añadimos `(ngSubmit)="onSubmit()"` en la etiqueta `<form`:

    ```html
    <form [formGroup]="travelForm" (ngSubmit)="onSave()" class="travel-edit"></form>
    ```

  - Crearemos la funcion `onSave()` en nuestro componente así inicialmente:

    ```typescript
      onSave(): void {
        console.info(`Ha actualizado el viaje ${this.travelForm.value} con el tipo de image ${this.currentType}`);
      }
    ```

Ahora si lo pruebas, verás que al apretar alguno de los dos botones, tenemos la funcionalidad que esperamos.

Pero, ¿no sería interesante tener validaciones?, para ello nos apoyaremos en angular.

Lo primero que podemos hacer es modificar el botón submit para que se deshabilite si en el formulario hay algún error; para ello añadiremos `[disabled]="!travelForm.valid"` al botón.

```html
<button [disabled]="!travelForm.valid" class="travel-edit__actions-btn" type="submit">Guardar</button>
```

Ahora que ya lo tenemos, vamos a decidir que validaciones ponemos. Las esenciales serían las de campos obligatorios que en nuestro caso en el objeto tenemos que deben ser la fecha y la ciudad.

Añadiremos también el tipo y vamos a probar a poner que la ciudad necesite al menos 3 caracteres.

Así que vamos a importar `Validators` de angular forms al componente.

```typescript
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
```

- Añadiremos las validaciones de `required` a las propiedades de fecha y ciudad, para ello le pasaremos el parametro `Validators.required` cuando creamos los objetos `FormControl`, (podemos añadir el atributo `required` en cada elemento input para mantener los temas de accesiblidad):

```typescript
  city: new FormControl(this.currentTravel.city, Validators.required),
  date: new FormControl(this.currentTravel.date, Validators.required),
```

- Añadiremos ahora la validación de 3 caracteres minimo al campo ciudad, como ya teniamos la de Required, al tener que indicarle más de una al crear el objeto FormControl se le pasara un array con validaciones. Para indicar la longitud minima usaremos ` Validators.minLength(3)` quedando así:

  ```typescript
    city: new FormControl(this.currentTravel.city, [Validators.required, Validators.minLength(3)]),
  ```

- Para añadir validaciones al campo tipo de viaje, lo convertiremos tambien en un `FormControl` pero que estara fuera del formulario:

  ```typescript
  travelType = new FormControl("", Validators.required);
  ```

  Le añadimos ahora a la tag del select `[formControl]="travelType"` para relacionarlo con el FormControl y eliminamos la propiedad `ngModel` que se habia incluido antes. Quedaria algo así:

  ```html
  <select [formControl]="travelType" class="travel-edit__row-field" name="select">
    @for (option of travelTypeOptions; track option.id) {
    <option [value]="option.id">{{option.value}}</option>
    }
  </select>
  ```

  Y podemos volver a incluir el select dentro del form del html y eliminar el modulo `FormsModule` como la propiedad que teniamos llamda `currentType` de nuestro componente.

  Modificaremos el método `onSave()` para poder visualizar el dato del tipo de viaje reemplazando `this.currentType` por `this.travelType.value`.

  Modificaremos el bóton submit para que tenga en cuenta las validaciones del tipo de viaje para que lo deshabilite añadiendo `|| !travelType.valid`:

  ```html
  [disabled]="!travelForm.valid || !travelType.valid"
  ```

Además para enterarnos de que hay errores, vamos a poner debajo de los botones un mensaje de texto que sólo se muestre si hay errores. Para esto usaremos la sintaxis de condicionales de angular usando `@if`:

```html
@if (!travelForm.valid || !travelType.valid) {
<span class="travel-edit__error"> Completa los campos obligatorios </span>
}
```

Crearemos la clase \_\_error, que tenga color y border-color (porque la aprovecharemos para los componentes) de valor "red", lo añadiremos a `travel-edition.component.scss`:

```css
&__error {
  color: red;
  border-color: red;
}
```

Para aplicar esta clase a nuestros campos del formulario que tengan validaciones modificaremos los input en el html para añadirle la clase anterior de forma condicional según tengan errores o no con `[ngClass]="{'travel-edit__error': travelForm.controls['city'].invalid}"` quedando asi:

```html
<input class="travel-edit__row-field" [ngClass]="{'travel-edit__error': travelForm.controls['city'].invalid}" type="text" id="city" name="city" formControlName="city" required /> <input class="travel-edit__row-field" [ngClass]="{'travel-edit__error': travelForm.controls['date'].invalid}" type="date" id="date" name="date" formControlName="date" required />
```

En el caso del tipo de viaje al ser directamente un FormControl quedaria así:

```html
<select [formControl]="travelType" class="travel-edit__row-field" [ngClass]="{'travel-edit__error': travelType.invalid}" name="select" required></select>
```

Anteriormente habiamos introducido funcionalidad para deshabilitar el botón, ahora para que se distinga que el botón está deshabilitado añadimos los estilos de disabled a los del actions-btn en `travel-edition.component.scss`:

```css
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

Antes de comenzar a vincular el formulario con los datos recibidos... ¿No estaría bien tener los datos almacenados en el frontend durante la sesión? Para ello y para facilitar el código nos haremos un propio store en angular apoyandonos en `rxjs`.

- Lo primero dentro de la carpeta app nos creamos una nueva carpeta `store`
- Dentro de la carpeta store nos creamos un fichero llamado `store.service.ts`, podemos colocarnos por terminal en la carpeta y usar angular cli para ello `ng g service Store`, esto nos creara el fichero para el store y para los test del mismo. Una vez creado `store.service.ts` su contenido deberia ser:

  ```typescript
  import { Injectable } from "@angular/core";

  @Injectable({
    providedIn: "root",
  })
  export class StoreService {
    constructor() {}
  }
  ```

- Para empezar generaremos el código para guardar el listado de viajes:

* Crearemos la propiedad donde se almacenara el listado de viajes, para ello creamos la propiedad `travelListStore` del tipo `BehaviorSubject` y la inicializamos:

  ```typescript
    private travelListStore: BehaviorSubject<ITravel[]> = new BehaviorSubject<ITravel[]>([]);
  ```

* Ahora crearemos dos regiones para separar los getters y los setters del store

  ```typescript
  //#region getters
  //#endregion getters

  //#region setters
  //#endregion setters
  ```

* Ahora vamos a crear el get para obtener un `obervable` de la propiedad `travelListStore` que hemos creado anteriormente; con esto conseguimos que donde necesitemos usar la lista de viajes detectemos cualquier cambio en ella.

  ```typescript
    getTravelList(): Observable<ITravel[]> {
      return this.travelListStore.asObservable();
    }
  ```

* Ahora crearemos el set para actualizar el listado de viajes desde cualquier punto de la aplicación recibiendolo como parametro.

  ```typescript
    setTravelList(newTravelList: ITravel[]): void {
      this.travelListStore.next(newTravelList);
    }
  ```

Una vez que ya lo tenemos, vamos a usarlo. En primer lugar nos vamos al listado de viajes, `src/app/views/travel-list/travel-list.component.ts` y aquí en lugar de importar los viajes del archivo data, nos lo vamos a traer del store.

- Para ello modificaremos el componente para añadir el constructor del componente y el metodo `ngOnInit()` del [ciclo de vida](https://angular.dev/guide/components/lifecycle#) de angular. Añadiremos `implements OnInit` a la clase y el método citado quedando así:

  ```typescript
  import { Component, OnInit } from "@angular/core";
  import { TravelDetailComponent } from "../../components/travel-detail/travel-detail.component";
  import { ITravel } from "../../types/travel";
  import { myTravels } from "../../data/travel";

  @Component({
    selector: "app-travel-list",
    standalone: true,
    imports: [TravelDetailComponent],
    templateUrl: "./travel-list.component.html",
    styleUrl: "./travel-list.component.scss",
  })
  export class TravelListComponent implements OnInit {
    travelList: ITravel[] = myTravels;

    constructor() {}

    ngOnInit(): void {}
  }
  ```

- Ahora importamos el `StoreService` y lo inyectamos en el constructor:

  ```typescript
    import { StoreService } from '../../store/store.service';

    constructor(private storeService: StoreService) {
    }
  ```

- Ahora en el método onInit vamos a llamar al `getTravelList` del StoreService para subscribirnos a él y asignar la respuesta a nuestra propiedad `travelList`.

  - Para ello cambiaremos la propiedad `travelList: ITravel[] = myTravels;` a `travelList: ITravel[] = [];`

  - El método `ngOnInit()` quedaria así:

    ```typescript
      ngOnInit(): void {
        this.storeService.getTravelList().subscribe({
          next: (response: ITravel[]) => {
            if (response) {
              this.travelList = response;
            }
          }, error: (error: any) => {
            this.travelList = [];
          }
        });
      }
    ```

Como el nombre del listado no lo hemos tocado, el HTML no sufre ningún cambio.

- Ahora iniciaremos la store del listado en el app.component.ts en el método ngOnInit (añadiremos este junto el constructor si no lo tiene como en los pasos anteriores), en un caso real el store se informaria donde realizaramos la llamada a la API para obtener el listado. Para ello importaremos `import { myTravels } from './data/travel';` desde el fichero travel de data.

  ```typescript
  import { Component, OnInit } from "@angular/core";
  import { RouterOutlet } from "@angular/router";
  import { TopBarComponent } from "./components/top-bar/top-bar.component";
  import { StoreService } from "./store/store.service";
  import { myTravels } from "./data/travel";

  @Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, TopBarComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
  })
  export class AppComponent implements OnInit {
    title = "";

    constructor(private storeService: StoreService) {}

    ngOnInit(): void {
      this.storeService.setTravelList(myTravels);
    }
  }
  ```

Ahora lo que queremos es poder editar un viaje, para eso en `src/app/components/travel-detail ` tenemos que añadirle funcionalidad al botón Editar.

Será similar a lo que hicimos en la home, usando el router y su método navigate. En este caso además de la url como parametro le pasaremos el id del viaje.

- Creamos la funcion `onEdit`:

  ```typescript
      goTo(): void {
        this.router.navigate([this.urlsEnum.EDIT, { id: this.currentTravel.id }]);
      }
  ```

- Acordaros de importar el enum `URLS`, el Router; el componente quedaria así:

  ```typescript
  import { Component, Input } from "@angular/core";
  import { DatePipe } from "@angular/common";
  import { ITravel } from "../../types/travel";
  import { Router } from "@angular/router";
  import { URLS } from "../../data/urls";

  @Component({
    selector: "app-travel-detail",
    standalone: true,
    imports: [DatePipe],
    templateUrl: "./travel-detail.component.html",
    styleUrl: "./travel-detail.component.scss",
  })
  export class TravelDetailComponent {
    @Input() currentTravel!: ITravel;
    urlsEnum = URLS;

    constructor(private router: Router) {}

    goTo(): void {
      this.router.navigate([this.urlsEnum.EDIT, this.currentTravel.id]);
    }
  }
  ```

- En el html añadimos el método `goTo` al botón `Edit`

  ```html
  <button class="travel-detail__actions-edit" (click)="goTo()">Edit</button>
  ```

Por último tenemos que modificar la vista del formulario en `travel-detail` para que en lugar de inicializar siempre un viaje vacío, tome el que corresponda.

Para ello, por un lado usaremos el `ActivatedRoute` de angular para recuperar el id desde la url.

Y por otro lado modificaremos el store para recuperar un viaje por id y actualizar un viaje del listado.

- Para añadir el `ActivatedRoute`, añadiremos a `travel-edition.component.ts` el constructor y el ngOnInit. En el constructor le añadiremos como parametro `private route: ActivatedRoute` e importamos el ActivatedRoute. Y en el `ngOnInit` nos subscribiremos al observable `params` del ActivatedRouted para obtener el id del viaje. Quedaria asi:

  ```typescript
    import { ActivatedRoute } from '@angular/router';

    ...

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = params['id'];
      });
    }
  ```

- Ahora añadiremos al constructor `private storeService: StoreService` para acceder al store y recuperar un viaje por id; para esto añadiremos en `store.service.ts` un nuevo get que nos retorne el viaje que coincida en la lista de viajes con el id pasado por parametro.

  ```typescript
    getTravelById(id: number): ITravel | undefined {
      return this.travelListStore.value.find(travel => travel.id === id);
    }
  ```

- Antes de continuar haremos algunas modificaciones en el componente para que `currentTravel` no se le asigne el `defaultTravel` por defecto y asi asignarle más adelante este valor por defecto o el recuperado por id:

  ```typescript
    currentTravel?: ITravel;
  ```

- Al hacer el anterior cambio, puede que durante un pequeño tiempo el currentTravel no tenga información, por lo que modificaremos el html para ponerle `@If` como ya hicimos anteriormente para envolver el form y cargue el formulario cuando el currentTravel tenga información.

  ```html
  @if (currentTravel) {
  <form [formGroup]="travelForm" (ngSubmit)="onSave()" class="travel-edit">....</form>
  }
  ```

- Tambien modificaremos la creación del formulario para crear este cuando inicialicemos el `currentTravel` en el ngOnInit, asi que añadiremos al anterior `@if` que tambien debe existir el formulario y cambiaremos:

  ```typescript
  travelForm = new FormGroup({
    id: new FormControl(this.currentTravel.id),
    country: new FormControl(this.currentTravel.country),
    description: new FormControl(this.currentTravel.description),
    city: new FormControl(this.currentTravel.city, [Validators.required, Validators.minLength(3)]),
    date: new FormControl(this.currentTravel.date.toISOString().split("T")[0], Validators.required),
    image: new FormControl(this.currentTravel.image),
  });
  ```

  por

  ```typescript
    travelForm?: FormGroup;
  ```

  y el `@if` en el html quedaria asi: `@if (currentTravel && travelForm)`

- Una vez que tenemos añadido al constructor el store, modificaremos en ngOnInit la subscripcion al params del ActivatedRoute para añadir el obtener el viaje por id llamando al store y crear el formulario.

  ```typescript
      ngOnInit(): void {
        this.route.params.subscribe(params => {
          const id = +params['id'];

          if (id === 0) {
              this.currentTravel = defaultTravel;
          } else {
            this.currentTravel = this.storeService.getTravelById(id) ?? defaultTravel;
          }

          this.travelForm = new FormGroup(
            {
              id: new FormControl(this.currentTravel.id),
              country: new FormControl(this.currentTravel.country),
              description: new FormControl(this.currentTravel.description),
              city: new FormControl(this.currentTravel.city, [Validators.required, Validators.minLength(3)]),
              date: new FormControl(this.currentTravel.date.toISOString().split('T')[0], Validators.required),
              image: new FormControl(this.currentTravel.image),
            }
          );
        });
      }
  ```

Si lo ejecutas, comprobarás que se levanta sin problemas pero no se rellena el tipo de viaje ¿por qué?. Pues porque es un campo calculado que depende de la imagen que tengamos cargada, así que vamos a tener que calcularlo en el ngOnInit cuando se recupere un viaje por id.

La forma "fácil" es tomar la ruta de la imagen y como el tipo corresponde con el nombre, quitamos la parte de la ruta relativa y también la extensión y nos quedamos sólo con el string del tipo, que asignaremos al value del FormCongrol del tipo de imagen:

```typescript
const currentTravelType = this.currentTravel.image ? this.currentTravel.image.replace("images/", "").replace(".webp", "") : "";
this.travelType.setValue(currentTravelType);
```

Con esto ya estás visualizando todos tus datos.

### 7. Crea la funcionalidad de guardar cambios.

Te estarás planteando, que si al funcionar de forma reactiva al cambiar cualquier campo ya se actualizaria la lista de viajes con los cambios. La respuesta es si por como se obtiene el viaje por id en la pantalla de detalle pero como trabajamos con un formulario al modificar el formulario estos cambios no los detecta directamente el objeto recuperado de viaje.

Por ello modificaremos nuestro método `onSave` para cuando lo pulsemos guardar los cambios del formulario actualizados en el objeto recuperado o añadir el objeto si se trata de uno nuevo.

- Antes en el store crearemos un nueva funcion `addTravel` para añadir un nuevo viaje al listado.

  ```typescript
    addTravelList(newTravelList: ITravel): void {
      const newId = Math.max(...this.travelListStore.value.map(travel => { return travel.id })) + 1;
      newTravelList.id = newId;
      this.travelListStore.value.push(newTravelList);
    }
  ```

- Luego modificaremos el `onSave`:

  ```typescript
      onSave(): void {
        if (this.travelForm && this.travelForm.value) {
          const newUpdateTravel = this.travelForm.value as ITravel;

          newUpdateTravel.image = `images/${this.travelType.value}.webp`;
          newUpdateTravel.date = new Date(newUpdateTravel.date);

          if (newUpdateTravel.id === 0) {
            this.storeService.addTravelList(newUpdateTravel);
          } else if (this.currentTravel) {
            this.currentTravel.id = newUpdateTravel.id;
            this.currentTravel.country = newUpdateTravel.country;
            this.currentTravel.description = newUpdateTravel.description;
            this.currentTravel.city = newUpdateTravel.city;
            this.currentTravel.date = newUpdateTravel.date;
            this.currentTravel.image = newUpdateTravel.image;
          }

          this.routerHelper.goTo(URLS.LIST);
        }
      }
  ```

Por último, nos gustaría que al añadir/editar volviese a la página al listado, así que deberemos de nuevo trabajar con el router.navigate pero ¿para qué repetir código?. Así que vamos a ir a la home, coger el método de goTo y llevarlo a un helper.

- En la carpeta `app` creamos una carpeta `helpers` y dentro crearemos el servicio `router.service.ts`, (se puede crear via comando `ng g service routerHelper`)

- Ahora migraremos cierto código que tenemos en el componente `home.component.ts` y donde teniamos el método `goTo`.

- Copiamos el constructor `constructor(private router: Router) { }`

- Copiamos el método `goto`:

  ```typescript
      goTo(url: string, param?: unknown): void {
        const commands = param ? [url, param] : [url];
        this.router.navigate(commands);
      }
  ```

  El `param` que es opcional es para que la función nos sirva para cuando tengamos que navegar a una url que le pasamos un parametro como era el caso de `travel-detail.component.ts`:

  ```typescript
  this.router.navigate([this.urlsEnum.EDIT, this.currentTravel.id]);
  ```

- Ahora nos queda importar el helper `RouterHelperService` en los componentes donde estuvieramos usando el `router.navigate` para reemplazarlo por el del helper.

- Por ejemplo en el `travel-edition.component.ts` lo usaremos de la siguiente manera en el método `onSave`:

  - Pasarlo como parametro en el contructor: `constructor(private route: ActivatedRoute, private storeService: StoreService, private routerHelper: RouterHelperService)` e importarlo.

  - Importar desde `app/data` el enum de `URLS`: `import { URLS } from '../../data/urls';`;

  - Añadir en el método onSave la llamada al goTo: `this.routerHelper.goTo(URLS.LIST);`;

- Con el anterior ejemplo podemos intentar reemplazar los `router.navigate` para usar el helper.

  - Por ejemplo en la home, modificariamos así el componente:

    ```typescript
    import { Component, inject } from "@angular/core";
    import { URLS } from "../../data/urls";
    import { RouterHelperService } from "../../helpers/router-helper.service";

    @Component({
      selector: "app-home",
      standalone: true,
      imports: [],
      templateUrl: "./home.component.html",
      styleUrl: "./home.component.scss",
    })
    export class HomeComponent {
      urlsEnum = URLS;
      constructor(protected routerHelper: RouterHelperService) {}
    }
    ```

    En este caso sera `protected` el `routerHelper` para poder llamarlo directamente desde el html en los `click` de los botones:

    ```html
    <button class="home__actions-secondary-btn" (click)="routerHelper.goTo(urlsEnum.ADD)">Nuevo viaje</button> <button class="home__actions-btn" (click)="routerHelper.goTo(urlsEnum.LIST)">Ver viajes</button>
    ```

  - Por ejemplo para el componente de detalle `travel-detail`, quedaria así el componente:

    ```typescript
    import { Component, Input } from "@angular/core";
    import { DatePipe } from "@angular/common";
    import { ITravel } from "../../types/travel";
    import { URLS } from "../../data/urls";
    import { RouterHelperService } from "../../helpers/router-helper.service";

    @Component({
      selector: "app-travel-detail",
      standalone: true,
      imports: [DatePipe],
      templateUrl: "./travel-detail.component.html",
      styleUrl: "./travel-detail.component.scss",
    })
    export class TravelDetailComponent {
      @Input() currentTravel!: ITravel;
      urlsEnum = URLS;

      constructor(protected routerHelper: RouterHelperService) {}
    }
    ```

    y el html pasaria `(click)="goTo()"` a `(click)="routerHelper.goTo(urlsEnum.EDIT, currentTravel.id)`;

# 8. Crea la funcionalidad de cancelar cambios.

En nuestro caso especifico y como comentamos anteriormente al estar usando el formulario de angular hasta que no llamamos al `onSave` los cambios no pasan realmente al objeto reactivo. Esto nos permite que al tener un botón de tipo `reset` el formulario detecta que se pulsa y limpia todos los campos de datos.

Y con esto, todo listo!

### 9. ¿Qué nos falta?

Pues este ejemplo no estaría listo para desplegar sin que añadamos varios puntos indispensables:

- Testing, lo suyo sería añadir tests tanto unitarios como end-to-end para asegurar el correcto funcionamiento. No nos vamos a meter aquí porque sobre todo, tienes a continuación en la pulpoCon un taller muy interesante sobre ello.

- Revisar la accesibilidad y añadir las ARIAs necesarias. Te recomendamos encarecidamente que le dediques un tiempo.
