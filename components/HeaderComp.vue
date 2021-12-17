
<template>
  <div class="inner">
    <div class="menu">
      <NuxtLink to="/">Home page</NuxtLink>
      <!-- <NuxtLink to="/category">Category</NuxtLink> -->
      <NuxtLink to="/category/beltegoed">Beltegoed</NuxtLink>
      <NuxtLink to="/category/gaming">Gaming</NuxtLink>
      <NuxtLink to="/category/payment">Payment</NuxtLink>
      <NuxtLink to="/category/giftcards">Giftcards</NuxtLink>
      <NuxtLink to="/category/topups">Topups</NuxtLink>
      <NuxtLink to="/category/coupons">Coupons</NuxtLink>
      <NuxtLink to="/category/blabla">Blabla</NuxtLink>
    </div>
    <span  match="category" @click="navigateTo($event)" >beltegoed</span>
    <span  match="credit" @click="navigateTo($event)" >credit</span>
  </div>
</template>

<script>
import { state, actions } from '../store/reactives'
import { defineComponent, onMounted, toRaw , ref} from 'vue'

export default defineComponent({
  setup() {
    /// SETUP ROUTING HERE FOR NAVIGATION
    const router = useRouter()
    const route = useRoute()
    const newPath = ref()

    onMounted(() => {
      newPath.value = toRaw(route.path)
      if (newPath.value.match(/category/g)) {
        console.log('---New Query---', newPath.value )
        actions.setCategory(newPath.value)
      }
    })

    watch(
      () => route.query,
      async getQuery => {
        newPath.value = toRaw(route.path)
        // console.log('---New Query---', newPath )
        actions.setCategory(newPath.value)
      }
    )

    // let navigateTo = (e) => {
    //   console.log(e.target.outerText)
    // }
    let navigateTo = async ($event)  => {
      // console.log("Navi >>>", $event.target.outerText)
      if ($event.target.attributes.match.value === 'category') {
        // console.log('Link match : category =', $event.target.attributes.match.value)
        await router.push({ query: {...route.query, category: $event.target.outerText } })
      } else {
        await router.push({ path: 'home', query: { category: $event.target.outerText } })
      }
      // console.log("Navi >>>", route.query)
    }
    return {navigateTo}
  },
})
</script>



<style scoped>  .menu a {
    display:inline-block;
    margin-right:20px;
  }
</style>