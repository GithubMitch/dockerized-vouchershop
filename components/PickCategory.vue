<template>
  <section id="pickcategory">
    <div class="categories">
      <span>
        Maak uw keuze:
      </span>
      <nav >
        <ul>
          <li v-for="item in categorys" v-bind:key="item.url"> 
            <NuxtLink   class="category" 
              :to="item.label === 'giftcards' ? 
                { name: 'giftcards', params: { category: 'giftcards' } , replace: false } : 
                { name: 'category', params: { category: item.label } , replace: false }"
                @click="item === activeItem ? activeItem = item : activeItem = activeItem">
              {{item.label}}
              <i class="i simple-line-icons:credit-card"></i>
            </NuxtLink>
  
            <!-- nested ul
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
            </ul> -->
  
          </li>
          <!-- <li v-for="(brand, index) in brands" :key="index">
            <NuxtLink :to="'/home'">
              {{brand.key}}
            </NuxtLink>
          </li> -->
        </ul>
      </nav>
    </div>
  </section>
</template>


<script>
import {state} from '../store/reactives'
export default defineComponent({
async setup() {
    const brands = toRef(state, 'brands');
    const categorys = ref([
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
  return{brands, categorys}
},
})
</script>

<style lang="scss" scoped>
section {
  background: rgba(200, 200, 200, 20%);
  margin: 3em 0;
}
  .categories {
    display:flex;
    width:100%;
    max-width:1640px;
    margin:0 auto;
    overflow: hidden;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    span {
      font-size:2em;
      font-size:1.666em;
      font-weight: 500;
        width: 15%;
        color:#333;
        // margin-top:-1rem;
      // white-space: nowrap;
      // margin-right:1em;
    }
    nav {
      max-width: 1360px;
      width: 100%;
        max-width: 85%;
        width: 100%;
        padding: 1em 0;
        padding-bottom:0;

      ul {
        width:100%;
        list-style:none;
        padding:0;
        margin:0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        li {
          display:inline-block;
          margin-right:1em;
          margin-bottom:1em;
          width:20%;
          max-width:18%;
          min-width:244px;
          a {
            text-transform:uppercase;
            display:block;
            padding:1em;
            font-size:1.6em;
            border: 1px solid #00000030;
            border-radius:.25em;
            background:#333;
            background:white;
            text-decoration: none;
            color:#0c4971;
            // color:#fff;
            transition: .3s ease all;
            
            &:hover {
              background:orange;
              color:#fff;
            }
            i {
              font-size:.85em;
              margin-left:.5em;
              float: right;
              margin-top: 6px;
            }
          }
        }
      }
    }
  }
</style>