import { ref, Ref, reactive, toRaw } from 'vue';
import {_} from 'vue-underscore';

// URL and selected URL for category
// const categoryUrl = ref([]);
// const selectedCategory = ref([]);

//------------------------------------------------
// const protocol = window.location.protocol;
// const domain = window.location.hostname;
// const port = window.location.port;

// Vue.prototype.$origin = protocol + domain + port;

// switch (domain) {
//   case 'localhost':
//     Vue.prototype.$api = 'http://localhost'
//   case '127.0.0.1':
//   case 'vouchershop.prepaidpoint.devv':
//     Vue.prototype.$api = 'http://api.prepaidpoint.test/vouchershop';
//     break;
//   case 'vouchershop.prepaidpoint.test':
//     Vue.prototype.$api = 'http://api.prepaidpoint.test/vouchershop';
//     break;
//   case 'vouchershop.prepaidpoint-preprod.com':
//     Vue.prototype.$api = 'http://api.prepaidpoint-preprod.com/vouchershop';
//     Vue.prototype.$origin = 'https://vouchershop.prepaidpoint-preprod.nl/vouchershop'
//     break;
//   default:
//     Vue.prototype.$api = 'https://api.prepaidpoint.com/vouchershop';
//     break;
// }

const isAbsent = Symbol();

const state = reactive ({
  categoryUrl: ref(''),
  selectableCategories: ref<[]>([]),
  selectedCategory: ref<[]>([]),
  selectedSubCategory: ref<[]>([]),
  brands: ref<[]>([]),
  selectableBrands: ref<[]>([]),
  selectedBrand: ref(''),
  selectedActionLabel: ref(''),
  stockProducts: ref<[]>([]),
  selectableProducts: ref<[]>([]),
  selectedProducts: ref<[]>([]),
  selectedBrandProducts: ref<[]>([]),
  productFilter: ref<[]>([]),
  productPage: ref<[]>([]),
  cart: ref<[]>([]),
  // PAYMENTID = 110
  // SHOPID = 14
  // ISSUERID

  paymentOptions: ref([
  
    {
        "portalPmId": 1,
        "clientid": 1,
        "txPercentageCustomer": 0.001,
        "txAmountClient": 0.4,
        "active": 1,
        "pmsublist": [],
        "pmname": "BanContact",
        "id": 1,
        "validcountry": "NL",
        "txPercentageClient": 0.022,
        "txAmountCustomer": 0.5
    },
    {
        "portalPmId": 2,
        "clientid": 1,
        "txPercentageCustomer": 0.0031,
        "txAmountClient": 0.15,
        "active": 1,
        "pmsublist": [
            {
                "pmsubName": "Van Lanschot",
                "pmsubId": "11"
            },
            {
                "pmsubName": "ABN Amro",
                "pmsubId": "1"
            },
            {
                "pmsubName": "Knab",
                "pmsubId": "12"
            },
            {
                "pmsubName": "Rabobank",
                "pmsubId": "2"
            },
            {
                "pmsubName": "ING",
                "pmsubId": "4"
            },
            {
                "pmsubName": "SNS",
                "pmsubId": "5"
            },
            {
                "pmsubName": "ASN Bank",
                "pmsubId": "8"
            },
            {
                "pmsubName": "RegioBank",
                "pmsubId": "9"
            },
            {
                "pmsubName": "Bunq",
                "pmsubId": "5080"
            },
            {
                "pmsubName": "Svenska Handelsbanken",
                "pmsubId": "5082"
            },
            {
                "pmsubName": "Revolut",
                "pmsubId": "5084"
            },
            {
                "pmsubName": "Triodos Bank",
                "pmsubId": "10"
            }
        ],
        "pmname": "iDeal",
        "id": 2,
        "validcountry": "NL",
        "txPercentageClient": 0.0021,
        "txAmountCustomer": 0.23
    },
    {
        "portalPmId": 3,
        "clientid": 1,
        "txPercentageCustomer": 0,
        "txAmountClient": 0,
        "active": 1,
        "pmsublist": [],
        "pmname": "iDealX",
        "id": 3,
        "validcountry": "NL",
        "txPercentageClient": 0,
        "txAmountCustomer": 0
    },
    {
        "portalPmId": 4,
        "clientid": 1,
        "txPercentageCustomer": 0,
        "txAmountClient": 0,
        "active": 1,
        "pmsublist": [],
        "pmname": "PaySafeCard",
        "id": 4,
        "validcountry": "NL*BE",
        "txPercentageClient": 0,
        "txAmountCustomer": 0
    }
    
    // { name: 'iDEAL', label: 'iDEAL', img: '@/assets/logos/paymethods/ideal.png' , key: 'ideal', desc: 'internet bankieren',
    //   subSelect: [
    //     {name: 'ING',       label: 'ING', key: 'ing', order: 1},
    //     {name: 'ABN AMRO',  label: 'ABN AMRO', key: 'abn_amro', order: 2},
    //     {name: 'Rabobank',  label: 'Rabobank', key: 'rabobank', order: 3},
    //     {name: 'Knab',      label: 'Knab', key: 'knab', order: 4},
    //     {name: 'Bunq',      label: 'Bunq', key: 'bunq', order: 5},
    //     {name: 'ASN Bank',  label: 'ASN Bank', key: 'asn_bank',order: 6},
    //     {name: 'Moneyou',   label: 'Moneyou', key: 'moneyou', order: 7},
    //     {name: 'Regio Bank',label: 'Regio Bank', key: 'regiobank', order: 8},
    //     {name: 'SNS',       label: 'SNS', key: 'sns', order: 9},
    //     {name: 'Triodos Bank',  label: 'Triodos Bank', key: 'triodos_bank', order: 10},
    //     {name: 'van Lanschot',  label: 'van Lanschot', key: 'van_lanschot', order: 11},
    //     {name: 'Frysche Bank',  label: 'Frysche Bank', key: 'frysche_bank', order: 12},
    //     {name: 'Handels Banken',label: 'Handels Banken', key: 'handels_banken', order: 13},
    //   ]
    // },
    // {name: 'Sofort', label: 'Sofort', img: '@/assets/logos/paymethods/sofort.png'  , key: 'sofort', desc: 'internet bankieren'},
    // // {name: 'Klarna', img:'' , key: 'klarna', id: '8711', desc: 'Betalen waneer jij wilt.'},
    // {name: 'Paypal', label: 'Paypal', img: '@/assets/logos/paymethods/paypal.png'  , key: 'paypal', desc: 'online payments'},
  ]),
  order: ref({
    selectedCategory: null,
    selectedBrand: null,
    name: null,
    mobile: null,
    email: null,
    confirmed: null,
    orderItems: [],
  })

})

