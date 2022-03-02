<template>
  <div id="Status">
    <div class="status">
      <h1>Momentje a.u.b.</h1>
      <p>Voortgang van je bestelling. </p>
      <p> <b>Ordernummer: {{reactiveData.qid}}
      </b></p>
      <div class="loader"></div>
      <div id="Progress">
          <div :class="{inprogress: reactiveData.progress.paid == 'inprogress' }">Betaald: <img v-if="reactiveData.progress.paid === true" src="@/assets/ok.svg" /></div>
          <div :class="{inprogress: reactiveData.progress.vouchercode == 'inprogress' }">Ophalen vouchercode: <img v-if="reactiveData.progress.vouchercode === true" src="@/assets/ok.svg" /></div>
          <div :class="{inprogress: reactiveData.progress.transmit == 'inprogress' }">Code versturen: <img v-if="reactiveData.progress.transmit === true" src="@/assets/ok.svg" /></div>
          <div :class="{inprogress: reactiveData.progress.done == 'inprogress' }">Klaar! <img v-if="reactiveData.progress.done === true" src="@/assets/ok.svg" /></div>
      </div>
    </div>
    <h1>
      Status: {{reactiveData.status}}
    </h1>
    
    <div v-if="reactiveData.result == 'success' ">
        <!-- //- <CheckIt size="150" thickness="10"></CheckIt> -->
        <h1>Je order is onderweg!</h1>
        <p>Je krijgt een SMS en e-mail met daarin de code(s) en instructies.<br /> Bij probleempjes of vertragingen kan je altijd contact openemen via ons <router-link to="contact">contactformulier.</router-link>
        </p><br />
        <h3 style="position:relative; top: -1.2em;">Veel plezier!</h3><a class="finish" @click="backToStart">Terug naar beginpagina</a>
    </div>
    <div v-else-if="reactiveData.result == 'failure' ">
        <h1>De transactie is geannuleerd</h1>
        <p>Mogelijk heb je de betaling geannuleerd of is er vanuit de betaalinstantie bepaald dat er niet betaald kan worden.<br /> Bij probleempjes kan je altijd contact openemen via ons <br />
            <router-link to="contact">contactformulier.</router-link>
        </p><br /><a class="finish" @click="backToStart">Terug naar home</a>
    </div>
    <div v-if="reactiveData.result == 'check'">
      <div v-if="!reactiveData.resolved">
        <h1>Probleem met de order</h1>
        <p>We ervaren problemen met het uitvoeren van de bestelling. Onze oprechte excuses daarvoor. We hebben een support-ticket hieronder klaar gezet, zodat je die gelijk kan insturen.
            Het mobiele nummer en e-mailadres kan je gewoon aanpassen.</p>
        <form>
            <h3>Support Ticket</h3>
            <hr />
            <div><label>Bericht</label>
                <p class="msg">Er is een probleem met mijn order. </p>
            </div>
            <!-- // ordernummer input needs v-model  -->
            <div><label>Ordernummer</label><input type="orderNr" disabled="true" value="2893" /></div>
            <div><label>Mobiel</label><input type="tel" v-model="reactiveData.tel" /></div>
            <div><label>E-mail</label><input type="email" v-model="reactiveData.email" /></div>
            <hr />
            <div><a class="finish" @click="createSupportTicket">Meld mijn probleem</a></div>
        </form>
        <p>Je ticket wordt zo snel mogelijk opgepakt en er wordt contact gezocht via het opgegeven mobiele nummer en/of e-mailadres. <b>Nogmaals onze excuses.</b></p>
      </div>
      <div>
        <h1>Dank je wel!</h1>
        <p>De ticket wordt opgepakt! Er wordt zo snel mogelijk contact opgenomen.</p>
      </div>
    </div>
    <div class="interval">
        <p>{{ intervalData.word }}</p>
        <p>
          interval:
          <input v-model="interval" type="number" placeholder="interval">
        </p>
        <button v-show="isActive" class="orange" @click="pause">
          Pause
        </button>
        <button v-show="!isActive" @click="resume">
          Resume
        </button>
    </div>
  </div>  

