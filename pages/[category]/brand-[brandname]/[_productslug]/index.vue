<template #content>
    <div :class="{disabled: !product.inStock}" class="inner productpage ">
      <div v-if="JSON.stringify(product) === '{}'">
        <ProgressBar/>
      </div>    
      <div v-else>
        <h1>
          {{product.name}}
          <i class="i simple-line-icons:close" @click="setBrand(product.brand), $router.push({ name: `category-brand-brandname`, params: {category:$route.params.category , brandname: $route.params. brandname } })"></i>
        </h1>
        <img v-if="product.brand !== undefined" class="product-img" style="display:inline-block;" :src="`../../../assets/logos/${product.brand}.png`" />

        <div class="description">
          <p v-if="details.instructions">{{details.instructions}}</p>
        </div>

          <h3>€{{product.value / 100}}, -</h3>
      </div>

      <div class="buttons">
        <NuxtLink :class="{disabled: !product.inStock}" class="cta" @click="addProduct(product)" :to="product.inStock ? '/checkout' : '/home'">{{ !product.inStock ? 'Not in stock right now' : 'Add & go to cart' }}</NuxtLink>
      </div>
    </div>
</template>

<script lang='ts'>
import { state, actions } from '../../../../store/reactives';
import { defineComponent, toRef, ref} from 'vue';

export default defineComponent({
  layout: false,
  props: {
    pickedproduct:{
      type: Object,
      default: {}
    },
    product:{
      type: Object,
      default: {}
    },
    details:{
      type: Object,
      default: {}
    },
    products:{
      type: Object,
      default: {}
    },
  },
  async setup() {
    const setBrand = (brand)  => {
      console.log(brand)
      actions.setSelectedBrand(brand)
    }
    const setGroup = (group)  => {
      console.log(group)
      actions.setGroup(group)
    }
    const addProduct = async (product)  => {
      await actions.addProducts(product)
    }


    return {
      addProduct, 
      setBrand,
      setGroup
    }
  },
})
</script>

<style scoped lang="scss">
.productpage {
  max-width:600px;
  padding:1em;
  border:1px solid #ddd;
  background:wheat;
  overflow:hidden;
  border-radius:1em;
}
  h1,
  h3,
  .buttons {
    overflow:hidden;
  }
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
