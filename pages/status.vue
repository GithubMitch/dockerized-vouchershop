<template>
  <NuxtLayout name="default">
    <template #content>
        <div class="inner">
          <h1>Status Content</h1>
          <p>
            A list with all products that reside in your cart.
          </p>
        </div>
        <div class="inner">
          <h2>Products</h2>

          <div id="ProductSelection" ref="orderItems" >
            <div v-if="orderItems.length > 0">
              <div class="orderItemHolder" v-for="(item, index) in orderItems" :key="index">
                <div class="orderItem" :class="{onButton:hover}">
                  <div class="productInfo">
                    <!-- <img alt="" :src="item.img"> -->
                    <p class="name">{{item.name}}</p>
                    <p class="desc">opwaardeercode</p>
                  </div>

                  <div class="productControls">
                    <em @click="()=>{ decreaseQnt(index); quantChange(index)}" :class="{disable : loading}" 
                      @mouseover="hover = true" @mouseleave="hover = false">&#9668;</em>
                    <span :class="'qnt_'+index">{{item.qnt}}&#10005; </span>
                    <em @click="()=>{  increaseQnt(index); quantChange(index)}" :class="{disable : loading}" 
                      @mouseover="hover = true" @mouseleave="hover = false">&#9658;</em>
                  </div>
                  <div class="productPrice">
                    <span :class="[ 'itemTotal' ,'total_'+index]"> {{item.value/100*item.qnt | currency}}</span>
                    <div class="addedCost" v-if="item.addedCost != undefined"  :class="[ 'itemAdded' ,'total_'+index]">{{item.addedCost/100*item.qnt | currency}}</div>
                  </div>

                  <Fold 
                    @click.native="remove(index)" @mouseover.native="hover = true" @mouseleave.native="hover = false" 
                    width="30" height="30"
                    :MyGradient="'MyGradient_'+index" :class="'MyGradient_'+index" :gradient="{from: [item.color, 5] , to: [item.color, 95] }"
                    :textStyle="{top: '-1px', left: '3px', height: '13px', width: '13px',  }"
                    />
                    <template name="icon">
                      <i class="i simple-line-icons:info"></i>
                    </template>
                </div>


              </div>
              <div id="Total" v-if="orderItems.length > 1">
                <div id="TotalHolder">
                  <div id="TotalLabel">
                    Totaal:
                  </div>
                  <div id="TotalAmount">
                    <div id="TotalAmountText">{{getCartTotal/100 | currency}}</div>
                  </div>
                </div>
              </div>

            </div>
            <p id="NoItems" v-else>
              Geen producten geselecteerd
              <br>
              <a @click="backToStart" class="backToStart">Kies een product</a>
            </p>
          </div>

          <ul>
            <li v-for="(product, index) in selectedProducts" :key="index">
              product: {{product}} / price: {{product.price}} 
            </li>
          </ul>
        </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
</script>

<script lang="ts">
  import { state } from '../store/reactives'
  import { defineComponent, reactive, onMounted, toRef , ref} from 'vue'
  import {_} from 'vue-underscore'

  export default defineComponent({
    layout: false,
    name: 'status',
    async setup(props) {
      const cart = toRef(state, 'cart');
      const selectedProducts = toRef(state, 'selectedProducts');
      const order = toRef(state, 'order');

      const orderItems = state.order.orderItems;
      // const orderItems = toRef( state.order.orderItems, 'orderItems');

      // console.log(state.order.orderItems)
      // console.log(selectedProducts)
      onMounted(() => {
        console.log(state.order)
        // carouselState.show ? startAutoSlide() : stopAutoSlide()     
      }) 


      return {
        orderItems,
        cart,
        selectedProducts
      }
    }
  })

</script>



<style lang="scss">
.orderItemHolder {
  margin-bottom:1em;
}
  .orderItem{
  position: relative;
  overflow: hidden;
  display: flex;
  margin: 0px auto;
  min-height: 97px;
  justify-content: space-between;
  flex-flow: row;
  vertical-align: top;
  background: #DDDDDD;
  padding: 1em;
  box-sizing: border-box;
  border-radius: 9px;
  background: radial-gradient(#cccccc, #fbfbfb);
  border: 1px solid #DDD !important;
  background-position: 0px -92px;
  background-repeat: no-repeat;
  box-shadow: 0px 2px 3px #00000020;
  transition: transform box-shadow 0.2s;

  &:active.onButton{
    perspective: 130px;
    
    transform-origin: 10% 90%;
    transform: rotate3d(2, 10, 0, 3.5deg);
    box-shadow: -3px 2px 3px #00000020;
  }

  .productInfo{
    flex: 1 1 80%;
    text-align: left;
    vertical-align: top;
    img{
      float: left;
      border: 1px solid #DDD;
      padding: 2px;
      max-height: 50px;
      margin-right: 2em;
      vertical-align: top;
    }
    p.name{
      margin-top: 0.5em;
      margin-bottom: 0px;
      font-weight: bold;
    }
    p.desc{
      font-size: 90%;
      color: #818181;
      margin-top: 0px;
    }
  }
  .productControls{
    flex: 1 1 20%;
    align-self: center;
    user-select: none;
    span{
      min-width: 45px;
      text-align: center;
      display: inline-block;
    }
    em{
      opacity: 0.7;
      cursor: pointer;
      display: inline-block;
      &:hover{
        opacity: 0.5;
      }
      &:active{
        transform: translateY(1px);
      }
    }
  }
  .productPrice{
    display: inline-flex;
    justify-content: flex-end;
    flex-flow: column;
    vertical-align: top;
    align-self: center;
    flex: 1 1 20%;
    text-align: right;
    font-size: 20px;

    .itemTotal{
      display: inline-block;
      transform-origin: 90% 50%;
    }

    .addedCost{
      font-size: 65%;
      color: #929292;
      transform-origin: 90% 50%;
    }
  }
  .close{
    cursor: pointer;
    &:active{
      transform: translateY(0.5px);
      opacity: 0.99;
    }
    &:hover{
      opacity: 0.8;
    }
  }
}
  #Total {
    position: relative;
    overflow: hidden;
    display: flex;
    max-width:170px;
    margin: 0px auto;
    min-height: 97px;
    justify-content: space-between;
    flex-flow: row;
    vertical-align: top;
    background: #DDDDDD;
    padding: 1em;
    box-sizing: border-box;
    border-radius: 9px;
    background: radial-gradient(#cccccc, #fbfbfb);
    border: 1px solid #DDD !important;
    background-position: 0px -92px;
    background-repeat: no-repeat;
    box-shadow: 0px 2px 3px #00000020;
    transition: transform box-shadow 0.2s;
    float:right;
  }
</style>
