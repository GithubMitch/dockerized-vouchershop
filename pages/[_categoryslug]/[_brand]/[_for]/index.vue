<template>
  <div class="inner">

      <!-- {{productFilter}} -->
        <!-- @before-enter="beforeEnter"
        @enter="enter"  -->
      <transition-group tag="ul" name="card" appear
        class="styled-list product-list">
        <!-- <ul v-if="actionLabel !== '' ? true : false"> -->
          <li class="item" v-for="(product, index) in productFilter" :key="index"> 

            <NuxtLink class="brandLine product" 
              :to='`/` + product.brand + `/` + product.actionLabel + `/`  + product.key'
              :class="{instock : product.inStock}" 
              @click="setProductPage(product)"
              >
                <!-- {{product.brand }}
                {{product.actionLabel }}
                {{product.key }} -->

                <img :src="`../../../assets/logos/${product.brand}.png`" />
                <span class="price" for="">€ {{product.value / 100}}</span>
                <span class="name">{{ product.name }}</span>
                <span class="action" for="">{{product.actionLabel}}</span>

                <Fold
                    width="45" 
                    height="45"
                    :class="'MyGradient_'+index"           
                    :gradient="{from: [`#ff7514`, 5] , to: ['#f36000a1', 95] }"
                    :MyGradient="'MyGradient'"
                    :textStyle="{top: '2px', left: '3px', width: '20px', opacity: 0.85 }"
                    />
            </NuxtLink>
          </li>
        <!-- </ul> -->
      </transition-group>
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
        type: Object,
        default: {}
      },
      actionLabel:{
        type: String,
        default: ''
      }
    },
  setup(props) {
    const stockProducts = toRef(state, 'stockProducts');
    const brands = toRef(state, 'brands');
    const selectedCategory = toRef(state, 'selectedCategory');
    const selectedBrand = toRef(state, 'selectedBrand');
    const selectedActionLabel = toRef(state, 'selectedActionLabel');
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
      console.log("   ACTIONLABEL", props.actionLabel)
      methods.filterActionLabel(stockProducts.value, selectedActionLabel.value);
    })

    watch([selectedBrand, stockProducts], (newValues, prevValues) => {
      console.log('WATCHER', prevValues, newValues)
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