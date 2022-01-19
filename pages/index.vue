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
    <template #vouchershopcomponent>
        <LazyVoucherShop keep-alive/>
    </template>
  </NuxtLayout>
</template>

<script lang="ts">

  export default {
    layout: false,
    inheritAttrs: false,
    name:'home',
    setup () {
      useMeta({
        title: 'Home',
        meta: [
          { name: 'Home', content: 'width=device-width, initial-scale=1, maximum-scale=1' }
        ]
      })
    }
  }

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
  display:none;
}
/* RESET STYLE SHEET */
  html {
    background:repeating-linear-gradient(
      -137deg,hsla(0,0%,62%,.050980392156862744),hsla(0,0%,100%,.25098039215686274) 200
      px
      );
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