const actions = {
  // ----------------------------------------FETCH EXTERNALS - handled by server/api (directory in root)--------------------------------------------------
  async fetchProductList():Promise<any[]> {
    state.selectableProducts = await $fetch("/api/fetchremoteproductlist");
      // products.value = await $fetch("/api/fetchremoteproductlist");
      // console.log("Fetched product list")
      // products.value = response;
      // const nintendo = {
      //   "ean": "8712421040666",
      //   "value": 5000,
      //   "brand": "nintendo",
      //   "price": 5000,
      //   "inStock": true,
      //   "key": "nintendo50",
      //   "name": "NINTENDO €50",
      //   "actionLabel": "kids",
      //   "cat": "gaming"
      // }
      // state.selectableProducts.push(nintendo)
      console.log('Product list fetched :.... \n', state.selectableProducts );
      // console.trace()

    return toRaw(state.selectableProducts);
  },
  async fetchBrandList():Promise<any[]> {
    state.selectableBrands = await $fetch("/api/fetchremotebrandlist");
    // brands.value = await $fetch("/api/fetchremotebrandlist");
      // console.log("Fetched brand list")
    // brands.value = response;
      // console.log('Brand list fetched :....\n', state.brands ); // Gives non reactive-data instead of proxy : toRaw(brands.value)
      // const nintendo = {
      //   "key": 'nintendo',
      //   "label": "Nintendo",
      // }
      // state.selectableBrands.push(nintendo)
      console.log('Brands list fetched :.... \n', state.selectableBrands );

    return toRaw(state.selectableBrands);
  },
  async fetchStockList() {
    // try{
      console.log('productsRequest ');

      let productsRequest = await $fetch('http://api.prepaidpoint.test/vouchershop/productlist', { method: 'POST'});
      console.log('productsRequest ',productsRequest);
      // const nintendo = {
      //   "ean": "8712421040666",
      //   "value": 5000,
      //   "brand": "nintendo",
      //   "price": 5000,
      //   "inStock": true,
      //   "key": "nintendo50",
      //   "name": "NINTENDO €50",
      //   "actionLabel": "kids",
      //   "cat": "gaming"
      // }

      // productsRequest.products.push(nintendo)
      // methods.validateStock(productsRequest.products);
      return methods.validateStock(productsRequest.products);
    // }catch(e){
    //   console.log('Fetchstocklist has following error:');
    //   console.log(e);
    //   return e
    // }      
  },
  async getProduct(_productslug) { // find product in stockproducts
    state.productPage = await state.stockProducts.find(element => element.key == _productslug)
    console.log('Found this product >>>', state.productPage)
    return state.productPage
  },    

  // --------------------------------------------SETTERS------------------------------------------------------
  setCategory(category)  {
    return  (category ? (state.selectedCategory = category, console.log('Set category: ', category)) : console.log('Didnt set category', category))
            // (category ? (categoryUrl.value = category, console.log('Set category: ', category)) : console.log('Didnt set category', category)) 
  },    
  // SUB category
  setSelectedSubCategory(category)  {
    return  (category ? (state.selectedSubCategory = category, console.log('Set subcategory: ', category)) : console.log('Didnt set subcategory', category))
            // (category ? (categoryUrl.value = category, console.log('Set category: ', category)) : console.log('Didnt set category', category)) 
  },  
  setSelectedBrand(brand)  {
    
    // state.selectedBrandProducts = _(state.stockProducts).filter({brand: brand, inStock: true});
     // console.trace()
    return (brand ? (state.selectedBrand = brand, console.log('Set selectedBrand: ', brand)) : console.log('Didnt set selectedBrand', brand))
  }, 
  setActionLabel(actionLabel)  {
    return  (actionLabel ? (state.selectedActionLabel = actionLabel, console.log('Set actionLabel: ', actionLabel)) : console.log('Didnt set actionLabel', actionLabel))
            // (category ? (categoryUrl.value = category, console.log('Set category: ', category)) : console.log('Didnt set category', category)) 
  },       
  async addProducts(product) {
    let foundProduct = await state.order.orderItems.find(element => element.ean == product.ean)
    let windowAlertMsg;
    let maxQnt;
    if(foundProduct) {
      console.log("FN FOUND =>", foundProduct)
      if (foundProduct.qnt < 4 ) {
        product.new = false
        foundProduct.qnt++
        console.log(foundProduct.qnt) 
      } else {
        console.log('4 is max !!!!')
        maxQnt = 4
        let windowAlertMsg = window.alert('Max 4 of the same product')
        product.new = false
        console.log(foundProduct.qnt) 
      }
    }else {
      product.new = true;
      product.qnt = product.qnt ?? 1;
      console.log("FN NOT FOUND ->", foundProduct)
    }

    let orderItem = product;
    
    console.log(product.new == true )
    if (product.new == true) {
      console.log('Adding product')
      state.order.orderItems.push(orderItem)
      console.log('Products added', state.order.orderItems)
    }

    if (maxQnt = 4) {
      return windowAlertMsg
    } else {
      return
    }

  },
  async setProductPage(product) {
    if (product.key) {
      state.productPage = product
    } else {
      let thisProduct = await state.stockProducts.find(element => element.key == product)
      state.productPage = thisProduct
    }
    console.log('Set:', state.productPage)
    return state.productPage
  },
  // setStockProducts(products)  {
  //   return (products ? (state.selectedBrand = brand, console.log('Set selectedBrand: ', brand)) : console.log('Didnt set selectedBrand', brand))
  // },


  getTotalAmountOfAddedCosts() {
    return _(state.order.orderItems).reduce( (sum, i)=>{
      // let addedCost = i.product.addedCost != undefined ? i.product.addedCost : 0;
      let addedCost = 0;
      return sum + (i.qnt * ( addedCost ));
    } , 0);
  },
  getCartTotal() {
    // if (state.order.orderItems[0]) { console.log('orderitems',state.order.orderItems) }
  

    return  _(state.order.orderItems).reduce( (sum, i)=>{
      // let addedCost = i.product.addedCost != undefined ? i.product.addedCost : 0;
      let addedCost = 0;
      // console.log(sum + (i.qnt * (i.product.price + addedCost )))
      return sum + (i.qnt * (i.price + addedCost ) );
    } , 0);
  },
  
  async getPaymentOptions() {
      // let paymentOpts = await $fetch('http://10.226.80.105:8080/handpay/rest/client/pm?clientid=1&onlyactive=true', {
      let paymentOpts = await $fetch('http://api.prepaidpoint.test/vouchershop/paymentoptions', {
        method: 'POST',
      })
      console.log('PAYMENT METHODS',paymentOpts)
      state.paymentOptions = paymentOpts;

    return state.paymentOptions;
  },
  getPaymethodWithKey(key) {
    return _(state.paymentOptions).findWhere({ key });
  },
  getSubPaymethodWithKey(mainPaymethodKey,key) {
    return _(state.paymentOptions).findWhere({ key });
  },
  getKey(name) {
    // console.log('converting...', name , '->', name.toLowerCase().replace(' ', '').replace('-', '').replace('_', '') );

    if(name != undefined)
      return name.toLowerCase().replace(' ', '_').replace('-', '_');
  },

  reinstateOrder(orderItems){
    // console.log(state.order.orderItems, '->', orderItems);
    state.order.orderItems = orderItems ?? [];                                                                    
  },
  removeCartItem(index){
    state.order.orderItems.splice(index, 1)
    // state.order.orderItems[index]  
    // Vue.delete(state.order.orderItems,index);
  },
  increaseQnt(index){
    if(state.order.orderItems[index].qnt < 4)
      state.order.orderItems[index].qnt++;
  },
  decreaseQnt(index){
    if(state.order.orderItems[index].qnt > 1)
      state.order.orderItems[index].qnt--;
  },
  emptyCart(state){
    state.order.orderItems = [];
  },
  deselect(selected) {
    switch (selected) {
      case (state.brands):
        // state.selectedBrand = [];
        break;
      case state.stockProducts:
        state.selectedProducts = []
        console.log('Deselect Products')
        break;
      case 'Papayas':
        console.log('Mangoes and papayas are $2.79 a pound.');
        // expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      default:
        console.log(`Oops, The selected part = ${selected}.`);
    }      
  }
}

