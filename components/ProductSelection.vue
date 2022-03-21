
<template>
  <NuxtLayout name="productlist">
    <ClientOnly>
      <h1>{{brand}}</h1>  
      <transition-group tag="ul" name="card" appear
        @before-enter="beforeEnter"
        @enter="enter"
        v-if="$route.params._brand"
        class="styled-list product-list">
        <!-- {{selectedBrandProducts}} -->
        <li  class="item" v-for="(product, index) in selectedBrandProducts" :brand="brand"  :key="product.key">
          <a class="brandLine product" :disabled="!product.inStock" :class="{disabled : !product.inStock, instock: product.inStock}" 
          >
          <!-- @click.prevent="click" 
          @click="addProducts(e)" -->
            <img :src="`../../assets/logos/${product.brand}.png`" />
            <span class="price" for="">€ {{product.value / 100}}</span>
            <span class="name">{{ product.name }}</span>
            <span class="action" for="">{{product.actionLabel}}</span>

            <Fold
              width="45" 
              height="45"
              :productPage="`${product.brand}/${product.actionLabel}/${product.key}`"
              :class="'MyGradient_'+index"           
              :gradient="{from: [`#ff7514`, 5] , to: ['#f36000a1', 95] }"
              :MyGradient="'MyGradient'"
              :textStyle="{top: '2px', left: '3px', width: '20px', opacity: 0.85 }"
              />
          </a>
        </li>
      </transition-group>
      <transition-group tag="ul" name="card" appear
        @before-enter="beforeEnter"
        @enter="enter"
        v-else
        class="styled-list product-list">
          <li class="item" v-for="(product, index) in selectedBrandProducts" :brand="brand"  :key="product.key">
            <router-link class="brandLine product" 
              :to='product.brand + `/` + product.actionLabel + `/`  + product.key'
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
            </router-link>
          </li>
      </transition-group>
    </ClientOnly>
  </NuxtLayout> 
</template>

<script>
import gsap from "gsap";
import { state, actions } from '../store/reactives'
import { defineComponent, ref, toRef } from 'vue'
import {_} from 'vue-underscore';

export default defineComponent({
  props: {
    brand: {
      type: String,
      default: ''
    },
    // products:{
    //   type: Object,
    //   default: {}
    // }
  },
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "/assets/iconfont/iconfont.css"
        }
      ],
    }
  },
  methods: {
    addProducts: async (e) => {
      // e.preventDefault()
      console.log(e.target)
      // await actions.addProducts(product)
    }
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const open = ref(false)

    const stockProducts = toRef(state, 'stockProducts');
    const selectedCategory = toRef(state, 'selectedCategory');
    const selectedProducts = toRef(state, 'selectedProducts');
    const selectedBrandProducts = toRef(state, 'selectedBrandProducts');



    const beforeEnter = (el) => {
      el.style.opacity = 0;
      gsap.set(el, {
        opacity: 0,
        y: 30,
        })
    }
    const enter = (el, done) => {
      gsap.to(el, {
        stagger: 1.2,
        duration: 0.74,
        opacity: 1,
        overwrite: false,
        ease: "power2.inOut",
        scaleY: 1,
        scaleX: 1,
        // delay: 0.7,
        y: 0,
        delay: el.dataset.index * 0.1,
        onComplete: done
      })
    }
    const leave = (el, done) => {
      gsap.to(el, {
        opacity: 0,
        scaleY: 0,
        scaleX: 0,
        y: 30,
        delay: el.dataset.index * 0.34,
        onComplete: ()=> { el.dataset.index = 1; return done }
      })
    }

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
      open,
      selectedProducts, 
      selectedCategory, 
      stockProducts, 
      selectedBrandProducts, 
      props, 
      setProductPage, 
      deselect,
      beforeEnter,
      enter,
      leave,
    }
  },
})
</script>