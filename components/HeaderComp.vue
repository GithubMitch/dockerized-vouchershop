<template>
  <header>
    <section>
      <ClientOnly>
        <NuxtLink to="/" id="Logo">
            <img src="@/assets/voucher_shop.jpg" alt="Vouchershop.nl"/>
        </NuxtLink>
      </ClientOnly>
      <div id="HeaderContent">
          <a ref="hamburger" id="hamburger" :class="{open : activeCategoryMenu}" @click="toggleCategoryMenu">
            <div for="menu_checkbox">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </a>
          <a ref="mobileHamburger" id="mobileHamburger" class="mobile" :class="{open : activeCategoryMenu}" @click="toggleMobileMenu($event)">
            <!-- <a ref="hamburger" id="hamburger" :class="{open : activeCategoryMenu}" @click="toggleCategoryMenu"> -->
            <div for="menu_checkbox">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </a>
          <div id="HeaderNav">
              <div id="Links">
                <NuxtLink  class="category" to="/about">Over VoucherShop</NuxtLink>
                <NuxtLink  class="category" to="/contact">Contact</NuxtLink>
              </div>
          </div>
          <div id="HeaderSpace">
              <NuxtLink id="Cart" to="/checkout"  :class="{filled: orderItems.length > 0 }" >
                <ClientOnly>
                  {{ $currency(getCartTotal() )}}
                </ClientOnly>
              </NuxtLink>
          </div>
      </div>
      <nav id="menu" ref="menuRef" :class="{open: activeCategoryMenu}">
        <ul>
          <li v-for="item in navLinks" v-bind:key="item.url"> 
            <NuxtLink   class="category" 
              :to="item.label === 'giftcards' ? 
                { name: 'giftcards', params: { category: 'giftcards' } , replace: false } : 
                { name: 'category', params: { category: item.label } , replace: false }"
                @click="item === activeItem ? activeItem = item : activeItem = activeItem" exact>

              {{item.label}}
            </NuxtLink>

            <ul class="subItems" v-if="item.label === 'giftcards' && item.subItems">
              <li v-for="subItem in item.subItems" v-bind:key="subItem.url">
                <NuxtLink 
                :to="{name: `giftcards-group` , params: {  category: item.label , group: subItem.key }, replace: false }"
                  @click="setCategory(`${item.label}`),setGroup(`${subItem.key}`)" exact>
                    {{subItem.label}}
                </NuxtLink>
              </li>
            </ul>
            <ul class="subItems" v-if="item.label !== 'giftcards' && item.subItems">
              <li v-for="subItem in item.subItems" v-bind:key="subItem.url">
                <NuxtLink :to="{name: `category-group` , params: {  category: item.label , group: subItem.key }, replace: false }"
                  @click="setCategory(`${item.label}`),setGroup(`${subItem.key}`)" exact>
                    {{subItem.label}}
                </NuxtLink>
              </li>
            </ul>

          </li>
        </ul>
      </nav>
    </section>
    <BreadCrumb/>
  </header>
</template>

<script lang='ts'>
import { state, actions } from '../store/reactives'
import { defineComponent, toRaw, watch, ref, toRef} from 'vue'
import { useIntervalFn, onClickOutside } from '@vueuse/core';

