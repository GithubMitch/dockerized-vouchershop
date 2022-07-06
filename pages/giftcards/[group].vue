<template>
  <Router-View :products="stockProducts"/>
</template>

<script lang="ts">
  import { state, actions } from '../../store/reactives';
  import {
    defineComponent,
    toRef,
    watch
  } from 'vue';

  export default defineComponent({
    layout: false,
    // inheritAttrs: false,
    async setup(props) {
      const route = useRoute()
      const router = useRouter()

      const filteredProductList = toRef(state, 'filteredProductList');
      const setupAppReady = toRef(state, 'setupAppReady');
      const stockProducts = toRef(state, 'stockProducts');
      const brand = toRef(state, 'brand');
      const group = toRef(state, 'group');
      const actionLabel = toRef(state, 'actionLabel');
      
      console.log('GROUP PARENT VUE :'  , route.params)

    const stopWatch /* this is a callback that dismantles the watch function. see: https://v3.vuejs.org/guide/reactivity-computed-watchers.html#shared-behavior-with-watcheffect */
    = watch(
      [setupAppReady], /* you can watch an entire array of reactive values */
      (current, previous) => { /* see: https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watch */
      /* if you use a watcher to trigger an async function, make sure you invalidate side effects! See: https://v3.vuejs.org/guide/reactivity-computed-watchers.html#side-effect-invalidation */
        // code you want to run when reactives change
          console.log(current, previous)
          if (route.params.group !== undefined) {
            console.log(setupAppReady.value)
            actions.setGroup(route.params.group)
          }
      },
      {
        deep: true, /* see https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watching-reactive-objects*/
        immediate: false /*see: https://v3.vuejs.org/api/instance-methods.html#watch*/
      }
    )


      // watch([stockProducts], (newValues, prevValues) => {
      //   console.log('WATCHER STOCKPRODUCTs' , prevValues, newValues)
      //   if (route.params.brand !== undefined) {
      //     // NO BRAND => SET GROUP
      //     console.log('route.params.brand :',route.params.brand)
      //     // let currentBrand = getOperatorCodeWithBrand(route.params.brand);
      //     // console.log(currentBrand, 'currentBrand')
      //     setBrand(route.params.brand)
      //     if ( toRaw(filteredProductList.value).length === 0 ) {
      //       setGroup(route.params.brand)
      //       console.log(toRaw(filteredProductList.value))
      //     }
      //   } else {
      //     // NO BRAND => SET GROUP
      //     setGroup(route.params.group)

      //     console.log('route.params.group = (brand) :',route.params.brand)
      //     console.log('route.params.group = (group) :',route.params.group)
      //   }
      //   //  if group
      //   // setGroup(route.params.group)

      //   if (route.params) {
      //     setGroup(route.params.group)
      //   }
      // })

      onBeforeMount(() => {
        router.push({ params: { category: 'giftcards' } })
      })

      const setBrand = async (brand)  => {
        console.log('setBrand', route.params.brand)
        actions.setSelectedBrand(brand)
      }
      const setGroup = async (group)  => {
        actions.setGroup(group)
      }
      const getOperatorCodeWithBrand = async (brandslug)  => {
        actions.getOperatorCodeWithBrand(brandslug)
      }

      return{stockProducts, filteredProductList, group, brand, actionLabel, setBrand};
    }
  })
</script>

<style lang="scss" scoped>
.styled-list {
    display:flex;
    padding-left:0;
    flex-wrap:wrap;
    list-style:none;
    justify-content: space-between;
    justify-content: flex-start;
    margin-left: -1rem;
    margin-right: -2rem;

    .item {
      min-width:162px;
      min-height:162px;
      max-width:162px;
      // margin-bottom: 2rem;
      // margin-right: 1em;
      margin: 1.225rem;
      text-align:center;
      border-radius:7px;
      overflow:hidden;
      box-shadow: 0 0 3px rgb(0 0 0 / 19%);
      color: #2c3e50;
      position:relative;

      a {
        background:#fff;
        color:inherit;
        display:inline-flex;
        flex-direction: column;
        padding: 10px;
        width: 100%;
        height: 100%;    
        box-sizing: border-box;
        position:relative;
        text-decoration: none;
        
        span {
          text-transform: uppercase;
          display:block;
          &.price {
            font-size:32px;
            line-height:1em;
          }
          &.name {
            font-weight:bold;
            opacity:.7;
            font-size:.888em;
          }
          &.action {
            font-weight:light;
            font-size:.888em;
            opacity:.6;
          }
        }
        img {
          max-width: 80%;
          display: block;
          margin: auto;

          + span {
            font-weight:bold;
            display:block;
            margin-bottom:.25em;
          }
        }
      }
    }
  }
</style>