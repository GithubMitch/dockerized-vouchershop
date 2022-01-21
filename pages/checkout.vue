<template>
  <NuxtLayout name="default">
    <template #content>
        <div class="inner">
          <h1 style="text-align:center">Checkout</h1>
          <!-- <p>
            A list with all products that reside within your cart.
          </p> -->
        </div>
        <div class="inner checkout">
          <div id="ProductSelection">
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
                    <span :class="[ 'itemTotal' ,'total_'+index]"> 
                      <!-- {{item.product.value/100*item.qnt | currency}} -->
                    </span>
                    <div class="addedCost" v-if="item.product.addedCost != undefined"  :class="[ 'itemAdded' ,'total_'+index]">
                      <!-- {{item.product.addedCost/100*item.qnt | currency}} -->
                    </div>
                  </div>

                  <Fold 
                    @click="removeCartItem(index)" @mouseover.native="hover = true" @mouseleave.native="hover = false" 
                    width="35" height="35"
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
                    <!-- <div id="TotalAmountText">{{getCartTotal/100 | currency}}</div> -->
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
                  <MySelect rel
                    v-model="selectedPaymethod"
                    :elementIndex="0"
                    :options="paymentOptions" 
                    :components="{Deselect: null}" 
                    :searchable="false" 
                    :disabled="loading"
                    :default="`Betaalmethodes`"
                    :placeholder="'Maak een keuze'" 
                    @selectChange="setPaymethod"
                    >

                    
                    <!-- <NuxtLayout> -->
                      <!-- <template #selected-option-container="{ option, multiple, disabled }">
                        <div class="option selected">
                          <div class="visual"><img :src="`../../../assets/logos/paymethods/${option.key}.png`" /></div>
                          <div class="info"><strong>{{ option.name }}</strong><em class="desc">{{ option.desc }}</em></div>
                        </div>
                      </template> -->
                    <!-- </NuxtLayout> -->
                    <!-- <NuxtLayout> -->
                      <!-- <template #option="option">
                        <div class="option">
                            <div class="visual"><img :src="`../../../assets/logos/paymethods/${option.key}.png`" /></div>
                            <div class="info"><strong>{{ option.name }}</strong><em class="desc">{{ option.desc }}</em></div>
                        </div>
                      </template> -->
                        <!-- <template #no-options="#no-options"><span>Geen betaalmogelijkheden beschikbaar.</span></template> -->
                      <!-- <template ><span>Geen betaalmogelijkheden beschikbaar.</span></template> -->
                    <!-- </NuxtLayout> -->
                  </MySelect>
                </span>
              </div>

              <div class="formControl" id="SubSelect" v-if="selectedPaymethod != null">
                <span class="input" v-if="selectedPaymethod.subSelect != undefined  &&  selectedPaymethod.subSelect.length > 0">
                  <label>Kies bank</label>
                    <MySelect
                      :elementIndex="1"
                      v-model="selectedSubPaymethod" 
                      :options="selectedPaymethod.subSelect" 
                      :searchable="false" 
                      :placeholder="'Kies een bank'"
                      :default="`Banken`"
                      disabled="loading" 
                      @input="setSubPaymethod">

                    <!-- <template #selected-option-container="{ option, multiple, disabled }">
                    <div class="option selected">
                            <div class="visual"><img  :src="`../../../assets/logos/banks/${option.key}.png`" /></div>
                            <div class="info"><strong>{{ option.name }}</strong><em class="desc">{{ option.desc }}</em></div>
                        </div>
                    </template>
                    <template #option="option">
                        <div class="option subSelect">
                            <div class="visual"><img :src="`../../../assets/logos/banks/${option.key}.png`" /></div>
                            <div class="info"><strong>{{ option.name }}</strong><em class="desc">{{ option.desc }}</em></div>
                        </div>
                    </template><template #no-options="#no-options"><span>Geen banken beschikbaar.</span></template>
                    </template><template ><span>Geen banken beschikbaar.</span></template> -->
                  </MySelect>
                </span>
              </div>

          </div>
        </form>
        
    </template>
  </NuxtLayout>
</template>

<script setup>
</script>

