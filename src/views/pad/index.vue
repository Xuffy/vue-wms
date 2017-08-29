<template>
  <div class="pad-index" id="pad-index">

    <header class="pad-header">
      <ul class="menu">
        <li v-bind:class="{active:curTag === 'design'}" @click="goTag('design')">设计稿</li>
        <li v-bind:class="{active:curTag === 'measure'}" @click="goTag('measure')">量体表</li>
        <li v-bind:class="{active:curTag === 'userInfo'}" @click="goTag('userInfo')">顾客信息</li>
      </ul>
      <div class="search-box">
        <form>
          <el-input
            placeholder="请输入订单号"
            icon="search"
            v-model="orderNo"
            type="tel"
            :autofocus="true"
            :on-icon-click="getOrderInfo">
          </el-input>
        </form>
      </div>
    </header>

    <section class="content-box">
      <div id="design">
        <p class="design-des" v-html="orderInfo.designDescription"></p>

        <div class="design-img-box">
          <div class="design-img" v-for="item in orderInfo.new_designUrl" v-img-preview="item">
            <img v-bind:src="item">
          </div>
        </div>
      </div>

      <div id="measure">
        <h3 class="title">设计尺寸表</h3>
        <table class="dx-table measure-table" width="50%">
          <tr>
            <th width="50%">上衣</th>
            <th width="50%">成衣尺寸</th>
          </tr>
          <tr v-for="item in orderInfo.first_ElectronMeasure">
            <td v-text="item.name_str || '-'"></td>
            <td v-text="item.designerSize || '-'"></td>
            <!--<td v-text="item.SampleDesignerSize || '-'"></td>
            <td v-text="item.designerSize || '-'"></td>-->
          </tr>
        </table>
        <table class="dx-table measure-table" width="50%" style="border-left:none">
          <tr>
            <th width="50%">下衣/裙装</th>
            <th width="50%">成衣尺寸</th>
          </tr>
          <tr v-for="item in orderInfo.last_ElectronMeasure">
            <td v-text="item.name_str || '-'"></td>
            <td v-text="item.designerSize || '-'"></td>
            <!--<td v-text="item.SampleDesignerSize || '-'"></td>
            <td v-text="item.designerSize || '-'"></td>-->
          </tr>
        </table>
        <div style="clear: both"></div>

        <h3 class="title" style="margin-top: 24px">顾客净寸表</h3>
        <table class="dx-table body-table" width="50%">
          <tr v-for="item in orderInfo.first_storeCustomerBodyList">
            <td width="50%" v-text="item.labelName || '-'"></td>
            <td width="50%" v-text="item.strSize || '-'"></td>
          </tr>
        </table>
        <table class="dx-table body-table" width="50%">
          <tr v-for="item in orderInfo.last_storeCustomerBodyList">
            <td width="50%" v-text="item.labelName || '-'"></td>
            <td width="50%" v-text="item.strSize || '-'"></td>
          </tr>
        </table>
      </div>

      <div id="userInfo">
        <h3 class="title" style="margin-top: 24px">顾客照片</h3>

        <div class="design-img-box" style="margin-bottom: 30px">
          <div class="design-img" v-for="item in orderInfo.customerBodyPicList"
               v-img-preview="item.pictureUrl">
            <img v-bind:src="item.pictureUrl">
            <span style="font-size: 16px;line-height: 50px;display: block"
                  v-text="item.type === 1 ? '正面' : (item.type === 2 ? '侧面' : '反面') ">
            </span>
          </div>
        </div>

        <hr style="background-color: #e5e5e5;">

        <h3 class="title">顾客下单说明</h3>

        <p class="design-des" style="margin-top: 10px;"
           v-text="orderInfo.description || '暂无说明'"></p>

        <hr style="background-color: #e5e5e5;">

        <h3 class="title">顾客上传图片</h3>

        <div class="design-img-box">
          <div class="design-img" v-for="item in orderInfo.new_userUploadPics" v-img-preview="item">
            <img v-bind:src="item">
          </div>
        </div>
      </div>
    </section>

    <!--<div class="search-box">
      <el-input
        placeholder="请输入订单号"
        icon="search"
        v-model="orderNo"
        type="number"
        @focus="searchFocus"
        :autofocus="isFocus"
        :on-icon-click="getOrderInfo">
      </el-input>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="设计稿" name="first">
        <p class="design-des" v-html="orderInfo.designDescription"></p>

        <div class="design-img-box">
          <div class="design-img" v-for="item in orderInfo.new_designUrl" v-img-preview="item">
            <img v-bind:src="item">
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="量体表" name="second">
        <h3 class="title">设计尺寸表</h3>
        <table class="dx-table measure-table" width="100%">
          <tr>
            <th width="25%">上衣</th>
            <th width="25%">净寸</th>
            <th width="25%">版师建议尺寸</th>
            <th width="25%">设计师确定成衣尺寸</th>
          </tr>
          <tr v-for="item in orderInfo.first_ElectronMeasure">
            <td v-text="item.name_str || '-'"></td>
            <td v-text="item.size || '-'"></td>
            <td v-text="item.SampleDesignerSize || '-'"></td>
            <td v-text="item.designerSize || '-'"></td>
          </tr>
        </table>
        <table class="dx-table measure-table" width="100%">
          <tr>
            <th width="25%">下衣/裙装</th>
            <th width="25%">净寸</th>
            <th width="25%">版师建议尺寸</th>
            <th width="25%">设计师确定成衣尺寸</th>
          </tr>
          <tr v-for="item in orderInfo.last_ElectronMeasure">
            <td v-text="item.name_str || '-'"></td>
            <td v-text="item.size || '-'"></td>
            <td v-text="item.SampleDesignerSize || '-'"></td>
            <td v-text="item.designerSize || '-'"></td>
          </tr>
        </table>
        <h3 class="title" style="margin-top: 24px">顾客净寸表</h3>
        <table class="dx-table body-table" width="50%">
          <tr v-for="item in orderInfo.first_storeCustomerBodyList">
            <td width="50%" v-text="item.labelName || '-'"></td>
            <td width="50%" v-text="item.strSize || '-'"></td>
          </tr>
        </table>
        <table class="dx-table body-table" width="50%">
          <tr v-for="item in orderInfo.last_storeCustomerBodyList">
            <td width="50%" v-text="item.labelName || '-'"></td>
            <td width="50%" v-text="item.strSize || '-'"></td>
          </tr>
        </table>

      </el-tab-pane>
      <el-tab-pane label="顾客信息" name="third">
        <h3 class="title">顾客照片</h3>

        <div class="design-img-box" style="margin-bottom: 30px">
          <div class="design-img" v-for="item in orderInfo.customerBodyPicList"
               v-img-preview="item.pictureUrl">
            <img v-bind:src="item.pictureUrl">
            <span style="font-size: 16px;line-height: 50px;display: inline-block"
                  v-text="item.type === 1 ? '正面' : (item.type === 2 ? '侧面' : '反面') ">
            </span>
            &lt;!&ndash;<span style="font-size: 16px">侧面</span>&ndash;&gt;
            &lt;!&ndash;<span style="font-size: 16px">背面</span>&ndash;&gt;
          </div>
        </div>

        <hr style="background-color: #e5e5e5;">

        <h3 class="title">顾客下单说明</h3>

        <p class="design-des" style="margin-top: 10px;"
           v-text="orderInfo.description || '暂无说明'"></p>

        <hr style="background-color: #e5e5e5;">

        <h3 class="title">顾客上传图片</h3>

        <div class="design-img-box">
          <div class="design-img" v-for="item in orderInfo.new_userUploadPics" v-img-preview="item">
            <img v-bind:src="item">
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>-->
  </div>
