<script setup lang="ts">
import { TopBar } from './components/TopBar';
</script>

<template>
  <TopBar></TopBar>

  <RouterView v-slot="{ Component, route }">
    <transition name="slide-fade" mode="out-in">
      <div :key="route.fullPath">
        <component :is="Component" />
      </div>
    </transition>
  </RouterView>
</template>
