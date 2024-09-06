<script setup lang="ts"></script>

<template>
  <div class="home">
    <img
      class="home__image"
      src="../assets/images/Pulpi-Vue.png"
      alt="logo de vue"
    />

    <q class="home__quote">La vida, o es una aventura o no es nada</q>
    <p class="home__subquote">Hellen Keller</p>

    <div class="home__actions">
      <button class="home__actions-secondary-btn">Nuevo viaje</button>
      <button class="home__actions-btn">Ver viajes</button>
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

  &__image {
    width: 15vw;
  }
}
</style>
