const config = useRuntimeConfig();

export default async (req, res) => {
  let orderPayload = await useBody(req)
  orderPayload.submitOrderRequest.securityKey = `${config.hand_auth_key}`;

  let submitOrder = await $fetch(`http://hndxs.test.hand.local:8280/hndxs/v1/online/submitorder`, { 
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(`${config.hand_auth_user}:${config.hand_auth_pw}`),
      'posId': '50100004'
    },
    body: orderPayload,
  })

  return submitOrder
}