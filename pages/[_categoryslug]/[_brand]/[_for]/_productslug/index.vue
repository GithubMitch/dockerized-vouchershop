<template #content>
    <div class="inner productpage">
      <!-- <h1>Product detail page</h1> -->
      <h1>
        {{product.name}} 
        <i class="i simple-line-icons:close" @click="$router.go(-1)"></i>
      </h1>
      <img class="product-img" style="display:inline-block;" :src="`../../../assets/logos/${product.brand}.png`" />
      <div class="description">
        <p>
          Suspendisse quis dui et ipsum sagittis feugiat. Etiam ac justo auctor nunc pellentesque molestie nec pulvinar odio. 
          Vivamus malesuada, metus ac feugiat fermentum, mi odio consequat justo, ac ultricies orci massa vitae risus. Vestibulum sollicitudin lorem augue, 
          quis lacinia felis finibus vitae. Mauris id blandit dolor. In lacinia laoreet neque et aliquam. Nam vitae fringilla ex. Donec dictum pellentesque arcu id malesuada.  
        </p> 
        <p>
          Curabitur bibendum ullamcorper ex nec ullamcorper. Fusce id iaculis elit. Mauris id erat varius, pulvinar metus vitae, efficitur quam. Praesent sagittis orci vel ornare interdum. Phasellus in nisl lacinia, sollicitudin ante at, elementum lectus. In eget purus venenatis, laoreet mi vitae, luctus ligula. Etiam tempor nunc quam, vitae ornare nulla lobortis quis. Curabitur sed dignissim sem. Curabitur eu arcu nunc. Morbi at nisl vitae ante tempus molestie. Aenean blandit magna sed libero gravida, vitae eleifend lectus finibus. Sed vel tellus vel nisi interdum laoreet. Vivamus laoreet neque nulla, sit amet porttitor mi sodales eget. Nulla varius convallis velit, at viverra magna tristique nec. Praesent eget leo a felis imperdiet blandit ac eget odio.


        </p> 
        <p>
          Duis dictum egestas augue ut tristique. Vestibulum vel felis ut ligula porttitor elementum. Vestibulum sed velit vel felis pharetra sollicitudin. Praesent ipsum arcu, pretium id metus sit amet, vehicula sodales elit. Donec volutpat vulputate augue, iaculis cursus libero dignissim non. Sed varius mauris a feugiat venenatis. Donec non neque a est pretium mollis ut eget diam. Donec congue, libero quis gravida congue, felis velit consectetur diam, non fringilla nisi massa sed sapien. Mauris scelerisque sed enim at porttitor. Nam non velit non purus egestas dignissim vel et purus. Nullam tempus erat ex, eget porttitor velit dictum sollicitudin. Maecenas in mauris ac augue facilisis tincidunt.
        </p> 
      </div>

        <h3>€{{product.value / 100}}, -</h3>

      
      <div class="buttons">
        <!-- <button class="cta" @click="addProducts(product, (counter < 4 ? counter++ : counter) )"> Add to cart </button> -->
        <!-- <button class="cta" @click="checkoutWith(product)"> Add & go to cart </button> -->
        <!-- <hr> -->
        <!-- <NuxtLink class="cta" @click="checkoutWith(product, (counter < 4 ? counter++ : counter) )" to="/checkout">Add & go to cart</NuxtLink> -->
        <!-- <hr> -->

        <NuxtLink class="cta" @click="addProduct(product)" to="/checkout">Add & go to cart</NuxtLink>

        <!-- <div class="close"  @click="$router.go(-1)">X</div> -->
      </div>
    </div>
</template>

<script lang='ts'>
import { state, actions } from '../../../../../store/reactives';
import { defineComponent, toRef, ref} from 'vue';

export default defineComponent({
  layout: false,
  props: {
    product:{
      type: Object,
      default: []
    }
  },
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "/assets/iconfont/iconfont.css"
        }
      ],
    }
  },
  async setup(props) {
    // console.log(props.product)
    // const counter = useState('counter', () => 0)

    const addProduct = async (product)  => {
      await actions.addProducts(product)
    }

    return {
      addProduct, 
      // counter
    }
  },
})
</script>

<style scoped lang="scss">
  .close {
    display:block;
    margin:auto;
    text-align:center;
  }
  h1 i {
    font-size:1.333em;
    float:right;
    &::before {
      // background:orange;
      color:darkorange;
      transition:.3s ease color;
    }
    &:hover {
      cursor:pointer;
      &::before {
        color:red;
      }
    }
  }
</style>
