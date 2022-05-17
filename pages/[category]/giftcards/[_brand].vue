<template>
  <NuxtLayout name="productlist">
    <template #content>
      <Router-View/>
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
      const stockProducts = toRef(state, 'stockProducts');

      const stock = async (stockProducts)  => {

      }


      return{stockProducts};
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