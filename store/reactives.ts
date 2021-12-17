import {ref, Ref, reactive, toRaw, computed} from 'vue';

// URL and selected URL for category
const categoryUrl = ref([]);
const selectedCategory = ref([]);

// List of selectable products 
const selectableBrands = ref<[]>([]);
const selectableProducts = ref<[]>([]);

const state = reactive ({
  products: ref<[]>([]),
  brands: ref<[]>([]),
  categoryUrl: ref<[]>([]),
  selectedCategory: ref<[]>([]),
  selectedBrand: ref<[]>([]),
  selectedProducts: ref<[]>([]),
  catalog: ref<[]>([]),
  selectableBrands: ref<[]>([]),
  selectableProducts: ref<[]>([]),


})

let actions = {
  // ----------------------------------------FETCH EXTERNALS - handled by server/api (directory in root)--------------------------------------------------
  async fetchProductList():Promise<any[]> {
    state.products = await $fetch("/api/fetchremoteproductlist");
    // products.value = await $fetch("/api/fetchremoteproductlist");
      // console.log("Fetched product list")
    // products.value = response;
      console.log('Product list fetched :.... \n', state.products );
      // console.trace()

    return toRaw(state.products);
  },
  async fetchBrandList():Promise<any[]> {
    state.brands = await $fetch("/api/fetchremotebrandlist");
    // brands.value = await $fetch("/api/fetchremotebrandlist");
      // console.log("Fetched brand list")
    // brands.value = response;
      console.log('Brand list fetched :....\n', state.brands ); // Gives non reactive-data instead of proxy : toRaw(brands.value) 
    return toRaw(state.brands);
  },
  // --------------------------------------------SETTERS------------------------------------------------------
  setCategory(category)  {
    return  (category ? (state.selectedCategory = category, console.log('Set category: ', category)) : console.log('Didnt set category', category))
            // (category ? (categoryUrl.value = category, console.log('Set category: ', category)) : console.log('Didnt set category', category)) 
      
  },  
  setSelectedBrand(brand)  {
    return (brand ? (state.selectedBrand = brand, console.log('Set selectedBrand: ', brand)) : console.log('Didnt set selectedBrand', brand))
  },
  setSelectedProducts(product) {
    return (product ? (
      state.selectedProducts.push(product),
      console.log('Set selectedProducts: ', product)
    ) : console.log('Didnt set selectedProducts', product))
  }
},

