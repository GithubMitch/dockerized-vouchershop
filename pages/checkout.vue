<template>
	<NuxtLayout name="default">
		<template #content>
			<div class="inner">
				<h1 style="text-align: center">Checkout {{order}} 123</h1>

				<!-- <p>
            A list with all products that reside within your cart.
          </p> -->
			</div>
			<div class="inner checkout">
				<div id="ProductSelection">
					<div v-if="orderItems.length > 0">
						<div class="orderItemHolder" v-for="(item, index) in orderItems" :key="index" >
							<div class="orderItem" :class="{ onButton: hover }">
								<div class="productInfo">
                  <ClientOnly>
									  <img class="thumbnail" :src="`../../../assets/logos/${item.brand}.png`"/>
                  </ClientOnly>
									<p class="name">{{ item.name }}</p>
									<p class="desc">opwaardeercode</p>
								</div>

								<div class="productControls">
									<em @click="() => {decreaseQnt(index);}"
										:class="{ disable: loading }"
                    >
										<!-- @mouseover="hover = true"
										@mouseleave="hover = false" -->
                      &#9668;
                  </em>
									<span :class="'qnt_' + index">{{ item.qnt }}&#10005; </span>
									<em @click="() => {increaseQnt(index);}"
										:class="{ disable: loading }"
                    >
										<!-- @mouseover="hover = true"
										@mouseleave="hover = false" -->
                    &#9658;
                  </em>
								</div>

								<div class="productPrice">
									<span :class="['itemTotal', 'total_' + index]">{{ $currency(item.value * item.qnt) }}</span>
									<div class="addedCost" v-if="item.addedCost != undefined" :class="['itemAdded', 'total_' + index]">
										{{ $currency(item.addedCost * item.qnt) }}
									</div>
								</div>

								<Fold
									@click="removeCartItem(index)"
									width="35"
									height="35"
									:class="'MyGradient_' + index"
									:gradient="{ from: [`#ff7514`, 5], to: ['#f36000a1', 95] }"
									:MyGradient="'MyGradient'"
									:textStyle="{top: '-1px',left: '3px',height: '13px',width: '13px'}"/>

							</div>
						</div>
						<div id="Total" v-if="orderItems.length > 0">
							<div id="TotalHolder">
								<div id="TotalLabel">Totaal:</div>
								<div id="TotalAmount">
									<div id="TotalAmountText">
                    <ClientOnly>
										  {{ $currency(getCartTotal())  }}
                    </ClientOnly>
									</div>
								</div>
							</div>
						</div>
					</div>

					<p id="NoItems" v-else>
						Geen producten geselecteerd
						<br />
						<!-- <a @click="backToStart" class="backToStart">Kies een product</a> -->
					</p>

				</div>
			</div>

			<form :style="inputFormStyle" autocomplete="on" @submit.prevent="submit">
				<div id="ContactDelivery">
					<h1>Contactgegevens
            <span class="edit" v-if="preFilled & !editMode" @click="editMode = true">aanpassen</span>
					</h1>
					<div class="formControl">
						<label>Naam</label> 
            <span class="input">
              <input type="text" name="name" placeholder="Naam" maxLength="30"
								v-model="name"
								:disabled="loading || (!editMode && preFilled)"
								:class="[{ static: preFilled && !editMode },{ errored: errors.name.length > 0 },]"
								@change="checkName"/>
                <span class="indicator" v-if="validated.email == true">
								  <img src="@/assets/ok.svg" />
                </span>
                <span class="indicator" v-else-if="errors.name.length > 0">
								  <img src="../../../assets/warn.svg"/>
                </span>
							<div class="error" v-if="errors.name.length > 0">
								{{ errors.name[0] }}
							</div>
						</span>
					</div>
					<div class="formControl">
						<label>Mobiel</label>
            <span class="input">
              <input type="tel" autocomplete="tel" name="tel-local" maxLength="" placeholder="Mobiele nummer"
								v-model="tel"
								:disabled="loading || (!editMode && preFilled)"
								:class="[{ static: preFilled && !editMode },{ errored: errors.tel.length > 0 },]"
								@change="checkMobile"/>
              <span class="indicator" v-if="validated.tel == true">
                <img src="../../../assets/ok.svg" />
              </span>
              <span class="indicator" v-else-if="errors.tel.length > 0">
								<img src="../../../assets/warn.svg"/>
              </span>
							<div class="error" v-if="errors.tel.length > 0">
								{{ errors.tel[0] }}
							</div>
						</span>
					</div>
					<div class="formControl">
						<label>E-mail</label>
            <span class="input">
              <input type="email" name="email" placeholder="E-mail address" maxLength="55"
								v-model="email"
								:disabled="loading || (!editMode && preFilled)"
								:class="[{ static: preFilled && !editMode },{ errored: errors.email.length > 0 },]"
								@change="checkEmail"/>
                <span class="indicator" v-if="validated.email == true">
								  <img src="../../../assets/ok.svg" />
                </span>
                <span class="indicator" v-else-if="errors.email.length > 0">
								  <img src="../../../assets/warn.svg"/>
                </span>
							<div class="error" v-if="errors.email.length > 0">
								{{ errors.email[0] }}
							</div>
						</span>
					</div>
				</div>
				<div id="Payment">
					<h1>Betalen</h1>

					<div class="formControl" id="PaySelect">
						<label> Kies betaalmethode </label>
						<span class="input">
							<MySelect
								ref="mySelect"
								:default="paymentOptions"
								:tabindex="0"
								v-model="selectedPaymethod"
								:components="{ Deselect: null }"
								:options="getPaymentOptions ? paymentOptions : paymentOptions"
								:searchable="false"
								:placeholder="'Maak een keuze'"
								:disabled="loading"
								:elementIndex="0"
								@selectChange="setPaymethod"
								:class="[{ static: preFilled && !editMode },{ errored: errors.paymethod.length > 0 },]"
                >
							</MySelect>

                <span class="indicator" v-if="validated.paymethod == true">
                  <img src="@/assets/ok.svg" />
                </span>
                <span class="indicator" v-else-if="errors.paymethod.length > 0">
                  <img src="../../../assets/warn.svg"/>
                </span>
                <div class="error" v-if="errors.paymethod.length > 0">
                  {{ errors.paymethod[0] }}
                </div>
						</span>
					</div>

					<!-- {{selectedPaymethod}} -->
					<div class="formControl" id="SubSelect" v-if="selectedPaymethod != null">
						{{selectedPaymethod.subSelect}}
						<span	class="input" v-if="selectedPaymethod.pmsublist != undefined && selectedPaymethod.pmsublist.length > 0">
							<label>Kies bank</label> 
							<MySelect
								id="SubSelector"
								:default="subSelection"
								:tabindex="1"
								v-model="selectedSubPaymethod"
								:components="{ Deselect: null }"
								:options="subSelection"
								:elementIndex="0"
								:searchable="false"
								:placeholder="'Kies een bank'"
								disabled="loading"
								:optionType="`banks/`"
								@selectChange="setSubPaymethod"
								:class="[{ static: preFilled && !editMode },{ errored: errors.subpaymethod.length > 0 },]"
                >
							</MySelect>
                <span class="indicator" v-if="validated.subpaymethod == true">
                  <img src="@/assets/ok.svg" />
                </span>
                <span class="indicator" v-else-if="errors.subpaymethod.length > 0">
                  <img src="../../../assets/warn.svg"/>
                </span>
                <div class="error" v-if="errors.subpaymethod.length > 0">
                  {{ errors.subpaymethod[0] }}
                </div>
						</span>
					</div>

					<div class="formControl">
						<label for="" class="terms">
							<input
								type="checkbox"
								:disabled="loading"
								name="agreed2Terms"
								v-model="agreed2Terms"
								@checked="agreed2Terms.value = true "
                @click="checkPaymethods"
							/>
							Ik bevestig dat mijn gegevens correct zijn ingevuld en ga akkoord
							met de <a href="">algemene voorwaarden.</a>
							<span v-if="errors.agreed2Terms.length > 0" class="indicator">
								<img src="@/assets.warn.svg" alt="" />
								{{ errors.agreed2Terms[0] }}
							</span>
							<div class="err"></div>
						</label>
						<span class="input">
							<div id="" v-if="loading"></div>
							<!-- <input v-else type="submit" value="Betalen" :class="{loading}"> -->
							<input
								name="orderRequest"
								v-show="!loading"
								sitekey="6Lfe3REaAAAAAP12JQcZ5tsOHqeTH4_DcRhw1y9V"
								:validate="prepare"
								:callback="submit"
								type="submit"
								:disabled="!validated.form"
								:class="{ loading }"
								id="submit"
							/>
							<div v-if="errors.form.length > 0" class="error">{{errors.form[0]}}</div>
						</span>
					</div>
				</div>
			</form>
        <div :style="`display:block;`">
          <pre>
						{{selectedSubPaymethod}}
            {{validated}}
          </pre> 
        </div>
		</template>
	</NuxtLayout>
