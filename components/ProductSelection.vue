
<template>
 <div>
  <h1>{{brand}}</h1>  
  <ul class="styled-list product-list">
    <li class="item" v-for="(product, index) in selectedBrandProducts" :brand="brand"  :key="product.key">
      <NuxtLink class="brandLine product" 
        :to='brand + `/` + product.actionLabel + `/`  + product.key'
        :class="{instock : product.inStock}" 
        @click="setProductPage(product)"
        >
          <img :src="`../../assets/logos/${product.brand}.png`" />
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
              <!-- <NuxtLayout name="fold">
                <template #foldIcon>
                  <i class="i simple-line-icons:info"></i>
                </template>
              </NuxtLayout> -->
      </NuxtLink>
    </li>
    <li class="item brandLine deselect" @click="deselect(stockProducts)">
      Deselect
    </li>
  </ul> 
 </div>
</template>

<script>
import { isAbsent, state, actions, methods } from '../store/reactives'
import { defineComponent, onMounted, toRaw , ref, toRef, watch} from 'vue'
import {_} from 'vue-underscore';

export default defineComponent({
  props: {
    brand: {
      type: String,
      default: ''
    },
    products:{
      type: Array,
      default: []
    }
  },
  head() {
    // console.log(this.$content.article)
    // let title = this.getTitle();
    return {
      link: [
        {
          rel: "stylesheet",
          href: "/assets/iconfont/iconfont.css"
        }
      ],
      // meta: [
      //   {
      //     hid: 'ABOUT-HID',
      //     name: `About page`,
      //     content: 'Website about page'
      //   }
      // ]
    }
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()

    const stockProducts = toRef(state, 'stockProducts');
    const selectedCategory = toRef(state, 'selectedCategory');
    const selectedProducts = toRef(state, 'selectedProducts');
    const selectedBrandProducts = toRef(state, 'selectedBrandProducts');

    const setProductPage = async (product)  => {
      await actions.setProductPage(product)
    }
    const deselect = async (selected)  => {
      await Promise.all([
        actions.deselect(selected),
        router.go(-1),
        Promise.resolve(`Completed Promise`)
      ])
    }

      // const stock = async (stockProducts)  => {
      //   selectedBrandProducts.value = _(stockProducts.value).filter({brand: selectedBrand.value, inStock: true})
      // }
      // // watcher
      // watch([stockProducts], (newValues, prevValues) => {
      //   stock(stockProducts)
      // })

    return {
      selectedProducts, 
      selectedCategory, 
      stockProducts, 
      selectedBrandProducts, 
      props, 
      setProductPage, 
      deselect 
    }
  },
})
</script>

<style>
  /* css */
</style>