<template>
  <!-- if actionlabel : show actionLabel_Products -->
  <div class="inner">
    <!-- {{productFilter}} -->
      <li class="item" v-for="(product, index) in productFilter" :key="index">  
        {{product}}
      </li>
      <!-- <select name="" id="">
        <option v-for="(product, index) in products" v-bind:value="product.key" v-bind:selected="index === 0">
          {{product.key}}
          {{index}}
        </option>    
      </select> -->
    <!-- {{products}} -->
  </div>
</template>

<script lang='ts'>
import { state, actions , methods} from '../../../../store/reactives';
import { defineComponent, ref, toRef, onMounted, watch } from 'vue';
import {_} from 'vue-underscore';


export default defineComponent({
    props: {
      selectedBrand:{
        type: String,
        default: ''
      },
      products:{
        type: Array,
        default: []
      }
    },
  setup(props) {
    const stockProducts = toRef(state, 'stockProducts');
    const brands = toRef(state, 'brands');
    const selectedCategory = toRef(state, 'selectedCategory');
    const selectedBrand = toRef(state, 'selectedBrand');
    const selectedProducts = toRef(state, 'selectedProducts');
    const selectableBrands = toRef(state, 'selectableBrands');
    const productFilter = toRef(state, 'productFilter');
    // console.log(productFilter);

    /// SETUP ROUTING HERE FOR NAVIGATION
    const router = useRouter()
    const route = useRoute()

    const addProducts = async (product)  => {
      await actions.addProducts(product)
    }


    onMounted(() => {
      props.selectedBrand == '' ? console.log(props.selectedBrand) : console.log(props.selectedBrand)
      console.log("   PRODUCTS", props.products)
      console.log("   BRAND", props.selectedBrand)
    })

    watch([selectedBrand, stockProducts], (newValues, prevValues) => {
      console.log('WATCHER', prevValues, newValues)
      methods.filterProducts(stockProducts.value, selectedBrand.value);
    })



    return {
      stockProducts,
      brands,
      selectedCategory,
      selectedBrand,
      selectedProducts,
      selectableBrands,
      productFilter,
      addProducts
    }
  },
})
</script>