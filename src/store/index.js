import Vue from 'vue';
import Vuex from 'vuex';
import type from './types';
import {sessionStore} from 'service/store';

Vue.use(Vuex);

const initialState = {
  quickLink: {
    log: {
      show: false
    },
    show: false,
    list: []
  },
  layout: {
    hideMenu: false,
    paddingRight: 0
  },
  navBar: null,
  menuLink: {
    list: []
  },
  viewPicture: {vm: null},
  dic: ''
};

const actions = {
  /**
   * 设置menu 链接
   * @param commit
   * @param params  数据：{path:'',query:'',label:'',type:1}
   */
  setNavBar({commit}, params) {
    commit(type.SET_NAV_BAR, params);
  },
  setMenuLink({commit}, params) {
    commit(type.SET_MENU_LINK, params);
  },
  setViewPicture({commit}, params) {
    commit(type.VIEW_PICTURE, params);
  },
  setDraft({commit}, params) {
    console.error('setDraft 函数已更改为：setMenuLink');
  },
  setRecycleBin({commit}, params) {
    console.error('setRecycleBin 函数已更改为：setMenuLink');
  },
  setLog({commit}, params) {
    console.error('setLog 函数已更改为：setMenuLink');
  },
  setDic({commit, state}, params) {
    let dic = state.dic && Array.isArray(state.dic) ? state.dic : [];
    if (Array.isArray(params)) {
      let validCodes = params.filter(c => c.code && c.codes && Array.isArray(c.codes));
      let toAddCodes = validCodes.map(c => c.code);
      dic = dic.filter(c => !toAddCodes.includes(c.code)).concat(validCodes);
    } else if (params.code && params.codes && Array.isArray(params.codes)) {
      let existsItem = dic.filter(c => c.code === params.code)[0];
      if (existsItem) {
        existsItem.codes = params.codes;
      } else {
        dic.push(params);
      }
    }
    commit(type.DIC, dic);
  }
};

const mutations = {
  [type.SET_MENU_LINK](state, params) {
    params = !_.isArray(params) ? [params] : params;
    state.menuLink.list = _.sortBy(state.menuLink.list.concat(params), val => {
      if (val.type === 100) {// log 设置
        val.path = val.path || '/logs/index';
      }
      return val.type
    });
  },
  [type.VIEW_PICTURE](state, params) {
    state.viewPicture.vm.show(params);
  },
  [type.SET_NAV_BAR](state, params) {
    let data = {};
    if (_.isObject(params)) {
      data = _.extend(data, params);
    } else{
      data.label = params;
    }

    state.navBar = data;
  },
  [type.DIC](state, params) {
    state.dic = params;
  }
};

export default new Vuex.Store({
  state: initialState,
  actions,
  mutations
});
