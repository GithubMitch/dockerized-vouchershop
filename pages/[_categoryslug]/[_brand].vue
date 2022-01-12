<template>
  <NuxtLayout name="productlist">
    <template #content>

      <NuxtChild 
      :selectedBrand="selectedBrand" 
      :products="stockProducts"
      />

    </template>

  </NuxtLayout>
</template>

<script lang="ts">
  import {_} from 'vue-underscore';

  import { state, actions } from '../../store/reactives';
  import {
    defineComponent,
    toRef,
    onMounted,
    watch
  } from 'vue';

  export default defineComponent({
    layout: false,
    // inheritAttrs: false,
    async setup(props) {
      const route = useRoute()
      const selectedBrand = toRef(state, 'selectedBrand');
      const stockProducts = toRef(state, 'stockProducts');
      const selectedBrandProducts = toRef(state, 'selectedBrandProducts');

      const stock = async (stockProducts)  => {
        selectedBrandProducts.value = _(stockProducts.value).filter({brand: selectedBrand.value, inStock: true})
        // console.log('selectedBrand', selectedBrand.value)
        // console.log(selectedBrandProducts.value, stockProducts.value)
      }
      onMounted(() => {
        // console.log('MOUNTED _BRAND')
        stock(stockProducts)
        // selectedBrandProducts.value.length == 0 ? stock(stockProducts) : console.log(selectedBrandProducts.value.length);
      })      
      // watcher  : watch for changed selectedBrand or fetched stockProducts
      watch([stockProducts , selectedBrand], (newValues, prevValues) => {
        console.log(prevValues, newValues)
        stock(stockProducts)
      })

      return{selectedBrand, stockProducts};
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
      // margin-bottom: 2rem;
      // margin-right: 1em;
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
            font-size:1em;
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