const methods = {

  async filterActionLabel(stockProducts , actionLabel){
    console.log('Filter ' + actionLabel + 'products in ', stockProducts, );
    const filteredProductList = _.filter((state.stockProducts), function(filteredProduct){ 
      return filteredProduct.actionLabel == actionLabel; 
    });
    console.log(filteredProductList)
    state.productFilter = filteredProductList;
    return toRaw(state.productFilter)
  },

  validateStock(stockProducts){
    console.log('handling products...');
    // console.trace();
    const optimizedProductList = _(state.selectableProducts).map( (stockItem) => {
      return {
        ...stockItem,
        inStock : _.chain(stockProducts).findIndex({ean: stockItem.ean }) != -1
      }
    });
    console.log('optimizedProductList >>>>',optimizedProductList)
    state.stockProducts = optimizedProductList;
    return toRaw(state.stockProducts)
  },

  handlePaymethods(paymethods){
    // improve ... use existing structure and 
    let optimizedPaymethodList = _(paymethods).map( (listedPaymethod) => {
      // console.log(listedPaymethod);
      let key = actions.getKey(listedPaymethod.pmname);
      return {
        name: listedPaymethod.pmname,
        label: listedPaymethod.pmname,
        key,
        id: listedPaymethod.portalPmId,
        desc: 'betaal online',
        subSelect: _.chain(listedPaymethod.pmsublist)
                    .map( subPayment => {
                      let subKey = actions.getKey(subPayment.pmsubName);
                      return {
                        name: subPayment.pmsubName, 
                        label: subPayment.pmsubName,
                        key: subKey, 
                        id: subPayment.pmsubId,
                        sort: parseInt(subPayment.pmsubId),
                      }
                    })
                    .sortBy('sort')
                    .value()
        ,
      } // return
    });
    // SET STATE PAYMETHODS
    // commit('SET_PAYMETHODS', optimizedPaymethodList);
    state.paymentOptions = optimizedPaymethodList
  },
}
const computed = {
  // activeUsers: function() {
  //   return users.filter(function(u) {
  //     return u.active
  //   })
  // }
}

export  {state, actions, methods , isAbsent}