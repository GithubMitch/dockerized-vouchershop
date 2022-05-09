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

const state = reactive ({
  categoryUrl: ref(''),
  selectableCategories: ref<[]>([]),
  selectedSubCategory: ref<[]>([]),
  brands: ref<[]>([]),
  selectableBrands: ref<[]>([]),
  stockProducts: ref<[]>([]),
  selectableProducts: ref<[]>([]),
  selectedProducts: ref<[]>([]),
  selectedBrandProducts: ref<[]>([]),
  productFilter: ref<[]>([]),
  productPage: ref<[]>([]),
  cart: ref<[]>([]),
  topThree: ref<[]>([]),
  selectedBrand: ref(''),
  selectedActionLabel: ref(''),
  selectedGroup: ref(''),
  selectedCategory: ref(''),
  paymentOptions: ref([]),
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
    actions.getPaymentOptions();
    return toRaw(state.selectableProducts);
  },
  async fetchBrandList():Promise<any[]> {
    state.selectableBrands = await $fetch("/api/fetchremotebrandlist");
    return toRaw(state.selectableBrands);
  },
  async fetchStockList() {
    // try{     
      const productsRequest = await $fetch('http://hndxs.test.hand.local:8280/hndxs/v1/online/catalog', { 
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${'HND_ONLINE_VOUCHERSHOP'}:${'vouchershop'}`),
          'posId': '50100004'
        },
        body: {
          reference : "blablabla", // 
          productListRequest : {
          "securityKey" : 'DSFBUHQEWRBV89UWRETHUISFBHOSBGFJBNMGERTGTYYJUR3333'
          }
        }
      });
      return methods.validateStock(productsRequest.responseObject.products);

  },
  async getProduct(_productslug) { // find product in stockproducts
    state.productPage = await state.stockProducts.find(element => element.key == _productslug)
    console.log('Found this product >>>', state.productPage)
    return state.productPage
  },    

  // --------------------------------------------SETTERS------------------------------------------------------
  setCategory(category)  {
    return  (category ? (state.selectedCategory = category, console.log('Set category: ', category)) : (console.log('Didnt set category', category), state.selectedCategory = '', console.log('Reset selectedCategory')))
  },    
  // SUB category
  setSelectedSubCategory(category)  {
    return  (category ? (state.selectedSubCategory = category, console.log('Set subcategory: ', category)) : (console.log('Didnt set subcategory', category), state.selectedSubCategory = '', console.log('Reset selectedSubCategory')))
  },  
  setSelectedBrand(brand)  {
    return (brand ? (state.selectedBrand = brand, console.log('Set selectedBrand: ', brand)) :  (console.log('Didnt set selectedBrand', brand), state.selectedBrand = '', console.log('Reset brand')))
  }, 
  setActionLabel(actionLabel)  {
    return  (actionLabel ? (state.selectedActionLabel = actionLabel, console.log('Set actionLabel: ', actionLabel)) : (console.log('Didnt set actionLabel', actionLabel), state.selectedActionLabel = '', console.log('Reset selectedActionLabel')))
  },      
  setGroup(group)  {
    return  (group ? (state.selectedGroup = group, console.log('Set group: ', group)) : (console.log('Didnt set group', group), state.selectedGroup = '', console.log('Reset selectedGroup')))
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

  getTotalAmountOfAddedCosts() {
    return _(state.order.orderItems).reduce( (sum, i)=>{
      let addedCost = 0;
      return sum + (i.qnt * ( addedCost ));
    } , 0);
  },
  getCartTotal() {
    return  _(state.order.orderItems).reduce( (sum, i)=>{
      let addedCost = 0;
      return sum + (i.qnt * (i.price + addedCost ) );
    } , 0);
  },
  
  async getPaymentOptions() {
    const paymentOpts = await $fetch('http://hndxs.test.hand.local:8280/hndxs/v1/online/paymentmethods', { 
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${'HND_ONLINE_VOUCHERSHOP'}:${'vouchershop'}`),
        'posId': '50100004'
      },
      body: {
        reference : "blablabla", // 
        securityKey : 'DSFBUHQEWRBV89UWRETHUISFBHOSBGFJBNMGERTGTYYJUR3333'
      }
    });
      state.paymentOptions = paymentOpts.responseObject.handpay;

    return state.paymentOptions;
  },
  getPaymethodWithKey(key) {
    return _(state.paymentOptions).findWhere({ key });
  },
  getSubPaymethodWithKey(mainPaymethodKey,key) {
    return _(state.paymentOptions).findWhere({ key });
  },
  getKey(name) {
    if(name != undefined)
      return name.toLowerCase().replace(' ', '_').replace('-', '_');
  },

  reinstateOrder(orderItems){
    state.order.orderItems = orderItems ?? [];                                                                    
  },
  removeCartItem(index){
    state.order.orderItems.splice(index, 1)
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
        break;
      case state.stockProducts:
        state.selectedProducts = []
        console.log('Deselect Products')
        break;
      default:
        console.log(`Oops, The selected part = ${selected}.`);
    }      
  }
}

const methods = {
  // TODO : check if this is correct , and if its used in this project
  async filterActionLabel(stockProducts , actionLabel){
    console.log('Filter ' + actionLabel + 'products in ', stockProducts, );
    const filteredProductList = _.filter((state.stockProducts), function(filteredProduct){ 
      return filteredProduct.actionLabel == actionLabel; 
    });
    console.log(filteredProductList)
    state.productFilter = filteredProductList;
    return toRaw(state.productFilter)
  },

  async filterGroup(stockProducts , group){
    const filteredProductList = _.filter((state.stockProducts), function(filteredProduct){ 
      
      let foundResult = ref();

      if (filteredProduct.group && filteredProduct.group == group) {
        return foundResult.value = filteredProduct.group == group; 
      } else if (Array.isArray(filteredProduct['group'])) {
        console.log(filteredProduct['group'])
        for (let index = 0; index < filteredProduct['group'].length; index++) {
          const element = filteredProduct['group'][index];
          console.log(element == group)
          return foundResult.value = element == group
        }
      }
      console.log(foundResult.value)
      return foundResult.value; 

      });
    console.log(filteredProductList, 'filterdProducts')
    state.selectedBrandProducts = filteredProductList;
    return toRaw(state.selectedBrandProducts)
  },

  validateStock(stockProducts){
    console.log('handling products...');
    const optimizedProductList = _(state.selectableProducts).map( (stockItem) => {
      return {
        ...stockItem,
        inStock : _.chain(stockProducts).findIndex({ean: stockItem.ean }) != -1
      }
    });
    state.stockProducts = optimizedProductList;
    return toRaw(state.stockProducts)
  },

  handlePaymethods(paymethods){
    // improve ... use existing structure and 
    let optimizedPaymethodList = _(paymethods).map( (listedPaymethod) => {
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
      }
    });
    // SET STATE PAYMETHODS
    state.paymentOptions = optimizedPaymethodList
  },
}

export  {state, actions, methods }