</template>

<script>
  import Vue from 'vue'
  import $ from 'zepto'
  import store from 'store'
  import _ from 'underscore'
  import {Message} from 'element-ui'

  export default {
    name: 'index',
    data: function () {
      return {
        curTag: 'design',
        orderNo: '',
        orderInfo: {},
      }
    },
    created: function () {
      let pon = store.get('pad-orderNo')
        , _this = this;


      this.$parent.$emit('full-screen', true);
      if (pon) {
        this.orderNo = pon;
        this.getOrderInfo();
      } else {
        $('input').focus();
      }


      $(window).scroll(function () {
        let design = $('#design').offset().top
          , measure = $('#measure').offset().top
          , userInfo = $('#userInfo').offset().top
          , curTop = $(this).scrollTop() + 100;

        if (curTop < design || curTop < measure) {
          _this.curTag = 'design';
        } else if (curTop > design && curTop < userInfo) {
          _this.curTag = 'measure';
        } else {
          _this.curTag = 'userInfo';
        }
      });
    },
    beforeDestroy: function () {
      $(window).unbind('scroll');
    },
    methods: {
      getOrderInfo: function () {
        let _this = this;

//        this.orderNo = '010170807144761';
        if (!this.orderNo) {
          return Message({
            message: '请输入订单号查询',
            type: 'warning'
          });
        }
        store.set('pad-orderNo', this.orderNo);
        this.ajax.post('/web/getOrderDataByOrderNo',
          {orderNo: this.orderNo},
          {api: 'appApi', ignoreToken: true})
          .then(function (data) {
            _this.orderInfo = _this.filterInfo(data);
          });
      },
      filterInfo: function (data) {
        let orderBadyConfig;

        if (data.designUrl) {
          data.new_designUrl = data.designUrl.split(',');
        }
        if (data.userUploadPics) {
          data.new_userUploadPics = data.userUploadPics.split(';');
        }

        orderBadyConfig = {
          'JacketShoulderVolume': '总长(肩顶量)',
          'JacketFront': '前衣长',
          'JacketBack': '后中长',
          'JacketBust': '胸围',
          'JacketAroundTheBelly': '肚围',
          'JacketWaistline': '腰围',
          'JacketHipline': '臀围',
          'JacketSweep': '摆围',
          'JacketShoulderWidth': '肩宽',
          'JacketSleeveLeft': '袖长-左',
          'JacketSleeveRight': '袖长-右',
          'JacketBustTop': '上胸围',
          'JacketChestWidth': '前胸宽',
          'JacketBackWidth': '后背宽',
          'JacketCuff': '袖口',
          'JacketNeck': '领围',
          'JacketShoulderSleeve': '肩到袖',
          'JacketSleeveFat': '袖肥',
          'JacketNeckAndShoulder': '(参考)肩颈-腹高点',
          'DressWaistline': '腰围',
          'DressHipline': '臀围',
          'DressRise': '直裆',
          'DressTotalSize': '总浪',
          'DressWithinLong': '内长',
          'DressBarre': '横裆',
          'DressKneeCircumference': '膝围',
          'DressCalfGirth': '小腿围',
          'DressPantsLong': '裤/群长',
          'DressBustTop': '上胸围',
          'DressChestWidth': '前胸宽',
          'DressBackWidth': '后背宽',
          'DressCuff': '袖口',
          'DressNeck': '领围',
          'DressWaistlineWidth': '腰宽',
          'DressBigthigh': '大腿围',
          'DressPants': '裤口'
        };

        // 电子量体数据过滤
        data.first_ElectronMeasure = [];
        data.last_ElectronMeasure = [];
        _.map(JSON.parse(data.orderBady), function (val) {
          val.name_str = orderBadyConfig[val.id.trim()];
          if (val.id.indexOf('Dress') !== 0) {
            data.first_ElectronMeasure.push(val);
          } else {
            data.last_ElectronMeasure.push(val);
          }
        });


        // 用户真实量体数据
        data.first_storeCustomerBodyList = [];// 真实量体数据-前
        data.last_storeCustomerBodyList = [];// 真实量体数据-后
        _.map(data.storeCustomerBodyList, function (val, index) {
          if (index < data.storeCustomerBodyList.length / 2) {
            data.first_storeCustomerBodyList.push(val)
          } else {
            data.last_storeCustomerBodyList.push(val);
          }
        });

        return data;
      },
      goTag: function (id) {
        this.curTag = id;
        $('html,body').scrollTop($('#' + id).offset().top - 90);
      }
    }
  }
