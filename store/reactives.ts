import {ref, Ref, reactive, toRaw } from 'vue';
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
  stockProducts: ref<[]>([]),
  selectableProducts: ref<[]>([]),
  selectedProducts: ref<[]>([]),
  selectedBrandProducts: ref<[]>([]),
  productFilter: ref<[]>([]),
  productPage: ref<[]>([]),
  
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
  addProducts(product) {
    return (product ? (
      state.selectedProducts.push(product),
      console.log('Set selectedProducts: ', product)
      ) : console.log('Didnt set selectedProducts', product))
  },
  async setProductPage(product) {
    if (product.key) {
      state.productPage = product
    } else {
      let product = await state.stockProducts.find(element => element.key == product)
      state.productPage = product
    }
    console.log('Set:', state.productPage)
    return state.productPage
  },
  // setStockProducts(products)  {
  //   return (products ? (state.selectedBrand = brand, console.log('Set selectedBrand: ', brand)) : console.log('Didnt set selectedBrand', brand))
  // },
  deselect(selected) {
    switch (selected) {
      case (state.brands):
        state.selectedBrand = [];
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

  async filterProducts(stockProducts){
    // console.log('handling products...');
    const filteredProductList = _.filter((state.stockProducts), function(filteredProduct){ 
    
      return filteredProduct.brand == 'tmobile'; 
    });
    console.log(filteredProductList)
    // const filteredProductList = await _(state.stockProducts).map( (filteredProduct) => {
    //   return {
    //     ...filteredProduct,
    //     actionLabel : _(stockProducts).findIndex({ean: filteredProduct.ean }) != -1
    //   }
    // });
    state.productFilter = filteredProductList;
    console.log(filteredProductList)
    return toRaw(state.productFilter)
  },

  async validateStock(stockProducts){
    // console.log('handling products...');
    const optimizedProductList = await _(state.selectableProducts).map( (stockItem) => {
      return {
        ...stockItem,
        inStock : _(stockProducts).findIndex({ean: stockItem.ean }) != -1
      }
      
    });
    // console.log('optimizedProductList >>>>',optimizedProductList)
    state.stockProducts = optimizedProductList;
    return toRaw(state.stockProducts)
  }
}
const computed = {
  // activeUsers: function() {
  //   return users.filter(function(u) {
  //     return u.active
  //   })
  // }
}

export  {state, actions, methods , isAbsent}