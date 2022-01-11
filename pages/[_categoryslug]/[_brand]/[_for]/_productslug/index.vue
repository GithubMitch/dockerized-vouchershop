<template #content>
    <div class="inner productpage">
      <!-- <h1>Product detail page</h1> -->
      <h1>{{product.name}}</h1>
      <img class="product-img" style="display:inline-block;" :src="`../../../assets/logos/${product.brand}.png`" />
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
      
      <!-- <button class="cta" @click="addProducts(product, (counter < 4 ? counter++ : counter) )"> Add to cart </button> -->
      <!-- <button class="cta" @click="checkoutWith(product)"> Add & go to cart </button> -->
      <hr>
      <NuxtLink class="cta" @click="checkoutWith(product, (counter < 4 ? counter++ : counter) )" to="/checkout">Add & go to cart</NuxtLink>
    </div>
</template>

<script lang='ts'>
import { state, actions } from '../../../../../store/reactives';
import { defineComponent, toRef, ref} from 'vue';

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
    const counter = useState('counter', () => 0)

    const addProducts = async (product, counter )  => {
      await actions.addProducts(product, counter)
    }

    const checkoutWith = async (product)  => {
      // product.color = this.brandColor;
      // if(!product.inStock)
        console.log(product.inStock)
        // return false;
      // this.$emit('productSelect');
      addProducts(product, counter);
    }

    return {
      checkoutWith, 
      counter
    }
  },
})
</script>
