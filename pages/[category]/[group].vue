<template>
  <Router-View :products="stockProducts"/>
</template>

<script lang="ts">
import { state, actions } from '../../store/reactives';
import {defineComponent,toRef,watch} from 'vue';

export default defineComponent({
  layout: false,
  async setup() {
    const route = useRoute()
    const filteredProductList = toRef(state, 'filteredProductList');
    const setupAppReady = toRef(state, 'setupAppReady');
    const stockProducts = toRef(state, 'stockProducts');
    const brand = toRef(state, 'brand');
    const group = toRef(state, 'group');
    const actionLabel = toRef(state, 'actionLabel');

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