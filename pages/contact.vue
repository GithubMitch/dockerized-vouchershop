<template>
  <div id="Contact">
    <ClientOnly>
      <h1>Contact</h1>
      <form autocomplete="on">
        <div class="formControl">
          <label>Naam</label>
          <span class="input">
            <input type="text" name="name" placeholder="naam" v-model="reactiveData.name" :disabled="reactiveData.loading || reactiveData.done" maxLength="30" @change="checkName" @@click.capture="activate" />
            <span class="indicator" v-if="reactiveData.validated.name == true"> <img src="@/assets/ok.svg" /></span>
            <span class="indicator" v-else-if="reactiveData.errors.name.length > 0"> 
            <img src="@/assets/warn.svg" />
            </span>
            <div class="error" v-if="reactiveData.errors.name.length > 0">{{reactiveData.errors.name[0]}}</div>
          </span>
        </div>
        <div class="formControl">
          <label>Telefoon</label>
          <span class="input">
            <input type="text" name="tel-local" placeholder="telefoon of mobiel" v-model="reactiveData.tel" :disabled="reactiveData.loading || reactiveData.done" @change="checkMobile" autocomplete="tel" @@click.capture="activate" />
            <span class="indicator" v-if="reactiveData.validated.tel == true"> 
              <img src="@/assets/ok.svg" />
            </span>
            <span class="indicator" v-else-if="reactiveData.errors.tel.length > 0"> 
              <img src="@/assets/warn.svg" />
            </span>
            <div class="error" v-if="reactiveData.errors.tel.length > 0">{{reactiveData.errors.tel[0]}}</div>
          </span>
        </div>
        <div class="formControl">
          <label>E-mail</label>
          <span class="input">
            <input type="email" name="email" placeholder="emailadres" v-model="reactiveData.email" :disabled="reactiveData.loading || reactiveData.done" @change="checkEmail" @@click.capture="activate" />
            <span class="indicator" v-if="reactiveData.validated.email == true"> 
              <img src="@/assets/ok.svg" />
            </span>
            <span class="indicator" v-else-if="reactiveData.errors.email.length > 0"> 
              <img src="@/assets/warn.svg" />
            </span>
            <div class="error" v-if="reactiveData.errors.email.length > 0">{{reactiveData.errors.email[0]}}</div>
          </span>
        </div>
        <div class="formControl">
          <label>Bericht</label>
          <span class="input">
            <textarea name="message" placeholder="Vul hier uw vraag of probleem in" v-model="reactiveData.msg" :disabled="reactiveData.loading || reactiveData.done" @change="checkMsg" maxlength="250" @keydown="checkMsgCount()" @keyup="checkMsgCount()" @click.capture="activate">
            </textarea>
              <span class="chars" :class="{disabled: reactiveData.done}">{{ reactiveData.msgMax - msgLen() }} / {{ reactiveData.msgMax }}</span>
              <span class="indicator" v-if="reactiveData.validated.msg == true"> <img src="@/assets/ok.svg" /></span>
              <span class="indicator" v-else-if="reactiveData.errors.msg.length > 0"> <img src="@/assets/warn.svg" /></span>
              <div class="error" v-if="reactiveData.errors.msg.length > 0">{{reactiveData.errors.msg[0]}}</div>
          </span>
        </div>
        <div class="formControl">
          <label></label>
          <span class="input">
            <div id="Loader" v-if="reactiveData.loading">
              <!-- <vue-loaders-ball-beat> </vue-loaders-ball-beat> -->
            </div>
            <!-- <invisible-recaptcha id="Submit" v-show="!loading&amp;&amp;!done" name="contact" sitekey="6Lfe3REaAAAAAP12JQcZ5tsOHqeTH4_DcRhw1y9V" :validate="prepare" :callback="send" type="submit" :disabled="loading" :class="{loading}">Verstuur</invisible-recaptcha> -->
            <button id="Submit" v-show="!reactiveData.loading&&!reactiveData.done" name="contact" sitekey="6Lfe3REaAAAAAP12JQcZ5tsOHqeTH4_DcRhw1y9V" :validate="prepare" @click="send()" :disabled="reactiveData.loading" :class="reactiveData.loading">Verstuur</button>
            <div class="error" v-if="reactiveData.errors.all.length > 0">{{reactiveData.errors.name[0]}}</div>
          </span>
        </div>
        <div class="formControl done" v-if="reactiveData.done">
          <p>Bericht verstuurd! </p>
        </div>
        <div class="formControl again" v-if="reactiveData.done"><a @click="again">Opnieuw</a></div>
      </form>
    </ClientOnly>
  </div>

</template>

