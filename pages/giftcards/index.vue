<template>
  <NuxtLayout name="category">
    <template #content>
      <ClientOnly>
        <h1 class="pagetitle">{{$route.params.category}}</h1>
        <div>
          <span>Select your product</span>
          <Products :categoryClass="'giftcards'" :products="stockProducts"/>
        </div>
      </ClientOnly>
    </template>
  </NuxtLayout>
</template>

<script lang="ts">
import { onBeforeRouteUpdate } from 'vue-router'

  import gsap from "gsap";
  import { state, actions, methods } from '../../store/reactives'
  import { ref, toRef } from 'vue'
  import {_} from 'vue-underscore';

  export default defineNuxtComponent({
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
        // e.preventDefault()
        console.log(e.target)
        await actions.addProducts(x)
      }
    },
    async setup(props) {
      const router = useRouter()
      const route = useRoute()
      const open = ref(false)

      const brands = toRef(state, 'brands');
      const stockProducts = toRef(state, 'stockProducts');
      const filteredProductList = toRef(state, 'filteredProductList');

      onBeforeRouteUpdate(async (to, from) => {
        if (to) {
          console.log(to ,'ROUTE UPDATE 123!')
          return  
        }
      })

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

      onBeforeMount(() => {
        router.push({ params: { category: 'giftcards' } })
      })

      watch(
        () => route.params,
        async getParams => {
          console.log(route.params)
        }
      )

      return {
        open,
        stockProducts,
        props, 
        brands,
        setProductPage, 
        deselect,
        beforeEnter,
        enter,
        leave,
        filteredProductList,
      }
    },
  })
</script>

<style lang="scss">
</style>