</template>

<script setup>
</script>

<script lang="ts">
import MySelect from "../components/MySelect.vue";
import { state, actions, methods } from "../store/reactives";
import {
	defineComponent,
	reactive,
	onMounted,
	toRef,
	ref,
	toRaw,
} from "vue";
import CryptoJS from "crypto-js";
import { _ } from "vue-underscore";

export default defineComponent({
	layout: false,
	name: "status",
	components: {
		MySelect,
	},
	async setup() {
		const cart = toRef(state, "cart");
		const selectedProducts = toRef(state, "selectedProducts");
		const hover = ref(false);
		const selectedPaymethod = ref(null);
		const selectedSubPaymethod = ref(null);
		const subSelection = ref(null);
		const loading = ref(false);
		const color = ref("string");

		const editMode = ref(false);
		const preFilled = ref(false);
		const name = toRef(state.order, "name");
		const tel = toRef(state.order, "mobile");
		const email = toRef(state.order, "email");
		const emailSuggestion = ref("");
		const agreed2Terms = ref(false);
		const errors = reactive({
			name: [],
			tel: [],
			email: [],
      paymethod: [],
      subpaymethod: [],
			agreed2Terms: [],
			form: [],
		});
		const validated = reactive({
			name: false,
			tel: false,
			email: false,
			agreed2Terms: agreed2Terms,
      paymethod: !selectedPaymethod,
      subpaymethod: !selectedSubPaymethod,
      form: false,
      get validateForm() {
        return (this.name && this.tel && this.email && this.agreed2Terms && this.paymethod && this.subpaymethod) ? this.form = true : this.form = false ;
      }
		});
		const qid = ref(null);
		const payUrl = ref(null);

		//STATES
		const order = toRef(state, 'order');
		const orderItems = toRef(state.order , 'orderItems');
		const paymentOptions = toRef(state, "paymentOptions");
		const removeCartItem = (index) => {
			actions.removeCartItem(index);
		}
		const increaseQnt = (index) => {
			actions.increaseQnt(index);
		}
		const decreaseQnt = (index) => {
			actions.decreaseQnt(index);
		}
		const inputFormStyle = () => {
			return {
				// opacity: orderItems.length > 0 ? 1: 0.1,
			}
		}
		const getTotalAmountOfAddedCosts = () => {
			return actions.getTotalAmountOfAddedCosts();
		}
		const getCartTotal = () => {
			return actions.getCartTotal();
		}

    
		const getPaymentOptions = async () => {
      return actions.getPaymentOptions;
		}

		const setPaymethod = (option) => {
			console.log('setPaymethod',option)
			let opt = option ? option : option.option;
			opt.pmsublist ? (subSelection.value = opt.pmsublist) : null;
			console.log("setPaymethod - Subselection", subSelection.value);
			selectedPaymethod.value = option;
      checkPaymethods(option);
      // validated.paymethod = true;
		}
		const setSubPaymethod = (option) => {
      let opt = option ? option : option.option;
			selectedSubPaymethod.value = option;
			console.log('setSubPaymethod - Subselection', option, selectedSubPaymethod.value);
      checkPaymethods(option);
      // validated.subpaymethod = true;
		}

		// watch([selectedPaymethod], (newValues, prevValues) => {
		//   console.log("selectedPaymethod=",prevValues, newValues)
		//   // let container = selectedPaymethod.value
		//   // container.subSelect ? subSelection.value = container.subSelect : null;
		// })

    const checkName = () => {
      validated.name = false;
      errors.name = []; // reset
      console.log('checkName...');
      if (!name)
        errors.name.push("Naam ontbreekt");
        validated.name = false;
      if(errors.name.length == 0)
        validated.name = true;
    }
    const checkMobile = () => {
      // validated.tel = false;
      errors.tel = []; // reset
      console.log('checkMobile...');
      if(!tel) 
        errors.tel.push("Mobiel ontbreekt");
        validated.tel = false;
      if(tel.value.length <= 8 || tel.value.length >= 13) 
        errors.tel.push("Mobiel is ongeldig");
      if(tel.value.startsWith('06')){if(tel.value.length != 10) errors.tel.push("Mobiel is ongeldig");}
      if(tel.value.startsWith('+316')){if(tel.value.length != 12 ) errors.tel.push("Mobiel is ongeldig");}
      if(tel.value.startsWith('00316')){if( tel.value.length != 13 ) errors.tel.push("Mobiel is ongeldig");}

      if(errors.tel.length == 0) validated.tel = true;
    }

    const checkEmail = () => {
      validated.email = null;
      errors.email = []; // reset
      console.log('checkEmail...');
      // validate
      var emailCheck=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
      if(!email)errors.email.push("E-mail ontbreekt");
      if(!emailCheck.test(email.value))errors.email.push("E-mail is ongeldig");
      if(errors.email.length == 0) validated.email = true;
    }
    const checkPaymethods = (option) => {
      // validate
      console.log('checkPaymethods...');
      console.log(selectedPaymethod.value);
      console.log(selectedSubPaymethod.value);

      if(option.subSelect == undefined) {
				errors.subpaymethod = []; // reset
        validated.subpaymethod = true
      } else {
				if(selectedPaymethod.value == null) 
					errors.paymethod.push("Geen betaalmethode geselecteerd");
        if(option.subSelect !== undefined && selectedSubPaymethod.value == null) 
					errors.subpaymethod.push("Geen bank geselecteerd");
          errors.subpaymethod = []; // reset
          validated.subpaymethod = false
      }
      errors.paymethod = []; // reset      
      validated.paymethod = true;
    }

		const prepare = () => {
			loading.value = true;
		}

		const unsetErrorsFor = (target) => {
			console.log("UNSET", target);
			errors[`${target}`].value = [];
		}

    const validate = () => {
      console.log(errors)
      if (errors["name"].length > 0) return false;
      if (errors["tel"].length > 0) return false;
      if (errors["email"].length > 0) return false;
      if (errors["agreed2Terms"].length > 0) return false;
      if (!selectedPaymethod.value) return false;
      if (errors["form"].length > 0) return false;
			
			// if no product return false
      // validated.validateForm(validated.validateFields)
      // console.log(validated.validateForm(validated.validateFields))
      return true;
    }

    const formatOrderItems = (cart, mail , tel) => {
      return _(cart).map((orderItem) => {
        return {
          ean: parseInt(orderItem.ean),
          amountCents: orderItem.price,
					email: mail.value,
        	mobileNumber : tel.value,
          quantity: orderItem.qnt,
          desc: orderItem.name,
					type : "TOPUP" 
        }
      });
    }

		const storeLastTrxData = async (qid, payUrl, orderItems) => {
			let data = { qid, payUrl, orderItems }
			var cypher = CryptoJS.AES.encrypt(
				JSON.stringify(data),
				"trx_ez_obscure"
			).toString();
			if (process.client) {
				localStorage.setItem("trxmem", cypher);
			}
		}

    const storeSettings = () => {
      const data = {
        name: name.value,
        tel: tel.value,
        email: email.value,
        payment: selectedPaymethod.value ? selectedPaymethod.value : null,
        paymentId: selectedPaymethod.key,
        subPayment: selectedSubPaymethod.value ? selectedSubPaymethod.value : null,
      }
      const cypher = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        "xxxstatixxx"
      ).toString();
      let dataValue = JSON.stringify(data);
      console.log('CYPHER',cypher)
      if (process.client) {
        localStorage.setItem("paymem", cypher);
      }
    }

		const submit = async () => {
			// console.log("SUBMIT");
			storeSettings();
			// unsetErrorsFor("form");
			try {
				if (!validate()) 
					// console.log('selectedPaymethod', selectedPaymethod)
					// console.log('selectedSubPaymethod', selectedSubPaymethod)
					throw "Fout in een van de invoervelden";
				if (!agreed2Terms)
					throw {
						target: "agreed2Terms",
						msg: "Je moet akkoord geven op de algemene voorwaarden.",
					}
				const protocol = window.location.protocol;
				const domain = window.location.hostname;
				const port = window.location.port;


				let $origin = protocol + domain + port;
				let $api = protocol + domain + port;

				switch (domain) {
					case 'localhost':
					case '127.0.0.1':
					case 'vouchershop.prepaidpoint.devv':
						$api = 'http://api.prepaidpoint.test/vouchershop';
						break;
					case 'vouchershop.prepaidpoint.test':
						$api = 'http://api.prepaidpoint.test/vouchershop';
						break;
					case 'vouchershop.prepaidpoint-preprod.com':
						$api = 'http://api.prepaidpoint-preprod.com/vouchershop';
						$origin = 'https://vouchershop.prepaidpoint-preprod.nl/vouchershop'
						break;
					default:
						$api = 'https://api.prepaidpoint.com/vouchershop';
						break;
				}

				let pmId = selectedPaymethod.value.id;
				console.log(selectedSubPaymethod)
				// let pmsubId = selectedSubPaymethod.value.pmsubId ? selectedSubPaymethod.value.pmsubId : null;
				let pmsubId = null;
				console.log('selectedSubPaymethod',selectedSubPaymethod)
				// // subPaymethodId = selectedSubPaymethod != undefined ? parseInt(selectedSubPaymethod.id) : null; 
				// subPaymethodId.value = selectedSubPaymethod != undefined ? selectedSubPaymethod.pmsubId : null;
				let formattedOrderItems = formatOrderItems(state.order.orderItems, email.value ,tel.value);

				console.log("paymethodId/selectedPaymethod.id = ", pmId)
				console.log("subPaymethodId/selectedSubPaymethod.pmsubId = ", pmsubId)

				const orderPayload = reactive({
					"reference" : "referexxxnce",
					"submitOrderRequest" : {
						"address1" : "address1",
						"city" : "Hoofddorp" ,
						"country" : "NL" ,
						"description" : "Holland bundle NL",
						"extraAmount": getTotalAmountOfAddedCosts(),
						"ipCustomer" : "127.0.0.1",
						"language" : "nl" ,
						"orderItems": formattedOrderItems,
						"orderConfig" : '',
						"returnUrl": window.location.protocol + "//" + window.location.hostname + (window.location.port != undefined ? ":" + window.location.port : "") + "/status", 
						"securityKey" : "DSFBUHQEWRBV89UWRETHUISFBHOSBGFJBNMGERTGTYYJUR3333",
						"shopPaymentId": pmId, 
						"specifyOrderItems" : true ,
						"subPaymethodId": pmsubId, 
						"totalAmountCents": getCartTotal(),
						"zipcode" : "1234aa",
						// desc: orderItems.value.length > 1 ? orderItems.value.length + " voucher producten." : "Voucheraankoop", 
						// mobile: tel.value,
						// email: email.value,
					}
				})
				console.log(orderPayload)
				if (window.fetch) {
					// run my fetch request here
					let submitReq = await $fetch(`http://hndxs.test.hand.local:8280/hndxs/v1/online/submitorder`, { 
						method: 'POST',
						headers: {
							'Authorization': 'Basic ' + btoa(`${'HND_ONLINE_VOUCHERSHOP'}:${'vouchershop'}`),
							'posId': '50100004'
						},
						body: orderPayload,
					})

					console.log('submitReq', submitReq)
					if(submitReq) {
						if(submitReq.responseObject.resultCode > 50000)
						throw 'Error in request';
	
						qid.value = submitReq.responseObject.paymentQueueId;
						payUrl.value = submitReq.responseObject.paymentUrl;
	
						console.log('QID', submitReq.responseObject.paymentQueueId, 'PAYURL', submitReq.responseObject.paymentUrl, 'ORDERITEMS', orderItems )
	
						storeLastTrxData(qid.value, payUrl.value, orderItems.value);
						if (submitReq.responseObject.paymentUrl)
							console.log(submitReq.responseObject.paymentUrl)
							window.location.href = `${submitReq.responseObject.paymentUrl}`
					}

					if(!submitReq)
					throw 'Error in request';
				} else {
					// do something with XMLHttpRequest?
				}
			} catch (e) {
				console.log('Error in form submission::', 'Initiate gracefull shutdown');
				console.log(e);
				loading.value = false;
				if (typeof e === "object") {
					if (e.target != undefined) {
						errors[e.target].push(e.msg);
						return;
					}
				}
				if (typeof e === "string") {
					errors["form"].push(e);
					return;
				}
				console.log("form error....\n", e);
				errors["form"].push(e);
			}
    }

			const reinstateOrder = (orderItems) => {
				orderItems = orderItems ?? [];
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
              name.value = userData.name;
              tel.value = userData.tel;
              email.value = userData.email;
            }
            if(name != null && tel != null && email != null){
							checkName()
							checkMobile()
							checkEmail()
              preFilled.value = true;
            }
          }
        } 
			// RELOAD PAYMENT //
			// if(storedDataString != undefined  &&  bytes != '' ){
			//   selectedPaymethod = userData.payment ? getPaymethodWithKey(userData.payment): null;
			//   if(selectedPaymethod.subSelect != undefined)
			//     subSelection = selectedPaymethod.subSelect;
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
			      reinstateOrder(data.orderItems);
			    }
			  }
			}
		}

		onMounted(() => {
      actions.getPaymentOptions()
		});

		return {
			getPaymentOptions,
			getCartTotal,
			getTotalAmountOfAddedCosts,
			removeCartItem,
			increaseQnt,
			decreaseQnt,
			inputFormStyle,
			setPaymethod,
			setSubPaymethod,
			storeSettings,
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
			payUrl,
      prepare,
      submit,
      checkName,
      checkMobile,
      checkEmail,
      checkPaymethods
		}
	}
});
</script>



