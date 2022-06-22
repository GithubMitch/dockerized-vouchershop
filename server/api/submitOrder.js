const config = useRuntimeConfig();

let environment = process.env.NODE_ENV;
let $endpoint = environment == 'development' ? 'http://hndxs.test.hand.local:8280/hndxs/' : 'http://www.handdev.nl:8280/hndxs/';

export default async (req, res) => {
  let orderPayload = await useBody(req)
  orderPayload.submitOrderRequest.securityKey = `${config.hand_auth_key}`;

  let submitOrder = await $fetch(`${$endpoint}` +`v1/online/submitorder`, { 
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(`${config.hand_auth_user}:${config.hand_auth_pw}`),
      'posId': '50100004'
    },
    body: orderPayload,
  })

  return submitOrder
}