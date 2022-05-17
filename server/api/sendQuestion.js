import {state , actions} from '../../store/reactives'
import config from '#config';
import {useBody} from 'h3';

export default async (req, res) => {
  const payLoad = await useBody(req)

  let submitOrder = await $fetch(`http://hndxs.test.hand.local:8280/hndxs/v1/online/sendquestion`, { 
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(`${config.hand_auth_user}:${config.hand_auth_pw}`),
      'posId': '50100004'
    },
    body: payLoad,
  })

  return submitOrder
}