import {ref, Ref, reactive, toRaw, computed} from 'vue';
import {_} from 'vue-underscore';

// URL and selected URL for category
const categoryUrl = ref([]);
const selectedCategory = ref([]);

// List of selectable products 
const selectableBrands = ref<[]>([]);
const selectableProducts = ref<[]>([]);
const detailPageProduct = ref<[]>([]);

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

// router
const router = useRouter()
const route = useRoute()
const newPath = ref()

const isAbsent = Symbol();

const state = reactive ({
  categoryUrl: ref<[]>([]),
  selectedCategory: ref<[]>([]),
  brands: ref<[]>([]),
  selectableBrands: ref<[]>([]),
  selectedBrand: ref<[]>([]),
  stockProducts: ref<[]>([]),
  selectableProducts: ref<[]>([]),
  selectedProducts: ref<[]>([]),
  selectedBrandProducts: ref<[]>([]),
  detailPageProduct: ref<[]>([]),
})

const actions = {
  // ----------------------------------------FETCH EXTERNALS - handled by server/api (directory in root)--------------------------------------------------
  async fetchProductList():Promise<any[]> {
    state.selectableProducts = await $fetch("/api/fetchremoteproductlist");
    // products.value = await $fetch("/api/fetchremoteproductlist");
      // console.log("Fetched product list")
    // products.value = response;
      // console.log('Product list fetched :.... \n', state.products );
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
      // console.log('productsRequest',productsRequest.products)
      // methods.validateStock(productsRequest.products);
      return methods.validateStock(productsRequest.products);
    }catch(e){
      console.log('Initiate gracefull shutdown');
      console.log(e);
      return e
    }      
  },


  // --------------------------------------------SETTERS------------------------------------------------------
  setCategory(category)  {
    return  (category ? (state.selectedCategory = category, console.log('Set category: ', category)) : console.log('Didnt set category', category))
            // (category ? (categoryUrl.value = category, console.log('Set category: ', category)) : console.log('Didnt set category', category)) 
      
  },  
  setSelectedBrand(brand)  {
    return (brand ? (state.selectedBrand = brand, console.log('Set selectedBrand: ', brand)) : console.log('Didnt set selectedBrand', brand))
  },  
  addProducts(product) {
    return (product ? (
      state.selectedProducts.push(product),
      console.log('Set selectedProducts: ', product)
      ) : console.log('Didnt set selectedProducts', product))
  },
  setdetailPageProduct(product) {
    state.detailPageProduct = product
    console.log('Set:', state.detailPageProduct)
    return state.detailPageProduct
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

export  {state, actions, methods , isAbsent}