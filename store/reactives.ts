import { ref, Ref, reactive, toRaw } from 'vue';
import {_} from 'vue-underscore';

const state = reactive ({

  // False = app still fetching stock
  setupAppReady : ref(false),

  // router check
  hasHistory:ref(false),

  // MenuStates
  activeSideMenu : ref(false),
  activeCategoryMenu : ref(false),

  //filters
  brand: ref(''),
  group: ref(''),
  actionLabel: ref(''),

  //database brand and product list , stockproducts = altered 
  brands: ref<{}>([]),  // default from DynamoDB
  products: ref<{}>([]), // default from DynamoDB

  // real time stock
  stockProducts: ref<{}>([]), // imported from H@nd API
  filteredProductList: ref<{}>([]), 
  paymentOptions: ref<{}>([]),
  productPage: ref<{}>([]),
  topThree: ref<[]>([]),
  allProducts: ref<{}>([]), //if needed or testing

  giftCards:ref<[]>([]), // filtered blackhawk products

  cart: ref<[]>([]),
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
    let products = await $fetch("/api/fetchRemoteProductList");
    state.products = products;
    // console.log({products})
    actions.getPaymentOptions();
    return toRaw(products);
  },
  async fetchBrandList():Promise<any[]> {
    let brands = await $fetch("/api/fetchRemoteBrandList");
    state.brands = brands;
    // console.log({brands})
    return toRaw(brands);
  },
  async fetchStockList() {
    let stock = await $fetch("/api/fetchStockList", {method: 'POST'});
    // console.log({stock})
    // state.allProducts = stock
    // return methods.validateStock(stock);
    methods.validateStock(stock);
    return state.allProducts = stock
  },
  async getPaymentOptions() {
    let payOpts = await $fetch("/api/fetchPayMethods", {method: 'POST'});
    // console.log({payOpts});
    return state.paymentOptions = payOpts;
    // return
  },
  async submitOrder(orderPayload) {
    console.log(orderPayload)
    let submitOrder = await $fetch("/api/submitOrder", {method: 'POST', body: orderPayload});
    return submitOrder
  },
  async orderStatus(orderPayload) {
    console.log(orderPayload)
    let orderstatus = await $fetch("/api/orderStatus", {method: 'POST', body: orderPayload});
    return orderstatus
  },
  async sendEmail(orderPayload) {
    console.log(orderPayload)
    let sendEmail = await $fetch("/api/sendEmail", {method: 'POST', body: orderPayload});
    return sendEmail
  },
  async sendQuestion(orderPayload) {
    console.log(orderPayload)
    let sendQuestion = await $fetch("/api/sendQueestion", {method: 'POST', body: orderPayload});
    return sendQuestion
  },
  async getProduct(_productslug) { // find product in stockproducts
    let product = state.stockProducts.find(element => element.key == _productslug)
    let thisProductDetails = state.allProducts.find(element => element.ean == product.ean)
    state.productPage = {product,thisProductDetails}
    // console.log('Found this product >>>', state.productPage)
    // console.log('Belonging details >>>', thisProductDetails)
    return state.productPage
  },    

  // --------------------------------------------SETTERS------------------------------------------------------
  setSelectedBrand(brand)  {
    console.log({brand})
    if (!brand.key) {
      actions.getOperatorCodeWithBrand(brand)
      methods.filterBrand(brand)
    } else {
      state.brand = brand
      methods.filterBrand(brand.key)
    }
    // if (brand.key) {
    //   state.brand = brand.key
    //   methods.filterBrand(brand.key);
    // } else {
    //   state.brand = brand
    // }
    // (brand ? (state.brand = brand, console.log('Set selectedBrand: ', brand)) :  (console.log('Didnt set selectedBrand', brand), state.brand = '', console.log('Reset brand')))
    return state.brand
  }, 
  setActionLabel(actionLabel)  {
    methods.filterActionLabel(actionLabel);
    return  (actionLabel ? (state.actionLabel = actionLabel, console.log('Set actionLabel: ', actionLabel)) : (console.log('Didnt set actionLabel', actionLabel), state.actionLabel = '', console.log('Reset selectedActionLabel')))
  },      
  setGroup(group)  {
    methods.filterGroup(group);
    return  (group ? (state.group = group, console.log('Set group: ', group)) : (console.log('Didnt set group', group), state.group = '', console.log('Reset selectedGroup')))
  },         
  setCategory(category)  {
    // return  (category ? (state.category = category, console.log('Set group: ', category)) : (console.log('Didnt set group', category), state.category = '', console.log('Reset selected category')))
    return
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
      let thisProductDetails = state.allProducts.find(element => element.ean == product.ean)
      
      state.productPage = {product , thisProductDetails}
      console.log('details:', thisProductDetails)
    } else {
      let thisProduct = state.stockProducts.find(element => element.key == product)
      let thisProductDetails = state.allProducts.find(element => element.ean == product.ean)
      state.productPage = {thisProduct, thisProductDetails}
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
  async getOperatorCodeWithBrand(brand) {
    // console.log(brand, 'getCodewith Brand >>> FIND!')
    // state.brand = state.brands.find(element => element.key == brand);
    console.log(state.brands.find(element => element.key == brand), 'getOperatorCodeWithBrand()')
    return state.brand = state.brands.find(element => element.key == brand);
  },

  reinstateOrder(orderItems){
    console.log('%c[REINSTATE ORDER]:','background: #bad455; color:lightgreen')
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
        console.log('Deselect Products')
        break;
      default:
        console.log(`Oops, The selected part = ${selected}.`);
    }      
  }
}

