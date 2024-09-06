<script setup lang="ts"></script>

<template>
  <div class="travel-detail">
    <div class="travel-detail__actions">
      <button class="travel-detail__actions-edit">Edit</button>
    </div>

    <img
      alt="imagen de viaje"
      class="travel-detail__image"
      src="../../assets/images/city.webp"
    />

    <div class="travel-detail__text-wrapper">
      <span class="travel-detail__main-text">Country:</span>
      <span>EEUU</span>
    </div>

    <div class="travel-detail__text-wrapper">
      <span class="travel-detail__main-text">City:</span>
      <span>Nueva York</span>
    </div>

    <div class="travel-detail__text-wrapper">
      <span class="travel-detail__main-text">Date:</span>
      <span>21-01-2020</span>
    </div>

    <div
      class="travel-detail__text-wrapper travel-detail__text-wrapper--description"
    >
      <span class="travel-detail__main-text">Description:</span>
      <span
        >Viaje sorpresa a Nueva York en Enero para descubrir la ciudad. En el
        viaje no nos nevó y pudimos visitar varios museos: el de Ciencias
        Naturales, el MOMA, el MET. También pudimos ver la Estatua de La
        Libertad e ir de compras.</span
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';

.travel-detail {
  border: var(--border);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);

  &__actions {
    display: flex;
    justify-content: flex-end;
    padding: 0 var(--space-sm);
  }

  &__actions-edit {
    @include buttonStyle();
  }

  &__image {
    width: 98%;
  }

  &__text-wrapper {
    display: flex;
    gap: var(--space-sm);

    &--description {
      flex-direction: column;
    }
  }

  &__main-text {
    font-weight: var(--text-bold);
  }
}
</style>
