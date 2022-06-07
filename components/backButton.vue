<template>
<ClientOnly>
  <NuxtLink v-if="!hasHistory" id="back" :to="'/'">
    <span>Home</span>  
  </NuxtLink>
  <div v-else id="back" @click="$router.go(-1)">
    <span>Terug</span>  
  </div>
</ClientOnly>
</template>
<script>
import {state} from '../store/reactives'
export default defineComponent({
setup() {
  const route = useRoute();
  const router = useRouter();
  const hasHistory = toRef(state, 'hasHistory');
  router.beforeResolve((from) => {
    if (from) {
      hasHistory.value = true;
    } else {
      hasHistory.value = false;
    }
  })
  return {hasHistory, route, router}
},
})
</script>

<style lang="scss" scoped>
  #back {
    display:block;
    background:orange;
    color:#fff;
    font-weight:bold;
    text-decoration: none;
    text-transform:uppercase;
    font-style:italic;
    width:100px;
    text-align:center;
    padding:.5em;
    border-radius:0 0 1em 1em;
    clip-path: polygon(26% 100%, 14% 100%, 6% 100%, 0% 100%, 0% 0%, 28% 0%, 100% 0%, 100% 99%, 94% 100%, 84% 100%, 76% 100%);

    position:absolute;
    left:20em;
    top:00px;
    cursor:pointer;
  }
</style>