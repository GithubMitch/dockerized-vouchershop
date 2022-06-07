<template>
  <Router-View :products="stockProducts"/>
</template>

<script lang="ts">
import {_} from 'vue-underscore';

import { state, actions } from '../../store/reactives';
import {defineComponent, toRef, watch} from 'vue';

export default defineComponent({
  layout: false,
  async setup(props) {
    const router = useRouter()
    const route = useRoute()
    const setupAppReady = toRef(state, 'setupAppReady')
    const stockProducts = toRef(state, 'stockProducts');
    console.log('BRAND PARENT VUE :'  , route.params)
    const stopWatch /* this is a callback that dismantles the watch function. see: https://v3.vuejs.org/guide/reactivity-computed-watchers.html#shared-behavior-with-watcheffect */
    = watch(
      [setupAppReady], /* you can watch an entire array of reactive values */
      (current, previous) => { /* see: https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watch */
      /* if you use a watcher to trigger an async function, make sure you invalidate side effects! See: https://v3.vuejs.org/guide/reactivity-computed-watchers.html#side-effect-invalidation */
        // code you want to run when reactives change
        console.log(current, previous)
        if (route.params.brandname !== undefined) {
          console.log(setupAppReady.value)
          actions.setSelectedBrand(route.params.brandname)
        }
      },
      {
        deep: true, /* see https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watching-reactive-objects*/
        immediate: false /*see: https://v3.vuejs.org/api/instance-methods.html#watch*/
      }
    )
    onBeforeMount(() => {
      router.push({ params: { category: 'giftcards' } })
    })
    return{ stockProducts};
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