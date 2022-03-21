<template>
  <HeaderComp/>
  <Router-View/>
  <FooterComp/> 
</template>


<script>
import { state, actions } from './store/reactives';
import {
  defineComponent,
  toRef,
  } from 'vue';

export default defineComponent({
  head() {
    // console.log(this.$content.article)
    // let title = this.getTitle();
    return {
      title: 'VoucherShop',
      link: [
        {
          rel: "stylesheet",
          href: "/assets/iconfont/iconfont.css"
        }
      ],
      meta: [
        // {
        //   hid: 'ABOUT-HID',
        //   name: `About page`,
        //   content: 'Website about page'
        // }
      ]
    }
  },
  async setup () {
      const router = useRouter()
      const route = useRoute()

      const stockProducts = toRef(state, 'stockProducts');
      const brands = toRef(state, 'brands');
      const selectedBrand = toRef(state, 'selectedBrand');

      if (route.params._brand) {
        console.log(route.params._brand)
        selectedBrand.value = route.params._brands
      }

      if (stockProducts.value.length == 0 && brands.value.length == 0) {
        await Promise.all([
          actions.fetchProductList(),
          actions.fetchBrandList(),
          Promise.resolve(`Completed Promise`)

        ])
      .then((promises) => {
        // return lists
        actions.fetchStockList()
        // console.log(promises, 'Promise ressolved')
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
  // useMeta({
  //   title: `Vouchershop ${JSON.stringify(route.params._categoryslug)}`,
  //   meta: [
  //     { name: 'Home', content: 'width=device-width, initial-scale=1, maximum-scale=1' }
  //   ]
  // }),
  }
})

</script>




<style lang="scss">
  /* RESET STYLE SHEET */
  #__nuxt {
      font-family: Avenir,Helvetica,Arial,sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
  }
  html {
    background:repeating-linear-gradient(
      -137deg,hsla(0,0%,62%,.050980392156862744),hsla(0,0%,100%,.25098039215686274) 200px
    );
    display: flex;
    align-content: space-around;
    flex-direction: column;
  }
  HTML > * , 
  body > * {
    box-sizing: border-box;
    margin:0;
    padding:0;
    font-size:1rem;
    margin-block-start: 0;
    margin-block-end: 0;
    font-family: Avenir,Helvetica,Arial,sans-serif;
  }
  .breadcrumb {
    clip-path: polygon(0% 0%, 100% 0%, 98% 50%, 95% 100%, 95% 100%, 100% 100%, 5% 100%, 2% 50%);
  }
  .breadcrumb > .inner {
    // background: #b8c5ce repeating-linear-gradient(308deg, #9e9e9e0d, #ffffff40 200px);
    clip-path: polygon(0% 0%, 100% 0%, 98% 45%, 95% 100%, 95% 100%, 100% 100%, 5% 100%, 3% 65%);
    color:#308ac3;
    font-weight:500;
    padding: 0.25em 4em;
    text-align: center;
    max-width:1100px;
    background:silver;
    a {
      &.router-link-active,
      &:visited {
        color:#308ac3;
      }
      &:hover {
        color:darkblue;
        text-decoration: none;
      }
    }
  }
  .inner {
    max-width:990px;
    box-sizing:border-box;
    width:100%;
    display:block;
    position:relative;
    margin:auto;
    padding:1em;
    &.productpage {
      background:none;
      border:0;
      padding:0;
    }
    &.breadcrumb {
      // background:silver;
      // // background: #b8c5ce repeating-linear-gradient(308deg, #9e9e9e0d, #ffffff40 200px);
      // clip-path: polygon(0% 0%, 100% 0%, 98% 50%, 95% 100%, 95% 100%, 100% 100%, 5% 100%, 2% 50%);

      // color:#308ac3;
      font-weight:500;
      padding:.25em 1em ;
      a {
        color:#308ac3;
        transition: .3s ease color;
        text-transform: capitalize ;
        &:hover {
          // color:darkblue;
        }
        &:visited {
          // color:#308ac3;
        }
      }
    }
    &:last-child {
      border:none;
    }
  }
  body {
    padding: 0;
    margin: 0;
    background: repeating-linear-gradient(
    -137deg,hsla(0,0%,62%,.050980392156862744),hsla(0,0%,100%,.25098039215686274) 200px);
    min-height: 100vh;
  }
  .page-title {
    text-transform: capitalize;
    color: #0c4971;
    text-transform: uppercase;
    font-weight: 900;
    font-size:2em;
  }
  .product{
    text-decoration: line-through;
    pointer-events: none;
  }
  .product.instock {
    text-decoration: none;
    pointer-events: all;
  }

  // temp button style remove later
  .deselect {color:#ddd !important;}
  /* Vouchershop component */
  #config-window {
    box-shadow: inset 0px 0px 10px -4px #000; 
    box-sizing:border-box;
    background:#ebebeb;
    height:800px;
    padding:1em;
    overflow: scroll;
    .brandLine.deselect {
      border:1px solid white;
    }
    :deep() .brandLine ,
    .brandLine {
      cursor:pointer;
    }
    :deep() .brandLine:hover {
      text-decoration: underline;
    }
  }
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
      cursor:pointer;
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
        &.disabled {
          cursor:none;
          background:lightgray;
          pointer-events: none;
        }

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

  #SalesProps{
    position:relative;
    max-width:990px;
    min-width:990px;
    margin:0 auto
  }
  #SalesProps,#SalesProps #SalesPropsContent{
      display:-webkit-box;
      display:-ms-flexbox;
      display:flex;
      -webkit-box-pack:justify;
      -ms-flex-pack:justify;
      justify-content:space-between
  }
  #SalesProps div{
      -webkit-box-flex:1;
      -ms-flex:1 1 33%;
      flex:1 1 33%;
      border-right:1px solid #ddd;
      min-height:100px;
      padding-right:1em;
      margin-top:1em;
      text-align:left
  }
  #SalesProps div img{
      float:left;
      margin:1em;
      max-height:70px;
      max-width:100px
  }
  #SalesProps div h1{
      font-size:18px;
      margin-bottom:5px;
      color:#105a8a;
      font-weight:900
  }
  #SalesProps div p.desc{
      margin-top:0;
      font-size:.85em
  }
  #SalesProps div:last-child{
      margin-right:0;
      border:none
  }
  #SalesProps div#NoRegistration img{
      margin-top:1.5em
  }


  .product-img {
    float:right;
    max-width: 40%;
    margin-left: 1em;
    margin-bottom: 1em;
    border: 1px solid lightgray;
    border-radius: 1em;
    padding: 2em;
    box-sizing: border-box;
  }
//buttons
  .cta {
    margin: 0;
    left: 0;
    background: linear-gradient(186deg,#28c475,#15734c);
    color: #fff;
    width: 100%;
    border: none;
    border-radius: 7px;
    min-height: 50px;
    font-size: 1.25em;
    text-transform: uppercase;
    cursor: pointer;
    outline: none;
    display: block;
    text-align: center;
    text-decoration: none;
    line-height:1em;
    padding:.777em;
    box-sizing:border-box;
    font-weight:500;
    transition:.3s ease opacity;

    &:hover {
      opacity:.9;
    }
  }

  .foldHoder, 
  .tip {cursor:pointer;}
</style>