export default defineComponent({
  methods: {
      addCategories() {
          console.log(this.$refs.Categories.children);
      }
  },
  setup() {
      const navMenu = ref(null);
      const route = useRoute();
      const router = useRouter();
      const orderItems = toRef(state.order, "orderItems");
      const activeItem = ref();
      const activeSideMenu = toRef(state, "activeSideMenu");
      const activeCategoryMenu = toRef(state, "activeCategoryMenu");
      const navLinks = ref([
          // {
          //   label: 'home',
          //   url:'/'
          // },
          {
              label: "beltegoed",
              url: "/beltegoed",
              subItems: ref([
                  {
                      label: "bellen",
                      key: "bellen",
                      url: "/bellen",
                  },
                  {
                      label: "data",
                      key: "data",
                      url: "/data"
                  },
                  {
                      label: "bundels",
                      key: "bundels",
                      url: "/bundels"
                  },
              ])
          },
          {
              label: "gaming",
              url: "/gaming",
              subItems: [
                  {
                      label: "console",
                      key: "console",
                      url: "/console"
                  },
                  {
                      label: "PC",
                      key: "pc",
                      url: "/pc"
                  }
              ]
          },
          {
              label: "wallets",
              url: "/wallets",
              subItems: [
                  {
                      label: "paysafe",
                      key: "paysafe",
                      url: "/paysafe"
                  },
                  {
                      label: "Apple Itunes",
                      key: "appleitunes",
                      url: "/appleitunes"
                  },
                  {
                      label: "Google Play",
                      key: "googleplay",
                      url: "/googleplay"
                  },
                  {
                      label: "Tony" + `'s`,
                      key: "tonys",
                      url: "/tonys"
                  },
              ]
          },
          {
              label: "giftcards",
              url: "/giftcards",
              subItems: [
                  {
                      label: "hem",
                      key: "hem",
                      url: "/hem"
                  },
                  {
                      label: "haar",
                      key: "haar",
                      url: "/haar"
                  },
                  {
                      label: "kids",
                      key: "kids",
                      url: "/kids"
                  },
                  {
                      label: "elkaar",
                      key: "elkaar",
                      url: "/elkaar"
                  },
              ]
          },
          {
              label: "coupons",
              url: "/coupons",
              subItems: [
                  {
                      label: "Erop Uit",
                      key: "eropuit",
                      url: "/eropuit"
                  },
                  {
                      label: "Home Voordeel",
                      key: "homevoordeel",
                      url: "/homevoordeel"
                  },
                  {
                      label: "Gezond & Fit",
                      key: "gezondfit",
                      url: "/gezondfit"
                  },
                  {
                      label: "Smaakvoordeel",
                      key: "smaakvoordeel",
                      url: "/smaakvoordeel"
                  },
              ]
          },
      ]);
      const interval = ref(300);

      const menuRef = ref(null)
      const hamburger = ref(null)
      onClickOutside((menuRef,hamburger ), (e) =>  {
        // closing menu when click outside menu
        if( activeCategoryMenu.value == true ) {
          toggleCategoryMenu(e)
          // toggleMobileMenu(e)
        }
        if( activeSideMenu.value == true ) {
          // toggleCategoryMenu(e)
          const isDropDown = e.target.classList.contains('i');
          // console.log(e.target.classList.contains('i'))
          console.log(isDropDown)
          if (!isDropDown) toggleMobileMenu(e);
        }
      })

      const { pause, resume, isActive } = useIntervalFn(() => {
          pulseEffect();
      }, interval);
      const getCartTotal = () => {
          let element = document.getElementById("Cart");
          element.classList.add("pulse");
          resume();
          return actions.getCartTotal();
      };
      const toggleMobileMenu = (e) => {
          activeSideMenu.value == false ? activeSideMenu.value = true : activeSideMenu.value = false;
          console.log("activeSideMenu", activeSideMenu.value);
          return;
      };
      const clickEvent = (e) => {
        toggleCategoryMenu(e)
      }
      const toggleCategoryMenu = (e) => {
          activeCategoryMenu.value == false ? activeCategoryMenu.value = true : activeCategoryMenu.value = false;
          console.log("activeCategoryMenu", activeCategoryMenu.value);
          return;
      };
      const setActionLabel = (value) => {
          console.log(value);
          actions.setActionLabel(value)
      };
      const setCategory = (value) => {
          console.log(value);
          actions.setCategory(value)
      };
      const setBrand = async (brand) => {
          await actions.setSelectedBrand(brand);
      };
      const setGroup = async (group) => {
          console.log(group);
          await actions.setGroup(group)
      };
      const pulseEffect = () => {
          let element = document.getElementById("Cart");
          element.classList.remove("pulse");
          pause();
      };

      activeItem.value = toRaw(navLinks.value).find(element => element.label == route.params.category);
      watch(() => route.params, async (getParams) => {
          activeItem.value = toRaw(navLinks.value).find(element => element.label == route.params.category);
      });

    return {
      orderItems,
      navMenu,
      navLinks,
      activeItem,
      getCartTotal,
      setCategory,
      setActionLabel,
      setGroup,
      setBrand,
      pulseEffect,
      route,
      toggleMobileMenu,
      toggleCategoryMenu,
      activeCategoryMenu,
      clickEvent,
      menuRef,
      hamburger
    };
  },
})
</script>

