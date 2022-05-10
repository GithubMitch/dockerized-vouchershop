<template>
  <header>
    <div id="Logo">
        <a href="#/" aria-current="page" class="router-link-exact-active router-link-active"><img src="@/assets/voucher_shop.jpg" alt="Vouchershop.nl"/></a>
    </div>
    <div id="HeaderContent">
        <div id="HeaderNav">
            <div id="Links">
              <a href="/404" class="">Over Vouchershop</a>
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
  </header>
  <div id="PageMenu">
    <div id="PageMenuContent">
      <div id="Categories">
        <div ref="navMenu">
            <NuxtLink v-for="item in navLinks" v-bind:key="item.url"  class="category"  :to="item.url" @click="item.subItems ? (activeItem = item) : activeItem = {}">{{item.label}}</NuxtLink>
            <!-- @click="item.subItems ? (activeItem = item, setCategory(item.label), setSelectedBrand(''), setGroup('') ): activeItem = {}, setSelectedBrand(''), setGroup('')" -->
        </div>
      </div>
    </div>
  </div>
  <!-- <BreadCrumb/> -->
  <!-- <filteredProductList/> -->
  <PageSubMenu :navLinks="activeItem" />
</template>

<script lang='ts'>
import { state, actions } from '../store/reactives'
import { defineComponent, onMounted, toRaw, watch, ref, toRef} from 'vue'
import { useIntervalFn } from '@vueuse/core';



