<template>
  <div class="inner">
    <h1 class="pagetitle">
      {{$route.params.category}} {{$route.params.brandname ? '>' : ''}} 
      {{$route.params.brandname}}
    </h1> 
    <span>Select your product(s)</span>
    <Products :products="filteredProductList ? filteredProductList : products" :brand="brand" :group="group" :actionLabel="actionLabel" />
    <!-- <h1>
<pre>path: {{$route.path}}</pre>
<pre>name: {{$route.name}}</pre>
<pre>params: {{$route.params}}</pre>
    </h1> -->
  </div>
</template>

<script lang="ts">
  import { state, actions } from '../../../store/reactives';
  import {
    defineComponent,
    onBeforeMount,
    toRef
  } from 'vue';
  // import gsap from "gsap";
  

  export default defineComponent({
    layout: 'productlist',
    async setup(props) {   
      const router = useRouter()
      const route = useRoute()

      const filteredProductList = toRef(state, 'filteredProductList');
      const stockProducts = toRef(state, 'stockProducts');
      const brand = toRef(state, 'brand');
      const group = toRef(state, 'group');
      const actionLabel = toRef(state, 'actionLabel');
      // console.log(filteredProductList.value)

      // watch([stockProducts], (newValues, prevValues) => {
      //   console.log('WATCHER STOCKPRODUCTs' , prevValues, newValues)
      //   if (route.params.brand !== undefined) {
      //     // NO BRAND => SET GROUP
      //     console.log('route.params.brand :',route.params.brand)
      //     // let currentBrand = getOperatorCodeWithBrand(route.params.brand);
      //     // console.log(currentBrand, 'currentBrand')
      //     setBrand(route.params.brand)
      //     if ( toRaw(filteredProductList.value).length === 0 ) {
      //       console.log(toRaw(filteredProductList.value))
      //       setGroup(route.params.brand)
      //     }
      //   } else {
      //     // NO BRAND => SET BRAND
      //     console.log('route.params.group = (group) :',route.params.group)
      //   }
      //   //  if group
      //   // setGroup(route.params.group)

      //   // if (route.params._) {
      //   //   setBrand(route.params.brand)
      //   // }
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
    // console.log(route.params)
      onBeforeMount(()=>{
        // let brandsString = JSON.stringify(state.brands)
        // const validateBrand = ref(brandsString.includes(route.params.brand))
        //   console.log('validateRoute',route.params.brand, validateBrand.value)
        // if (validateBrand.value) {

        // }else {
        //   // redirect to group
        //   // router.push(`/${route.params.category}/${route.params.brand}`)
        //   // name: `category-group` 
        //   router.push({name: `category-group`, params: {  category: route.params.category , group: route.params.brand }})
        // }

      })

      return{stockProducts, filteredProductList, group, brand, actionLabel, setBrand};
    }
  })
</script>
<style scoped>
  .pagetitle {
    text-transform: capitalize;
  }
</style>