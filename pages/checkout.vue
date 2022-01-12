<template>
  <NuxtLayout name="default">
    <template #content>
        <div class="inner">
          <h1>Checkout</h1>
          <p>
            A list with all products that reside within your cart.
          </p>
        </div>
        <div class="inner checkout">
          <h2>Products</h2>

          <div id="ProductSelection" :ref="state">
            <div v-if="orderItems.length > 0">
              <div class="orderItemHolder" v-for="(item, index) in orderItems" :key="index">
                <div class="orderItem" :class="{onButton:hover}">
                  <div class="productInfo">

                    <img class="thumbnail" :src="`../../../assets/logos/${item.product.brand}.png`" />

                    <p class="name">{{item.product.name}}</p>
                    <p class="desc">opwaardeercode</p>
                  </div>

                  <div class="productControls">
                    
                    <em @click="()=>{ decreaseQnt(index)}" :class="{disable : loading}" 
                      @mouseover="hover = true" @mouseleave="hover = false">&#9668;</em>
                    <span :class="'qnt_'+index">{{item.qnt}}&#10005; </span>
                    <em @click="()=>{  increaseQnt(index)}" :class="{disable : loading}" 
                      @mouseover="hover = true" @mouseleave="hover = false">&#9658;</em>
                  </div>
                  <div class="productPrice">
                    <span :class="[ 'itemTotal' ,'total_'+index]"> {{item.product.value/100*item.qnt | currency}}</span>
                    <div class="addedCost" v-if="item.product.addedCost != undefined"  :class="[ 'itemAdded' ,'total_'+index]">{{item.product.addedCost/100*item.qnt | currency}}</div>
                  </div>

                  <Fold 
                    @click="removeCartItem(index)" @mouseover.native="hover = true" @mouseleave.native="hover = false" 
                    width="45" height="45"
                    :class="'MyGradient_'+index"
                    :gradient="{from: [`#ff7514`, 5] , to: ['#f36000a1', 95] }"
                    :MyGradient="'MyGradient'" 
                    :textStyle="{top: '-1px', left: '3px', height: '13px', width: '13px',  }"
                    />

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
              <!-- <a @click="backToStart" class="backToStart">Kies een product</a> -->
            </p>
          </div>
        </div>
        <form :style="inputFormStyle" autocomplete="on" @submit.prevent="submit">
          <div id="ContactDelivery">
              <h1>Contactgegevens <span class="edit" v-if="preFilled&!editMode" @click="editMode = true">aanpassen</span></h1>
              <div class="formControl"><label>Naam</label><span class="input"><input type="text" name="name" placeholder="Naam" v-model="name" :disabled="loading||(!editMode && preFilled)" :class="[{static : preFilled && !editMode}, {errored: errors.name.length > 0}]" @change="checkName" maxLength="30" /><span class="indicator" v-if="validated.name == true"> <img src="@/assets/ok.svg" /></span><span class="indicator" v-else-if="errors.name.length > 0"> <img src="../../../assets/warn.svg" /></span>
                      <div class="error" v-if="errors.name.length > 0">{{errors.name[0]}}</div>
                  </span></div>
              <div class="formControl"> <label>Mobiel</label><span class="input"><input type="tel" autocomplete="tel" name="tel-local" placeholder="Mobiele nummer" v-model="tel" :disabled="loading||(!editMode && preFilled)" :class="[{static : preFilled  &&  !editMode}, {errored: errors.tel.length > 0}]" @change="checkMobile" maxLength="" /><span class="indicator" v-if="validated.tel == true"> <img src="../../../assets/ok.svg" /></span><span class="indicator" v-else-if="errors.tel.length > 0"> <img src="../../../assets/warn.svg" /></span>
                      <div class="error" v-if="errors.tel.length > 0">{{errors.tel[0]}}</div>
                  </span></div>
              <div class="formControl"> <label>E-mail</label><span class="input"><input type="email" name="email" placeholder="E-mail address" v-model="email" :disabled="loading||(!editMode && preFilled)" :class="[{static : preFilled && !editMode}, {errored: errors.email.length > 0}]" @change="checkEmail" maxLength="55" /><span class="indicator" v-if="validated.email == true"> <img src="../../../assets/ok.svg" /></span><span class="indicator" v-else-if="errors.email.length > 0"> <img src="../../../assets/warn.svg" /></span>
                      <div class="error" v-if="errors.email.length > 0">{{errors.email[0]}}</div>
                  </span></div>
          </div>
          <div id="Payment" ref="subSelect">
              <h1>Betalen</h1>
              <div class="formControl" id="PaySelect"> 
                <label>Kies betaalmethode</label>
                <span class="input">
                  <v-select v-model="selectedPaymethod" :components="{Deselect: null}" :options="getPaymentOptions" :searchable="false" :placeholder="'Maak een keuze'" :disabled="loading" @input="setPaymethod"><template #selected-option-container="{ option, multiple, disabled }">
                      <div class="option selected">
                          <div class="visual"><img :src="`../../../assets/logos/paymethods/${option.key}.png`" /></div>
                          <div class="info"><strong>{{ option.name }}</strong><em class="desc">{{ option.desc }}</em></div>
                      </div>
                      </template><template #option="option">
                          <div class="option">
                              <div class="visual"><img :src="`../../../assets/logos/paymethods/${option.key}.png`" /></div>
                              <div class="info"><strong>{{ option.name }}</strong><em class="desc">{{ option.desc }}</em></div>
                          </div>
                      </template>
                      <!-- <template #no-options="#no-options"><span>Geen betaalmogelijkheden beschikbaar.</span></template> -->
                      <template ><span>Geen betaalmogelijkheden beschikbaar.</span></template>
                  </v-select>
                </span>
              </div>
              <div class="formControl" id="SubSelect" v-if="selectedPaymethod != null">
                <span class="input" v-if="selectedPaymethod.subSelect != undefined  &&  selectedPaymethod.subSelect.length > 0">
                  <label>Kies bank</label>
                  <v-select id="SubSelector" v-model="selectedSubPaymethod" :components="{Deselect: null}" :options="subSelection" :searchable="false" :placeholder="'Kies een bank'" :disabled="loading" @input="setSubPaymethod"><template #selected-option-container="{ option, multiple, disabled }">
                    <div class="option selected">
                            <div class="visual"><img  :src="`../../../assets/logos/banks/${option.key}.png`" /></div>
                            <div class="info"><strong>{{ option.name }}</strong><em class="desc">{{ option.desc }}</em></div>
                        </div>
                    </template><template #option="option">
                        <div class="option subSelect">
                            <div class="visual"><img :src="`../../../assets/logos/banks/${option.key}.png`" /></div>
                            <div class="info"><strong>{{ option.name }}</strong><em class="desc">{{ option.desc }}</em></div>
                        </div>
                    <!-- </template><template #no-options="#no-options"><span>Geen banken beschikbaar.</span></template> -->
                    </template><template ><span>Geen banken beschikbaar.</span></template>
                  </v-select>
                </span>
              </div>
              <div class="formControl"> <label class="terms"><input type="checkbox" :disabled="loading" name="agreed2Terms" v-model="agreed2Terms" />Ik bevestig dat mijn gegevens correct zijn ingevuld en ga akkoord met de <a class="terms" @click="conditions">algemene voorwaarden.</a><span class="indicator" v-if="errors.agreed2Terms.length > 0"> <img src="@/assets/warn.svg" /></span>
                      <div class="error" v-if="errors.agreed2Terms.length > 0">{{errors.agreed2Terms[0]}}</div>
                  </label><span class="input">
                      <div id="Loader" v-if="loading">
                          <vue-loaders-ball-beat></vue-loaders-ball-beat>
                      </div>
                      <invisible-recaptcha id="Submit" name="orderRequest" v-show="!loading" sitekey="6Lfe3REaAAAAAP12JQcZ5tsOHqeTH4_DcRhw1y9V" :validate="prepare" :callback="submit" type="submit" :disabled="loading" :class="{loading}">Betalen</invisible-recaptcha>
                      <div class="error" v-if="errors.form.length > 0">{{errors.form[0]}}</div>
                  </span></div>
          </div>
        </form>
    </template>
  </NuxtLayout>
