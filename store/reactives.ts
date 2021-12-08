import {ref, Ref, computed} from 'vue';

const products = ref<[]>([]); 
// ref<array>([])
const brands = ref<[]>([]);
const categoryUrl = ref([]);

const state = reactive ({
  products: products,
  brands: brands,
  categoryUrl: categoryUrl,
})

let actions = {

  async fetchProductList():Promise<any[]> {
    products.value = await $fetch("/api/fetchremoteproductlist", {retry:0, method: 'GET'});
      // console.log("Fetched product list")
    // products.value = response;
      console.log('Product list fetched :.... \n', products.value );
    return toRaw(products.value);
  },

  async fetchBrandList():Promise<any[]> {
    brands.value = await $fetch("/api/fetchremotebrandlist", {retry:0, method: 'GET'});
      // console.log("Fetched brand list")
    // brands.value = response;
      console.log('Brand list fetched :....\n', toRaw(brands.value) );
    return toRaw(brands.value);
  },

  setCategory(category)  {
    console.log('Set category: ', category)
  }

}

export  {state, actions }