</template>

<script lang="ts">
  import {defineComponent,toRef,onMounted} from 'vue';
  import { state, actions } from '../store/reactives';
  import CryptoJS from "crypto-js";
  import { _ } from "vue-underscore";
  import { useIntervalFn } from '@vueuse/core';
  // import timer, {time, action} from '../composables/useIntervalFn'

  export default defineComponent({
    layout: 'false',
    methods: {
      async checkStatus(){
        console.log('Check transaction status: ' )

        if(this.checkThreshold <= 0) {
          this.initiateSaveMode();
          //pause
          console.log(this)
          // this.$timer.stop('checkStatus');
          return;
        }

        if(this.reactiveData.currentCounter <= this.reactiveData.progressCounter)
          this.reactiveData.currentCounter++;

        if(this.reactiveData.progressCounter < 2 && this.reactiveData.status != 'result'){
          try{
              let data = {
                pay_qid: reactiveData.qid,
              }


              let statusReq = await this.$http({
                method: 'POST',
                url: '/orderstatus',
                data,
              });
              console.log('REQ=>',statusReq.data);


            if(statusReq.data.result_code != 1000)
              throw 'Failure in request for orderstatus';

            if(statusReq.data.status == 'OPEN'){
              this.reactiveData.progressCounter = 0;
            }

            if(statusReq.data.status == 'PAID'){
              this.reactiveData.progressCounter = 1;
            }

            if(statusReq.data.status == 'CONFIRMED'){
              // 2 -- vouchercode
              // 3 -- transmit
              this.reactiveData.progressCounter = 4;
              localStorage.setItem('trxmem', {} );
              // TODO -- delete trx data (qid, payment url.)
              // this.status = 'result';
              // this.result = 'success';
            }

            if(statusReq.data.status == 'CHECK'){
              this.reactiveData.progressCounter = 1;
              console.log('STUCK IN CHECK!', 'INITIATE SAVE PROTOCOL');
              this.reactiveData.checkThreshold--;
            }

            if(statusReq.data.status == 'FAILURE'){
              this.reactiveData.progressCounter = -1;
              console.log('FAILURE');
              this.$timer.stop('checkStatus');

              this.reactiveData.status = 'result';
              this.reactiveData.result = 'failure';
            }

            if(statusReq.data.status == 'CANCELED'){
              this.reactiveData.progressCounter = -1;
              console.log('CANCELED');
              this.$timer.stop('checkStatus');

              this.reactiveData.status = 'result';
              this.reactiveData.result = 'canceled';
            }

          }catch(e){
            console.log(e);
          }
        }
        
      },

    },
    watch: {
      currentCounter(value){
        let randTime = Math.random();
        // if(value == -1){
        //   this.$timer.stop('checkStatus');
        //   this.status = 'result';
        //   this.result = 'failure';
        //   return ;
        // }
        if(value > 0){
          this.reactiveData.progress.paid = true;
          this.reactiveData.progress.vouchercode ='inprogress';
        }

        if(value > 1){
          this.reactiveData.progress.vouchercode = true;
          this.reactiveData.progress.transmit ='inprogress';
        }

        if(value > 2){
          this.reactiveData.progress.transmit = true;
          this.reactiveData.progress.done ='inprogress';
        }

        if(value > 3){
          this.reactiveData.progress.done = true;
          this.reactiveData.progressCounter = 5;
        }

        if(value == 5){
          this.reactiveData.status = 'result';
          this.reactiveData.result = 'success';
        }

        this.timers.checkStatus.time = ((randTime*2000) + 500) - (value*(randTime*200));
        // pause
        this.$timer.stop('checkStatus');
        // resume
        this.$timer.start('checkStatus');

      }
    },
    async setup() {
      const order = toRef(state, "order");
		  const orderItems = toRef(state.order, "orderItems");

      const reactiveData = reactive({
        support_ticket_sending: false,
        status: 'checking', // checking|result
        result: null,
        resolved: false,
        checkThreshold: 3,
        qid: 93,
        currentCounter: 0,
        progressCounter: 0,
        progress: {
          paid: false,
          vouchercode: false,
          transmit: false,
          done: false,
        },
        name: '',
        tel: '',
        email: '',
        errors: { 
          tel: [],
          email: [],
        },
        validated: {  // false / true are actual statuses
          tel: null,
          email: null,
        },
        timers: {
          checkStatus: { 
            time: 300, 
            repeat: true, 
            immediate: false , 
            autostart: true
          }
        }
      })
      const intervalData = reactive({
        greetings: ['Hello', 'Hi', 'Yo!', 'Hey', 'Hola', 'こんにちは', 'Bonjour', 'Salut!', '你好'],
        word: 'Hello',
        action: () => {
          intervalData.word = intervalData.greetings[Math.round(Math.random() * (intervalData.greetings.length - 1))]
        }
      })

      const interval = ref(500)
      const { pause, resume, isActive } = useIntervalFn(() => {
        intervalData.action()
      }, interval)
    
      const checkStatus = async () => {
        console.log('Check transaction status: ' )

        if(reactiveData.checkThreshold <= 0) {
          initiateSaveMode();
          //pause
          console.log(this)
          // this.$timer.stop('checkStatus');
          return;
        }

        if(reactiveData.currentCounter <= reactiveData.progressCounter)
          reactiveData.currentCounter++;

        if(reactiveData.progressCounter < 2 && reactiveData.status != 'result'){
          try{
              let data = {
                pay_qid: reactiveData.qid,
              }
              // let productsRequest = await $fetch('http://api.prepaidpoint.test/vouchershop/products', { method: 'POST'});
              // console.log('productsRequest',productsRequest.products);

              let statusReq = await $fetch('http://api.prepaidpoint.test/vouchershop/orderstatus' , {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: data,
              })
              console.log('REQ=>',statusReq);


            if(statusReq.result_code != 1000)
              throw 'Failure in request for orderstatus';

            if(statusReq.status == 'OPEN'){
              reactiveData.progressCounter = 0;
            }

            if(statusReq.status == 'PAID'){
              reactiveData.progressCounter = 1;
            }

            if(statusReq.status == 'CONFIRMED'){
              // 2 -- vouchercode
              // 3 -- transmit
              reactiveData.progressCounter = 4;
              localStorage.setItem('trxmem', {} );
              // TODO -- delete trx data (qid, payment url.)
              // this.status = 'result';
              // this.result = 'success';
            }

            if(statusReq.status == 'CHECK'){
              reactiveData.progressCounter = 1;
              console.log('STUCK IN CHECK!', 'INITIATE SAVE PROTOCOL');
              reactiveData.checkThreshold--;
            }

            if(statusReq.status == 'FAILURE'){
              reactiveData.progressCounter = -1;
              console.log('FAILURE');
              // PAUSE
              // this.$timer.stop('checkStatus');

              reactiveData.status = 'result';
              reactiveData.result = 'failure';
            }

            if(statusReq.status == 'CANCELED'){
              reactiveData.progressCounter = -1;
              console.log('CANCELED');
              // PAUSE
              // this.$timer.stop('checkStatus');

              reactiveData.status = 'result';
              reactiveData.result = 'canceled';
            }

          }catch(e){
            console.log(e);
          }
        }
        
      }

      const initiateSaveMode = () => {
        console.log('INITIATED SAVE MODE!');
        reactiveData.status = 'result';
        reactiveData.result = 'check'
        // this.storeTicket(qid, date, status) // ticket page -> will display this.
      }
      const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      const showResult = (result) => {
      }
      const backToStart = () => {
        // emptyOrder();
        // $router.push('/')
      }
      const createSupportTicket = async () => {
        try{
          reactiveData.support_ticket_sending = true;

          if(!validate())
            throw 'validation error';

          let data = {
            ticket_title: 'Vouchershop/Question',
            ticket_ref: createCustomerToken(),
            name: reactiveData.name,
            phone: reactiveData.tel,
            email: reactiveData.email,
            msg: 'CUSTOMER STUCK IN CHECK!',
            locale: 'nl',
            qid: reactiveData.qid,
          }

          let contactReq = await this.$http({
            method: 'POST',
            url: '/createsupportticket',
            data,
          });

          console.log(contactReq);

          if(contactReq.data.result_code != '1000')
            throw 'Probleempje met versturen. Probeer het nogmaals.' 

          await sleep(1020);

          ticketCreated()

          reactiveData.support_ticket_sending = false;

        }catch(e){
          console.error(e);
          reactiveData.support_ticket_sending = false;
          // reactiveData.errors.all.push(e);
        }
      }
      const validate = () => {
        if(reactiveData.errors.tel.length > 0)
          return false;
        if(reactiveData.errors.email.length > 0)
          return false;
        return true;
      }
      const createCustomerToken = () => {
        const d = new Date();
        const year = d.getFullYear();
        const month = d.getMonth();
        const day = d.getDate();
        return `vouchershop_online_${year}${month}${day}_${reactiveData.tel}`;
      }
      const ticketCreated = () => {
        reactiveData.resolved = true;
        // store ticket, with qid in localstorage with status inprogress, include order, amount and more;
      }

      // ...mapMutations({
      //   reinstateOrder: 'REINSTATE_ORDER',
      // }),
      // ...mapActions({
      //   emptyOrder: 'emptyOrder'
      // })    
      const reinstateOrder = (orderItems) => {
        state.order.orderItems = orderItems ?? [];
      }
      const emptyOrder = (orderItems) => {
        state.order.orderItems = [];
      }
      if (process.client){
        if (localStorage.getItem('trxmem')) {
          let storedTrxString = localStorage.getItem('trxmem');
          if(storedTrxString != undefined && bytes != '' ){
            var bytes  = CryptoJS.AES.decrypt(storedTrxString, 'trx_ez_obscure');
            if(bytes != undefined && bytes != '' ){
              let data = bytes.toString(CryptoJS.enc.Utf8);
              data = JSON.parse(data);
              console.log({data});
              reinstateOrder(data.orderItems);
              reactiveData.qid = data.qid;
            }
          }
          //////////////////////////
          let storedDataString = localStorage.getItem('paymem');
          let userData;
          // RELOAD USERDATA //
          if(storedDataString != undefined && bytes != '' ){
            var bytes  = CryptoJS.AES.decrypt(storedDataString, 'xxxstatixxx');
            if(bytes != undefined && bytes != '' ){
              userData = bytes.toString(CryptoJS.enc.Utf8);
              userData = JSON.parse(userData);  
              reactiveData.name = userData.name;
              reactiveData.tel = userData.tel;
              reactiveData.email = userData.email;
            }
            if(reactiveData.name != null && reactiveData.tel != null && reactiveData.email != null){
              reactiveData.preFilled = true;
            }
          }
            reactiveData.progress.paid = 'inprogress';
        } 
      }

      checkStatus();
      return {
        reactiveData,
        intervalData,
        interval,
        isActive,
        pause, 
        resume,
        checkStatus,
        initiateSaveMode,
        sleep,
        showResult,
        backToStart,
        createSupportTicket,
        ticketCreated,
        validate,
        createCustomerToken,
      }
    }
  })

