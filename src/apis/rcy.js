'use strict';
export default {
    //order
    get_orderList: ['/order/overview/orderPage', 'BASE_URL'],
    get_draft_orderlist: ['/order/draft/page', 'BASE_URL'],
    get_recycle_orderlist: ['/order/recycle/page', 'BASE_URL'],
    post_recover_order: ['/order/recover', 'BASE_URL'],
    post_finishPost: ['/order/finish', 'BASE_URL'],
    delete_order: ['/order/delete', 'BASE_URL'],
    download_order: ['/order/download', 'BASE_URL'],
    add_order: ['/order/save', 'BASE_URL'],
    detail_order: ['/order/detail/{id}', 'BASE_URL'],
    get_order_history: ['/order/skuHistory', 'BASE_URL'],
    post_order_skus: ['/order/skus', 'BASE_URL'],
    post_cancleOrder: ['/order/cancle', 'BASE_URL'],
    post_updataOrder: ['/order/update', 'BASE_URL'],
    post_confirm: ['/order/confirm  ', 'BASE_URL'],
    ORDER_MESSAGE_TALK:['/order/messageToTask','BASE_URL'],


    //supplier
    post_add_supplier_remark: ['/purchase/supplier/remark','BASE_CS','BASE_URL'],
    get_update_supplier_remark: ['/purchase/supplier/remark/{id}','BASE_CS','BASE_URL'],
    get_listSupplier: ['/purchase/listSupplier','BASE_CS','BASE_URL'],
    get_supplier_id: ['/purchase/supplier/{id}','BASE_CS', 'BASE_URL'],
    post_supplier_list_remark: ['/purchase/supplier/listRemarks','BASE_CS',  'BASE_URL'],
    post_supplier_remark: ['/purchase/supplier/remark','BASE_CS',  'BASE_URL'],
    get_supplier_remark_de: ['/purchase/supplier/remark/{id}','BASE_CS',  'BASE_URL'],
    post_supplier_delete_remark: ['/purchase/supplier/deleteRemark/{id}','BASE_CS',  'BASE_URL'],
    post_listSupplierByIds: ['/purchase/supplier/listSupplierByIds','BASE_CS',  'BASE_URL'],
    post_supplier_addbookmark: ['/purchase/supplier/bookmark','BASE_CS',  'BASE_URL'],
    post_supplier_deletebookmark: ['/purchase/supplier/deleteBookmark/{id}', 'BASE_CS', 'BASE_URL'],
    post_supplier_listbookmark: ['/purchase/supplier/listBookmarks', 'BASE_CS', 'BASE_URL'],
    post_supplier_recoverbookmark: ['/purchase/supplier/recoverBookmark/{id}','BASE_CS',  'BASE_URL'],
    post_supplier_addCompare: ['/purchase/supplier/compare','BASE_CS',  'BASE_URL'],
    post_supplier_listCompare: ['/purchase/supplier/listCompare','BASE_CS', 'BASE_URL'],
    post_supplier_listCompareDetails: ['/purchase/supplier/listCompareDetails','BASE_CS', 'BASE_URL'],
    post_supplier_deleteCompareDetails: ['/purchase/supplier/deleteCompareDetail','BASE_CS', 'BASE_URL'],
    post_supplier_deleteCompare: ['/purchase/supplier/deleteCompare','BASE_CS', 'BASE_URL'],
    post_supplier_recoverCompare: ['/purchase/supplier/recoverCompare','BASE_CS', 'BASE_URL'],
    post_deleteBookmarks: ['/purchase/supplier/batchDeleteBookmark','BASE_CS', 'BASE_URL'],
    post_recoverBookmarks: ['/purchase/supplier/batchRecoverBookmark','BASE_CS', 'BASE_URL'],
    post_purchase_supplier_orderHistory: ['/purchase/supplier/orderHistory','BASE_CS', 'BASE_URL'],
    post_purchase_supplier_getInquiryHistory: ['/purchase/supplier/getInquiryHistory','BASE_CS', 'BASE_URL'],
    post_purchase_supplier_listRemarks: ['/purchase/supplier/listRemarks', 'BASE_CS','BASE_URL'],
    post_purchase_supplier_remark: ['/purchase/supplier/remark','BASE_CS', 'BASE_URL'],
    post_purchase_supplier_remark_id: ['/purchase/supplier/remark','BASE_CS', 'BASE_URL'],
    post_purchase_supplier_deleteRemark_id: ['/purchase/supplier/deleteRemark/{id}','BASE_CS', 'BASE_URL'],
    post_batchDeleteBookmark:['/purchase/supplier/batchDeleteBookmark','BASE_CS', 'BASE_URL'],
    post_batchRecoverBookmark:['/purchase/supplier/batchRecoverBookmark','BASE_CS', 'BASE_URL'],

    //customer
    post_getCustomerList: ['/supply/overview', 'BASE_URL'],
    post_deleteCustomerRemark: ['/supply/deleteRemark/{id}', 'BASE_URL'],
    post_customerDetail: ['/supply/{id}', 'BASE_URL'],
    post_getCustomerListRemark: ['/supply/listRemarks/{id}', 'BASE_URL'],
    post_addCustomerListRemark: ['/supply/remark', 'BASE_URL'],
    post_delete_CustomerRemark: ['/supply/deleteRemark/{id}', 'BASE_URL'],
    post_customerUpdataRmark: ['/supply/remark/{id}', 'BASE_URL'],


    //payment
    PAYMENT_SAVE:['/payment/save?moduleCode={moduleCode}','BASE_URL'],
    PAYMENT_LIST:['/payment/list/{orderNo}/{orderType}?moduleCode={moduleCode}','BASE_URL'],
    PAYMENT_ABANDON:['/payment/abandon/{id}?version={version}&moduleCode={moduleCode}','BASE_URL'],
    PAYMENT_RESTORE:['/payment/recover/{id}?version={version}&moduleCode={moduleCode}','BASE_URL'],
    PAYMENT_UPDATE:['/payment/update?moduleCode={moduleCode}','BASE_URL'],
    PAYMENT_DUNNING:['/payment/batchDunning','BASE_URL'],
    PAYMENT_ACCEPT:['/payment/accept/{id}?version={version}&moduleCode={moduleCode}','USUPPLY_URL'],





    //字典表数据
    post_codePart: ['/code/part', 'UMETA_URL'],
    post_country: ['/country/all', 'UMETA_URL'],
    post_logisticsport: ['/logisticsport/query', 'UMETA_URL'],
    get_currency: ['/currency/all', 'UMETA_URL'],
    CURRENCY_ALL: ['/currency/all', 'UMETA_URL'],
    CUSTOMERCURRENCYEXCHANGERATE_QUERY: ['/customcurrencyexchangerate/query', 'UMETA_URL'],
    COUNTRY_ALL: ['/country/all', 'UMETA_URL'],


    /**
     * 新格式order接口配置
     * */
    ORDER_GETORDERNO: ['/order/getOrderNo', 'BASE_URL'],
    ORDER_FINISH: ['/order/finish', 'BASE_URL'],
    PURCHASE_SUPPLIER_LIST_SUPPLIER_BY_NAME: ['/purchase/supplier/listSupplierByName?name={name}', 'BASE_URL'],
    INQUIERY_LIST: ['/inquiry/list', 'BASE_URL'],
    ORDER_SKUS: ['/order/skus', 'BASE_URL'],
    ORDER_SKUHISTORY: ['/order/skuHistory', 'BASE_URL'],
    INQUIRY_ID: ['/inquiry/{id}', 'BASE_URL'],
    OVERVIEW_ORDERPAGE: ['/order/overview/orderPage', 'BASE_URL'],
    OVERVIEW_SKUPAGE: ['/order/overview/skuPage', 'BASE_URL'],
    ORDER_SAVE: ['/order/save', 'BASE_URL'],
    ORDER_DRAFT_ORDERPAGE: ['/order/draft/orderPage', 'BASE_URL'],
    ORDER_DRAFT_SKUPAGE: ['/order/draft/skuPage', 'BASE_URL'],
    ORDER_DETAIL: ['/order/detail', 'BASE_URL'],
    ORDER_MARK: ['/order/mark','BASE_URL'],
    ORDER_UPDATE:['/order/update','BASE_URL'],
    ORDER_CONFIRM:['/order/confirm','BASE_URL'],
    ORDER_CANCEL:['/order/cancle','BASE_URL'],
    ORDER_SAVE_DRAFT:['/order/saveDraft','BASE_URL'],
    ORDER_SEND:['/order/send','BASE_URL'],
    ORDER_HISTORY:['/order/skuHistory','BASE_URL'],
    ORDER_RECYCLE_ORDER_PAGE:['/order/recycle/orderPage','BASE_URL'],
    ORDER_RECYCLE_SKU_PAGE:['/order/recycle/skuPage','BASE_URL'],
    ORDER_RECOVER:['/order/recover','BASE_URL']
}
