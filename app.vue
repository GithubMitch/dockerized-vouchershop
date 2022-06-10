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

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import {state , actions} from './store/reactives'
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
          actions.getPaymentOptions()

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
    padding-top:1em;
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
  main .inner.sales {max-width:990px;margin:auto;}
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
        &:hover {
          // color:darkblue;
        }
        &:visited {
          // color:#308ac3;
        }
      }
    }
    &:last-child {
      // border:none;
    }
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
            img {
              // display:inline-block;
              // line-height:38px;
              // vertical-align: middle;
            }
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
      &:hover {
        // opacity:.9;
      }
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
          li {
            a {

            }
          }
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
</style>