<script lang="ts">

  import MySelect from '../components/MySelect.vue'
  import { state , actions } from '../store/reactives'
  import { defineComponent, reactive, onMounted, toRef , ref, toRaw, watch} from 'vue'
  // import { CryptoJS } from "crypto-js";

  export default defineComponent({
    layout: false,
    name: 'status',
    components: {
      MySelect
    },
    // head() {
    //   // console.log(this.$content.article)
    //   // let title = this.getTitle();
    //   return {
    //     title: 'default',
    //     link: [
    //       {
    //         type: "text/css",
    //         rel: "stylesheet",
    //         href: "https://unpkg.com/vue-next-select/dist/index.min.css"
    //       }
    //     ],
    //     script: [
    //       {
    //         src: "https://unpkg.com/vue-next-select/dist/vue-next-select.iife.prod.js"
    //       }
    //     ]
    //   }
    // },
    async setup(props) {
      const cart = toRef(state, 'cart');
      const selectedProducts = toRef(state, 'selectedProducts');
      // const order = toRef(state, 'order');
      // const orderItems = state.order.orderItems;
      const orderItems = toRef(state.order, 'orderItems');
      // console.log(toRaw(orderItems))

      const hover = ref( false )
      const selectedPaymethod = ref(null)
      const selectedSubPaymethod = ref(null)
      const subSelection = ref(null)
      const loading = ref(false)
      const color = ref('string')

      const editMode = ref(false)
      const preFilled = ref(false)
      const name = ref(null)
      const tel = ref(null)
      const email = ref(null)
      const emailSuggestion = ref('')
      const agreed2Terms = ref( false)
      const errors = ref({ 
        name: [],
        tel: [],
        email: [],
        agreed2Terms: [],
        form: [],
      })
      const validated = ref({ 
        name: false,
        tel: false,
        email: false,
        agreed2Terms: false,
        form: false,
      })
      const qid = ref(null)
      const payUrl = ref(null)
  
      //STATES
      const paymentOptions = toRef(state, 'paymentOptions');
      
      const removeCartItem = async (index)  => {
        actions.removeCartItem(index)
      }
      const increaseQnt = async (index)  => {
        actions.increaseQnt(index)
      }
      const decreaseQnt = async (index)  => {
        actions.decreaseQnt(index)
      }
      const inputFormStyle = () => {
        return {
          // opacity: orderItems.length > 0 ? 1: 0.1,
        }
      }
      const getCartTotal = async ()  => {
        actions.getCartTotal()
      }
      const getPaymentOptions = async ()  => {
        actions.getPaymentOptions()
      }
      const setPaymethod = (option) => {
        let opt = option ? option : option.option;
        opt.subSelect ? subSelection.value = opt.subSelect : null;
        // console.log('setPaymethod - Subselection', subSelection.value)

        selectedPaymethod.value = opt;
        return
      }
      const setSubPaymethod = () => {
        // console.log('selected', this.selectedSubPaymethod.key, this.selectedSubPaymethod.id);
      }

      // watch([selectedPaymethod], (newValues, prevValues) => {
      //   console.log("selectedPaymethod=",prevValues, newValues)
      //   // let container = selectedPaymethod.value
      //   // container.subSelect ? subSelection.value = container.subSelect : null;
      // })


      onMounted(() => {
          // console.log(state.order)
          // const storeSettings = () => {
          //   let data = {
          //     name: name,
          //     tel: tel,
          //     email: email,
          //     payment: selectedPaymethod ? selectedPaymethod.key : null,
          //     paymentId: selectedPaymethod.id,
          //     subPayment: selectedSubPaymethod ? selectedSubPaymethod.key : null,
          //   }
          //   var cypher = CryptoJS.AES.encrypt( JSON.stringify(data), 'xxxstatixxx' ).toString();
          //   localStorage.setItem('paymem', cypher );

          // }
          // const storeLastTrxData = async (qid, payUrl, orderItems) => {
          //   let data = { qid, payUrl , orderItems};
          //   var cypher = CryptoJS.AES.encrypt( JSON.stringify(data), 'trx_ez_obscure' ).toString();
          //   localStorage.setItem('trxmem', cypher );
          // }
          // const prepare = () => {
          //   loading.value = true;
          // }

          // // RELOAD USERDATA //
          // let storedDataString = localStorage.getItem('paymem');
          // let userData;

          // if(storedDataString != undefined  &&  bytes != '' ){
          //   var bytes  = CryptoJS.AES.decrypt(storedDataString, 'xxxstatixxx');
          //   if(bytes != undefined  &&  bytes != '' ){
          //     userData = bytes.toString(CryptoJS.enc.Utf8);
          //     userData = JSON.parse(userData);  
          //     name.value = userData.name;
          //     tel.value = userData.tel;
          //     email.value = userData.email;
          //   }
          //   if(name != null  &&  tel != null  &&  email != null)
          //     preFilled.value = true;
          // }

          // // if(this.getPaymentOptions){
          // //   if(this.getPaymentOptions[0].id == undefined )
          // //     try{
          // //       let paymentListReq = await this.$http({
          // //           method: 'POST',
          // //           url: '/paymentoptions',
          // //         });
          // //       this.handlePaymethods(paymentListReq.data);
          // //     }catch(e){
          // //       console.log('Initiate gracefull shutdown');
          // //       console.log(e);
          // //     }
          // // }

          // // RELOAD PAYMENT //

          // // if(storedDataString != undefined  &&  bytes != '' ){
          // //   this.selectedPaymethod = userData.payment ? this.getPaymethodWithKey(userData.payment): null;
          // //   if(this.selectedPaymethod.subSelect != undefined)
          // //     this.subSelection = this.selectedPaymethod.subSelect;
          // // }


          // if( state.order.orderItems.length == 0 ){
          //   let storedTrxString = localStorage.getItem('trxmem');
          //   if(storedTrxString != undefined  &&  bytes != '' ){
          //     var bytes  = CryptoJS.AES.decrypt(storedTrxString, 'trx_ez_obscure');
          //     if(bytes != undefined  &&  bytes != '' ){
          //       let data = bytes.toString(CryptoJS.enc.Utf8);
          //       data = JSON.parse(data);
          //       console.log('%c[REINSTATE ORDER]', 'background: #bad455; color:darkgreen')
          //       console.log(data)
          //       actions.reinstateOrder(data.orderItems);
          //     }
          //   }
          // }
      }) 


      return {
        getPaymentOptions,
        getCartTotal,
        removeCartItem,
        increaseQnt,
        decreaseQnt,
        inputFormStyle,
        setPaymethod,
        setSubPaymethod,
        paymentOptions,
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
  right:-2px;
  font-size:10px;
}

#Checkout{
  // margin-top: -4.5em;
}
form{
  display: flex;
  max-width: 900px;
  margin: 2em auto;
  justify-content: space-between;
  transition: opacity 0.84s ease-in-out;

  h1{
    font-size: 22px;
  }
}
#ContactDelivery{
  text-align: left;
  flex: 1 1 50%;
}

#ProductSelection{
  box-sizing: border-box;
}
#Payment{
  text-align: left;
  flex: 1 1 50%;
  padding-left: 1em;
  border-left: 2px solid #DDD;
  .formControl{
    flex-flow: wrap;
    margin: 1em 0px;
    .input{
      flex: 1 0 100%;
      left: 0px;
      text-align: left;
      input, button{
        margin: 0px;
        left: 0px;
        //background: linear-gradient(45deg, #2888c4, #6bb1de);
        background: linear-gradient(186deg, #28c475, #15734c);
        color: #FFF;
        width: 100%;
        border: none;
        border-radius: 7px;
        min-height: 50px;
        font-size: 20px;
        text-transform: uppercase;
        cursor: pointer;
        outline: none;
        &:hover{
          opacity: 0.8;
        }
      }
    }
  }
  label{
    flex: 1 0 100%;
    display:block;
  }
  select{
    font-size: 18px;
    min-width: 100%;
  }

  &:hover{
    overflow: visible;
  }


}