<script>
import CryptoJS from "crypto-js";
import {state , actions} from '../store/reactives'
import { defineComponent, toRef , onMounted} from 'vue';
export default defineComponent({
  // TODO 
  // add router const
  
  async setup () {
    const reactiveData = reactive({
      ///////////////
      loading: false,
      done: false,
      ///////////////
      checkedFirst: false,
      name: '',
      tel: '',
      email: '',
      msg: null,
      confirm: false,
      msgMax: 200,
      qid: '',
      errors: { 
        all: [],
        checkedFirst: [],
        name: [],
        tel: [],
        msg: [],
        email: [],
        confirm: [],
      },
      validated: {  // false / true are actual statuses
        checkedFirst: null, 
        name: null,
        tel: null,
        email: null,
        msg: null,
        confirm: null,
      },
    })

    const sleep = (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    const back = () => {
      router.push('/');
    }
    const again = async () => {
      await reactiveData.sleep(1020);
      reactiveData.msg='';
      reactiveData.done=false;
    }
    const activate = () => {
      console.log('activity');
      if(reactiveData.done === true){
        again();
      }
    }
    const prepare = () => {
      reactiveData.loading = true;
    }
    const ticketCreated = () => {
      reactiveData.done = true;
    }
    const send = async () => {
            // const createSupportTicket = async () => {
        try{
          reactiveData.support_ticket_sending = true;

          if(!validate())
            throw 'validation error';

          let payLoad = {
            // TODO > convert localstorage > currentOrder > take over values and fill in here (orderId / uniqueReference )
            reference : "blablabla",
            questionRequest : {
              //TODO : define default or usrinput
              securityKey : "SecretH@ndShake007",
              locale : "nl_NL",
              message : reactiveData.msg, //usr input
              mobile : reactiveData.tel, //usr input
              name : reactiveData.name, //usr input
              email : reactiveData.email, //usr input


              // *** EXTRA FIELDS ***  ///  
              // Voor normaal contactformulier heb ik geen qid product of productvalue / unique-ref ???
              // orderId :  reactiveData.qid, //route.query.orderId, // TODO orderId ? qeueId
              // problem : "=eigenlijk geen probleem",
              // product : "topup belkaart",
              // productValue : 1000,
              // uniqueReference : "1234"//route.query.paymentSessionId //route.query.paymentSessionId ? qeueId ticketRef
            }
          }

					// let sendEmailReq = await actions.sendEmail(payLoad);
					let sendQuestionReq = await actions.sendQuestion(payLoad);

          console.log(sendQuestionReq);

          if(sendQuestionReq.responseObject.resultCode != '1000')
            throw 'Probleempje met versturen. Probeer het nogmaals.' 

          await sleep(1020);

          ticketCreated()

          reactiveData.support_ticket_sending = false;

        }catch(e){
          console.error(e);
          reactiveData.support_ticket_sending = false;
          // reactiveData.errors.all.push(e);
        }
      // }
    }

    const validate = () => {
      if(reactiveData.errors.name.length > 0)
        return false;
      if(reactiveData.errors.tel.length > 0)
        return false;
      if(reactiveData.errors.email.length > 0)
        return false;
      if(reactiveData.errors.msg.length > 0)
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
    const checkName = () => {
      reactiveData.validated.name = null;
      reactiveData.errors.name = []; // reset
      console.log('checkName...');
      if (!reactiveData.name)
        reactiveData.errors.name.push("Naam ontbreekt");
      if(reactiveData.errors.name.length == 0)
        reactiveData.validated.name = true;
    }
    const checkMobile = () => {
      reactiveData.validated.tel = null;
      reactiveData.errors.tel = []; // reset
      console.log('checkMobile...');
      if(!reactiveData.tel)
        reactiveData.errors.tel.push("Mobiel ontbreekt");
      if(reactiveData.tel.startsWith('06')){
        if(reactiveData.tel.length != 10)
          reactiveData.errors.tel.push("Mobiel is ongeldig");
      }
      if(reactiveData.tel.startsWith('+316')){
        if(reactiveData.tel.length != 12 )
          reactiveData.errors.tel.push("Mobiel is ongeldig");
      }
      if(reactiveData.tel.startsWith('00316')){
        if( reactiveData.tel.length != 13 )
          reactiveData.errors.tel.push("Mobiel is ongeldig");
      }
      if(reactiveData.errors.tel.length == 0)
        reactiveData.validated.tel = true;
    }
    const checkEmail = () => {
      reactiveData.validated.email = null;
      reactiveData.errors.email = [];
      console.log('checkEmail...');
      // validate
      var emailCheck=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
      if(!reactiveData.email)
        reactiveData.errors.email.push("E-mail ontbreekt");
      if(!emailCheck.test(reactiveData.email))
        reactiveData.errors.email.push("E-mail is ongeldig");
      if(reactiveData.errors.email.length == 0)
        reactiveData.validated.email = true;
    }
    const checkMsg = () =>{
      reactiveData.validated.msg = null;
      reactiveData.errors.msg = [];
      if(!reactiveData.msg)
        reactiveData.errors.msg.push("Bericht ontbreekt");
      if(reactiveData.msg.length < 5 )
        reactiveData.errors.msg.push("Gelieve iets meer informatie te geven");
      if(reactiveData.msg.length > 200 )
        reactiveData.errors.msg.push("Probeer het bericht iets korter te houden.");

      if(reactiveData.errors.msg.length == 0)
        reactiveData.validated.msg = true;
    }
    const checkMsgCount = (value) => {
      reactiveData.validated.msg = null;

      if(reactiveData.msgLimitReached)
        reactiveData.msg = reactiveData.msg.substr(0,200);
    }

    const msgLen = () => {
      if(reactiveData.msg)
        return reactiveData.msg.length;
      return 0;
    }
    const msgLimitReached = () => {
      if(reactiveData.msg)
        return reactiveData.msgMax-reactiveData.msg.length < 1;
      return false;
    }

    // MOUNTED HOOK
    onMounted(() => {
      reactiveData.selectionMade = false;
      // reactiveData.setSelectedBrand(null);
      // let recaptchaEl = document.querySelector('[id^="vue-invisible-recaptcha-"]');
      // recaptchaEl.style = 'display: none';
      let storedDataString = localStorage.getItem('paymem');
      let userData;// placeholder //
      if(storedDataString != undefined && bytes != '' ){
        var bytes  = CryptoJS.AES.decrypt(storedDataString, 'xxxstatixxx');
        if(bytes != undefined && bytes != '' ){
          userData = bytes.toString(CryptoJS.enc.Utf8);
          userData = JSON.parse(userData);

          reactiveData.name = userData.name;
          reactiveData.tel = userData.tel;
          reactiveData.email = userData.email;

          reactiveData.validated.name = true;
          reactiveData.validated.tel = true;
          reactiveData.validated.email = true;
        }
        
      }
    })

    return {
      prepare, 
      send,
      activate,
      checkMsgCount,
      msgLen,
      checkMsg,
      back,
      reactiveData
    }
  }
})


</script>


<style lang="scss">
.formControl{
  display: flex;
  justify-content: space-between;
  margin: 1em auto;
  max-width: 515px;
  // background: #DDD;

  &.done{
    text-align: center;
    p{
      width: 100%;
      text-align: center;
      font-size: 20px;
      margin: 0px;
    }
  }
  label{
    display: inline-block;
    vertical-align: top;
    min-width: 100px;
    text-align: right;
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
    position: relative;

  }

  input[type=text], input[type=email], textarea{
    border-radius: 5px;
    border: 2px solid #1c84c6;
    outline: none;
    padding: 0.1em 1em;
    line-height: 2em;
    //background: linear-gradient(145deg, #351717, #2185c8);
    // background: linear-gradient(145deg, #344e61, #a7aeb3);
    // background: linear-gradient(0deg, #ffffff, #def0fb);
    background: repeating-linear-gradient(45deg, #dff1fb45, #fbfbfb 59px);
    // box-shadow: inset 2px 2px 5px #000000;
    box-shadow: inset 0px 4px 1px 0px #17182b20;
    color: #FFF;
    font-size: 18px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-weight: bold;
    color: #0c4061;

    &::placeholder{
      color: #0c406140;
    }
    &:disabled{
      border-color: #DDDDDD30;
      background: #DDDDDD30;
      box-shadow: none;
      opacity: 0.9;
    }
  }
  textarea{
    min-height: 231px;
    min-width: 308px;
    vertical-align: top;
    font-size: 15px;
    line-height: 1.2em;
    padding-top: 25px;
  }

  input[type=submit], button#Submit{
    box-sizing: border-box;
    padding: 0.55em 1em;
    font-size: 18px;
    font-weight: bold;
    min-width: 250px;
    max-width: 250px;
    max-height: 2.2em;
    border-radius: 5px;
    outline: none;
    border: none;
    background: #1e87c7;
    color: #FFF;

    &:hover{
      cursor: pointer;
      background: #1e87c790;
    }
    &:active{
      transform: translateY(1px);
      opacity: 0.9;
    }
    &.sending{
      background: #DDD;
      color: transparent;
    }
  }
}

#Loader{
  box-sizing: border-box;
  padding: 0.55em 1em;
  font-size: 18px;
  font-weight: bold;
  min-width: 250px;
  max-width: 250px;
  max-height: 2.2em;
  border-radius: 5px;
  outline: none;
  border: none;
  background: #ABABAB;
  color: #2c3e51;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  box-shadow: inset 0 4px 4px 1px #00000010;
  opacity: 0.4;
  &:active{
    transform: translateY(1px);
  }
}

.again{
  width: 100%;
  
  text-align: center;
  justify-content: center;

  a{
    padding: 0px 10px;
    display: inline-block;
    background: #DDD;
    border-radius: 35px;
    margin-right: 1em;
    cursor: pointer;
    font-size: 12px;

    &:active{
      transform: translateY(1px);
      opacity: 0.9;
    }
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


span.chars {
  position: absolute;
  right: 38px;
  top: 2px;
  font-size: 12px;
  color: #ffffff;
  /* text-shadow: 0px 0.5px 8px #FFF; */
  background: #1c84c6;
  border-radius: 0px 4px 0px 5px;
  padding: 1px 3px;
  box-shadow: 0px 3px 1px #00000025;
  &.disabled{
    background: #DDD;
    box-shadow:none;
  }
}
</style>