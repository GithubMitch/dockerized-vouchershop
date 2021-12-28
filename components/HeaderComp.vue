
<template>
  <div class="inner">
    <div class="menu">
      <NuxtLink to="/">Home page</NuxtLink>
      <NuxtLink to="/category/beltegoed">Beltegoed</NuxtLink>
      <NuxtLink to="/category/gaming">Gaming</NuxtLink>
      <NuxtLink to="/category/payment">Payment</NuxtLink>
      <NuxtLink to="/category/giftcards">Giftcards</NuxtLink>
      <NuxtLink to="/category/topups">Topups</NuxtLink>
      <NuxtLink to="/category/coupons">Coupons</NuxtLink>
    </div>
    <!-- <span  match="category" @click="navigateTo($event)" >beltegoed</span>
    <span  match="credit" @click="navigateTo($event)" >credit</span> -->
  </div>
  <div class="inner">
    {{$route.params}}
  </div>
</template>

<script lang='ts'>
import { state, actions } from '../store/reactives'
import { defineComponent, onMounted, toRaw , ref} from 'vue'

export default defineComponent({
  setup() {
    /// SETUP ROUTING HERE FOR NAVIGATION
    // const router = useRouter()
    const route = useRoute()
    const newPath = ref()

    onMounted(() => {
        route.params._categoryslug ? actions.setCategory(route.params._categoryslug) : console.log('No category');
        route.params._brandslug ? actions.setSelectedBrand(route.params._brandslug) : console.log('No brand');
        route.params._subcat ? actions.setSelectedSubCategory(route.params._subcat) : console.log('No _subcat');
    })

    watch(
      () => route.query,
      async getQuery => {
        console.log('---New Query---', route.params._categoryslug )
        actions.setCategory(route.params._categoryslug)
      }
    )

    // let navigateTo = (e) => {
    //   console.log(e.target.outerText)
    // }
    // let navigateTo = async ($event)  => {
    //   // console.log("Navi >>>", $event.target.outerText)
    //   if ($event.target.attributes.match.value === 'category') {
    //     // console.log('Link match : category =', $event.target.attributes.match.value)
    //     await router.push({ query: {...route.query, category: $event.target.outerText } })
    //   } else {
    //     await router.push({ path: 'home', query: { category: $event.target.outerText } })
    //   }
    //   // console.log("Navi >>>", route.query)
    // }
    return {}
  },
})
</script>



<style scoped>  .menu a {
    display:inline-block;
    margin-right:20px;
  }
</style>