.terms{
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
  &:hover{
    color: #16679c;
  }
}
.formControl{
  display: flex;
  justify-content: space-between;
  margin: 1em;
  // max-width: 400px;
  // background: #DDD;

  label{
    display: inline-block;
    vertical-align: top;
    min-width: 75px;
    text-align: left;
    // padding-left: 1em;
    margin-right: 2em;
    margin-bottom: 0.3em;
    flex: 1 1 10%;
    font-size: 18px;
    font-weight: bold;
    padding-top: 5px;
  }
  span.input{
    text-align: left;
    vertical-align: top;
    flex: 1 1 90%;

  }

  input[type=text], input[type=email], input[type=tel], textarea{
    border-radius: 7px;
    border: 1px solid #DDD;
    outline: none;
    padding: 0.15em 1em 0.09em;
    line-height: 2em;
    background: linear-gradient(145deg, #d6eeff, #e9f6ff);
    box-shadow: inset 2px 2px 1px #0000005e;
    color: #2c3e51;
    font-size: 18px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    min-width: 210px;
    font-weight: normal;

    &.static{
      border: 1px solid transparent;
      background: none;
      box-shadow: none;
    }

    &::placeholder{
      color: #00000060;
    }
  }

  input[type=submit], button#Submit{
    min-width: 225px;
    margin: 0px auto;
    display: block;
    position: relative;
    left: 3.5em;
    height: 2em;
    min-width: 100%;
    &.loading{
      background: grey !important;
      opacity: 0.7;

    }
    &:disabled{
      background: grey;
      opacity: 0.5;
    }
  }

}
.orderItemHolder{
  padding: 5px 0px;
}
.orderItem{
  position: relative;
  overflow: hidden;
  display: flex;
  max-width: 900px;
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
  border: 1px solid #DDD;
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
#NoItems{
  padding: 0px;
  margin: 0px auto;
  .backToStart{
    cursor: pointer;
    display: inline-block;
    background: #DDDDDD70;
    padding: 2px 10px;
    border-radius: 10px;
    border: 1px solid #DDD;
    margin: 3px;
    text-transform: uppercase;
    color: #525252;
    font-size: 14px;
    margin-top: 2em;
    margin-bottom: 2em;
    &:hover{
      background: #DDDDDD30;
    }
    &:active{
      transform: translateY(1px);
      opacity: 0.9;
    }
  }
}

