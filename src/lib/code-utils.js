/**
 * 定义Code的值类型等配置
 */
const codeConfig = {
  'AE_IS': {valueType: Number}, // Boolean
  'EL_IS': {valueType: Number}, // Boolean
  'INQUIRY_STATUS': {valueType: Number},
  'ITM': {valueType: String},
  'LH_UNIT': {valueType: Number},
  'ED_UNIT': {valueType: Number},
  'MD_TN': {valueType: String},
  'OEM_IS': {valueType: Number}, // Boolean
  'RA_IS': {valueType: Number}, // Boolean
  'PMT': {valueType: String},
  'SKU_PG_IS': {valueType: Number}, // Boolean
  'SKU_SALE_STATUS': {valueType: Number},
  'SKU_UNIT': {valueType: Number},
  'SUPPLIER_TYPE': {valueType: Number},
  'UDB_IS': {valueType: Number}, // Boolean
  'WT_UNIT': {valueType: Number},
  'VE_UNIT': {valueType: Number},
  'CY_UNIT': {valueType: String},
  'COUNTRY': {valueType: String}
};

let categoriesToCodeList = (categoryList) => {
  let list = [];
  if (categoryList && Array.isArray(categoryList)) {
    for (let item of categoryList) {
      list.push({id: item.id, code: item.id, name: item.name, value: item.id});
      if (item.children) {
        list = list.concat(categoriesToCodeList(item.children));
      }
    }
  }
  return list;
}

const codeUtils = {
  convertDicValueType(codelist) {
    for (let codes of codelist) {
      if (codes.code && Array.isArray(codes.codes) && codeConfig[codes.code]) {
        let cfg = codeConfig[codes.code];
        for (let code of codes.codes) {
          let value = this.isUndefinedOrNull(code.value) ? code.code : code.value;
          code.value = code.code = cfg.valueType(value);
        }
      }
    }
    return codelist;
  },
  isUndefinedOrNull() {
    for (let arg of arguments) {
      if (typeof arg === 'undefined' || arg === null) {
        return true;
      }
    }
    return false;
  },
  isNumber() {
    for (let arg of arguments) {
      if (!Number.isFinite(arg)) {
        return false;
      }
    }
    return true;
  },
  getInquiryDicCodes(vm) {
    const postCodes = vm.$ajax.post(
      vm.$apis.POST_CODE_PART,
      [
        'INQUIRY_STATUS',
        'PMT',
        'ITM',
        'AE_IS',
        'EL_IS',
        'RA_IS',
        'SUPPLIER_TYPE',
        'MD_TN',
        'SKU_SALE_STATUS',
        'SKU_UNIT',
        'ED_UNIT',
        'LH_UNIT',
        'WT_UNIT',
        'VE_UNIT',
        'OEM_IS',
        'UDB_IS',
        'SKU_PG_IS'
      ],
      { cache: true }
    );
    const getCurrencies = vm.$ajax.get(vm.$apis.GET_CURRENCY_ALL, '', {cache: true});
    const getCountries = vm.$ajax.get(vm.$apis.GET_COUNTRY_ALL, '', {cache: true});
    return Promise.all([postCodes, getCurrencies, getCountries]).then(res => {
      let data = res[0];

      res[1].forEach(item => item.name = item.code);
      data.push({
        code: 'CY_UNIT',
        name: 'CY_UNIT(币种)',
        codes: res[1]
      });
      data.push({
        code: 'COUNTRY',
        name: 'COUNTRY(国家)',
        codes: res[2]
      });
      return codeUtils.convertDicValueType(data);
    });
  },
  getCotegories(vm) {
    let categoryList = [
      {
        id: 123,
        name: '系统分类 (SYS)',
        children: []
      },
      {
        id: 5125,
        name: '自己的分类 (SELF)',
        children: []
      }
    ];
    const categories = vm.$ajax.get(vm.$apis.GET_PURCHASE_SYS_CATEGORY, '', {cache: true});
    const myCategories = vm.$ajax.get(vm.$apis.GET_PURCHASE_CATEGORY, '', {cache: true});
    return vm.$ajax.all([categories, myCategories]).then(res => {
      categoryList[0].children = res[0];
      categoryList[1].children = res[1];
      return {
        code: 'SKU_CATEGORY',
        name: 'SKU_CATEGORY (产品分类)',
        codes: categoriesToCodeList(categoryList)
      };
    });
  },
  findCodeDir(vm, code) {
    return vm.$store.state.dic ? vm.$store.state.dic.filter(c => c.code === code)[0] || null : null;
  },
  findCodes(vm, code) {
    let item = this.findCodeDir(vm, code);
    return item ? item.codes : [];
  }
};

export default codeUtils;
