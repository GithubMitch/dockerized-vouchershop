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
  paymentOptions: ref([
    { name: 'iDEAL', label: 'iDEAL', img: '@/assets/logos/paymethods/ideal.png' , key: 'ideal', desc: 'internet bankieren',
      subSelect: [
        {name: 'ING',       label: 'ING', key: 'ing', order: 1},
        {name: 'ABN AMRO',  label: 'ABN AMRO', key: 'abn_amro', order: 2},
        {name: 'Rabobank',  label: 'Rabobank', key: 'rabobank', order: 3},
        {name: 'Knab',      label: 'Knab', key: 'knab', order: 4},
        {name: 'Bunq',      label: 'Bunq', key: 'bunq', order: 5},
        {name: 'ASN Bank',  label: 'ASN Bank', key: 'asn_bank',order: 6},
        {name: 'Moneyou',   label: 'Moneyou', key: 'moneyou', order: 7},
        {name: 'Regio Bank',label: 'Regio Bank', key: 'regiobank', order: 8},
        {name: 'SNS',       label: 'SNS', key: 'sns', order: 9},
        {name: 'Triodos Bank',  label: 'Triodos Bank', key: 'triodos_bank', order: 10},
        {name: 'van Lanschot',  label: 'van Lanschot', key: 'van_lanschot', order: 11},
        {name: 'Frysche Bank',  label: 'Frysche Bank', key: 'frysche_bank', order: 12},
        {name: 'Handels Banken',label: 'Handels Banken', key: 'handels_banken', order: 13},
      ]
    },
    {name: 'Sofort', label: 'Sofort', img: '@/assets/logos/paymethods/sofort.png'  , key: 'sofort', desc: 'internet bankieren'},
    // {name: 'Klarna', img:'' , key: 'klarna', id: '8711', desc: 'Betalen waneer jij wilt.'},
    {name: 'Paypal', label: 'Paypal', img: '@/assets/logos/paymethods/paypal.png'  , key: 'paypal', desc: 'online payments'},
  ]),
  order: ref({
    selectedCategory: null,
    selectedBrand: null,
    orderItems: [],
    name: null,
    mobile: null,
    email: null,
    confirmed: null,
  })

})

const actions = {
  // ----------------------------------------FETCH EXTERNALS - handled by server/api (directory in root)--------------------------------------------------
  async fetchProductList():Promise<any[]> {
    state.selectableProducts = await $fetch("/api/fetchremoteproductlist");
    // products.value = await $fetch("/api/fetchremoteproductlist");
      // console.log("Fetched product list")
    // products.value = response;
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
    return toRaw(state.selectableBrands);
  },
  async fetchStockList() {
    try{
      let productsRequest = await $fetch('http://api.prepaidpoint.test/vouchershop/products', { method: 'POST'});
      console.log('productsRequest',productsRequest.products);
      // methods.validateStock(productsRequest.products);
      return methods.validateStock(productsRequest.products);
    }catch(e){
      console.log('Fetchstocklist has following error:');
      console.log(e);
      return e
    }      
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
  addProducts(product) {
    // product.qnt = 1;
    // product.new = true
    // state.order.orderItems.push({product});
    let orderItem = { product, qnt: product.qnt ?? 1 , new: true };
    console.log(state.order.orderItems)
    return state.order.orderItems.push(orderItem);
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
      let addedCost = i.product.addedCost != undefined ? i.product.addedCost : 0;
      return sum + (i.qnt * ( addedCost ));
    } , 0);
  },
  getCartTotal() {
    if (state.order.orderItems[0]) {
      console.log('orderitems',state.order.orderItems)

    }
    return  _(state.order.orderItems).reduce( (sum, i)=>{
      let addedCost = i.product.addedCost != undefined ? i.product.addedCost : 0;
      console.log(sum + (i.qnt * (i.product.price + addedCost )))
      return sum + (i.qnt * (i.product.price + addedCost ) );
    } , 0);
  },
  getPaymentOptions() {
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
    // console.log('handling products...');
    const optimizedProductList = _(state.selectableProducts).map( (stockItem) => {
      return {
        ...stockItem,
        inStock : _(stockProducts).findIndex({ean: stockItem.ean }) != -1
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
    state.paymentOptions = optimizedPaymethodList.value
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