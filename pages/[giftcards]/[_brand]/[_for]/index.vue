<template>
  <div class="inner">

      <!-- {{productFilter}} -->
        <!-- @before-enter="beforeEnter"
        @enter="enter"  -->
        <ClientOnly>
      <transition-group tag="ul" name="card" appear
        class="styled-list product-list">
        <!-- <ul v-if="actionLabel !== '' ? true : false"> -->
          <li class="item" v-for="(product, index) in filteredProductList" :key="index"> 

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
      </ClientOnly>
  </div>
</template>

<script lang='ts'>
import { state, actions , methods} from '../../../../store/reactives';
import { defineComponent, ref, toRef, onMounted, watch } from 'vue';
import {_} from 'vue-underscore';


export default defineComponent({
    props: {
      brand:{
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
    const filteredProductList = toRef(state, 'filteredProductList');
    // console.log(filteredProductList);

    /// SETUP ROUTING HERE FOR NAVIGATION
    const router = useRouter()
    const route = useRoute()

    const addProducts = async (product)  => {
      await actions.addProducts(product)
    }


    onMounted(() => {
      console.log("   PRODUCTS", props.products)
      console.log("   ACTIONLABEL", props.actionLabel)
    })

    // watch([selectedBrand, stockProducts], (newValues, prevValues) => {
    //   console.log('WATCHER', prevValues, newValues)
    // })



    return {
      stockProducts,
      brands,
      productFilter,
      addProducts
    }
  },
})
</script>