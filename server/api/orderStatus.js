const config = useRuntimeConfig()

let environment = process.env.NODE_ENV;
let $endpoint = environment == 'development' ? 'http://hndxs.test.hand.local:8280/hndxs/' : 'http://www.handdev.nl:8280/hndxs/';

export default defineEventHandler(async(event) => {
  let orderPayload = await useBody(event.req)
  orderPayload.orderStatusRequest.securityKey = `${config.hand_auth_key}`;

  let statusReq = await $fetch(`${$endpoint}` +`v1/online/orderstatus`, { 
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(`${config.hand_auth_user}:${config.hand_auth_pw}`),
      'posId': '50100004'
    },
    body: orderPayload,
  })

  return statusReq
})
