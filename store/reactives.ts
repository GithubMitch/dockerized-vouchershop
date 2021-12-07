import {ref, computed} from 'vue';


const state = {
  count: 0,
  products: []
}

let actions = {
  async fetchProductList(state) {
    console.log("Fetched product list")

    const products = ref<array>([]);

    const getProducts = async ()  => {
      products.value = await useAsyncData("products", () => $fetch("/api/rq"));
      console.log('client side retrieved....', toRaw(products.value) );
    }

    // products.value = await getProducts();

    // return {products, getProducts}

    state.products = await getProducts();
  },
  incrementCount(state) {
    console.log('Increment count by', "1")
    state.count++
  }
}

let setters = {
  getCount(state) {
    console.log("Count = ", state.count)
  }
}

export  {state, actions, setters }