.visual{
  display: flex;
  flex-flow: vertical;
  flex: 0 0 70px;
  img{
    align-self: center;
  }
}
.info{
  flex: 1 1 100px;
  strong, em {
    display:block;
  }
}

.option.selected{
    padding: 3px 10px;
    position: relative;
    top: 2px;
    display:flex;
}
#Payment #PaySelect{
  margin-bottom: 0em;
}
#Payment #SubSelect{
  position: relative;
  z-index: 99;
  margin-top: 0px; 

  #SubSelector .option{
    display: inline-flex;

    .visual{
      flex: 0 0 55px;
    }
  }
}

#TotalHolder{
  max-width: 900px;
  margin: 0px auto;
  display: flex;
  justify-content: flex-end;
  padding-top: 5px;
  #TotalLabel{
    flex: 1 1 100%;
    text-align: left;
    font-weight: bold;
    text-transform: uppercase;
    padding: 15px 30px;
    color: #929292;
  }
  #TotalAmount{
    flex: 0 1 30%;
    background: #DDDDDD;
    padding: 1em;
    box-sizing: border-box;
    border-radius: 9px;
    background: radial-gradient(#cccccc, #fbfbfb);
    border: 1px solid #DDD;
    background-position: 0px -92px;
    background-repeat: no-repeat;
    box-shadow: 0px 2px 3px #00000020;  
    text-align: right;
    font-weight: bold;
    font-size: 18px;
    #TotalAmountText{
      display: inline-block;
    }
  }
  
}

#Loader{
  background: #d4d4d4;
  width: 100%;
  min-height: 30px;
  border-radius: 7px;
  border: 1px solid #DDD;
  outline: none;
  padding: 0.5em 1em 0em 1em;
  line-height: 2em;
  color: #2c3e51;
  font-size: 18px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  box-shadow: inset 0 4px 4px 1px #00000010;
  opacity: 0.6;
  &:active{
    transform: translateY(1px);

  }
}

// .vs--unsearchable .vs__search {
//     opacity: 1;
//     display: none;
// }


.orderItem .disable{
  opacity: 0.11 !important;
  pointer-events: none;
  -moz-user-input: disabled;
  -webkit-user-input: disabled;
}
label.terms{
  font-size: 15px;
  text-decoration: none;
  input{
    float: left;
    margin-bottom: 2.5em;
    margin-right: 0.5em;
  }
}

span.edit{
  position: relative;
  left: 5px;
  top: -2px;
  cursor:pointer;
  font-size: 10px;
  display: inline-block;
  padding: 2px 7px;
  background: #EDEDED;
  border: 1px solid #929292;
  vertical-align: middle;
  border-radius: 15px;
  color: #828282;
  opacity: 0.73;
  &:hover{
    background: #DDD;
  }
  &:active{
    opacity: 0.63;
    transform: translatey(1px);
  }
}

.error{
  color: #dc311f;
  font-size: 12px;
  padding-left: 5px;
  font-weight: bold;
}
.indicator{
  margin-left: 0.5em;
  opacity: 0.7;
  img{
    max-width: 1.25em;
  }
}
</style>