<template>
    <main>
      <NuxtChild/>
    </main>
</template>

<script lang="ts">
  import { state } from '../../store/reactives';
  import {
    defineComponent,
    toRef,
  } from 'vue';

  export default defineComponent({
    async setup() {
      const brands = toRef(state, 'brands');
      const selectedBrand = toRef(state, 'selectedBrand');
      const selectableBrands = toRef(state, 'selectableBrands');
      return{selectableBrands}
    }
  })
</script>

<style scoped>
  /* .brand-list {} */
</style>