</template>

<script setup>
</script>

<script lang="ts">

  import { state , actions } from '../store/reactives'
  import { defineComponent, reactive, onMounted, toRef , ref, toRaw} from 'vue'
  import { CryptoJS } from "crypto-js";


  export default defineComponent({
    layout: false,
    name: 'status',
    async setup(props) {
      const cart = toRef(state, 'cart');
      const selectedProducts = toRef(state, 'selectedProducts');
      // const order = toRef(state, 'order');
      // const orderItems = state.order.orderItems;
      const orderItems = toRef(state.order, 'orderItems');
      // console.log(toRaw(orderItems))

      const pageData = reactive ({
        hover: false, 
        selectedPaymethod: null,
        selectedSubPaymethod: null,
        subSelection: [],
        loading:  false,
        color: 'string',

        editMode: false,
        preFilled: false,
        name: null,
        tel: null,
        email: null,
        emailSuggestion:'',
        agreed2Terms: false,
        errors: {
          name: [],
          tel: [],
          email: [],
          agreed2Terms: [],
          form: [],
        },
        validated: {
          name: false,
          tel: false,
          email: false,
          agreed2Terms: false,
          form: false,
        },
        qid: null,
        payUrl: null,
      })
      
      const hover = toRef(pageData, 'hover');
      const selectedPaymethod = toRef(pageData, 'selectedPaymethod');
      const selectedSubPaymethod = toRef(pageData, 'selectedSubPaymethod');
      const subSelection = toRef(pageData, 'subSelection');
      const loading = toRef(pageData, 'loading');
      const color = toRef(pageData, 'color');

      const editMode = toRef(pageData, 'editMode');
      const preFilled = toRef(pageData, 'preFilled');
      const name = toRef(pageData, 'name');
      const tel = toRef(pageData, 'tel');
      const email = toRef(pageData, 'email');
      const emailSuggestion = toRef(pageData, 'emailSuggestion');
      const agreed2Terms = toRef(pageData, 'agreed2Terms');
      const errors = toRef(pageData, 'errors');

      const validated = toRef(pageData, 'validated');
      const qid = toRef(pageData, 'qid');
      const payUrl = toRef(pageData, 'payUrl');


      const removeCartItem = async (index)  => {
        await actions.removeCartItem(index)
      }
      const increaseQnt = async (index)  => {
        await actions.increaseQnt(index)
      }
      const decreaseQnt = async (index)  => {
        await actions.decreaseQnt(index)
      }

    const inputFormStyle = () => {
      return {
        opacity: orderItems.length > 0 ? 1: 0.1,
      }
    }


      onMounted(() => {
          // console.log(state.order)
          console.log(toRaw(orderItems) , 'Yeshh')
          const storeSettings = () => {
            let data = {
              name: pageData.name,
              tel: pageData.tel,
              email: pageData.email,
              payment: pageData.selectedPaymethod ? pageData.selectedPaymethod.key : null,
              paymentId: pageData.selectedPaymethod.id,
              subPayment: pageData.selectedSubPaymethod ? pageData.selectedSubPaymethod.key : null,
            }
            var cypher = CryptoJS.AES.encrypt( JSON.stringify(data), 'xxxstatixxx' ).toString();
            localStorage.setItem('paymem', cypher );

          }
          const storeLastTrxData = async (qid, payUrl, orderItems) => {
            let data = { qid, payUrl , orderItems};
            var cypher = CryptoJS.AES.encrypt( JSON.stringify(data), 'trx_ez_obscure' ).toString();
            localStorage.setItem('trxmem', cypher );
          }
          const prepare = () => {
            pageData.loading = true;
          }

          // RELOAD USERDATA //
          let storedDataString = localStorage.getItem('paymem');
          let userData;

          if(storedDataString != undefined  &&  bytes != '' ){
            var bytes  = CryptoJS.AES.decrypt(storedDataString, 'xxxstatixxx');
            if(bytes != undefined  &&  bytes != '' ){
              userData = bytes.toString(CryptoJS.enc.Utf8);
              userData = JSON.parse(userData);  
              pageData.name = userData.name;
              pageData.tel = userData.tel;
              pageData.email = userData.email;
            }
            if(pageData.name != null  &&  pageData.tel != null  &&  pageData.email != null)
              pageData.preFilled = true;
          }

          // if(this.getPaymentOptions){
          //   if(this.getPaymentOptions[0].id == undefined )
          //     try{
          //       let paymentListReq = await this.$http({
          //           method: 'POST',
          //           url: '/paymentoptions',
          //         });
          //       this.handlePaymethods(paymentListReq.data);
          //     }catch(e){
          //       console.log('Initiate gracefull shutdown');
          //       console.log(e);
          //     }
          // }

          // RELOAD PAYMENT //

          // if(storedDataString != undefined  &&  bytes != '' ){
          //   this.selectedPaymethod = userData.payment ? this.getPaymethodWithKey(userData.payment): null;
          //   if(this.selectedPaymethod.subSelect != undefined)
          //     this.subSelection = this.selectedPaymethod.subSelect;
          // }


          if( state.order.orderItems.length == 0 ){
            let storedTrxString = localStorage.getItem('trxmem');
            if(storedTrxString != undefined  &&  bytes != '' ){
              var bytes  = CryptoJS.AES.decrypt(storedTrxString, 'trx_ez_obscure');
              if(bytes != undefined  &&  bytes != '' ){
                let data = bytes.toString(CryptoJS.enc.Utf8);
                data = JSON.parse(data);
                console.log('%c[REINSTATE ORDER]', 'background: #bad455; color:darkgreen')
                console.log(data)
                actions.reinstateOrder(data.orderItems);
              }
            }
          }
      }) 


      return {
        removeCartItem,
        increaseQnt,
        decreaseQnt,
        inputFormStyle,
        orderItems,
        cart,
        selectedProducts,
        hover,
        selectedPaymethod,
        selectedSubPaymethod,
        subSelection,
        loading,
        color,
        editMode,
        preFilled,
        name,
        tel,
        email,
        emailSuggestion,
        agreed2Terms,
        errors,
        validated,
        qid,
        payUrl
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
.checkout .fold .tip {
  right:-21px;
}
</style>