<style lang="scss">
  #menu {
    display: block;
    opacity: 0;
    transition: opacity 0.3s ease;
    position: absolute;
    z-index: 9999;
    top: 85px;
    top: 107px;
    right:1em;
    background:orange;
    background: #ff7514 repeating-linear-gradient(45deg, #ff7514, #f3600026 100px);
    border-radius:5px;
    pointer-events:none;
    box-shadow: 4px 3px 7px #333;

    &.open {
      opacity:1;
      pointer-events:all;
      z-index:9999;
    }
    &:before {
      content: "";
      display: block;
      position: absolute;
      top: -13px;
      right: 154px;
      z-index: 9999;
      width: 26px;
      height: 16px;
      background-color: orange;
      background: #ff7514 repeating-linear-gradient(45deg, #ff7514, #f3600026 100px);
      -webkit-clip-path: polygon(50% 0, 100% 100%, 0 100%);
      clip-path: polygon(50% 0, 100% 100%, 0 100%);
    }
    > ul {
      list-style:none;
      margin:0 auto;
      padding:0;
      width:100%;
      
      & > li{
        padding:0;
        margin:0;    
        display: inline-block;
        vertical-align: top;
        & > a {
          display:inline-block;
          padding:1em 3em;
          margin:0 1em;
          color:#fff;
          text-decoration: none;
          font-weight:bold;
          text-transform: uppercase;
          // border-bottom:1px solid white;
        }
        & > ul.subItems {
          padding:0;
          border-top: 1px solid white;
          li {
            display:block;
            a {
              color:#2c3e50;
              color:#fff;
              display:block;
              padding: 0.5em 2em 0.5em 1.5em;
              text-decoration: none;
              text-transform:capitalize;
              text-align:center;
              &:hover {
                font-weight:700;
              }
            }
          }
        }
      }
    }
  }

  #mobileHamburger,
  #hamburger {
    position: absolute;
    color: #fff;
    right: 150px;
    top: 56px;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    background: orange;
    background: #ff7514 repeating-linear-gradient(45deg, #ff7514, #f3600026 100px);
    border-radius: 1em;
    padding: 0.5em 1em;
    transition: .3s ease box-shadow;
    i {
      margin-left:.5em;
      display: inline-block;
      vertical-align: middle;
    }
    > div {
      cursor: pointer;
      >div {
        position: relative;
        top: 0;
        height: 4px;
        background-color: #fff;
        margin-bottom: 4px;
        transition: 0.3s ease transform, 0.3s ease top, 0.3s ease width, 0.3s ease right;
        border-radius: 2px;
        width:34px;
        div:first-child {
          transform-origin: 0;
        }

        div:last-child {
          margin-bottom: 0;
          transform-origin: 34px;
        }

        div:nth-child(2) {
          right: 0;
          width: 34px;
        }
      }
    }
    &.open {
      box-shadow: 4px 3px 7px #333;
      > div {
        // .open state
        div:first-child {
          width: 22px;
          top: 10px;
          left: -2px;
          transform: rotateZ(-50deg);
        }
  
        div:last-child {
          top: -6px;
          transform: rotateZ(50deg);
          width: 22px;
          right:-13px;
        }
  
        div:nth-child(2) {
          width: 34px;
          top: -6px;
        }
      }
    }
  }
  #mobileHamburger {display:none;}

  header{
    > section {
      position:relative;
      width:100%;
      padding:1em;
      position: relative;
      max-width: 1640px;
      margin:auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      box-sizing:border-box;
    } 
    #Logo{
      float:left;
      img {
        height:100%;
      }
      &:active{
        opacity: 0.89;
        transform: translateY(0.6px);
      }
    }
    #HeaderContent{
      float:right;
      margin-left:1em;
      min-width:200px
    }
    #HeaderSpace {
      padding-top: 1em;
      display: flex;
      justify-content: flex-end;
      #Cart{
        background: #ddd url('@/assets/cart.png') no-repeat left;
        background-position: top 4px left 5px;
        background-size: 24px;
        text-align: center;
        display: inline-block;
        padding: 5px;
        padding-left: 50px;
        min-width: 55px;
        font-weight: bold;
        color: #626262;
        cursor: pointer;
        border: 2.5px solid #DDD;
        text-decoration: none;
        overflow:hidden;
        border-radius:5px;
        transition:.3s ease background;
        height:25px;

        &.filled{
          border: 2.5px solid #ffa502;
          background: #FFF url('@/assets/cart_hl.png') no-repeat left;
          background-position: top 4px left 5px;
          background-size: 24px;
          &.pulse {
            background:orange;
          }
        }
        p{
          margin: 0px;
        }
        &:active{
          opacity: 0.89;
          transform: translateY(0.6px);
        }
      }
    }
  }

  #HeaderNav {
    // text-align: right;
    // display: flex;
    // justify-content: flex-end;

    a {
      font-weight: bold;
      color: #2c3e50;
      display: inline-block;
      // min-width: 100px;
      margin: 0px 20px;
      &:active{
        transform: translateY(1px);
        opacity: 0.9;
      }
      &:last-child {
        margin-right:0;
      }
      &.router-link-exact-active {
        color: #ed6c23;
      }
    }
    #Links{
      a{
        text-decoration: none;
        border-bottom: 2px solid orange
      }
    }
    #Lang{
      flex: 0 1 30%;

      a{
        display: inline;
        margin: 5px;
        width: 50px;
        height: 35px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  .breadcrumb {
    background: repeating-linear-gradient(45deg, #1684c8, #308ac3 100px);
  }
  .breadcrumb > .inner {
    // background: #b8c5ce repeating-linear-gradient(308deg, #9e9e9e0d, #ffffff40 200px);
    color:#308ac3;
    color:#fff;
    font-weight:500;
    padding: 0.25em 4em;
    text-align: center;
    box-sizing:border-box;
    width:100%;
    text-transform:uppercase;
    a {
      text-decoration: none;
      color:#fff;
      &:visited {
        color:#308ac3;
        color:orange;
      }
      &.router-link-active,
      &:hover {
        color:orange;
        text-decoration: none;
      }
    }
  }


</style>