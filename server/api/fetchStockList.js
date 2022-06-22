const config = useRuntimeConfig()

let environment = process.env.NODE_ENV;
let $endpoint = environment == 'development' ? 'http://hndxs.test.hand.local:8280/hndxs/' : 'http://www.handdev.nl:8280/hndxs/';

console.log('ENVIRONMENT =', process.env.NODE_ENV)
console.log('$ENDPOINTS =', $endpoint)

export default defineEventHandler(async(event) => {

  const productsRequest = await $fetch(`${$endpoint}` +'v1/online/catalog', { 
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(`${config.hand_auth_user}:${config.hand_auth_pw}`),
      'posId': '50100004'
    },
    body: {
      reference : "blablabla", // 
      productListRequest : {
      "securityKey" : `${config.hand_auth_key}`
      }
    } 
  });
  return productsRequest.responseObject.products
})
