<template>
  <div class="inner">
    <div class="title">
      <h1 class="page-title">{{$route.params.beltegoed}}</h1>
    </div>
    <Categories :brands="selectableBrands"/>

    <!-- <ClientOnly>
      <transition-group tag="ul" name="card" appear      
        @before-enter="beforeEnter"
        @enter="enter" 
        class="styled-list product-list"
        >
          <li class="item" v-for="(brand, index) in selectableBrands" :key="brand.key">
            <NuxtLink class="brandLine" :to='`/${$route.params.beltegoed}` + `/${brand.key}`' 
            @click="setSelectedBrand(brand.key)"
            >
              <img :src="`../../assets/logos/${brand.key}.png`" />
              <span for="">{{brand.name}}</span>
              <span for="">{{$route.params._categoryslug}}</span>

              <Fold
                  width="45" 
                  height="45"
                  :class="'MyGradient_'+index"           
                  :gradient="{from: [`#ff7514`, 5] , to: ['#f36000a1', 95] }"
                  :textStyle="{top: '2px', left: '3px', width: '20px', opacity: 0.85 }"
                  :MyGradient="'MyGradient'"
                  :product="{}"
                  />
            </NuxtLink>
          </li>
      </transition-group >
    </ClientOnly> -->

  </div>
</template>

<script lang="ts">
  import gsap from "gsap";
  import { state, actions } from '../../store/reactives';

  import {
    defineComponent,
    toRef,
    onMounted,
    ref
    } from 'vue';

  export default defineComponent({
    layout: 'category',
    head() {
      return {
        title: 'VoucherShop — Category',
        link: [
          {
            rel: "stylesheet",
            href: "/assets/iconfont/iconfont.css"
          }
        ],
        meta: [
          {
            hid: 'ABOUT-HID',
            name: `About page`,
            content: 'Over ons'
          }
        ]
      }
    },
    async setup(props) {
      const brands = toRef(state, 'brands');
      const selectedBrand = toRef(state, 'selectedBrand');
      const selectableBrands = toRef(state, 'selectableBrands');

      const setSelectedBrand = async (brand)  => {
        await actions.setSelectedBrand(brand)
      }

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

      onMounted(() => {})    

      return{
        selectableBrands, 
        enter,leave, beforeEnter,
        setSelectedBrand,
      }
    }
  })
</script>