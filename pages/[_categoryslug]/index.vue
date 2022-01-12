<template>
  <div class="inner">
    <h1 class="page-title">{{$route.params._categoryslug}}</h1>
    <transition-group tag="ul" name="card" appear      
      @before-enter="beforeEnter"
      @enter="enter" 
      class="styled-list product-list"
      >
        <li class="item" v-for="(brand, index) in selectableBrands" :key="brand.key">
          <NuxtLink class="brandLine" :to='`/${$route.params._categoryslug}` + `/${brand.key}`' 
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
                />
                <!-- <NuxtLayout name="fold">
                  <template #foldIcon>
                    <i class="i simple-line-icons:info"></i>
                    categoryslug>index.vue
                  </template>
                </NuxtLayout> -->
          </NuxtLink>
        </li>
    </transition-group >

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
    layout: false,
    // layout: "default",
    head() {
      // console.log(this.$content.article)
      // let title = this.getTitle();
      return {
        title: 'default',
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
      // const showCategories = ref(false)

      const setSelectedBrand = async (brand)  => {
        await actions.setSelectedBrand(brand)
      }

      const getBrandImg = async (brandName) => {
        let brandImg = await new URL(`../../assets/logos/${brandName}_big.png`, import.meta.url).href
        console.log(JSON.stringify(brandImg))
        return JSON.stringify(brandImg)
      }

      const beforeEnter = (el) => {
      // el.style.opacity = 0;
      
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
          delay: 0.7,
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

      onMounted(() => {
        // const showCategories = true


      //   let isFilled = document.querySelector('.'+this.MyGradient+' .foldHolder').getAttribute("style");
    
      //   if (!isFilled) {
      //     document.querySelector('.'+this.MyGradient+' .foldHolder').style.fill = ('url(#'+ this.MyGradient +')');
      //   } else {
      //     let triangles = document.querySelectorAll('.'+this.MyGradient+' .foldHolder');
      //     triangles.forEach((triangle)=> {
      //       triangle.style.fill = ('url(#'+ this.MyGradient +')')
      //     })
      //   }
      })    

      return{
        selectableBrands, 
        enter,leave, beforeEnter,
        setSelectedBrand,
        getBrandImg
      }
    }
  })
</script>

<style scoped>
</style>