const methods = {
  async filterActionLabel(actionLabel){
    console.log('Filter ' + actionLabel + 'products in ' );
    const filteredProductList = _.filter((state.stockProducts), function(filteredProduct){ 
      return filteredProduct.actionLabel == actionLabel; 
    });
    state.filteredProductList = filteredProductList;
    return toRaw(state.filteredProductList)
  },
  async filterOperatorCode(operatorcode){
    // brands.key
    // brands.operator
    // operator blackhawk = 5928 

    console.log('Filter ' + operatorcode + ' products' );
    const filteredProductList = _.filter((state.stockProducts), function(filteredProduct){ 
      return filteredProduct.brand == operatorcode; 
    });
    // console.log(filteredProductList, 'filteredProductList')
    state.filteredProductList = filteredProductList;
    return toRaw(state.filteredProductList)
  },
  filterBrand(brand){
    console.log('Filter ' + `${brand}` + ' products' );
    const filteredProductList = _.filter((state.stockProducts), function(filteredProduct){ 
        return filteredProduct.brand == brand; 
    });
    // console.log(filteredProductList, 'filteredProductList')
    state.filteredProductList = filteredProductList;
    return toRaw(state.filteredProductList)
  },
  async filterGroup(group){
    const filteredProductList = _.filter((state.stockProducts), function(filteredProduct){ 
      
      let foundResult = ref();

      if (filteredProduct.group && filteredProduct.group == group) {
        return foundResult.value = filteredProduct.group == group; 
      } else if (Array.isArray(filteredProduct['group'])) {
        // console.log(filteredProduct['group'])
        for (let index = 0; index < filteredProduct['group'].length; index++) {
          const element = filteredProduct['group'][index];
          // console.log(element == group)
          return foundResult.value = element == group
        }
      }
        if (foundResult.value !== undefined) {
          console.log(foundResult.value)
        }
          
      return foundResult.value; 

      });
    // console.log(filteredProductList, 'filterdProductList')
    state.filteredProductList = filteredProductList;
    return toRaw(state.filteredProductList)
  },

  validateStock(stockProducts){
    console.log('handling products...');
    const optimizedProductList = _(state.products).map( (stockItem) => {
      return {
        ...stockItem,
        inStock : _.chain(stockProducts).findIndex({ean: stockItem.ean }) != -1
      }
    });
    state.stockProducts = optimizedProductList;
    if (state.brand) {
      // console.log(state.brand)
    }
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

  // * * * * * * * * * * * * ///
 // * * * *   TODO   * * * * ///
// * * * * ///* * * * * * * ///
// RESPONSIVE DESIGN 
//0 ****. CHECK SIDEMENU , CLICK ON LINKS > ROUTE TO CORRECT VIEWS / PARAMS ETC 

//1. CHECK ALL OUTGOING PARAMS  ( REMOVE DEFAULT VALUES LIKE MY OWN MAIL )
//2. terug knop fixed maken scrolldown
//3. GroupFilters for all categorys except beltegoed has brands ( if statement or categorie component render)
//4. Check empty lists , display msg nothing found or no products atm.

// CHOICES
// CHECK NOT IN STOCK BUTTON (adding product while not in stock) - disable button - needs safeguarding *?
//1. Style GiftCards ? add-products (animation)
//3 ** Maybe take instructions and put into brand/operator/list - array :: IF instructions are based on brand only & not specific products


// *** SEO OPTIMIZATION 
  // SET SEO TAGS
  // CORRECT PAGETITLES 
  // CHECK LAYOUTS

// 

export  {state, actions, methods }