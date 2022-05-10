
<template>
  <NuxtLayout name="productlist">
    <div class="inner">
      <ClientOnly>
        <transition-group tag="ul" name="card" appear
          @before-enter="beforeEnter"
          @enter="enter"
          class="styled-list product-list">
          <li  class="item" v-for="(brand, index) in brands" :key="brand.key">
            <NuxtLink class="brandLine" :to='`/beltegoed` + `/${brand.key}`' 
              @click="setSelectedBrand(brand.key)"
              >
                <img :src="`../../assets/logos/${brand.key}.png`" />
                <span for="">{{brand.name}}</span>
                <span for="">{{$route.params.beltegoed}}</span>

                <Fold
                    width="45" 
                    height="45"
                    :class="'MyGradient_'+index"           
                    :gradient="{from: [`#ff7514`, 5] , to: ['#f36000a1', 95] }"
                    :textStyle="{top: '2px', left: '3px', width: '20px', opacity: 0.85 }"
                    :MyGradient="'MyGradient'"
                    />
            </NuxtLink>   
          </li>
        </transition-group>
      </ClientOnly>
    </div>
  </NuxtLayout> 
</template>

<script>
import gsap from "gsap";
import { state, actions, methods } from '../store/reactives'
import { defineComponent, ref, toRef } from 'vue'
import {_} from 'vue-underscore';

export default defineComponent({
  props: {
    brands: {
      type: Array,
      default: []
    },
    brand: {
      type: String,
      default: ''
    },
    products:{
      type: Object,
      default: {}
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
  // methods: {
  //   addProducts: async (e, x) => {
  //     // e.preventDefault()
  //     console.log(e.target)
  //     await actions.addProducts(x)
  //   }
  // },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const open = ref(false)

    const stockProducts = toRef(state, 'stockProducts');

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


    const setSelectedBrand = async (brand)  => {
      await actions.setSelectedBrand(brand)
    }

    return {
      setSelectedBrand, 
      beforeEnter,
      enter,
      leave,
    }
  },
})
</script>