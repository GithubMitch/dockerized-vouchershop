
<template>
  <div id="sidemenu">
    <ClientOnly>
      <ul>
        <li v-for="item in navLinks" v-bind:key="item.url">
          <NuxtLink class="category"
            :to="item.label === 'giftcards' ? { name: 'giftcards', params: { category: 'giftcards' } , replace: false } : { name: 'category', params: { category: item.label } , replace: false }"
            @click="item === activeItem ? activeItem = item : activeItem = activeItem" exact>
              {{item.label}} 
          </NuxtLink>
          <i v-if="item.subItems" @click="dropDownSubMenu($event)" class="i simple-line-icons:arrow-down"></i>
          <ul v-if="item.subItems">
            <li v-for="subItem in item.subItems" v-bind:key="subItem.url">
              <NuxtLink :to="{ name: 'giftcards', params: { category: 'giftcards' } , replace: false }">
                {{subItem.label}}
              </NuxtLink>
            </li>
          </ul>
          <span v-if="item.label === 'beltegoed'" class="title" >Brands <i @click="dropDownSubMenu($event)" class="i simple-line-icons:arrow-down"></i></span>
          <ul style="display:block;" v-if="item.label === 'beltegoed'">
            <li v-for="brand in brands" v-bind:key="brand.key">
              <NuxtLink :to="{name: `category-brand-brandname` , params: {  category: $route.params.category !== undefined ? $route.params.category : 'ja', brandname: brand.key }}"
                @click="setGroup(`${brand.key}`)"
                exact>
                {{brand.name}}
              </NuxtLink>
            </li>
          </ul>
        </li>
        <li>
          <NuxtLink  class="category" to="/about">Over VoucherShop</NuxtLink>
        </li>  
        <li>
          <NuxtLink  class="category" to="/contact">Contact</NuxtLink>
        </li>  
      </ul>
    </ClientOnly>
  </div>
</template>

<script>
import gsap from "gsap";
import { state, actions, methods } from '../store/reactives'
import { defineComponent, ref, toRef, onBeforeMount } from 'vue'
import {_} from 'vue-underscore';

export default defineComponent({
  methods: {
    clickOutside: async (e, x) => {
      // e.preventDefault()
      console.log(e.target)
    }
  },
  async setup() {
    const router = useRouter()
    const route = useRoute()
    const open = ref(false)
    const navLinks = ref([
      {
        label: 'home',
        url:'/'
      },
      {
        label: 'beltegoed',
        url:'/beltegoed',
        subItems: ref([
          {          
            label: 'bellen',
            url:'/bellen',
          },
          {          
            label: 'data',
            url:'/data'
          },
          {          
            label: 'bundels',
            url:'/bundels'
          },
        ])
      },
      {
        label: 'gaming',
        url:'/gaming',
        subItems: [
          {          
            label: 'console',
            url:'/console'
          },
          {          
            label: 'PC',
            url:'/pc'
          }
        ]
      },
      {
        label: 'wallets',
        url:'/wallets',
        subItems: [
          {          
            label: 'Paysafe',
            url:'/paysafe'
          },
          {          
            label: 'Apple Itunes',
            url:'/appleitunes'
          },
          {          
            label: 'Google Play',
            url:'/googleplay'
          },
          {          
            label: 'Tony'+`'s`,
            url:'/tonys'
          },
        ]
      },
      {
        label: 'giftcards',
        url:'/giftcards',
        subItems: [
          {          
            label: 'hem',
            url:'/hem'
          },
          {          
            label: 'haar',
            url:'/haar'
          },
          {          
            label: 'kids',
            url:'/kids'
          },
          {          
            label: 'elkaar',
            url:'/elkaar'
          },
        ]
      },
      {
        label: 'coupons',
        url:'/coupons',
        subItems: [
          {          
            label: 'Erop Uit',
            url:'/eropuit'
          },
          {          
            label: 'Home Voordeel',
            url:'/homevoordeel'
          },
          {          
            label: 'Gezond & Fit',
            url:'/gezondfit'
          },
          {          
            label: 'Smaakvoordeel',
            url:'/smaakvoordeel'
          },
        ]
      },
    ])
    const activeItem = ref()
    const brands = toRef(state, 'brands');
    const setCategory = (value)  => {
      console.log(value)
    }
    const dropDownSubMenu = (event) => {
      let subMenu;
      let target = event.currentTarget;
      let parent = target.parentNode;
      subMenu = target.nextSibling ? target.nextSibling : target.parentNode.nextSibling;
      // console.log(subMenu)
      // console.log(parent)
      let subMenuisOpen = subMenu.classList == 'open';
      if (!subMenuisOpen) {
        subMenu.classList.add('open')
        parent.classList.add('open')
      } else {
        subMenu.classList.remove('open')
        parent.classList.remove('open')
      }
      return 
    }

    const setBrand = async (brand)  => {
      await actions.setSelectedBrand(brand)
    }
    const setGroup = async (group)  => {
      // await actions.setGroup(group)
    }


    activeItem.value = toRaw(navLinks.value).find(element => element.label == route.params.category)
    watch(
      () => route.params,
      async getParams => {
        activeItem.value = toRaw(navLinks.value).find(element => element.label == route.params.category)
      }
    )

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
      navLinks,
      activeItem,
      brands,
      setBrand,
      setGroup,
      dropDownSubMenu
    }
  },
})
</script>