<style lang="scss">
	.orderItemHolder {
		margin-bottom: 1em;
	}
	.orderItem {
		position: relative;
		overflow: hidden;
		display: flex;
		margin: 0px auto;
		min-height: 97px;
		justify-content: space-between;
		flex-flow: row;
		vertical-align: top;
		background: #dddddd;
		padding: 1em;
		box-sizing: border-box;
		border-radius: 9px;
		background: radial-gradient(#cccccc, #fbfbfb);
		border: 1px solid #ddd !important;
		background-position: 0px -92px;
		background-repeat: no-repeat;
		box-shadow: 0px 2px 3px #00000020;
		transition: transform box-shadow 0.2s;

		&:active.onButton {
			perspective: 130px;

			transform-origin: 10% 90%;
			transform: rotate3d(2, 10, 0, 3.5deg);
			box-shadow: -3px 2px 3px #00000020;
		}

		.productInfo {
			flex: 1 1 80%;
			text-align: left;
			vertical-align: top;
			img {
				float: left;
				border: 1px solid #ddd;
				padding: 2px;
				max-height: 50px;
				margin-right: 2em;
				vertical-align: top;
			}
			p.name {
				margin-top: 0.5em;
				margin-bottom: 0px;
				font-weight: bold;
			}
			p.desc {
				font-size: 90%;
				color: #818181;
				margin-top: 0px;
			}
		}
		.productControls {
			flex: 1 1 20%;
			align-self: center;
			user-select: none;
			span {
				min-width: 45px;
				text-align: center;
				display: inline-block;
			}
			em {
				opacity: 0.7;
				cursor: pointer;
				display: inline-block;
				&:hover {
					opacity: 0.5;
				}
				&:active {
					transform: translateY(1px);
				}
			}
		}
		.productPrice {
			display: inline-flex;
			justify-content: flex-end;
			flex-flow: column;
			vertical-align: top;
			align-self: center;
			flex: 1 1 20%;
			text-align: right;
			font-size: 20px;

			.itemTotal {
				display: inline-block;
				transform-origin: 90% 50%;
			}

			.addedCost {
				font-size: 65%;
				color: #929292;
				transform-origin: 90% 50%;
			}
		}
		.close {
			cursor: pointer;
			&:active {
				transform: translateY(0.5px);
				opacity: 0.99;
			}
			&:hover {
				opacity: 0.8;
			}
		}
	}
	// #Total {
	//   position: relative;
	//   overflow: hidden;
	//   display: flex;
	//   max-width:170px;
	//   margin: 0px auto;
	//   min-height: 97px;
	//   justify-content: space-between;
	//   flex-flow: row;
	//   vertical-align: top;
	//   background: #DDDDDD;
	//   padding: 1em;
	//   box-sizing: border-box;
	//   border-radius: 9px;
	//   background: radial-gradient(#cccccc, #fbfbfb);
	//   border: 1px solid #DDD !important;
	//   background-position: 0px -92px;
	//   background-repeat: no-repeat;
	//   box-shadow: 0px 2px 3px #00000020;
	//   transition: transform box-shadow 0.2s;
	//   float:right;
	// }
	#TotalHolder {
		max-width: 900px;
		margin: 0px auto;
		display: flex;
		justify-content: flex-end;
		padding-top: 5px;
		#TotalLabel {
			flex: 1 1 100%;
			text-align: left;
			font-weight: bold;
			text-transform: uppercase;
			padding: 15px 30px;
			color: #929292;
		}
		#TotalAmount {
			flex: 0 1 30%;
			background: #dddddd;
			padding: 1em;
			box-sizing: border-box;
			border-radius: 9px;
			background: radial-gradient(#cccccc, #fbfbfb);
			border: 1px solid #ddd;
			background-position: 0px -92px;
			background-repeat: no-repeat;
			box-shadow: 0px 2px 3px #00000020;
			text-align: right;
			font-weight: bold;
			font-size: 18px;
			#TotalAmountText {
				display: inline-block;
			}
		}
	}

	.checkout .fold .tip {
		right: -1px;
		font-size: 10px;
		position:absolute;
	}

	#Checkout {
		// margin-top: -4.5em;
	}
	form {
		display: flex;
		max-width: 900px;
		margin: 2em auto;
		justify-content: space-between;
		transition: opacity 0.84s ease-in-out;

		h1 {
			font-size: 22px;
		}
	}
	#ContactDelivery {
		text-align: left;
		flex: 1 1 50%;
	}

	#ProductSelection {
		box-sizing: border-box;
	}
	#Payment {
		text-align: left;
		flex: 1 1 50%;
		padding-left: 1em;
		border-left: 2px solid #ddd;
		.formControl {
			flex-flow: wrap;
			margin: 1em 0px;
			.input {
				flex: 1 0 100%;
				left: 0px;
				text-align: left;

				input,
				button {
					margin: 0px;
					left: 0px;
					//background: linear-gradient(45deg, #2888c4, #6bb1de);
					background: linear-gradient(186deg, #28c475, #15734c);
					color: #fff;
					width: 100%;
					border: none;
					border-radius: 7px;
					min-height: 50px;
					font-size: 20px;
					text-transform: uppercase;
					cursor: pointer;
					outline: none;
					&:hover {
						opacity: 0.8;
					}
				}
			}
		}
		label {
			flex: 1 0 100%;
		}
		select {
			font-size: 18px;
			min-width: 100%;
		}

		&:hover {
			overflow: visible;
		}
	}

	.terms {
		font-weight: bold;
		text-decoration: underline;
		cursor: pointer;
		&:hover {
			color: #16679c;
		}
	}
	.formControl {
		display: flex;
		justify-content: space-between;
		margin: 1em;
		// max-width: 400px;
		// background: #DDD;

    .select {
      width: calc(100% - 30px);
    }

		label {
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
		span.input {
			text-align: left;
			vertical-align: top;
			flex: 1 1 90%;
		}
    
		input[type="text"],
		input[type="email"],
		input[type="tel"],
		textarea {
			border-radius: 7px;
			border: 1px solid #ddd;
			outline: none;
			padding: 0.15em 1em 0.09em;
			line-height: 2em;
			background: linear-gradient(145deg, #d6eeff, #e9f6ff);
			box-shadow: inset 2px 2px 1px #0000005e;
			color: #2c3e51;
			font-size: 18px;
			font-family: "Avenir", Helvetica, Arial, sans-serif;
			min-width: 210px;
			font-weight: normal;

			&.static {
				border: 1px solid transparent;
				background: none;
				box-shadow: none;
			}

			&::placeholder {
				color: #00000060;
			}
		}

		input[type="submit"],
		button#Submit {
			min-width: 225px;
			margin: 0px auto;
			display: block;
			position: relative;
			left: 3.5em;
			height: 2em;
			min-width: 100%;
			&.loading {
				background: grey !important;
				opacity: 0.7;
			}
			&:disabled {
				background: grey;
				opacity: 0.5;
        pointer-events:none;
			}
		}
	}
	.orderItemHolder {
		padding: 5px 0px;
	}
	.orderItem {
		position: relative;
		overflow: hidden;
		display: flex;
		max-width: 900px;
		margin: 0px auto;
		min-height: 97px;
		justify-content: space-between;
		flex-flow: row;
		vertical-align: top;
		background: #dddddd;
		padding: 1em;
		box-sizing: border-box;
		border-radius: 9px;
		background: radial-gradient(#cccccc, #fbfbfb);
		border: 1px solid #ddd;
		background-position: 0px -92px;
		background-repeat: no-repeat;
		box-shadow: 0px 2px 3px #00000020;
		transition: transform box-shadow 0.2s;

		&:active.onButton {
			perspective: 130px;

			transform-origin: 10% 90%;
			transform: rotate3d(2, 10, 0, 3.5deg);
			box-shadow: -3px 2px 3px #00000020;
		}

		.productInfo {
			flex: 1 1 80%;
			text-align: left;
			vertical-align: top;
			img {
				float: left;
				border: 1px solid #ddd;
				padding: 2px;
				max-height: 50px;
				margin-right: 2em;
				vertical-align: top;
			}
			p.name {
				margin-top: 0.5em;
				margin-bottom: 0px;
				font-weight: bold;
			}
			p.desc {
				font-size: 90%;
				color: #818181;
				margin-top: 0px;
			}
		}
		.productControls {
			flex: 1 1 20%;
			align-self: center;
			user-select: none;
			span {
				min-width: 45px;
				text-align: center;
				display: inline-block;
			}
			em {
				opacity: 0.7;
				cursor: pointer;
				display: inline-block;
				&:hover {
					opacity: 0.5;
				}
				&:active {
					transform: translateY(1px);
				}
			}
		}
		.productPrice {
			display: inline-flex;
			justify-content: flex-end;
			flex-flow: column;
			vertical-align: top;
			align-self: center;
			flex: 1 1 20%;
			text-align: right;
			font-size: 20px;

			.itemTotal {
				display: inline-block;
				transform-origin: 90% 50%;
			}

			.addedCost {
				font-size: 65%;
				color: #929292;
				transform-origin: 90% 50%;
			}
		}
		.close {
			cursor: pointer;
			&:active {
				transform: translateY(0.5px);
				opacity: 0.99;
			}
			&:hover {
				opacity: 0.8;
			}
		}
	}
	#NoItems {
		padding: 0px;
		margin: 0px auto;
		.backToStart {
			cursor: pointer;
			display: inline-block;
			background: #dddddd70;
			padding: 2px 10px;
			border-radius: 10px;
			border: 1px solid #ddd;
			margin: 3px;
			text-transform: uppercase;
			color: #525252;
			font-size: 14px;
			margin-top: 2em;
			margin-bottom: 2em;
			&:hover {
				background: #dddddd30;
			}
			&:active {
				transform: translateY(1px);
				opacity: 0.9;
			}
		}
	}
	.option.selected {
		display: flex;
		align-items: center;
		.info {
			* {
				display: block;
				white-space: nowrap;
			}
		}
	}
	
	.option.selected {
		padding: 3px 10px;
		position: relative;
		top: 2px;
	}
	#Payment #PaySelect {
		margin-bottom: 0em;
    .input {
      position:relative;
      .indicator {
        position:relative;
        bottom:1.5em;
      }
    }
	}
	#Payment #SubSelect {
		position: relative;
		z-index: 99;
		margin-top: 0px;
		.select {
			height: auto;
			.select-styled {
				position: relative;
				&:after,
				&:active:after {
					// top: 1em;
				}
			}
		}

		#SubSelector .option {
			display: inline-flex;
			align-items: center;

			.visual {
				flex: 0 0 55px;
			}
		}
	}

	#TotalHolder {
		max-width: 900px;
		margin: 0px auto;
		display: flex;
		justify-content: flex-end;
		padding-top: 5px;
		#TotalLabel {
			flex: 1 1 100%;
			text-align: left;
			font-weight: bold;
			text-transform: uppercase;
			padding: 15px 30px;
			color: #929292;
		}
		#TotalAmount {
			flex: 0 1 30%;
			background: #dddddd;
			padding: 1em;
			box-sizing: border-box;
			border-radius: 9px;
			background: radial-gradient(#cccccc, #fbfbfb);
			border: 1px solid #ddd;
			background-position: 0px -92px;
			background-repeat: no-repeat;
			box-shadow: 0px 2px 3px #00000020;
			text-align: right;
			font-weight: bold;
			font-size: 18px;
			#TotalAmountText {
				display: inline-block;
			}
		}
	}

	#Loader {
		background: #d4d4d4;
		width: 100%;
		min-height: 30px;
		border-radius: 7px;
		border: 1px solid #ddd;
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
		&:active {
			transform: translateY(1px);
		}
	}

	.orderItem .disable {
		opacity: 0.11 !important;
		pointer-events: none;
		-moz-user-input: disabled;
		-webkit-user-input: disabled;
	}
	label.terms {
		font-size: 15px;
		text-decoration: none;
		input {
			float: left;
			margin-bottom: 2.5em;
			margin-right: 0.5em;
		}
	}

	span.edit {
		position: relative;
		left: 5px;
		top: -2px;
		cursor: pointer;
		font-size: 10px;
		display: inline-block;
		padding: 2px 7px;
		background: #ededed;
		border: 1px solid #929292;
		vertical-align: middle;
		border-radius: 15px;
		color: #828282;
		opacity: 0.73;
		&:hover {
			background: #ddd;
		}
		&:active {
			opacity: 0.63;
			transform: translatey(1px);
		}
	}

	.error {
		color: #dc311f;
		font-size: 12px;
		padding-left: 5px;
		font-weight: bold;
	}
	.indicator {
		margin-left: 0.5em;
		opacity: 0.7;
		img {
			max-width: 1.25em;
		}
	}

  .select[unselected=true] {
    .select-styled {
      border:1px solid red;
    }
  }
</style>