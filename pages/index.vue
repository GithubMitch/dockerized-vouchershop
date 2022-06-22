<template>
  <NuxtLayout name="home">
    <template #slider>
      <Carousel/>
    </template>
    <template #pickcategory>
      <ClientOnly>
        <PickCategory  :class="{fadein: setupAppReady}"/>
      </ClientOnly>
    </template>
    <template #salesprops>
      <SalesProps/>
    </template>
    <template #content>
      <div class="inner sales" >
        <ClientOnly>
          <!-- <RecentOrders :class="{fadein: setupAppReady}"/>
          <TopThree :class="{fadein: setupAppReady}"/> -->
        </ClientOnly>
        </div>
    </template>
  </NuxtLayout>
</template>

<script>
import {state} from '../store/reactives'
export default defineComponent({
  layout: "home",
  name: "home",
  async setup() {
    useMeta({
        title: "Home",
        meta: [
            { name: "Home", content: "width=device-width, initial-scale=1, maximum-scale=1" }
        ]
    });
    const setupAppReady = toRef(state, 'setupAppReady')
    return {setupAppReady};
  },
})
</script>

<style lang="scss">
.inner.sales #recentorders,
.inner.sales #topthree,
#Slider,
#pickcategory {
  opacity:0 !important;
  transition:.6s cubic-bezier(0.075, 0.82, 0.165, 1) all;
  &.fadein {
    opacity:1 !important;
    margin:1em 0;
  }
}
.inner.sales {
  display:flex;
  justify-content: space-evenly;
}
#recentorders {
  width:35%;
  margin-right:2%;
}
</style>
