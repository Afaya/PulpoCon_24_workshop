### 1. Entendemos la arquitectura base

### 2. Como funciona el enrutamiento

[vue-router](https://router.vuejs.org/) añadiendo la opción de historia: createWebHistory. Esto nos permite que la url cambie cuando navegamos y también poder navegar escribiendo una url en el navegador.

```
<RouterLink to="/travels" class="top-bar__menu-option">
  Travels List
</RouterLink>
```

### 3. Añade funcionalidad a los botones de la Home

**src/data/Urls.ts.**

```typescript
export enum URLS {
  LIST = '/travels',
  EDIT = '/travel-edit/',
  ADD = '/travel-edit/0',
  HOME = '/',
}
```

**src/views/Home.vue**

```typescript
import { URLS } from '../data/Urls';
import router from '../router';
```

```typescript
const goTo = (url: string) => {
  router.push(url);
};
```

```html
<button class="home__actions-secondary-btn" @click="goTo(URLS.ADD)">
  Nuevo viaje
</button>
<button class="home__actions-btn" @click="goTo(URLS.LIST)">Ver viajes</button>
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
    image: 'src/assets/images/city.webp',
  },
];
```

**src/components/TravelDetail/TravelDetail.vue**
**Definir propiedades para que nos pasen el viaje**

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

const onEdit = () => router.push(`${URLS.EDIT}${currentTravel.value.id}`);
</script>
```

```html
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

  <div class="travel-detail__text-wrapper">
    <span class="travel-detail__chip">{{ tag }}</span>
  </div>
</div>
```

```scss
&__chip {
  background-color: var(--yellow);
  border-radius: 2em;
  padding: var(--space-sm);
}
```

**src/views/TravelList.vue**

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

### 5. Vamos a añadir lógica y validaciones al formulario.

**src/types/Travel.ts**

```
export interface ComboboxOption {
  id: string;
  value: string;
}
```

**src/data/Travel.ts**

```
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

export const defaultTravel: ITravel = {
  id: 0,
  country: '',
  description: '',
  city: '',
  date: new Date(),
  image: '',
};
```

**vee-validate y yup**

**src/views/TravelEdition.vue**

```typescript
import { ITravel } from '../types/Travel';
import { defaultTravel, TravelTypeOptions } from '../data/Travel';
import { ref, onMounted, computed } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useRoute } from 'vue-router';
import { navigateTo } from '../helpers/routes';
import { URLS } from '../data/AppUrls';

const { errors, meta, defineField } = useForm({
  validationSchema: yup.object({
    currentType: yup.string().required(),
    currentDateString: yup.string().required(),
    currentCity: yup.string().min(3).required(),
  }),
});

const route = useRoute();

const currentTravel = ref<ITravel>(structureClone(defaultTravel));

const [currentType, currentTypeAttrs] = defineField('currentType');

const [currentDateString, currentDateStringAttrs] =
  defineField('currentDateString');

const [currentCity, currentCityAttrs] = defineField('currentCity');

const hasErrors = computed(() => Object.keys(errors.value).length);

onMounted(() => {
  initializeValues(currentTravel.value);
});

const initializeValues = (newTravel: ITravel) => {
  currentCity.value = newTravel.city;
  currentDateString.value = newTravel.date.toISOString().split('T')[0];
  currentType.value = newTravel.image
    ? newTravel.image.replace('src/assets/images/', '').replace('.webp', '')
    : '';
};

const getInputClass = (fieldName: string) => ({
  'travel-edit__row-field': true,
  'travel-edit__error':
    meta.value.touched && errors.value && errors.value[fieldName],
});

const onCancel = () => console.log('on cancel');

