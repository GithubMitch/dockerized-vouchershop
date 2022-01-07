<template>
 <footer>
   <div id="FooterContent">
     <ul>
      <h3>Vouchershop</h3>
      <li><NuxtLink to="/">Home</NuxtLink></li>
      <li><NuxtLink to="/">Over Vouchershop</NuxtLink></li>
      <li><NuxtLink to="/">Beltegoed</NuxtLink></li>
      <li><NuxtLink to="/">Giftcards & Credit</NuxtLink></li>
     </ul>
     <ul>
      <h3>Legal</h3>
      <li><NuxtLink to="/">Algemene voorwaarden</NuxtLink></li>
      <li><NuxtLink to="/">Disclaimer</NuxtLink></li>
      <li><NuxtLink to="/">Cookies</NuxtLink></li>
     </ul>
     <ul>
       <h3>Contact</h3>
      <li><NuxtLink to="/">Contactforumulier</NuxtLink></li>
     </ul>
    <div id="logo">
      <img src="" alt="">
      powered by
      prepaidpoint
      2020
    </div>
   </div>
 </footer>
</template>
<style lang="scss">
  footer{
    flex: 0 1 10%;
    border-top: 1px solid #bb5215;
    background: #ff7514 repeating-linear-gradient(45deg, #ff7514, #f36000a1 100px);
    color: #FFF;
    box-shadow: -0px -4px 1px #00000030;
    margin-top: 3em;

    #FooterContent{
      padding: 1em;
      max-width: 990px;
      margin: 0px auto;
      display: flex;
      justify-content: space-between;
      text-align: left;
      ul {
        list-style:none;
      }
      a{
        display: block;
        margin-bottom: 17px;
        text-decoration: none;
        color: #FFF;
        border-bottom: 2px solid transparent;
        &.router-link-exact-active{
          border-bottom: 2px solid #FFF;
        }
        &:active{
          transform: translateY(1px)
        }
      }
    }

    #PaymentLogos{
      margin-top: 1.5em;
      background: #FFF;
      border-radius: 7px;
      min-height: 3.5em;
      &:active{
        transform: scale(0.99);
        opacity: 0.99;
      }
      h3{
        color: #717171;
        font-size: 12px;
        border-bottom: orange 1px solid;
      }
    }

    #FooterLogo{
      h3{
        margin-top: 1.5em;
        padding-left: 7px;
        margin-bottom: 5px;
        font-size: 80%;
      }
      img{
        max-width: 120px;
      }
    } 
  }
</style>