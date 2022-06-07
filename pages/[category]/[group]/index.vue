<template>
  <NuxtLayout name="category">
    <template #content>
      <h1 class="pagetitle">{{$route.params.group}}</h1> 
      <Products :products="filteredProductList ? filteredProductList : stockProducts" :brand="brand" :group="group" :actionLabel="actionLabel" />  
    </template>
  </NuxtLayout>
</template>

<script lang="ts">
import { state, actions } from '../../../store/reactives';
import {defineComponent,toRef} from 'vue';

export default defineComponent({
  layout: 'category',
  async setup() {   
    const router = useRouter()
    const route = useRoute()

    const filteredProductList = toRef(state, 'filteredProductList');
    const stockProducts = toRef(state, 'stockProducts');
    const brand = toRef(state, 'brand');
    const group = toRef(state, 'group');
    const actionLabel = toRef(state, 'actionLabel');

    const setBrand = async (brand)  => {
      console.log('setBrand', route.params.brand)
      actions.setSelectedBrand(brand)
    }
    const setGroup = async (group)  => {
      actions.setGroup(group)
    }
    const getOperatorCodeWithBrand = async (brandslug)  => {
      actions.getOperatorCodeWithBrand(brandslug)
    }
    return{stockProducts, filteredProductList, group, brand, actionLabel, setBrand};
  }
})
</script>