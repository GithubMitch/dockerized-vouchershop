<template>
  <NuxtLayout name="home">
    <template #slider>
      <client-only>
        <Carousel/>
      </client-only>
    </template>
    <template #salesprops>
      <SalesProps/>
    </template>
    <template #content>
      <client-only>
        <div class="inner sales">
          <RecentOrders/>
          <TopThree/>
        </div>
      </client-only>
    </template>
  </NuxtLayout>
</template>

<script>
import { state, actions } from '../store/reactives';

export default defineComponent({
    layout: 'false',
    name:'home',
    async setup () {
      const stockProducts = toRef(state, 'stockProducts');
      const brands = toRef(state, 'brands');

      if (stockProducts.value.length == 0 && brands.value.length == 0) {
        await Promise.all([
          actions.fetchProductList(),
          actions.fetchBrandList(),
          Promise.resolve(`Completed Promise`)

        ])
      .then((promises) => {
        // return lists
        actions.fetchStockList()
        console.log(promises, 'Promise ressolved')
      })
      .catch(error => console.log('vcshop 68',error))
    }
      // useMeta({
      //   title: 'Home',
      //   meta: [
      //     { name: 'Home', content: 'width=device-width, initial-scale=1, maximum-scale=1' }
      //   ]
      // })
    return {

    }
  }
})
</script>

<style lang="scss">
.inner.sales {
  display:flex;
}
#recentorders {
  width:35%;
  margin-right:2%;
}
#topthree {
  // width:30%;
}
#voucherShop {
  // display:none;
}
  HTML >* , 
  body > * {
    box-sizing: border-box;
    margin:0;
    padding:0;
    font-size:1rem;
    margin-block-start: 0;
    margin-block-end: 0;
    font-family: Avenir,Helvetica,Arial,sans-serif;
  }
  .inner {
    max-width:990px;
    box-sizing:border-box;
    width:100%;
    display:block;
    position:relative;
    margin:0 auto;
    padding:1em;
    :last-child {
      border:none;
    }
  }
  .product{
    text-decoration: line-through;
    pointer-events: none;
  }
  .product.instock {
    text-decoration: none;
    pointer-events: all;
  }
  .sales {
    display:flex;
  }

  /* Vouchershop component */
  #config-window {
    box-shadow: inset 0px 0px 10px -4px #000; 
    box-sizing:border-box;
    background:#ebebeb;
    height:800px;
    padding:1em;
    overflow: scroll;
    :deep() .brandLine ,
    .brandLine {
      cursor:pointer;
    }
    :deep() .brandLine:hover {
      text-decoration: underline;
    }
  }
</style>
