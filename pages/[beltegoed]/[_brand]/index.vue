<template>
  <div class="inner">
    <h1 class="pagetitle">{{group ? group : brand }}</h1> 
    <!-- // TODO above -->
    <Products :products="filteredProductList ? filteredProductList : stockProducts" :brand="brand" :group="group" :actionLabel="actionLabel" />
  </div>
</template>

<script lang="ts">
  import { state, actions } from '../../../store/reactives';
  import {
    defineComponent,
    toRef
  } from 'vue';
  // import gsap from "gsap";
  

  export default defineComponent({
    layout: 'productlist',
    // props: {
    //   selectedBrand:{
    //     type: String,
    //     default: ''
    //   },
    //   products:{
    //     type: Object,
    //     default: {}
    //   }
    // },
    async setup(props) {   
      const router = useRouter()
      const route = useRoute()

      const filteredProductList = toRef(state, 'filteredProductList');
      const stockProducts = toRef(state, 'stockProducts');
      const brand = toRef(state, 'brand');
      const group = toRef(state, 'group');
      const actionLabel = toRef(state, 'actionLabel');
      // console.log(filteredProductList.value)

      watch([stockProducts], (newValues, prevValues) => {
        console.log('WATCHER STOCKPRODUCTs' , prevValues, newValues)
        if (route.params._brand !== undefined) {
          console.log('route.params._brand :',route.params._brand)
          setSelectedBrand(route.params._brand)
          if ( toRaw(filteredProductList.value).length === 0 ) {
            console.log(toRaw(filteredProductList.value))
            setGroup(route.params._brand)
          }
        } else {
          console.log('route.params._brand = (group) :',route.params._brand)
        }
        //  if group
        // setGroup(route.params._group)

        // if (route.params._) {
        //   setSelectedBrand(route.params._brand)
        // }
      })

      const setSelectedBrand = async (brand)  => {
        console.log(route.params._brand)
        actions.setSelectedBrand(brand)
      }
      const setGroup = async (group)  => {
        actions.setGroup(group)
      }

      return{stockProducts, filteredProductList, group, brand, actionLabel};
    }
  })
</script>
<style scoped>
  .pagetitle {
    text-transform: capitalize;
  }
</style>