import {state , actions} from '../../store/reactives'
import config from '#config';

let items = []

export default async (req, res) => {
  const productsRequest = await $fetch('http://hndxs.test.hand.local:8280/hndxs/v1/online/catalog', { 
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
  items = productsRequest.responseObject.products;

  return items
}
