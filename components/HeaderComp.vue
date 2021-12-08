
<template>
  <div class="inner">
    <NuxtLink to="/">Home page</NuxtLink>
    <span  match="category" @click="navigateTo($event)" >beltegoed</span>
    <span  match="category" @click="navigateTo($event)" >credit</span>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    // let navigateTo = (e) => {
    //   console.log(e.target.outerText)
    // }
    let navigateTo = async ($event)  => {
      console.log("Navi >>>", $event.target.outerText)
      if ($event.target.attributes.match.value === 'category') {
        console.log('Link match : category =', $event.target.attributes.match.value)
        await router.push({ query: {...route.query, category: $event.target.outerText } })
      } else {
        await router.push({ query: {...route.query, category: $event.target.outerText } })
      }
      console.log("Navi >>>", route.query)
    }
    return {navigateTo}
  },
})
</script>



<style scoped>

</style>