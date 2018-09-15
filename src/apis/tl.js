export default {
  /**
   * settings
   */
  //供应端
  GET_SYS_CATEGORY: ['/sys/category', 'USUPPLY_URL', 'USUPPLY_URL'], // 获取系统分类
  GET_CATEGORY: ['/category', 'USUPPLY_URL', 'USUPPLY_URL'], // 获取我的分类
  GET_MAPPING_CATEGORY: ['/category/mapping', 'USUPPLY_URL', 'USUPPLY_URL'], // 获取映射分类
  POST_SAVE_MAPPING_CATEGORY: ['/category/mapping', 'USUPPLY_URL', 'USUPPLY_URL'], //保存分类
  GET_CHANGE_MAPPING_CATEGORY: ['/category/mapping/{id}', 'USUPPLY_URL', 'USUPPLY_URL'], // 获取当前选中的系统分类
  GET_ADD_APPING_CATEGORY: ['/category/mapping/{id}', 'USUPPLY_URL', 'USUPPLY_URL'], // 添加我的分类
  POST_CATEGORY_DELETE: ['/category/delete', 'USUPPLY_URL', 'USUPPLY_URL'], //删除我的分类
  POST_UPDATE_CATEGORY: ['/category/{id}', 'USUPPLY_URL', 'USUPPLY_URL'], //更新我的分类
  //采购端
  GET_PURCHASE_SYS_CATEGORY: ['/purchase/sys/category', 'BASE_URL'], // 获取系统分类
  GET_PURCHASE_CATEGORY: ['/purchase/category', 'BASE_URL'], // 获取我的分类
  GET_PURCHASE_MAPPING_CATEGORY: ['/purchase/category/mapping', 'BASE_URL'], // 获取映射分类
  POST_PURCHASE_SAVE_MAPPING_CATEGORY: ['/purchase/category/mapping', 'BASE_URL'], //保存分类
  GET_PURCHASE_CHANGE_MAPPING_CATEGORY: ['/purchase/category/mapping/{id}', 'BASE_URL'], // 获取当前选中的系统分类
  GET_PURCHASE_ADD_APPING_CATEGORY: ['/purchase/category/mapping/{id}', 'BASE_URL'], // 添加我的分类
  POST_PURCHASE_CATEGORY_DELETE: ['/purchase/category/delete', 'BASE_URL'], //删除我的分类
  POST_PURCHASE_UPDATE_CATEGORY: ['/purchase/category/{id}', 'BASE_URL'], //更新我的分类
  POST_MY_CUSTOM: ['/purchase/customer/getCustom', 'BASE_URL'], // 获取我的汇率（仅采购商）
  /**
   * inquiry
   */
  //采购端
  POST_INQIIRY_LIST: ['/inquiry/list', 'BASE_URL'], // inquiry list
  POST_INQIIRY_LIST_SKU: ['/inquiry/list/sku', 'BASE_URL'], // inquiry list sku
  POST_INQIIRY_DRAFT: ['/inquiry/list/draft', 'BASE_URL'], // inquiry list draft
  POST_INQUIRY_ACTION: ['/inquiry/action', 'BASE_URL'], // inquiry操作
  GET_INQIIRY_DETAIL: ['/inquiry', 'BASE_URL'], //获取inquiry详情
  GET_INQIIRY_DETAIL_BY_CODE: ['/inquiry/detail', 'BASE_URL'], //获取inquiry详情
  GET_INQIIRY_DETAIL_LIST: ['/inquiry/{id}/details', 'BASE_URL'], //获取inquiry详情列表
  POST_INQUIRY_SAVE: ['/inquiry/save', 'BASE_URL'], // 提交
  POST_INQUIRY_SKUS: ['/inquiry/skus', 'BASE_URL'], // sku 转换接口
  POST_INQUIRY_COMPARE_DELETE: ['/inquiry/compare/delete', 'BASE_URL'],
  POST_INQUIRY_COMPARE: ['/inquiry/compare/{id}', 'BASE_URL'],
  POST_INQUIRY_COMPARE_RESTORE: ['/inquiry/compare/restore', 'BASE_URL'],
  POST_INQUIRY_COMPARE_RS: ['/inquiry/compare', 'BASE_URL'],
  POST_INQUIRY_COMPARE_SKU: ['/inquiry/compare/{id}/sku', 'BASE_URL'],
  GET_INQUIRY_HISTORY: ['/inquiry/{id}/history', 'BASE_URL'],
  POST_INQIIRY_COMPARE_LIST: ['/inquiry/compare/list', 'BASE_URL'],
  GET_INQUIRY_DETAIL_HISTORY: ['/inquiry/detail/{id}/history', 'BASE_URL'],
  GET_INQUIRY_SKU_HISTORY: ['/inquiry/detail/history', 'BASE_URL'],
  //供应端
  BUYER_POST_INQIIRY_LIST: ['/inquiry/list', 'USUPPLY_URL', 'USUPPLY_URL'], // inquiry list
  BUYER_POST_INQIIRY_LIST_SKU: ['/inquiry/list/sku', 'USUPPLY_URL', 'USUPPLY_URL'], // inquiry list sku
  BUYER_POST_INQUIRY_SAVE: ['/inquiry/save', 'USUPPLY_URL', 'USUPPLY_URL'], // 提交
  BUYER_GET_INQIIRY_DETAIL: ['/inquiry', 'USUPPLY_URL', 'USUPPLY_URL'], // 获取inquiry 详情
  BUYER_GET_INQIIRY_DETAIL_BY_CODE: ['/inquiry/detail', 'BASE_URL'], //获取inquiry详情
  BUYER_GET_INQUIRY_HISTORY: ['/inquiry/{id}/history', 'USUPPLY_URL', 'USUPPLY_URL'], // 获取inquiry 历史
  BUYER_POST_INQUIRY_SKUS: ['/inquiry/skus', 'USUPPLY_URL', 'USUPPLY_URL'], // sku 转换接口
  BUYER_POST_INQUIRY_ACTION: ['/inquiry/action', 'USUPPLY_URL', 'USUPPLY_URL'], // 操作
  BUYER_GET_INQUIRY_DETAIL_HISTORY: ['/inquiry/detail/{id}/history', 'USUPPLY_URL', 'USUPPLY_URL'],

  /**
   * 服务端
   */

  /**
   * 获取采购端 公共接口
   */
  PURCHASE_SUPPLIER_LISTSUPPLIERBYNAME: ['/purchase/supplier/listSupplierByName', 'BASE_URL'],
  ITEMFAVORITE_PART: ['/itemfavorite/part', 'UMETA_URL', 'UMETA_URL'],
  ITEMFAVORITE_UPDATE: ['/itemfavorite/update', 'UMETA_URL', 'UMETA_URL'],
  POST_CODE_PART: ['/code/part', 'UMETA_URL', 'UMETA_URL'],
  POST_LOGISTICSPORT_QUERY: ['/logisticsport/query', 'UMETA_URL', 'UMETA_URL'],
  GET_COUNTRY_ALL: ['/country/all', 'UMETA_URL', 'UMETA_URL'],
  GET_CURRENCY_ALL: ['/currency/all', 'UMETA_URL', 'UMETA_URL']
}
