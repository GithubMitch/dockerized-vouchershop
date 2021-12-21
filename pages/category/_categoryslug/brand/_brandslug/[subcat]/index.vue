<template>
    <main>
      /category/_catslug/[brand]/_brandslug/_subcat/index.vue
      
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
      <VoucherShop/>
      <!-- <a class="brandLine product" :class="{instock : product.inStock}" @click="addProducts(product.key)">{{product}}</a> -->
      <!-- <NuxtChild keep-alive/> -->
    </main>

</template>

<script lang='ts'>
import { state, actions, methods } from '../../../../../../store/reactives';
import { defineComponent, onMounted, toRaw , ref, toRef} from 'vue';

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
      addProducts
    }
  },
})
</script>



<style>
  /* RESET STYLE SHEET */
  .product-list {
    display: flex;
    align-content: center;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    list-style:none;
    padding:0;
  }
  .product-list li {
    width: 30%;
    border:1px dashed black;
    text-align:center;
    padding:1em;
    background:#fbfbfb;
  }
  .product-list li:hover {
    background:#dedede;
  }


</style>