export default defineComponent({
  methods: {
    addCategories(){
      console.log(this.$refs.Categories.children)
    }
  },
  setup() {
    const navMenu = ref(null)
    const route = useRoute()
    const router = useRouter()
    const orderItems = toRef(state.order, 'orderItems');
    const activeItem = ref()
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
            url:'/bellen'
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
        label: 'BTG',
        url:'/btg',
        subItems: ref([
          {          
            label: 'bellen',
            url:'/bellen'
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
    const interval = ref(300)
    const { pause, resume, isActive } = useIntervalFn(() => {
      pulseEffect()
    }, interval)

    const getCartTotal = () => {
      let element = document.getElementById("Cart");
      element.classList.add("pulse");
      resume()
      return actions.getCartTotal()
    }

    const setActionLabel = (value)  => {
      console.log(value)
      // actions.setActionLabel(value)
    }
    const setCategory = (value)  => {
      console.log(value)
      // actions.setCategory(value)
    }

    const setSelectedBrand = async (brand)  => {
      await actions.setSelectedBrand(brand)
    }
    const setGroup = async (group)  => {
      // await actions.setGroup(group)
    }
    const pulseEffect = () => {
      let element = document.getElementById("Cart");
      element.classList.remove("pulse");
      pause()
    }


    // onMounted(() => {})
    activeItem.value = toRaw(navLinks.value).find(element => element.label == route.params.beltegoed)
    console.log(activeItem.value)
    watch(
      () => route.params,
      async getParams => {
        activeItem.value = toRaw(navLinks.value).find(element => element.label == route.params.beltegoed)

        // const validateRoute = ref(state.selectableCategories.includes(route.params._categoryslug))

        // if (route.params._categoryslug == undefined) {
        //   validateRoute.value = true
        // }
        // if (validateRoute.value == false)
        //   router.push('404')

      }
    )
    return {
      orderItems,
      navMenu,
      navLinks,
      activeItem,
      getCartTotal,
      setCategory,
      setActionLabel,
      setGroup,
      setSelectedBrand,
      pulseEffect
    }
  },
})
</script>

<style lang="scss">  
  header{
    flex: 0 1 20%;
    min-width: 990px;
    text-align: left;
    margin: 1.2em auto 0.5em;
    display: flex;
    max-height: 80px;
    width:990px;

    #Logo{
      flex: 1 1 20%;
      &:active{
          opacity: 0.89;
          transform: translateY(0.6px);
      }
    }
    #HeaderContent{
      flex: 1 1 80%; 
      display: flex;
      flex-flow: column;
    }

    #HeaderNav {
      text-align: right;
      display: flex;
      justify-content: flex-end;

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
    #HeaderSpace {
      padding-top: 1em;
      display: flex;
      justify-content: flex-end;
      #Cart{
        background: #ddd url('./assets/cart.png') no-repeat left;
        // border: 2.5px solid #ffa502;
        // background: #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAhCAYAAABTERJSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAcVJREFUeNrEV8ttg0AQxYgCtgPbHZAOcAUmV19MKnBcQUQFIRU4OeQcqMCkgpAKsiWQAixnkQZpNdnZD6xhpCdjM2afZt58WFzfw2BGSwW28MmiGQjEAoeegHxjDjIfAivVjalzlCiINAJHgfXUkXmSrrnAJthd+ByRWUFkesuB0CxpkqPSCpTYoUtTJrCfSC+9vQChf2ROM1RUQVVTOzGRV+rMCHKXIda/Hg9foudXlGMEqpadv4G9L8vQ80vKMYTyqgnV+7CtDRG5tHPUD1LPw9CYIplMjRrQ4QZEApQB7WzKDTNkbIoa3HF1ZEpUcj60k9imCJNpoTPKVcBG7i0rW/GqZhMu6UdPeuGQJicyHBHae9JLbfMH1dR+Q2WeDVwXYhe9UGtnDSGNpTJ3rawl+l4OJdOP+JMkxHhEukpbx1AzWbmnxlfZOup24HuB55FEGpehGxketJly0THtwJ1WzgJXwJkQM0N+X0N0ttC83nYH/Ci6cBexO/Sb6vCuo6+Nm+TuYhWZlBgHMZo5CREF5tqjQkPjGmvMFxldf+DEdeCyv7iQocqyUJApiF7lRMb0rv0g8CkNvYogeJT8mMZPa38CDACfqGAQb8UHLgAAAABJRU5ErkJggg==) no-repeat 0;
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

        &.filled{
          border: 2.5px solid #ffa502;
          background: #FFF url('./assets/cart_hl.png') no-repeat left;
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
  #PageMenu{
    // min-height: 60px;
    // max-height: 60px;
    display: block;
    background: repeating-linear-gradient(45deg, #1684c8, #308ac3 100px);
    // overflow: hidden;
    // margin-bottom: 2em;
    
    #PageMenuContent{
      display: flex;
      max-width: 990px;
      margin: 0px auto;
      justify-content: space-between;
      flex: 1 1 100%;
      flex-flow: row wrap;
    }

    #Search{
      padding: 10px;
      input{
        border-radius: 7px;
        border: 1px solid #DDD;
        line-height: 1.2em;
        font-size: 18px;
        box-shadow: inset 1px 1px 1px #00000030;
        outline: none;
        padding: 5px;
        padding-left: 12px;
      }
    }

    #Categories{
      text-align: left;
      display: flex;
      flex: 100%;

      .gaming img {
        -webkit-filter: invert(98%) sepia(99%) saturate(2%) hue-rotate(278deg) brightness(110%) contrast(100%);
        filter: invert(98%) sepia(99%) saturate(2%) hue-rotate(278deg) brightness(110%) contrast(100%);
      }

      & > div{
        display: flex;
        flex: 100%;
      }
      .homebutton {
        line-height:38px;
        vertical-align: middle;
        flex: 1 1 14%;
        img {
          -webkit-filter: invert(98%) sepia(99%) saturate(2%) hue-rotate(278deg) brightness(110%) contrast(100%);
          filter: invert(98%) sepia(99%) saturate(2%) hue-rotate(278deg) brightness(110%) contrast(100%);
          height: 30px;
          margin:2px .5em 0 0em;
          vertical-align: middle;
          transition: .3s ease filter;        
        }
        &:hover img {
          -webkit-filter: invert(53%) sepia(43%) saturate(4403%) hue-rotate(353deg) brightness(98%) contrast(92%);
          filter: invert(53%) sepia(43%) saturate(4403%) hue-rotate(353deg) brightness(98%) contrast(92%);
        }
      }
    }

    .sep{
      align-self: center;
      width: 2px;
      display: inline-block;
      margin-right: .25em;
      margin-left: .25em;
      color: #FFF;
      flex: 0 0 2px;
    }
    .category{
      align-self: center;
      font-size: 17px;
      padding: 5px;
      font-weight: bold;
      text-transform: uppercase;
      display: inline-block;
      text-decoration: none;
      font-weight: bold;
      color: #FFF;
      cursor: pointer;
      //min-width: 175px;
      flex: 0 1 16.6666%;
      transition: .3s ease opacity;
      &:active{
        transform: scale(0.99) translateY(1px);
      }
      &.router-link-exact-active{
        color:orange;
        text-shadow: 0px 0px 3px #00000050;
      }
      img{
        display: inline;
        max-width: 40px;
        max-height: 1.5em;
        float: left;
        margin-right: 0.5em;
      }
      &:hover {
        opacity:.7;
      }
      &.credit{
        // flex: 1 1 33%;
      }    
      &.homebutton{
        flex: 1 1 14%;
      }
      &.gaming {
        flex: 0 1 15%;
      }    
      &.payment {
        flex: 0 1 17%;
      }    
      &.credit {
        flex: 0 1 18%;
      }        
      &.btg {
        flex: 0 1 15%;
      }    
      &.coupons {
        flex: 0 1 20%;
      }
    }

    h1{
      color: #FFF;
      padding-top: 1.5em;
      display: inline-block;
    }
  }
  #PageSubMenu {
    background: #b8c5ce repeating-linear-gradient(308deg, #9e9e9e0d, #ffffff40 200px);

    ul {
      list-style:none;
      padding:0;
      width: 100%;
      max-width: 990px;
      margin:0 auto;
      display:flex;
      // clip-path: polygon(0% 0%, 100% 0%, 98% 50%, 95% 100%, 95% 100%, 100% 100%, 5% 100%, 2% 50%);

      li {
        margin: 0;
        padding: 0;
        line-height: 18px;
        vertical-align: middle;
        -webkit-box-flex: 1;
        align-self: center;
        font-size: 15px;
        padding: 5px;
        font-weight: bold;
        text-transform: capitalize;
        display: inline-block;
        text-decoration: none;
        font-weight: bold;
        color: #444;
        cursor: pointer;
        -webkit-box-flex: 1;
        -ms-flex: 0 1 25%;
        flex: 0 1 25%;
        transition: .3s ease opacity;
        text-align:center;
        &:hover {
          opacity: .7;
        }
        a {
          text-decoration: none;
          color: #105a8a;
          &:visited{
            color: #0c4971;
          }
          &:active{
          transform: scale(0.99) translateY(1px);
          }
          &.router-link-exact-active{
            color:#fff;
            text-shadow: 0px 0px 3px #000;
          }
          img{
            display: inline;
            max-width: 40px;
            max-height: 1.5em;
            float: left;
            margin-right: 0.5em;
          }
          &:hover {
            opacity:.7;
          }
        }
      }
    }
  }

  #Breadcrumbs{
    background: #DDDDDD50;
    

    #Trail{
      padding: 5px 0px;
      padding: 0px;
      display: block;
      width: 990px;
      margin: 0 auto;
      text-align: left;
      box-sizing: border-box;
      padding-left:2em;
      i{
        color: #929292;
      }

      a{
        display: inline-block;
        padding-right: 10px;
        padding-left: 10px;
        cursor: pointer;
        user-select: none;
        &:hover{
          opacity: 0.8;
        }
        &:active{
          transform: translateY(1px);
        }
      }

    }
  }  
  .menu a {
    display:inline-block;
    margin-right:20px;
  }
</style>