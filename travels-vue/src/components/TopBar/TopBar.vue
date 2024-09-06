<script setup lang="ts"></script>

<template>
  <div class="top-bar">
    <img
      class="top-bar__image"
      src="../../assets/images/Pulpi-Vue.png"
      alt="logo de vue encima del pulpo de la pulpocon"
    />

    <h1>Mi app de viajes</h1>

    <div class="top-bar__menu">
      <RouterLink to="/" class="top-bar__menu-option">Home</RouterLink>

      <RouterLink to="/travels" class="top-bar__menu-option">
        Travels List
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: var(--space-sm);

  color: var(--text-color);
  border-bottom: var(--border);

  &__logo {
    width: 3em;
    height: 3em;
  }

  &__menu {
    display: flex;
    gap: var(--space-md);
    align-items: center;
  }

  &__menu-option {
    text-decoration: none;
    color: var(--light-green);

    &:hover {
      color: var(--dark-green);
    }
  }

  &__image {
    width: 2rem;
  }
}
</style>
