<template>
  <div class="order-list-info" v-bind:class="{'print-mode':showPrintPreview}">
    <div class="oli-box">
      <blockquote class="quote-box">
        订单状态：<span v-text="orderInfo.tache_str"></span>
        <div style="position: absolute;right: 20px;top: 8px">
          <el-button type="primary"
                     v-if="orderInfo.tacheId == '10'"
                     @click="showOperateFormBox(0)">接受
          </el-button>
          <el-button type="primary"
                     v-if="orderInfo.tacheId == '10'"
                     @click="showOperateFormBox(1)">拒绝
          </el-button>
          <el-button type="primary" @click="printPreview(true)">打印</el-button>
          <el-button type="primary" style="background-color: #ffffff;color: #666;border-color: #e2e2e2"
                     @click="$router.go(-1)">返回
          </el-button>
        </div>
      </blockquote>

      <fieldset class="field-box basic-info">
        <legend>基本信息</legend>
        <ul>
          <li>订单编号：<span v-text="orderInfo.orderNo"></span></li>
          <li>订单类型：<span v-text="taskInfo.fitting === 0 ? '正常不含胚订单' : '正常含胚订单'"></span></li>
          <li>服装类型：
            <span
              v-text="orderInfo.firstCategoryName + ' - ' + orderInfo.secondCategoryName + ' - ' + orderInfo.thirdCategoryName"></span>
          </li>
          <li>定制数量：<span v-text="taskInfo.orderQuantity + '件'"></span></li>
          <li>工艺单创建时间：<span v-text="orderInfo.createDateStr"></span></li>
        </ul>
        <ul>
          <li>商家名称：<span v-text="orderInfo.storeName"></span></li>
          <li>商家电话：<span v-text="orderInfo.storePhone"></span></li>
          <li>商家地址：<span v-text="orderInfo.storeAddress"></span></li>
          <li>设计师名称：<span v-text="orderInfo.designerName"></span></li>
          <li>设计师电话：<span v-text="orderInfo.designerPhone"></span></li>
        </ul>
      </fieldset>

      <fieldset class="field-box" style="margin: 10px;" v-bind:class="{'dx-hide':showPrintPreview}">
        <legend>版式图下载</legend>
        <p style="cursor: pointer;color: rgb(0, 102, 204)"
           v-for="item in taskInfo.cadUrl">
          <i class="iconfont icon-xiazai" style="font-size: 20px" @click="downloadFile(item.url)"></i>
          <span v-text="item.name" @click="downloadFile(item.url)"></span>
        </p>
      </fieldset>
      <!--<fieldset class="field-box" style="margin: 10px;">
        <legend>处理信息</legend>
        <p>正在开发...</p>
      </fieldset>-->

      <fieldset class="field-box orderInfo" style="margin: 10px;">
        <legend>顾客下单信息</legend>
        <p class="title">用户提供图片</p>
        <div class="img-box">
          <img v-for="item in orderInfo.pictures" v-bind:src="item">
        </div>
        <p class="title">用户备注</p>
        <span style="display: block; width: 100%; margin-left: 10px;"
              v-text="orderInfo.description">
        </span>
      </fieldset>

      <fieldset class="field-box designInfo" style="margin: 10px;">
        <legend>工艺单信息</legend>

        <p class="title">基本信息</p>
        <div class="child-box">
          <span style="display: inline-block;margin-right: 30px">定制数量：{{taskInfo.orderQuantity}}件</span>
          <span>胚样试衣：{{taskInfo.fitting === 0 ? '否' : '是'}}</span>
        </div>

        <p class="title">设计稿及设计说明</p>
        <div class="img-box">
          <img style="width: 95%" v-for="item in taskInfo.designUrl" v-bind:src="item">
        </div>

        <p class="title">设计师要求</p>
        <div class="child-box">
          <p v-text="taskInfo.designDescription"></p>
        </div>

        <p class="title">款式</p>
        <div class="child-box">
          <span v-for="item in taskInfo.orderTypeStr">
          <el-tag type="gray"
                  style="margin-right: 10px">{{item}}</el-tag>
          </span>
        </div>

        <p class="title">量体表</p>
        <p style="margin-bottom: 10px">电子量体表</p>

        <div class="table">
          <table class="dx-table" width="40%">
            <tr>
              <td width="28%">上衣</td>
              <td width="24%">净寸</td>
              <td width="24%">版师建议尺寸</td>
              <td width="24%">设计师确定成衣尺寸</td>
            </tr>
            <tr v-for="item in taskInfo.first_ElectronMeasure">
              <td v-text="item.name_str"></td>
              <td v-text="item.size"></td>
              <td v-text="item.SampleDesignerSize"></td>
              <td v-text="item.designerSize"></td>
            </tr>
          </table>
          <table class="dx-table" width="40%">
            <tr>
              <td width="28%">上衣</td>
              <td width="24%">净寸</td>
              <td width="24%">版师建议尺寸</td>
              <td width="24%">设计师确定成衣尺寸</td>
            </tr>
            <tr v-for="item in taskInfo.last_ElectronMeasure">
              <td v-text="item.name_str"></td>
              <td v-text="item.size"></td>
              <td v-text="item.SampleDesignerSize"></td>
              <td v-text="item.designerSize"></td>
            </tr>
          </table>
        </div>


        <p style="margin-bottom: 10px">客户真实量体表</p>
        <div class="realData">
          <table class="dx-table" width="40%" style="float: left;">
            <tr v-for="item in taskInfo.first_storeCustomerBodyList">
              <td v-text="item.labelName"></td>
              <td v-text="item.strSize"></td>
            </tr>
          </table>
          <table class="dx-table" width="40%" style="float: left;border-left: none">
            <tr v-for="item in taskInfo.last_storeCustomerBodyList">
              <td v-text="item.labelName"></td>
              <td v-text="item.strSize"></td>
            </tr>
          </table>
        </div>

        <p class="title">客户量体图片</p>
        <div class="img-box">
          <img v-for="item in taskInfo.customerBodyPicList"
               v-bind:src="item.pictureUrl">
        </div>

        <div class="img-box">
          <p style="width: 100%">客户要求：
            <span v-text="orderInfo.description"></span>
          </p>
        </div>


        <p class="title">面料信息</p>
        <table class="dx-table" width="80%">
          <tr>
            <td width="10%">面料</td>
            <td width="20%">编号</td>
            <td width="20%">色号</td>
            <td width="30%">图片</td>
            <td width="20%">备注</td>
          </tr>
          <tr v-for="item in taskInfo.lining">
            <td></td>
            <td v-text="item.serialNumber"></td>
            <td v-text="item.colourNumber"></td>
            <td>
              <img style="max-height: 80px" v-bind:src="item.pictrue">
            </td>
            <td v-text="item.remark"></td>
          </tr>
        </table>
        <table class="dx-table" width="80%" style="margin-bottom: 20px">
          <tr>
            <td width="10%">里料</td>
            <td width="20%">编号</td>
            <td width="20%">色号</td>
            <td width="30%">图片</td>
            <td width="20%">备注</td>
          </tr>
          <tr v-for="item in taskInfo.material">
            <td></td>
            <td v-text="item.serialNumber"></td>
            <td v-text="item.colourNumber"></td>
            <td>
              <img style="max-height: 80px" v-bind:src="item.pictrue">
            </td>
            <td v-text="item.remark"></td>
          </tr>
        </table>

        <p class="title">辅料信息</p>
        <div class="img-box">
          <ul class="otherLining">
            <li v-for="item in taskInfo.accessory">
              <img v-bind:src="item.picture">
              <p v-text="item.rawMaterials"></p>
            </li>
          </ul>
        </div>
      </fieldset>
    </div>


    <el-dialog
      :title="operateForm.type == 1 ? '拒绝' : '接收'"
      :visible.sync="showOperateForm" size="tiny">
      <el-form :model="operateForm" label-width="80px" style="max-width: 400px">
        <el-form-item label="负责人" :required="true">
          <el-input v-model="operateForm.name" placeholder="负责人"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="operateForm.phone" placeholder="联系电话"></el-input>
        </el-form-item>
        <el-form-item :label="operateForm.type == 1 ? '拒绝原因' : '备注'"
                      :required="!!operateForm.type">
          <el-input type="textarea" v-model="operateForm.remark"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="showOperateForm = false">取 消</el-button>
        <el-button type="primary" @click="submitOperateForm">确 定</el-button>
      </div>
    </el-dialog>

    <div class="print-shade" @click="printPreview(false)"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import _ from 'underscore'
  import {buttonGroup, tag, button, tableColumn, table, dialog, Message} from 'element-ui'


  Vue.use(button);
  Vue.use(tableColumn);
  Vue.use(table);
  Vue.use(tag);
  Vue.use(buttonGroup);
  Vue.use(dialog);

  export default {
    name: 'test',
    data: function () {
      return {
        showPrintPreview: false,
        orderInfo: {
          firstCategoryName: '',
          secondCategoryName: '',
          thirdCategoryName: ''
        },
        taskInfo: {
          orderQuantity: 0
        },
        showOperateForm: false,
        operateForm: {
          orderNo: '',
          name: '',
          phone: '',
          remark: '',
          type: ''
        },
      }
    },
    created: function () {
      this.getInfo();
      this.$parent.updateBreadcrumb([
        {name: '订单管理'},
        {name: '订单列表', path: '/order'},
        {name: this.$route.meta.name}
      ]);
    },
    methods: {
      getInfo: function () {
        let _this = this;
        // 订单详情
        this.ajax.get('/order/getOrderInfoDetil', {orderNo: this.$route.query.id})
          .then(function (data) {
            _this.orderInfo = _this.filterOrderData(data);
          });

        // 工艺单详情
        this.ajax.get('/order/getTaskOrderInfoDetil', {orderNo: this.$route.query.id})
          .then(function (data) {
            _this.taskInfo = _this.filterTaskData(data);
          });
      },
      filterOrderData: function (data) {
        // 订单状态
        switch (parseInt(data.tacheId)) {
          case 8:
          case 9:
            data.tache_str = '待商家修改';
            break;
          case 10:
            data.tache_str = '待接单';
            break;
          case 11:
            data.tache_str = '生产中';
            break;
          default:
            data.tache_str = '已完成';
            break;
        }

        // 用户图片
        if (data.pictures) {
          data.pictures = _.compact(data.pictures.split(';'));
        }

        return data;
      },
      filterTaskData: function (data) {
        let orderBadyConfig
          , orderTypeConfig
          , _this = this;

        data.first_ElectronMeasure = []; // 电子量体数据-前
        data.last_ElectronMeasure = [];// 电子量体数据-后
        data.first_storeCustomerBodyList = [];// 真实量体数据-前
        data.last_storeCustomerBodyList = [];// 真实量体数据-后
        orderTypeConfig = [
          '单排扣', '领型', '里款式', '过面', '胸兜', '袖扣', '外珠边', '色丁礼服', '汗巾', '内部兜', '双排扣', '驳头宽', '开起', '内兜牙', '腰兜', '袖口衩', '内珠边', '放开叉带', '袖里', '工艺'
        ];
        orderBadyConfig = {
          'JacketShoulderVolume': '总长(肩顶量)',
          'JacketFront': '前衣长',
          'JacketBack': '后中长',
          'JacketBust': '胸围',
          'trName': '胸围',
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
          'JacketNeckAndShoulder': '(参考)肩颈-腹高点',
          'DressWaistline': '腰围',
          'DressHipline': '臀围',
          'DressRise': '直裆',
          'DressTotalSize': '总浪',
          'DressWithinLong': '内长',
          'DressBarre': '横裆',
          'DressKneeCircumference': '膝围',
          'DressCalfGirth': '小腿围',
          'DressPants': '裤口',
          'DressBustTop': '上胸围',
          'DressChestWidth': '前胸宽',
          'DressBackWidth': '后背宽',
          'DressCuff': '袖口',
          'DressNeck': '领围'
        };

        // 电子量体数据过滤
        _.map(JSON.parse(data.orderBady), function (val, index) {
          val.name_str = orderBadyConfig[val.id];
          if (index <= 16) {
            data.first_ElectronMeasure.push(val);
          } else {
            data.last_ElectronMeasure.push(val);
          }
        });

        // 款式数据过滤
        data.orderTypeStr = [];
        _.map(JSON.parse(data.orderType), function (val) {
          val = parseInt(val);
          orderTypeConfig[val] && data.orderTypeStr.push(orderTypeConfig[val]);
        });

        // 设计图片
        if (data.designUrl) {
          data.designUrl = _.compact(data.designUrl.split(','));
        }

        // 用户真实量体数据
        _.map(data.storeCustomerBodyList, function (val, index) {
          if (index < data.storeCustomerBodyList.length / 2) {
            data.first_storeCustomerBodyList.push(val)
          } else {
            data.last_storeCustomerBodyList.push(val);
          }
        });

        data.lining = JSON.parse(data.lining);
        data.material = JSON.parse(data.material);
        data.accessory = JSON.parse(data.accessory);
        data.cadUrl = JSON.parse(data.cadUrl);

        return data;
      },
      showOperateFormBox: function (type) {
        this.operateForm.type = type;
        this.showOperateForm = true;
      },
      submitOperateForm: function () {
        let _this = this;

        if (!this.operateForm.name) {
          return Message({
            message: '请填写负责人',
            type: 'warning'
          });
        }

        if (!this.operateForm.remark && this.operateForm.type === 1) {
          return Message({
            message: '请填写拒绝原因',
            type: 'warning'
          });
        }

        this.operateForm.orderNo = this.orderInfo.orderNo;

        this.ajax.post('/order/receiveOrderInfo',this.operateForm)
          .then(function () {
            Message({
              message: '已{0}'.format(_this.operateForm.type === 1 ? '拒绝，等待商家修改' : '接收成功'),
              type: 'success'
            });
            _this.getInfo();
            _this.showOperateForm = false;
          });
      },
      printPreview: function (type) {
        this.$parent.$emit('full-screen', type);
        this.showPrintPreview = type;
        type && setTimeout(function () {
          window.print();
        }, 0);
      },
      downloadFile: function (url) {
        // ...
        window.open(url);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .order-list-info {
    padding: 20px;
  }

  .order-list-info .oli-box {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    box-sizing: border-box;
    border: solid 1px rgba(204, 204, 204, 1);
    padding: 10px;
  }

  .oli-box .quote-box {
    position: relative;
    margin: 10px;
    padding: 15px;
    line-height: 22px;
    -webkit-border-radius: 0 2px 2px 0;
    border-radius: 0 2px 2px 0;
    background-color: #f2f2f2;
    border-left: 5px solid rgb(41, 30, 20);
  }

  .oli-box .field-box {
    padding: 20px;
    margin: 10px;
    border: none;
    border-top: 1px solid #e2e2e2;
  }

  .oli-box .field-box legend {
    margin-left: 0;
    padding: 0 10px;
    font-size: 18px;
    font-weight: 500;
  }

  .oli-box .field-box .title {
    margin-bottom: 20px;
    font-size: 14px;
    position: relative;
  }

  .oli-box .field-box .title:before {
    content: '';
    position: absolute;
    left: -10px;
    top: 4px;
    height: 16px;
    width: 4px;
    background-color: #c2c2c2;
  }

  .oli-box .basic-info ul {
    padding-right: 50px;
    margin-right: 50px;
    border-right: solid 1px rgba(204, 204, 204, 1);
    display: inline-block;
  }

  .oli-box .basic-info ul:last-child {
    border: none;
  }

  .oli-box .basic-info ul li {
    font-size: 14px;
    color: #333333;
    line-height: 34px;
  }

  .oli-box .field-box .img-box {
    width: 100%;
    padding-left: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: 10px;
    overflow: hidden;
  }

  .oli-box .field-box .img-box:after {
    content: '';
    clear: both;
  }

  .oli-box .field-box .img-box > img {
    width: 19%;
    margin-right: 1%;
    float: left;
    margin-bottom: 10px;
  }

  .oli-box .el-table th,
  .oli-box .el-table th .cell {
    background-color: #ffffff;
    line-height: 20px;
    font-size: 12px;
  }

  .oli-box .el-table td .cell {
    line-height: 20px;
    font-size: 12px;
  }

  .oli-box .designInfo .table table {
    margin-right: 2%;
    display: inline-block;
    margin-bottom: 20px;
    vertical-align: top;
  }

  .oli-box .designInfo .table-bottom {
    text-align: left;
    max-height: 100px;
    overflow: auto;
    border: 1px solid #e2e2e2;
    border-top: none;
    padding: 10px;
    font-size: 12px;
    margin-top: -3px;
  }

  .oli-box .designInfo .child-box {
    width: 100%;
    margin-left: 10px;
    margin-bottom: 10px;
  }

  .oli-box .otherLining li {
    width: 19%;
    margin-right: 1%;
    float: left;
    margin-bottom: 10px;
    overflow: hidden;
  }

  .oli-box .otherLining:after {
    content: '';
    clear: both;
  }

  .oli-box .otherLining li img {
    max-height: 100px;
  }

  .oli-box .realData {
    overflow: hidden;
    margin-bottom: 20px;
  }

  .oli-box .realData tr td:first-child {
    background-color: #f2f2f2;
    width: 40%;
  }

  .oli-box .realData:after {
    content: '';
    clear: both;
  }

  /*打印样式*/
  .order-list-info.print-mode {
    padding: 0;
  }

  .order-list-info.print-mode .oli-box {
    border: none;
    padding-left: 0;
    padding-right: 0;
  }

  .order-list-info.print-mode .quote-box {
    display: none;
  }

  .order-list-info.print-mode .print-shade {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
  }
</style>