</script>

<style>

  .pad-index .search-box .el-input__inner {
    border: none;
    border-radius: 3px;
    background-color: #ffffff;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25);
    width: 100%;
    height: 40px;
  }

  .pad-index .el-icon-search {
    color: #aeaeae;
    font-size: 20px;
  }
</style>
<style scoped>
  .pad-header {
    height: 70px;
    line-height: 70px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #e91e63;
    z-index: 9;
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.25);
  }

  .pad-header .menu {
    padding-left: 15px;
  }

  .pad-header .menu li {
    display: inline-block;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 16px;
    color: #f6a5c0;
    position: relative;
    cursor: pointer;
  }

  .pad-header .menu li.active {
    color: #ffffff;;
  }

  .pad-header .menu li:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 100%;
    background-color: #e91e63;
    transition: all .8s;
  }

  .pad-header .menu li.active:after {
    background-color: #ffffff;

  }

  .content-box {
    padding: 94px 24px 24px 24px;
    /*position: absolute;*/
    min-height: 100%;
    width: 100%;
    background-color: #ffffff;
    box-sizing: border-box;
  }

  .search-box {
    width: 250px;
    position: absolute;
    right: 24px;
    top: 0;
    z-index: 10;
    line-height: 70px;
  }

  .design-des {
    font-size: 14px;
    line-height: 24px;
  }

  .design-img {
    width: 30%;
    height: calc((100vw - 48px) * 0.3 * 1.15);
    margin-right: 4%;
    margin-bottom: 20px;
    float: left;
    text-align: center;
    border: solid 1px #979797;
    transition: all 1s;
  }

  .design-img:before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  .design-img:nth-child(3n) {
    margin-right: 0;
  }

  .design-img img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }

  .design-img-box {
    margin-top: 24px;
  }

  #measure:after,
  .design-img-box:after {
    content: '';
    display: block;
    clear: both;
  }

  .pad-index .title {
    font-size: 24px;
    font-weight: 600;
  }

  .pad-index table.dx-table {
    margin-top: 24px;
  }

  .pad-index table.dx-table tr:first-child,
  .pad-index table.dx-table tr th,
  .pad-index table.dx-table tr td,
  .pad-index .dx-table {
    border-color: #e5e5e5;
  }

  .pad-index table.measure-table tr th {
    line-height: 56px;
    background-color: #ffffff;
  }

  .pad-index table.measure-table tr th:first-child {
    background-color: #fafafa;
  }

  .pad-index table.dx-table tr td {
    line-height: 39px;
    background-color: #fcfcfc;
  }

  .pad-index table.dx-table tr td:nth-child(2n) {
    background-color: #ffffff;
  }

  .pad-index table.dx-table {
    float: left;
  }

  .pad-index table.dx-table:last-child {
    border-left: none;
  }

</style>
