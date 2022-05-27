<template>
  <div id="recentorders">
    <h2><span>Je vorige bestellingen</span></h2>
    <div class="recent">
      <ul class="products">
        <li v-for="(item, index) in orderItems" :key="index">
          <span>{{item.key}}  </span>
        </li>
      </ul>
      <NuxtLink class="button" to="/checkout">Bestel nu snel!</NuxtLink>
      <!-- <a href="" class="button">Bestel nu snel!</a> -->
    </div>
  </div>
</template>

<script>
import { _ } from "vue-underscore";
import CryptoJS from "crypto-js";
import { state, actions, methods } from '../store/reactives'

export default defineComponent({
  async setup () {
      const order = toRef(state,'order')
      const orderItems = toRef(state.order,'orderItems')
			const reinstateOrder = (orderItems) => {
				actions.reinstateOrder(orderItems)
			}
			const emptyOrder = (orderItems) => {
				state.order.orderItems = [];
			}

      if (process.client){
        
        if (localStorage.getItem('trxmem') && state.order.orderItems.length == 0 ) {
          let storedTrxString = localStorage.getItem('trxmem');
          if(storedTrxString != undefined && bytes != '' ){
            var bytes  = CryptoJS.AES.decrypt(storedTrxString, 'trx_ez_obscure');
            if(bytes != undefined && bytes != '' ){
              let data = bytes.toString(CryptoJS.enc.Utf8);
              data = JSON.parse(data);
              console.log('LocalStorage getItem:',{data});
              actions.reinstateOrder(data.orderItems);
            }
          }
        } 
      }
    return {orderItems}
  }
})
</script>

<style scoped lang="scss">
#recentorders {
  width: 35.3%;
  margin-right:2%;
}
  h2 {
    line-height:2em;
    color:#0c4971;
    span {
      vertical-align: baseline;
    }
  }
  .recent {
    background:#fff;
    border: 1px solid #00000030;
    // -webkit-box-shadow: 0px 0px 3px #00000030;
    // box-shadow: 0px 0px 3px #00000030;
    padding: 16px;
    border-radius:5px;
    background-image: url("../assets/speedCart.png");
    background-repeat: no-repeat;
    background-size: 34%;
    background-position: 88% 56px;
    position: relative;
    min-height: 162px;
    box-sizing: border-box;
    padding-bottom:86px;

    ul {
      position: relative;
      list-style-type: none;
      margin: 0;
      padding: 0;
      transition:all .3s ease;
      &.fadeOut {
        opacity:0;
      }
    }
    li {
      color:#0c4971;
      display:block;
      text-decoration: none;
      font-weight:bold;
      &:before{
        content: "•"; /* Insert content that looks like bullets */
        padding-right: 8px;
      }
    }
    .button {
      background:#f06c19;
      color:#fff;
      font-weight:700;
      position: absolute;
      bottom: 16px;
      left: 16px;
      text-decoration: none;
      border-radius:5px;
      box-sizing:border-box;
      display:block;
      padding:1em;
      width:100%;
      max-width:160px;
      cursor:pointer;
      transition: .3s ease background;
      &:hover {
        background:orange;
      }
    }
    .close {
      position: absolute;
      right:20px;
      top:15px;
      z-index:10;
      cursor:pointer;
      opacity: 0;
      display:none;
    }
  }
</style>