const onSave = () => console.log('on save');
```

```html
<div class="travel-edit">
  <form v-if="currentTravel" class="travel-edit__form">
    <div class="travel-edit__row">
      <label for="type">Tipo de viaje*:</label>

      <select
        v-model="currentType"
        v-bind="currentTypeAttrs"
        :class="getInputClass('currentType')"
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
    </div>

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
      <label for="city">Ciudad*:</label>

      <input
        v-model="currentCity"
        v-bind="currentCityAttrs"
        :class="getInputClass('currentCity')"
        type="text"
        id="city"
        name="city"
      />
    </div>

    <div class="travel-edit__row">
      <label for="date">Fecha*:</label>

      <input
        v-model="currentDateString"
        v-bind="currentDateStringAttrs"
        :class="getInputClass('currentDateString')"
        type="date"
        id="date"
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
  </form>

  <div class="travel-edit__actions">
    <button
      class="travel-edit__actions-secondary-btn"
      type="reset"
      @click="onCancel"
    >
      Cancelar
    </button>

    <button
      class="travel-edit__actions-btn"
      :disabled="!meta.valid"
      @click="onSave"
    >
      Guardar
    </button>
  </div>

  <span v-if="hasErrors" class="travel-edit__error">
    Completa los campos obligatorios
  </span>
</div>
```

```scss
@import '../assets/scss/mixins';

.travel-edit {
  width: 30rem;
  margin: var(--space-xl) auto;

  display: flex;
  flex-direction: column;
  gap: var(--space-xl);

  &__form {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
  }

  &__row {
    display: flex;
    justify-content: space-between;
  }

  &__row-field {
    min-width: 20rem;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-md);
  }

  &__error {
    color: red;
    border-color: red;
  }

  &__actions-btn {
    @include buttonStyle();

    &:disabled {
      background-color: var(--disabled-color);
      border-color: var(--disabled-color);
      color: white;
    }
  }

  &__actions-secondary-btn {
    @include secondaryButton();
  }
}
```

### 6. ¿Y si queremos editar? Vincula con los datos recibidos.

**Pinia**

**src/main.ts**

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

**src/store/Travel.ts**

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

**src/views/TravelList.vue**

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { TravelDetail } from '../components/TravelDetail';
import { useTravelStore } from '../store/Travel';

const useTravel = useTravelStore();

const myTravels = computed(() => useTravel.travelList);
</script>
```

**src/views/TravelEdition.vue**

**botón edit**

```typescript
import router from '../../router';
import { URLS } from '../../data/AppUrls';

const onEdit = () => router.push(`${URLS.EDIT}${currentTravel.value.id}`);
```

```html
<button class="travel-detail__actions-edit" @click="onEdit">Edit</button>
```

**coger id de url**

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

### 7. Crea la funcionalidad de guardar cambios.

**src/views/TravelEdition.vue**

```typescript
const onSave = () => {
  if (!errors.value.length && currentTravel.value) {
    updateData();
  }
};
```

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

**src/helpers/routes.ts**

```typescript
import { URLS } from '../data/Urls';
import router from '../router';

export const navigateTo = (url: string) => {
  router.push(url);
};
```

**src/views/Home.vue**

```vue
<script setup lang="ts">
import { navigateTo } from '../helpers/routes';

const goTo = (pageUrl: string) => navigateTo(pageUrl);
</script>
```

**src/views/TravelEdition.vue**

```typescript
import { URLS } from '../data/Urls';
import { navigateTo } from '../helpers/routes';

const onSave = () => {
  if (!errors.value.length && currentTravel.value) {
    updateData();
    navigateTo(URLS.LIST);
  }
};
```

### 8. Crea la funcionalidad de cancelar cambios.

**src/views/TravelEdition.vue**

```typescript
const travelFromList = ref<ITravel>();
```

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

```typescript
const onCancel = () => {
  currentTravel.value = Object.assign({}, travelFromList.value);
  initializeValues(currentTravel.value);
};
```

**src/store/Travel.ts**

```typescript
const editTravel = (currentTravel: ITravel) => {
  const travelToEditIndex = _travelList.value.findIndex(
    (travel) => travel.id === currentTravel.id
  );
  _travelList.value[travelToEditIndex] = currentTravel;
};
```

**src/views/TravelEdition.vue**

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

### 9. ¿Qué nos falta?

- Testing
- Revisar la accesibilidad y añadir las ARIAs necesarias.
- Revisar que son los composables
