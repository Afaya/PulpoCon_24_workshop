<script setup lang="ts">
import { TravelDetail } from '../components/TravelDetail';
</script>

<template>
  <div class="travel-list">
    <button class="travel-list__add">New Travel</button>

    <div class="travel-list__wrapper">
      <div class="travel-list__travel">
        <TravelDetail></TravelDetail>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/medias';
@import '../assets/scss/mixins';

.travel-list {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-md);

  &__add {
    @include buttonStyle();
  }

  &__wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--space-lg);

    margin-top: var(--space-lg);

    @include media(md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include media(sm) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  &__travel {
    display: contents;
  }
}
</style>
