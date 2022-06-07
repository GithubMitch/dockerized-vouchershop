
<template>
  <div v-if="!setupAppReady">
    <ProgressBar/>
  </div>
  <div v-else>
    <span>Maak een keuze</span>
    <transition-group tag="ul" name="card"
      @before-enter="beforeEnter"
      @enter="enter" appear
      class="styled-list product-list">
      <li  class="item" v-for="(product, index) in products" :key="product.ean" :class="categoryClass ?? categoryClass">
        <Fold
          width="45" 
          height="45"
          :productPage="`/${route.params.category}/brand-${product.brand}/${product.key}`"
          :product="product"
          :class="'MyGradient_'+index"           
          :gradient="$route.params.category === 'giftcards' ? { from: [`#59a5d4`, 45] , to: ['#2678ac', 100] } : {from: [`#ff7514`, 5] , to: ['#f36000a1', 95] }"
          :textStyle="{top: '2px', left: '3px', width: '20px', opacity: 0.85 }"
          :disabled="!product.inStock ? 'disabled' : false"
          />
        <a class="brandLine product" :disabled="!product.inStock" :class="{disabled : !product.inStock, instock: product.inStock}" 
          @click="addProducts($event, product)">
          <img :src="`../../assets/logos/${product.brand}.png`" />
          <span class="price" for="">€ {{product.value / 100}}</span>
          <div class="slide">
            <span class="name">{{ product.key }}</span>
            <span v-if="$route.params.category !== 'giftcards'" class="action" for="">{{product.actionLabel}}</span>
          </div>
        </a>
      </li>
    </transition-group>
  </div>
</template>

<script>
import gsap from "gsap";
import { state, actions } from '../store/reactives'
import { defineComponent, ref, toRef } from 'vue'
import {_} from 'vue-underscore';

export default defineComponent({
  props: {
    products: {
      type: Array,
      default: []
    },
    brand: {
      default: ''
    },
    group: {
      type: String,
      default: ''
    },
    actionLabel: {
      type: String,
      default: ''
    },
    categoryClass: {
      type: String,
      default: ''
    }
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
    addProducts: async (e, x) => {
      console.log(e.target)
      await actions.addProducts(x)
    }
  },
  async setup() {
    const router = useRouter()
    const route = useRoute()
    const open = ref(false)

    const setupAppReady = toRef(state, 'setupAppReady');
    const stockProducts = toRef(state, 'stockProducts');
    const brand = toRef(state, 'brand');
    const actionLabel = toRef(state, 'actionLabel');
    const group = toRef(state, 'group')
    const filteredProductList = toRef(state, 'filteredProductList')

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
        // ease: "power2.inOut",
        scaleY: 1,
        scaleX: 1,
        // delay: 0.7,
        y: 0,
        delay: el.dataset.index * 0.6,
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

    return {
      brand, 
      group, 
      actionLabel,
      filteredProductList,stockProducts,
      beforeEnter,
      enter,
      leave,
      route,
      setupAppReady
    }
  },
})
</script>