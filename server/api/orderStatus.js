const config = useRuntimeConfig()

export default defineEventHandler(async(event) => {
  let orderPayload = await useBody(req)
  orderPayload.orderStatusRequest.securityKey = `${config.hand_auth_key}`;

  let statusReq = await $fetch(`http://hndxs.test.hand.local:8280/hndxs/v1/online/orderstatus`, { 
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(`${config.hand_auth_user}:${config.hand_auth_pw}`),
      'posId': '50100004'
    },
    body: orderPayload,
  })

  return statusReq
})
