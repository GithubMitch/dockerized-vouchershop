import {ref, Ref, reactive, computed} from 'vue';

// URL and selected URL for category
const categoryUrl = ref([]);
const selectedCategory = ref([]);

// All brands and selected Brands
const brands = ref<[]>([]);
const selectedBrand = ref('No brand selected');

// All products and selected Products
const products = ref<[]>([]); 
const selectedProducts = ref<[]>([]);

// List of selectable products 
const selectableBrands = ref<[]>([]);
const selectableProducts = ref<[]>([]);

const state = reactive ({
  products: products,
  brands: brands,
  categoryUrl: categoryUrl,
  selectedCategory: selectedCategory,
  selectedBrand: ref<[]>([]),
  selectedProducts: ref<[]>([]),
  
  selectableBrands: selectableBrands,
  selectableProducts: selectableProducts,
  
})

let actions = {

  // FETCH EXTERNALS - handled by server/api (directory in root)
  async fetchProductList():Promise<any[]> {
    products.value = await $fetch("/api/fetchremoteproductlist", {retry:0, method: 'GET'});
      // console.log("Fetched product list")
    // products.value = response;
      // console.log('Product list fetched :.... \n', products.value );
    return toRaw(products.value);
  },
  async fetchBrandList():Promise<any[]> {
    brands.value = await $fetch("/api/fetchremotebrandlist", {retry:0, method: 'GET'});
      // console.log("Fetched brand list")
    // brands.value = response;
      // console.log('Brand list fetched :....\n', brands.value ); // Gives non reactive-data instead of proxy : toRaw(brands.value) 
    return toRaw(brands.value);
  },

  // SETTERS
  setCategory(category)  {
    return  (category ? (selectedCategory.value = category, console.log('Set category: ', category)) : console.log('Didnt set category', category))
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
}

export  {state, actions }