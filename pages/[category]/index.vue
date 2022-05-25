<template>
  <NuxtLayout name="category">
      <template #content>
        <h1 class="pagetitle">{{$route.params.category}}</h1>
        <ClientOnly>
            <span>Select your brand</span>
            <Categories :brands="brands"/>
          <!-- <div v-else>
            <span>Select your product123</span>
            <ClientOnly>
              <Products :products="stockProducts"/>
            </ClientOnly>
          </div> -->
        </ClientOnly>
      </template>
  </NuxtLayout>
</template>

<script lang="ts">
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

  import gsap from "gsap";
  import { state, actions, methods } from '../../store/reactives'
  import { defineComponent, ref, toRef } from 'vue'
  import {_} from 'vue-underscore';

  export default defineComponent({
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
    setup(props) {
      const router = useRouter()
      const route = useRoute()
      const open = ref(false)

      const brands = toRef(state, 'brands');
      const stockProducts = toRef(state, 'stockProducts');
      const filteredProductList = toRef(state, 'filteredProductList');

    onBeforeRouteUpdate(async (to, from) => {
        // if (to.params.brand) {
      return  console.log('ROUTE UPDATE !')
      // }
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

      watch(
        () => route.params,
        async getParams => {
          console.log(route.params)
          // const validateRoute = ref(state.selectableCategories.includes(route.params._categoryslug))

          // if (route.params._categoryslug == undefined) {
          //   validateRoute.value = true
          // }
          // if (validateRoute.value == false)
          //   router.push('404')

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
#voucherShop {
  display:none;
}
  HTML >* , 
  body > * {
    box-sizing: border-box;
    margin:0;
    padding:0;
    font-size:1rem;
    margin-block-start: 0;
    margin-block-end: 0;
    font-family: Avenir,Helvetica,Arial,sans-serif;
  }
  .inner {
    // max-width:990px;
    box-sizing:border-box;
    width:100%;
    display:block;
    position:relative;
    margin:0 auto;
    padding:1em;
    &:last-of-type {
      border:none;
    }
  }
  .product{
    text-decoration: line-through;
    pointer-events: none;
  }
  .product.instock {
    text-decoration: none;
    pointer-events: all;
  }

  /* Vouchershop component */
  #config-window {
    box-shadow: inset 0px 0px 10px -4px #000; 
    box-sizing:border-box;
    background:#ebebeb;
    height:800px;
    padding:1em;
    overflow: scroll;
    :deep() .brandLine ,
    .brandLine {
      cursor:pointer;
    }
    :deep() .brandLine:hover {
      text-decoration: underline;
    }
  }
  .pagetitle {
    text-transform: capitalize;
  }
</style>
