<template>
  <NuxtLayout name="productlist">
    <template #content>
      <h1>Parent: {{$route.params.group}} - Group</h1>
      <!-- {{$route.params.group}} - Group -->
      <Router-View params="GROUP"/>
      <!-- <NuxtPage/> -->
    <h1>
<pre>path: {{$route.path}}</pre>
<pre>name: {{$route.name}}</pre>
<pre>params: {{$route.params}}</pre>
    </h1>
    </template>
  </NuxtLayout>
</template>

<script lang="ts">
  import {_} from 'vue-underscore';

  import { state, actions } from '../../store/reactives';
  import {
    defineComponent,
    toRef,
    onMounted,
    watch
  } from 'vue';

  export default defineComponent({
    layout: false,
    // inheritAttrs: false,
    async setup(props) {
      const route = useRoute()
      const filteredProductList = toRef(state, 'filteredProductList');
      const stockProducts = toRef(state, 'stockProducts');
      const brand = toRef(state, 'brand');
      const group = toRef(state, 'group');
      const actionLabel = toRef(state, 'actionLabel');
      
      console.log('GROUP PARENT VUE :'  , route.params)

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