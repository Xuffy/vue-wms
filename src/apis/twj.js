export default {
  //payment
  post_ledgerPage: ['/ledger/page', 'BASE_URL'],
  post_payment_list: ['/payment/list/{orderNo}/{orderType}', 'BASE_URL'],
  post_payment_accept: ['/payment/accept/{id}', 'BASE_URL'],
  post_payment_dunning: ['/payment/dunning', 'BASE_URL'],
  //message
  post_usermessage_queryCompany: ['/usermessage/queryCompany', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_usermessage_querySystem: ['/usermessage/querySystem', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_usermessage_read: ['/usermessage/read', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_usermessage_readCompany: ['/usermessage/readCompany', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_usermessage_readSystem: ['/usermessage/readSystem', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  get_messagesetting_query: ['/messagesetting/query','UMESSAGE_URL', 'UMESSAGE_URL'],
  post_companymessage_query: ['/companymessage/query', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_company_addcompanymessage: ['/companymessage/addcompanymessage', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_systemmessage_query: ['/systemmessage/query', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_sys_addsystemmessage: ['/systemmessage/addsystemmessage', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_sys_updateread: ['/systemmessagesubscribe/updateread', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_messagesetting_updatesetting: ['/messagesetting/updatesetting', 'UMESSAGE_URL', 'UMESSAGE_URL'],

    //logs
  post_bizloQuery: ['/bizlog/query', 'UBIZLOG_URL', 'UBIZLOG_URL'],
  //Personal Setting
  get_user_profile: ['/user/profile', 'UUSER_URL', 'UUSER_URL'],
  put_user_profile: ['/user/profile', 'UUSER_URL', 'UUSER_URL'],
  put_user_profile_password: ['/user/profile/password', 'UUSER_URL', 'UUSER_URL'],
  //qc order
  post_qc_page: ['/qc/page', 'BASE_URL'],
  post_qc_detail_page: ['/qc/detail/page', 'BASE_URL'],

  //元数据
  POST_CODE_PART: ['/code/part', 'UMETA_URL', 'UMETA_URL'],
  GET_COUNTRY_ALL: ['/country/all', 'UMETA_URL', 'UMETA_URL'],
  get_currency_all: ['/currency/all', 'UMETA_URL', 'UMETA_URL'],

  //warehouse
  post_warehouse_page: ['/warehouse/overview/page', 'BASE_URL'],
  // post_warehouse_page: ['/warehouse/overview/page','UWAREHOUSE_URL']
  get_qc_getById: ['/qc/getById', 'USERVICE_URL', 'USERVICE_URL'],
  post_qc_result_save: ['/qc/result/save', 'USERVICE_URL', 'USERVICE_URL'],

  //user
  get_user_list: ['/user/list', 'UUSER_URL', 'UUSER_URL'], //获取当前登录用户所在企业下所有用户信息
  get_user_privilege: ['/user/privilege', 'UUSER_URL', 'UUSER_URL'],
  GET_DEPARTMENT: ['/department', 'UUSER_URL', 'UUSER_URL'],

  //track
  get_track_getTrackInfoByPage: ['/track/getTrackInfoByPage', 'UWORKBENCH_URL', 'UWORKBENCH_URL'],

  //companyInfo
  get_purchase_supplier: ['/purchase/supplier/{id}', 'BASE_CS', 'BASE_URL'],
  post_purchase_customer: ['/purchase/customer', 'BASE_CS', 'BASE_URL'],
  post_purchase_customer_address_id: ['/purchase/customer/address', 'BASE_CS', 'BASE_URL'],
  post_purchase_customer_address: ['/purchase/customer/address', 'BASE_CS', 'BASE_URL'],
  get_purchase_customer_getCustomer: ['/purchase/customer/getCustomer', 'BASE_CS', 'BASE_URL'],
  post_purchase_customer_deleteAddress: ['/purchase/customer/deleteAddress/{id}', 'BASE_CS', 'BASE_URL'],
  post_purchase_customer_concat: ['/purchase/customer/concat', 'BASE_CS', 'BASE_URL'],
  post_purchase_customer_concat_id: ['/purchase/customer/concat', 'BASE_CS', 'BASE_URL'],
  post_purchase_customer_deleteConcat: ['/purchase/customer/deleteConcat/{id}', 'BASE_CS', 'BASE_URL'],
  post_purchase_customer_custom: ['/purchase/customer/custom', 'BASE_CS', 'BASE_URL'],
  post_purchase_customer_custom_id: ['/purchase/customer/custom', 'BASE_CS', 'BASE_URL'],
  post_purchase_customer_deleteCustom: ['/purchase/customer/deleteCustom/{id}', 'BASE_CS', 'BASE_URL'],
  post_purchase_customer_document: ['/purchase/customer/document', 'BASE_CS', 'BASE_URL'],
  post_purchase_customer_document_id: ['/purchase/customer/document', 'BASE_CS', 'BASE_URL'],
  post_purchase_customer_deleteDocument: ['/purchase/customer/deleteDocument/{id}', 'BASE_CS', 'BASE_URL'],
  post_oss_company_batchUpload: ['/purchase/oss/company/batchUpload', 'BASE_CS', 'BASE_URL'],
  post_oss_company_upload: ['/purchase/oss/company/upload', 'BASE_CS', 'BASE_URL'],
  post_purchase_customer_updateIsSetting:['/purchase/customer/updateIsSetting/{id}', 'BASE_CS', 'BASE_URL'],
  get_purchase_customer_document: ['/purchase/customer/document', 'BASE_CS', 'BASE_URL'],
  post_purchase_customer_exist: ['/purchase/customer/sname/exist/{id}?shortName={shortName}', 'BASE_CS', 'BASE_URL'],

//自定义币种汇率
  get_customcurrencyexchangerate_query: ['/customcurrencyexchangerate/query', 'UMETA_URL', 'UMETA_URL'],
  post_exchangerate_update: ['/customcurrencyexchangerate/update', 'UMETA_URL', 'UMETA_URL']

}