catalog:[
  // Topups
  { key: 'kpn', name: 'KPN', img: './assets/logos/kpn_big.png' , bigImg: './assets/logos/kpn_big.png', category: ['topups', 'couples'], actionLabel: 'opwaarderen', color: '#5d943d',
    products :[
      { brand: 'kpn', key: 'kpn10', ean: '8712421045820', price: 1000, value: 1000, name: 'KPN €10', img: './assets/logos/kpn_big.png',  actionLabel: 'opwaarderen', inStock: null, group: 'him' },
      { brand: 'kpn', key: 'kpn15', ean: '8712421056901', price: 1500, value: 1500, name: 'KPN €15', img: './assets/logos/kpn_big.png',  actionLabel: 'opwaarderen', inStock: null },
      { brand: 'kpn', key: 'kpn20', ean: '8712421040443', price: 2000, value: 2000, name: 'KPN €20', img: './assets/logos/kpn_big.png',  actionLabel: 'opwaarderen', inStock: null },
      { brand: 'kpn', key: 'kpn30', ean: '8712421074141', price: 3000, value: 3000, name: 'KPN €30', img: './assets/logos/kpn_big.png',  actionLabel: 'opwaarderen', inStock: null, group: 'him' },
  ]},

  { key: 'voda', name: 'Vodafone', img: './assets/logos/vodafone_big.png' , bigImg: './assets/logos/vodafone_big.png', category: ['topups', 'couples'], actionLabel: 'opwaarderen', color: 'red',
    products: [
      { brand: 'voda', key: 'vodafone10', ean: 'xxx', price: 1000, value: 1000, name: 'Vodafone €10', img: './assets/logos/vodafone_big.png',  actionLabel: 'opwaarderen', inStock: null },
      { brand: 'voda', key: 'vodafone20', ean: '8715557006178', price: 2000, value: 2000, name: 'Vodafone €20', img: './assets/logos/vodafone_big.png',  actionLabel: 'opwaarderen', inStock: null },
      { brand: 'voda', key: 'vodafone30', ean: '8715557006185', price: 3000, value: 3000, name: 'Vodafone €30', img: './assets/logos/vodafone_big.png',  actionLabel: 'opwaarderen', inStock: null },
      { brand: 'voda', key: 'vodafone40', ean: '8715557006192', price: 4000, value: 4000, name: 'Vodafone €40', img: './assets/logos/vodafone_big.png',  actionLabel: 'opwaarderen', inStock: null },
  ]},

  { key: 'tmobile', name: 'T-Mobile', img: './assets/logos/tmobile_big.png' , bigImg: './assets/logos/tmobile_big.png', category: ['topups', 'her'], actionLabel: 'opwaarderen', color: '#e3007a',
    products: [
      { brand: 'tmobile', key: 'tmobile10', ean: '8715872000493', price: 1000, value: 1000, name: 'T-mobile €10', img: './assets/logos/tmobile_big.png',  actionLabel: 'opwaarderen', inStock: null },
      { brand: 'tmobile', key: 'tmobile20', ean: '8715872000578', price: 2000, value: 2000, name: 'T-mobile €20', img: './assets/logos/tmobile_big.png',  actionLabel: 'opwaarderen', inStock: null },
  ]},

  { key: 'lebara', name: 'Lebara', img: './assets/logos/lebara_big.png', bigImg: './assets/logos/lebara_big.png', category: ['topups', 'him'], actionLabel: 'opwaarderen', color: '#01a6eb',
    products: [
      { brand: 'lebara', key: 'lebara10', ean: '8717472240033', price: 1000, value: 1000, name: 'Lebara €10', img: './assets/logos/lebara_big.png',  actionLabel: 'opwaarderen', inStock: null },
      { brand: 'lebara', key: 'lebara15', ean: '8xxxxxxxx', price: 1500, value: 1500, name: 'Lebara €15', img: './assets/logos/lebara_big.png',  actionLabel: 'opwaarderen', inStock: null },
      
  ]},

  { key: 'lyca', name: 'Lycamobile', img: './assets/logos/lycamobile_big.png', bigImg: './assets/logos/lycamobile_big.png', category: ['topups', 'her'], actionLabel: 'opwaarderen', color: '#0cb14e',
    products: [
      { brand: 'lyca', key: 'lyca10', ean: '5392000039209', price: 1000, value: 1000, name: 'Lycamobile €10', img: './assets/logos/lycamobile_big.png',  actionLabel: 'opwaarderen', inStock: null },
      { brand: 'lyca', key: 'lyca15', ean: '5392000039216', price: 1500, value: 1500, name: 'Lycamobile €15', img: './assets/logos/lycamobile_big.png',  actionLabel: 'opwaarderen', inStock: null },
  ]},

  { key: 'gtmobile', name: 'GT Mobile', img: './assets/logos/gtmobile_big.png', bigImg: './assets/logos/gtmobile_big.png', category: ['topups', 'him'], actionLabel: 'opwaarderen', color: '#0c4da2',
    products: [
      { brand: 'gtmobile', key: 'gtmobile10', ean: '5391515720466', price: 1000, value: 1000, name: 'GT-Mobile €10', img: './assets/logos/gtmobile_big.png',  actionLabel: 'opwaarderen', inStock: null },
      { brand: 'gtmobile', key: 'gtmobile20', ean: '5391515720459', price: 1500, value: 1500, name: 'GT-Mobile €20', img: './assets/logos/gtmobile_big.png',  actionLabel: 'opwaarderen', inStock: null },
  ]},

  { key: 'ortel', name: 'Ortel', img:  './assets/logos/ortel_big.png', bigImg: './assets/logos/ortel_big.png', category: ['topups'], actionLabel: 'opwaarderen', color: 'navy',
    products: [
      { brand: 'ortel', key: 'ortel10', ean: '8717624590030', price: 1000, value: 1000, name: 'Ortel €10', img:  './assets/logos/ortel_big.png',  actionLabel: 'opwaarderen', inStock: null },
      { brand: 'ortel', key: 'ortel20', ean: '8717624590047', price: 1500, value: 1500, name: 'Ortel €20', img:  './assets/logos/ortel_big.png',  actionLabel: 'opwaarderen', inStock: null }, 
  ]},

  { key: 'lmobi', name: 'L-Mobi', img: './assets/logos/lmobi.png' , bigImg: './assets/logos/lmobi_big.png', category: ['topups', 'kids'], actionLabel: 'opwaarderen', color: '#01a6eb',
    products: [
      { brand: 'lmobi', key: 'lmobi5', ean: '8719326012544', price: 500, value: 500, name: 'L-Mobi €5', img: './assets/logos/lmobi.png',  actionLabel: 'opwaarderen', inStock: null },
      { brand: 'lmobi', key: 'lmobi10', ean: '8719326012551',price: 1000, value: 1000, name: 'L-Mobi €10', img: './assets/logos/lmobi.png',  actionLabel: 'opwaarderen', inStock: null },
      { brand: 'lmobi', key: 'lmobi15', ean: '8719326012568',price: 1500, value: 1500, name: 'L-Mobi €15', img: './assets/logos/lmobi.png',  actionLabel: 'opwaarderen', inStock: null },
  ]},
  // Giftcards //
  { key: 'apple', name: 'Apple AppStore', img: 'https://www.prepaidpoint.nl/img/logos/itunes.png', bigImg: './assets/logos/apple_big.png', category: ['payment', 'giftcards', 'her'], actionLabel: 'kopen',  color: '#323232',
     products: [
     //{ brand: 'apple', key: 'itunes10', ean: '1000537000502', price: 1000, value: 1000, name: 'Apple Appstore', img: 'https://www.prepaidpoint.nl/img/logos/itunes.png' ,  actionLabel: 'tegoed'},
     { brand: 'apple', key: 'itunes15', ean: '1000537000496', price: 1500, value: 1500, name: 'Apple Appstore', img: 'https://www.prepaidpoint.nl/img/logos/itunes.png' ,  actionLabel: 'tegoed', inStock: null}, 
     { brand: 'apple', key: 'itunes25', ean: '1000537000502', price: 2500, value: 2500, name: 'Apple Appstore', img: 'https://www.prepaidpoint.nl/img/logos/itunes.png' ,  actionLabel: 'tegoed', inStock: null},
     { brand: 'apple', key: 'itunes50', ean: '1000537000519', price: 5000, value: 5000, name: 'Apple Appstore', img: 'https://www.prepaidpoint.nl/img/logos/itunes.png' ,  actionLabel: 'tegoed', inStock: null},
  ]},

  { key: 'paysafecard', name: 'Paysafecard', img: './assets/logos/paysafe_big.png', bigImg: './assets/logos/paysafe_big.png', category: ['payment',  'giftcards', 'him'], actionLabel: 'kopen', color: '#01a6eb',
    products: [
      { brand: 'paysafecard', key: 'paysafe10', ean: '9120005812031',price: 1000, value: 1000, name: 'Paysafecard €10', img: './assets/logos/paysafe_big.png' ,  actionLabel: 'tegoed', inStock: null, addedCost: 80 },
      { brand: 'paysafecard', key: 'paysafe25', ean: '9120005812147',price: 2500, value: 2500, name: 'Paysafecard €25', img: './assets/logos/paysafe_big.png' ,  actionLabel: 'tegoed', inStock: null, addedCost: 100},
      { brand: 'paysafecard', key: 'paysafe50', ean: '9120005812246', price: 5000, value: 5000, name: 'Paysafecard €50', img: './assets/logos/paysafe_big.png' ,  actionLabel: 'tegoed', inStock: null, addedCost: 120}, 
      { brand: 'paysafecard', key: 'paysafe100', ean: '9120005812345', price: 10000, value: 10000, name: 'Paysafecard €100', img: './assets/logos/paysafe_big.png' ,  actionLabel: 'tegoed', inStock: null, addedCost: 140}, 
  ]},
]

export  {state, actions }