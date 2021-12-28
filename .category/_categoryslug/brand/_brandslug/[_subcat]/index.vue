<template>
    <main>
      <!-- <Products/> -->
      <!-- <ul>
        <li v-for="(product) in stockProducts" :key="product.ean">
          <NuxtLink class="brandLine product" 
            :to='`${selectedCategory}` + `/` + product.actionLabel + `/` + product.key' 
            :class="{instock : product.inStock}" 
            @click="addProducts(product.key)">{{ product.name }}
          </NuxtLink>
        </li>
      </ul> -->
      <VoucherShop keep-alive/>
      <!-- <a class="brandLine product" :class="{instock : product.inStock}" @click="addProducts(product.key)">{{product}}</a> -->
    </main>
</template>

<script lang='ts'>
import { state, actions } from '../../../../../../store/reactives';
import { defineComponent, ref, toRef } from 'vue';

export default defineComponent({
  setup() {
    const stockProducts = toRef(state, 'stockProducts');
    const brands = toRef(state, 'brands');
    const selectedCategory = toRef(state, 'selectedCategory');
    const selectedBrand = toRef(state, 'selectedBrand');
    const selectedProducts = toRef(state, 'selectedProducts');
    const selectableBrands = toRef(state, 'selectableBrands');
    /// SETUP ROUTING HERE FOR NAVIGATION
    const router = useRouter()
    const route = useRoute()

    const addProducts = async (product)  => {
      await actions.addProducts(product)
    }

    return {
      stockProducts,
      brands,
      selectedCategory,
      selectedBrand,
      selectedProducts,
      selectableBrands,
      addProducts
    }
  },
})
</script>