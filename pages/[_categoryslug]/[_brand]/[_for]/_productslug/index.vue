<template #content>
    <div class="inner productpage">
      <!-- <h1>Product detail page</h1> -->
      <h1>{{product.name}}</h1>
      <div class="description">
        <p>
          Suspendisse quis dui et ipsum sagittis feugiat. Etiam ac justo auctor nunc pellentesque molestie nec pulvinar odio. 
          Vivamus malesuada, metus ac feugiat fermentum, mi odio consequat justo, ac ultricies orci massa vitae risus. Vestibulum sollicitudin lorem augue, 
          quis lacinia felis finibus vitae. Mauris id blandit dolor. In lacinia laoreet neque et aliquam. Nam vitae fringilla ex. Donec dictum pellentesque arcu id malesuada.  
        </p> 
      </div>
      <ul>
        <li>
          <span>Prijs = {{product.value}}</span>
        </li>  
        <!-- <li  v-for="descr in product" :key="descr.key">
          {{descr}}
        </li> -->
      </ul>
      <button class="cta" @click="addProducts(product.key)"> Add to cart </button>
      <hr>
      <NuxtLink class="cta" to="/overview">To cart</NuxtLink>
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
