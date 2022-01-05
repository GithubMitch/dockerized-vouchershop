<template #content>
    <div class="inner">
      <h1>Product detail page</h1>
      <h2>{{product.name}}</h2>
      <ul>
        <li  v-for="descr in product" :key="descr.key">
          {{descr}}
        </li>
        <li>
          <span @click="addProducts(product.key)"> add Product () </span>
        </li>
        <li>
          <span>
            <NuxtLink to="/overview">Check out</NuxtLink>
          </span> 
        </li>
      </ul>
    </div>
</template>

<script lang='ts'>
import { state, actions } from '../../../../../store/reactives';
import { defineComponent, toRef} from 'vue';

export default defineComponent({
  layout: false,
  props: {
    product:{
      type: Array,
      default: []
    }
  },
  async setup(props) {
    // console.log(props.product)
    const addProducts = async (product)  => {
      await actions.addProducts(product)
    }

    return {
      addProducts
    }
  },
})
</script>
