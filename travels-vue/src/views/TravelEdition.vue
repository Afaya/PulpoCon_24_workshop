<script setup lang="ts"></script>

<template>
  <form class="travel-edit">
    <div class="travel-edit__row">
      <label for="type">Tipo de viaje:</label>

      <select class="travel-edit__row-field" name="select">
        <option value="value1">Cultural</option>
      </select>
    </div>

    <div class="travel-edit__row">
      <label for="country">País:</label>

      <input
        class="travel-edit__row-field"
        type="text"
        id="country"
        name="country"
      />
    </div>

    <div class="travel-edit__row">
      <label for="city">Ciudad:</label>

      <input class="travel-edit__row-field" type="text" id="city" name="city" />
    </div>

    <div class="travel-edit__row">
      <label for="date">Fecha:</label>

      <input class="travel-edit__row-field" type="date" id="date" name="date" />
    </div>

    <div class="travel-edit__row">
      <label for="description">Descripción:</label>

      <textarea
        class="travel-edit__row-field"
        type="text"
        id="description"
        name="description"
        rows="20"
      ></textarea>
    </div>

    <div class="travel-edit__actions">
      <button class="travel-edit__actions-secondary-btn" type="reset">
        Cancelar
      </button>
      <button class="travel-edit__actions-btn" type="submit">Guardar</button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import '../assets/scss/mixins';

.travel-edit {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);

  width: 30rem;
  margin: var(--space-xl) auto;

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

  &__actions-btn {
    @include buttonStyle();
  }

  &__actions-secondary-btn {
    @include secondaryButton();
  }
}
</style>
