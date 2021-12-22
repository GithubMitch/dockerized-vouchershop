<template>
    <main>
      <!-- /category/_categoryslug/[brand]/_brandslug/_subcat/_productslug/index.vue -->
      <!-- <Products/> -->
      <div class="inner">
        <h1>Product detail page</h1>
        <h2></h2>
        <ul>
          <li v-for="(descr, index) in detailPageProduct" :key="descr.key">
            {{descr}}
          </li>
          <li>
            <span @click="addProducts(detailPageProduct.key)"> add Product () </span>
          </li>  
            <!-- <NuxtLink class="brandLine product" 
              :to='`${selectedCategory}` + `/` + product.actionLabel + `/` + product.key' 
              :class="{instock : product.inStock}" 
              @click="addProducts(product.key)">{{ product.name }}
            </NuxtLink> -->
        </ul>
      </div>

      <VoucherShop/>
      <!-- <a class="brandLine product" :class="{instock : product.inStock}" @click="addProducts(product.key)">{{product}}</a> -->
      <!-- <NuxtChild keep-alive/> -->
    </main>

</template>

<script lang='ts'>
import { state, actions, methods } from '../../../../../../../store/reactives';
import { defineComponent, onMounted, toRaw , ref, toRef} from 'vue';

export default defineComponent({
  setup() {
    const stockProducts = toRef(state, 'stockProducts');
    const brands = toRef(state, 'brands');
    const selectedCategory = toRef(state, 'selectedCategory');
    const selectedBrand = toRef(state, 'selectedBrand');
    const selectedProducts = toRef(state, 'selectedProducts');
    const selectableBrands = toRef(state, 'selectableBrands');
    const detailPageProduct = toRef(state, 'detailPageProduct');
    /// SETUP ROUTING HERE FOR NAVIGATION
    const router = useRouter()
    const route = useRoute()
    const newPath = ref()


    const addProducts = async (product)  => {
      await actions.addProducts(product)
    }

    onMounted(() => {

    })

    return {
      stockProducts,
      brands,
      selectedCategory,
      selectedBrand,
      selectedProducts,
      selectableBrands,
      detailPageProduct,
      addProducts
    }
  },
})
</script>
