<template>
  <div class="inner">
    <h1>{{$route.params._categoryslug}}</h1>
    <ul class="brand-list">
      <li v-for="brand in selectableBrands" :key="brand.key">
          <NuxtLink class="brandLine" :to='`/${$route.params._categoryslug}` + `/${brand.key}`' @click="setSelectedBrand(brand.key)">{{brand.name}}</NuxtLink>
      </li>
    </ul>
  </div>
  <!-- <NuxtChild/> -->
  <VoucherShop keep-alive/>
</template>

<script lang="ts">
  import { state, actions } from '../../store/reactives';
  import {
    defineComponent,
    ref,
    toRef,
    watch,
    } from 'vue';

  export default defineComponent({

    async setup(props) {
      console.log()
      const brands = toRef(state, 'brands');
      const selectedBrand = toRef(state, 'selectedBrand');
      const selectableBrands = toRef(state, 'selectableBrands');

      const setSelectedBrand = async (brand)  => {
        await actions.setSelectedBrand(brand)
      }

      return{selectableBrands, setSelectedBrand}
    }
  })
</script>

<style scoped>
</style>