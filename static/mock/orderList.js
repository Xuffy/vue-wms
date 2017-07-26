/**
 * 订单列表
 */
import Mock from 'mockjs'

export default {
  "data|10": [
    {
      "designerName": Mock.mock('@cname'),
      "designerPhone": "13540006063",
      "fitting": "1",
      "orderName": "女士-上装-衬衫",
      "orderNo": "123170726105233",
      "storeName": Mock.mock('@county()'),
      "tacheId": "17",
      "taskOrderCreateDate": Mock.mock('@date("yyyy-MM-dd HH:mm")'),
      "upTacheUpdate": Mock.mock('@date("yyyy-MM-dd HH:mm")')
    }
  ], "page": 0, "pageLength": 10, "totalSize": 91

}
