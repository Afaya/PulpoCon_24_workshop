## Paso a paso taller

### 1. Entendemos la arquitectura base

### 2. Como funciona el enrutamiento

[Page Router]('https://nextjs.org/docs/pages/building-your-application/routing'),

\_app.tsx: página que contiene la estructura de una app react.
\_document.tsx: página que crea un archivo html válido.
index.tsx: nuestra home.

Luego por cada página que quiera añadir simplemente tienes que crear tu archivo tsx con el nombre que quieras que tenga la ruta, por ejemplo travels.tsx.

Ahora sí, si necesitas que una página acepte parámetros entonces debes crear dentro de src/pages una carpeta con el nombre de la ruta, por ejemplo /travel-edit y luego dentro de ella un archivo que se llame [parametro].tsx. Y la ruta será /travel-edit/parametro.

```html
<Link href="/travels" className="topbar__menuOption">Travels List</Link>
```

### 3. Añade funcionalidad a los botones de la Home

**src/data/Travel.ts**

```typescript
export enum URLS {
  LIST = '/travels',
  EDIT = '/travel-edit/',
  ADD = '/travel-edit/0',
  HOME = '/',
}
```

**src/pages/index.tsx**

```typescript
import { useRouter } from 'next/navigation';
import { URLS } from '../data/AppUrls';
```

```typescript
const router = useRouter();

const goTo = (url: string) => {
  router.push(url);
};
```

```html
 <button className={styles.home__actionsSecondaryBtn}  onClick={() => goTo(URLS.ADD)}>Nuevo viaje</button>
<button className={styles.home__actionsBtn}  onClick={() => goTo(URLS.LIST)}>Ver viajes</button>
```

### 4. Vincula el listado con datos almacenados en frontend

**src/types/Travel.ts**

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

**src/data/Travel.ts**

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

**src/components/travelDetail/index.tsx**

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

**src/pages/travels/index.tsx**

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

### 5. Vamos a añadir lógica y validaciones al formulario.

**src/data/Travel.ts**

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

**src/pages/travel-edit/[id].tsx**

```typescript
const [currentTravel, setCurrentTravel] = useState(
  structuredClone(defaultTravel)
);

const [currentType, setCurrentType] = useState('');
```

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
               onChange={(e) => setCurrentTravel({...currentTravel, date: new Date(e.target.value)})} />
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

**Combo**

**src/types/Travel.ts**

```typescript
export interface ComboboxOption {
  id: string;
  value: string;
}
```

**src/data/Travel.ts**

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

**src/pages/travel-edit/[id].tsx**

```typescript
import { defaultTravel, TravelTypeOptions } from '../../data/Travel';
```

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

**Botones**

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

```typescript
const onCancel = () => console.log('he cancelado');

const onSave = () =>
  console.log('he actualizado el viaje a', currentTravel, currentType);
```

**React-hook-form**

```typescript
interface ITravelEdit extends ITravel {
  currentType: string;
}
```

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

**eliminar useState ya no usamos**

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

**Zustand**

**tsconfig.json**

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

**src/stores/travel-store.ts**

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

**src/providers/travel-store-provider.tsx**

```typescript
'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
  type TravelStore,
  createTravelStore,
  initTravelStore,
} from '@/stores/travel-store';

export type TravelStoreApi = ReturnType<typeof createTravelStore>;

export const TravelStoreContext = createContext<TravelStoreApi | undefined>(
  undefined
);

export interface TravelStoreProviderProps {
  children: ReactNode;
}

export const TravelStoreProvider = ({ children }: TravelStoreProviderProps) => {
  const storeRef = useRef<TravelStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createTravelStore(initTravelStore());
  }

  return (
    <TravelStoreContext.Provider value={storeRef.current}>
      {children}
    </TravelStoreContext.Provider>
  );
};

export const useTravelStore = <T>(selector: (store: TravelStore) => T): T => {
  const travelStoreContext = useContext(TravelStoreContext);

  if (!travelStoreContext) {
    throw new Error(`useTravelStore must be used within TravelStoreProvider`);
  }

  return useStore(travelStoreContext, selector);
};
```

**src/pages/\_app.tsx**

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

**src/pages/travels/index.tsx**

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

**src/pages/travel-edit/[id].tsx**

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

**Fecha**

```typescript
interface ITravelEdit extends ITravel {
  currentType: string;
  dateAsString: string;
}
```

```typescript
const currentDateAsString = currentTravel.date.toISOString().split('T')[0];
setValue('dateAsString', currentDateAsString);
```

```
<input className={errors.date ? styles.travelEdit__rowFieldError :
styles.travelEdit__rowField} type="date" id="date" {...register("dateAsString",
{ required: true})} />
```

### 7. Crea la funcionalidad de guardar cambios.

**src/pages/travel-edit/[id].tsx**

```typescript
const { travelList, addTravel } = useTravelStore((state) => state);

const hasErrors = Object.keys(errors).length;
```

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

const editTravel = (newTravel: ITravel, currentId: Number) => {
  const currentListIndex = travelList.findIndex(
    (travel) => travel.id === currentId
  );
  travelList[currentListIndex] = newTravel;
};
```

### 8. Crea la funcionalidad de cancelar cambios.

**src/pages/travel-edit/[id].tsx**

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

```typescript
const onCancel = () => fillForm();
```

**src/components/travelDetail/index.tsx**

```
const router = useRouter();

const editTravel = () => router.push(`${URLS.EDIT}${currentTravel.id}`);
```

```
<button className={styles.travelDetail__actionsEdit} onClick={() => editTravel()}>Edit</button>
```

**Código completo**

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

- Testing.
- Revisar la accesibilidad y añadir las ARIAs necesarias.
- Realmente no hemos necesitado usar ningún useEffect que actúan como "escuchadores".

**Problema con TopBar**

**src/components/layout.tsx**

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

**src/pages/\_app.tsx**:

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