// import VueTimers from 'vue-timers'
//   Vue.use(VueTimers)
// import CryptoJS from "crypto-js";
// import CheckIt from '@/components/CheckIt.vue';

// export default {

//   name: 'Status',
//   components: {CheckIt},
//   data () {
//     return {
//       support_ticket_sending: false,
//       status: 'checking', // checking|result
//       result: null,
//       resolved: false,
//       checkThreshold: 3,
//       qid: null,
//       currentCounter: 0,
//       progressCounter: 0,
//       progress: {
//         paid: false,
//         vouchercode: false,
//         transmit: false,
//         done: false,
//       },
//       name: '',
//       tel: '',
//       email: '',
//       errors: { 
//         tel: [],
//         email: [],
//       },
//       validated: {  // false / true are actual statuses
//         tel: null,
//         email: null,
//       },

      
//     }
//   },


//   async mounted(){
//     let recaptchaEl = document.querySelector('[id^="vue-invisible-recaptcha-"]');
//     recaptchaEl.style = 'display: none';

//     await this.sleep(2000);
//   },

//   timers: {
//     checkStatus: { time: 300, repeat: true, immediate: false , autostart: true}
//   }
// }
</script>

<style lang="scss" scoped>
  #Status{
    max-width: 900px;
    margin: 0px auto;
    p{
      max-width: 55%;
      margin: auto;
    }
  }
  #Progress{
    text-align: left;
    max-width: 300px;
    margin: 0px auto;

    img{
      max-width: 20px;
      float: right;
    }
  }

  .inprogress {
      opacity: 1;
      animation: inprogress 2s linear forwards infinite;
  }
  @keyframes inprogress {
    0%,100% { opacity: 0 }
    50% { opacity: 1 }
  }

  .loader{
    position: inline-block;
    width: 300px;
    height: 20px;
    background: orange;
    margin: 0 auto;
    background: orange repeating-linear-gradient(135deg, #7d560e14, #ffffff73 23px);
    margin: 0 auto;
    border: 2px solid #DDD;
    box-shadow: 0 10px 10px -7px #00000050;
    animation: animatedBackground 500s linear infinite;
    margin-bottom: 20px;
  }

  @keyframes animatedBackground {
    from {
      background-position: 0 0;
    }
  /*use negative width if you want it to flow right to left else and positive for left to right*/
    to {
      background-position: 10000px 0;
    }
  }

  a.finish{
    cursor: pointer;
    border-radius: 7px;
    background: repeating-linear-gradient(45deg, #1684c8, #308ac3 100px);
    color: #FFF;
    padding: 5px 15px;
    line-height: 2em;
    display: inline-block;
    text-decoration: none;

    &:active{
      transform: translateY(1px);
      opacity: 0.99;
    }
  }

  form{
    background: linear-gradient(45deg, #c3c3c3, #FFFFFF);;
    border: 1px solid #DDD;
    
    max-width: 300px;
    margin: 25px auto 35px;
    box-shadow: 3px 5px 2px #00000060;
    h3{
      text-transform: uppercase;
      margin-bottom: 0px;
      color: #0c4971;
    }
    p.msg{
      max-width: unset !important;
      margin-top: 0px;
      margin-bottom: 1em !important;
      display: inline-block;
    }
    label{
      color: #525252;
      font-weight: bold;
      display: block;
      text-transform: uppercase;
    }
    input{
      margin: 0px 10px 20px;
      font-size: 18px;
      padding: 5px;
      border-radius: 7px;
      border: 1px solid #DDD;
      &:disabled{
        border: none;
        text-align: center;
      }
    }

    a{
      margin-bottom: 10px;
    }
  }
  #Status {
    .interval {
      > div {
        text-align:center;
      }
      p {width:auto;max-width:100%;text-align:center;}      
      button {
        padding:1em;
        display:block;
        margin:auto;
        text-align:center;
        width:100%;
      }
    }
    .orange {
      color:#fff;
      background:orange;
    }
  }
</style>
