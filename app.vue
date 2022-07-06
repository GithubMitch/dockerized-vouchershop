<template>
  <div>
    <div id="content" :class="{open: activeSideMenu}">
      <HeaderComp/>
      <Router-View/>
      <!-- <NuxtPage/> -->
      <FooterComp/> 
    </div>
    <SideMenu  :class="{open: activeSideMenu}"/>
  </div>
</template>

<script lang="ts">
import {state , actions} from './store/reactives'
import {
  defineComponent,
  toRef,
  } from 'vue';

export default defineComponent({
  head() {
    return {
      title: 'VoucherShop',
      link: [
        {
          rel: "stylesheet",
          // href: "@/assets/iconfont/iconfont.css"
        }
      ]
    }
  },
  async setup () {
    const setupAppReady = toRef(state, 'setupAppReady')
    const stockProducts = toRef(state, 'stockProducts');
    const brands = toRef(state, 'brands');
    const activeSideMenu = toRef(state, 'activeSideMenu');
    
    if (stockProducts.value.length == 0 && brands.value.length == 0) {
      Promise.all([
        actions.fetchProductList(),
        actions.fetchBrandList(),
        actions.fetchStockList(),
        // actions.getPaymentOptions()

      ]).then((promises) => {
        // return lists
        setupAppReady.value = true;
        if (!process.server) {
          console.log(promises, 'Resolved')
          Promise.resolve(promises)

        }
      }).catch(error => {
        console.log('vcshop 68',error)
      })
    }
  
    return {activeSideMenu}
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
      overflow:hidden;
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
  
  main[name="productlist"], 
  main[name="category"] {
    max-width: 1640px;
    margin: 0 auto;
    position:relative;
    padding:1em;
    // padding: 0 1em;
  }

  main[name="category"] {
    main[name="productlist"] {
      padding-top:0;
      #back {
        display:none;
      }
    }
  }
  main .inner {max-width:100%;}
  main .inner.sales {max-width:1200px;margin:auto;}
  .inner {
    // max-width:990px;
    // box-sizing:border-box;
    // width:100%;
    // display:block;
    // position:relative;
    // margin:0 auto;
    // padding:1em;
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
        // &:hover {
        //   // color:darkblue;
        // }
        // &:visited {
        //   // color:#308ac3;
        // }
      }
    }
    // &:last-child {
    //   // border:none;
    // }
  }
  body {
    padding: 0;
    margin: 0;
    // background: repeating-linear-gradient(
    // -137deg,hsla(0,0%,62%,.050980392156862744),hsla(0,0%,100%,.25098039215686274) 200px);
    min-height: 100vh;
  }
  .title {
    .page-title {
      text-transform: capitalize;
      color: #0c4971;
      text-transform: uppercase;
      font-weight: 900;
      font-size:2em;
      // margin:0;
      display:inline-block;
      padding-right:1em;
    }
    .page-subtitle {
      // margin:0;
      color: #0c4971;
      display:inline-block;
      font-weight: 900;
      text-transform: uppercase;

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

  // temp button style remove later
  .deselect {color:#ddd !important;}
  .styled-list {
    display:flex;
    padding-left:0;
    flex-wrap:wrap;
    list-style:none;
    justify-content: space-between;
    justify-content: flex-start;

    .item {
      cursor:pointer;
      min-width:162px;
      min-height:162px;
      max-width:162px;
      margin: 1.225rem;
      text-align:center;
      border-radius:7px;
      overflow:hidden;
      box-shadow: 0 0 3px rgb(0 0 0 / 19%);
      color: #2c3e50;
      position: relative;
      margin-left: 0em;

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
        transition:.3s ease all;
          .slide {
            // display:block;
            span.action {font-weight:700;}
            span.confirm {display:none;}
            span {font-size:.888em;}
            // img {
            //   // display:inline-block;
            //   // line-height:38px;
            //   // vertical-align: middle;
            // }
          }
          .slide.add {
            display:none;
            font-weight:bold;
            span.action {
              font-weight:700;
              opacity:1;
            }
            i {
              display:none;
              position: absolute;
              top: 50%;
              margin:auto;
              font-size: 5em;
              width:80px;
              height:80px;
              right:50%;
              margin-right:-40px;
              margin-top:-50px;
            }

          }
          .slide.add {display:none;}
        &:hover {
          background:orange;
          color:#fff;
          .slide {display:none}
          .slide.add {display:block;}
        }
        &.disabled {
          cursor:none;
          background:lightgray;
          pointer-events: none;
          box-shadow: none;

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
          max-height: 80px;
          margin-bottom: 1em;

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
    max-width:1200px;
    min-width:0;
    margin:0 auto
  }
  #SalesProps,#SalesProps #SalesPropsContent{
      display:-webkit-box;
      display:-ms-flexbox;
      display:flex;
      -webkit-box-pack:justify;
      -ms-flex-pack:justify;
      justify-content:space-around;
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
.buttons{
  .cta {
    &.disabled {
      width:100%;
    }
  }
}
  .cta {
    margin: 0;
    left: 0;
    background: repeating-linear-gradient(45deg, #1684c8, #308ac3 100px);
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

    &.disabled {
      // pointer-events:none;
      // background: linear-gradient(186deg,#28c430,#15734c);
      background: repeating-linear-gradient(45deg, #1684D9, #308AE9 100px);
      width:100%;
      opacity:1;
      // &:hover {
      //   // opacity:.9;
      // }
    }
    &:hover {
      background: linear-gradient(186deg,#28c430,#15734c);
      // background: repeating-linear-gradient(45deg, #1684D9, #308AE9 100px);
    }
  }

  .foldHoder, 
  .tip {cursor:pointer;}

  // Sidemenu togglemenu Setup
  #sidemenu {
    position: fixed;
    z-index: 0;
    height: 100%;
    width: 300px;
    top: 0;
    transition: .3s ease-in left, .3s cubic-bezier(0.19, 1, 0.22, 1) opacity;
    opacity: 0;
    background: rgb(221 221 221 / 25%);
    color:#0c4971;
    overflow-y: auto;
    &.open {
      transition: .3s ease-in left, 1s cubic-bezier(0.19, 1, 0.22, 1) opacity;
      left:0px;
      opacity:1;
    }
    .title {
      padding-left: 1em;
      line-height: 35px;
      margin-top: 1px;
      display: inline-block;
      width: 100%;
      box-sizing: border-box;
    }
    .title.open {
      display:inline-block;
      width:100%;
    }
    .title.open,
    .open > a{
      background: rgb(221 221 221 / 25%);
      font-weight:bold;
    }
    i {
      position: absolute;
      right: 1px;
      line-height: 35px;
      padding: 0 1em;
      background: #dde;
      cursor: pointer;
      background: rgba(221, 221, 221, 0.25);
      border-left: 1px solid #ddd;
    }
    a {
      color:#0c4971;
      text-decoration: none;
      transition: .3s ease text-decoration;
      &:hover {
        text-decoration: underline;
      }
      &.router-link-active {
        background:#ff7514;
        color:#fff;
        + i {
          color:#fff;
        }
      }
    }
    ul {
      li:last-of-type {
        border-bottom:0;
      }
      li {
        border-bottom:1px solid #ccc;
        &:hover {
          background:white;
        }
        a {
          align-self: center;
          font-size: 18px;
          padding: 5px;
          box-sizing: border-box;
          display: inline-block;
          text-decoration: none;
          text-transform: capitalize;
          width:100%;
        }
        
        //1st lvl nest
        ul {
          height:0;
          overflow:hidden;
          &.open {
            height:auto;
          }
        }
      } 
    }
  }
  #content {
    position:relative;
    z-index:100;
    box-shadow:1px -10px 10px #333;
    left:0;
    min-height: 100vh;
      transition: .3s ease-out all;
    // animation to 
    &.open {
      // position:fixed;
      background:#fff;
      left:300px;      
    }
  }
  .pagetitle {
    text-transform: capitalize;
    margin-top:0;
  }











// Extra small devices (portrait phones, less than 576px)
// No media query for `xs` since this is the default in Bootstrap

// Small devices (landscape phones, 576px and up)
@media (max-width: 576px) { 
  }

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  header {
    #Logo {
      float:none;
      display:block;
      margin:auto;
    }
    & > section {
      display:flex;
      flex-direction:column;
    }
    #HeaderContent {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: flex-end;
      justify-content: space-between;
    }
    #mobileHamburger {
      top: 0;
      right: 0;
      position: relative;
    }
    #HeaderSpace {padding-top:0;display:inline-flex;}
  }
  .styled-list {
    display: flex;
    padding-left: 0;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    li.item {
      width:46%;
      margin-right:1%;
      max-width:none;
      min-width:140px;
    }
  }
  #topthree .popular {
    flex-direction: column !important;
    // padding-right:10px;
    .select {
      .brand::after {
        right:-6px !important;
        top:-18px;
      }
    }
  }
 
  .categories {
    nav {
      ul {
        li {
          width:100% !important;
          max-width:100% !important;
          min-width:100% !important;
          margin-right:0% !important;
          a {
            font-size:1rem !important;
          }
        }
      }
    }
  }

  main .inner.sales {
    // max-width:100%;
    width:100%;
  }
  .inner.sales {
    padding:0 1em;
  }
  #Contact {
    form {
      padding:1em;
      max-width:320px;
      .formControl {
        // flex-direction: column;
        flex-wrap: wrap;
        span.input {
          // display:flex;
          // flex:auto;
          button#Submit {
            min-width:280px;
            max-width:320px;
            width:100%;
          }
        }
        span.chars {
          left:200px;
          right:auto;
        }
        textarea {
          box-sizing:border-box;
          min-width:280px;
          max-width:320px;
          width:100%;
        }
      }
    }
  }
  #Slider.fadein .slide {
    font-size:1.5rem !important;
    box-sizing:border-box;
  }
}

