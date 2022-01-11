<template>
  <div class="inner">
    <h1 class="page-title">{{$route.params._categoryslug}}</h1>
    <ul class="styled-list brand-list">
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
    </ul>
  </div>
</template>

<script lang="ts">
  import { state, actions } from '../../store/reactives';
  import feather from 'vue-icon'
  import {
    defineComponent,
    toRef,
    onMounted
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
            content: 'Website about page'
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

      const getBrandImg = async (brandName) => {
        let brandImg = await new URL(`../../assets/logos/${brandName}_big.png`, import.meta.url).href
        console.log(JSON.stringify(brandImg))
        return JSON.stringify(brandImg)
      }

      // onMounted(() => {
      //   let isFilled = document.querySelector('.'+this.MyGradient+' .foldHolder').getAttribute("style");
    
      //   if (!isFilled) {
      //     document.querySelector('.'+this.MyGradient+' .foldHolder').style.fill = ('url(#'+ this.MyGradient +')');
      //   } else {
      //     let triangles = document.querySelectorAll('.'+this.MyGradient+' .foldHolder');
      //     triangles.forEach((triangle)=> {
      //       triangle.style.fill = ('url(#'+ this.MyGradient +')')
      //     })
      //   }
      // })    

      return{
        selectableBrands, 
        setSelectedBrand,
        getBrandImg
      }
    }
  })
</script>

<style scoped>
</style>