// /* Small devices (portrait tablets and large phones, 600px and up) */
// @media only screen and (min-width: 600px) {

// }

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (max-width: 768px) {
  header #Logo img {
    height:auto;
    max-width:100%;
    margin-top:.5em;
  }
  .categories {
    nav {
      ul {
        li {
          width: 46%!important;
          max-width: 46%!important;
        }
      }
    }
  }
  #SalesProps {
    span div {
      padding:1em;
      margin:auto !important;
      max-width:100%;
      border:none;
      border-bottom:1px solid lightgray;
      min-height:auto;
      overflow:hidden;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-content: center;
      align-items: center;
      img {
        max-width:60px;
        margin-bottom:1em !important;
      }
    }
    & #SalesPropsContent {
      display:block;
      width:100%;
    }
  }
  #Slider .slide {
    font-size:2rem !important;
  }
  // header > section {flex-direction:column;}
  header #HeaderSpace {padding-top:1.2em}
  #hamburger {display:none;}
  #mobileHamburger {display:inline-block;}
  #menu {right:0;}
  #Links {display:none;}
  #hamburger,
  #mobileHamburger {top:35px;}

  form#checkoutForm {
    flex-direction: column;
    .formControl {
      label {
        margin-right:0;
      }
      .select {
        // width:100%;
      }
    }

    #ContactDelivery {
      h1 {
        padding-left:.75em;
      }
    }
    #Payment {
      padding-right:1em;
    }
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (max-width: 992px) {

  .categories {
    nav {
      ul {
        li {
          width:32% ;
          max-width:32% ;
          min-width:32% ;
          margin-right:1% ;
          a.category {
            font-size:1.5rem !important;
          }
        }
      }
    }
  }
  .inner {
    &.sales {
      padding: 0 1em !important;
      box-sizing:border-box;
      display:block !important;

      #recentorders {
        width:100%;
      }
    }
  }
  #SalesProps {
    div {
      img {
        margin-bottom:3em !important;
      }
    }
  }
  #topthree .popular {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .select {
      display:block !important;
      margin-right:1em;
      .visual {
        img {
          margin:auto;
        }
      }
      .brand::after {
        z-index: 999;
      }
      &:last-child {
        margin-right:0;
      }
    }
    .select , a , .brand {
      width:100%;
      display:block;
      box-sizing:border-box;
    }

    .brand {
      // margin: 24px !important;
      margin-right: 22px !important;
      margin-bottom: 22px !important;
    }
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (max-width: 1660px) {
  .categories {
    > span {
      display:none;
    }

    nav {
      width:100% !important;
      max-width:100% !important;
    }
  } 
}
</style>