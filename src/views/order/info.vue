<template>
  <div class="order-list-info" v-bind:class="{'print-mode':showPrintPreview}">
    <div class="oli-box">
      <blockquote class="quote-box">
        订单状态：<span v-text="orderInfo.tacheId"></span>
        <div style="position: absolute;right: 20px;top: 8px">
          <el-button type="primary"
                     v-if="orderInfo.tacheId === '待接单'"
                     @click="showOperateFormBox(0,0)">
            接受
          </el-button>
          <el-button type="primary"
                     v-if="orderInfo.tacheId === '待接单'"
                     @click="showOperateFormBox(1,1)">
            拒绝
          </el-button>
          <el-button type="primary"
                     v-if="orderInfo.tacheId === '待分配'"
                     @click="showOperateFormBox(2,taskInfo.isRework == 1 || taskInfo.isRework == 2 ? 1 : 0)">
            分配
          </el-button>
          <el-button type="primary"
                     v-if="orderInfo.tacheId === '生产中'"
                     @click="showUpdateOperateBox()">
            更改生产状态
          </el-button>
          <el-button type="primary"
                     v-if="orderInfo.tacheId === '待质检'"
                     @click="showOperateFormBox(3,1)">
            质检通过
          </el-button>
          <el-button type="primary"
                     v-if="orderInfo.tacheId === '待质检'"
                     @click="showOperateFormBox(4,2)">
            质检不通过
          </el-button>
          <el-button type="primary"
                     v-if="orderInfo.tacheId === '待发货'"
                     @click="showOperateFormBox(5,'TX自物流')">
            发货
          </el-button>
          <el-button type="primary"
                     v-if="orderInfo.tacheId === '待工厂收货'"
                     @click="showOperateFormBox(6,0)">
            确认收货
          </el-button>
          <el-button type="primary" @click="printPreview(true)">打印</el-button>
          <el-button type="primary" style="background-color: #ffffff;color: #666;border-color: #e2e2e2"
                     @click="$router.push({path:'/order'})">返回
          </el-button>
        </div>
      </blockquote>

      <fieldset class="field-box basic-info" id="basic-info">
        <legend>基本信息</legend>
        <ul>
          <li>订单编号：<span v-text="orderInfo.orderNo"></span></li>
          <li>订单类型：<span v-text="taskInfo.fitting"></span></li>
          <li>服装类型：
            <span
              v-text="orderInfo.firstCategoryName + ' - ' + orderInfo.secondCategoryName + ' - ' + orderInfo.thirdCategoryName"></span>
          </li>
          <li>定制数量：<span v-text="taskInfo.orderQuantity + '件'"></span></li>
          <li>工艺单创建时间：<span v-text="orderInfo.createDateStr"></span></li>
        </ul>
        <ul>
          <li>门店名称：<span v-text="orderInfo.storeName"></span></li>
          <li>门店电话：<span v-text="orderInfo.storePhone"></span></li>
          <li>门店地址：<span v-text="orderInfo.storeAddress"></span></li>
          <li>设计师姓名：<span v-text="orderInfo.designerName"></span></li>
          <li>设计师电话：<span v-text="orderInfo.designerPhone"></span></li>
        </ul>
      </fieldset>

      <fieldset class="field-box" id="field-img" style="margin: 10px;" v-bind:class="{'dx-hide':showPrintPreview}">
        <legend>版式图下载</legend>
        <p style="cursor: pointer;color: rgb(0, 102, 204)"
           v-for="item in taskInfo.cadUrl">
          <i class="iconfont icon-xiazai" style="font-size: 20px" @click="downloadFile(item.url)"></i>
          <span v-text="item.name" @click="downloadFile(item.url)"></span>
        </p>
      </fieldset>

      <fieldset class="field-box" v-bind:class="{'dx-hide':showPrintPreview}" style="margin: 10px;">
        <legend>处理信息</legend>
        <el-collapse v-model="collapseShow">
          <el-collapse-item v-for="(item,index) in taskOrderStep" :key="index" v-if="item.statusName" :name="index">
            <template slot="title">
              <span style="font-weight: bold" v-text="item.statusName"></span>
              <span style="display: inline-block;margin-left: 10px;color: #47A447"
                    v-text="item.operatorCode === 2 ? '[门店]' : ''"></span>
            </template>
            <span class="content-item" v-if="item.updateDateStr">操作时间：{{item.updateDateStr}}</span>
            <span class="content-item" v-if="item.principalName">负责人：{{item.principalName}}</span>
            <span class="content-item" v-if="item.principalPhone">负责人电话：{{item.principalPhone}}</span>
            <br>
            <span class="content-item"
                  v-if="item.expressType">配送方式：{{item.expressType === '1' ? '第三方物流' : 'TX自物流'}}</span>
            <span class="content-item" v-if="item.expressCompanyName">快递公司：{{item.expressCompanyName}}</span>
            <span class="content-item" v-if="item.expressNo">快递单号：{{item.expressNo}}</span>
            <p v-if="item.storeRemark">备注：{{item.storeRemark}}</p>
            <div class="img-box" style="margin-top: 10px">
              <img v-for="imgItem in item.img" v-bind:src="imgItem" v-img-preview="imgItem">
            </div>
          </el-collapse-item>
        </el-collapse>
      </fieldset>

      <fieldset class="field-box orderInfo" style="margin: 10px;" id="order-info">
        <legend>顾客下单信息</legend>
        <p class="title">用户提供图片</p>
        <div class="img-box">
          <div class="back-img" v-for="item in orderInfo.pictures"
               :style="{backgroundImage:'url(' + item + ')'}" v-img-preview="item"></div>
          <!--<img v-for="item in orderInfo.pictures" v-bind:src="item" v-img-preview="item">-->
        </div>
        <p class="title">用户备注</p>
        <span style="display: block; width: 100%; margin-left: 10px;"
              v-text="orderInfo.description">
        </span>
      </fieldset>

      <fieldset class="field-box designInfo" id="design-info" style="margin: 10px;">
        <legend>工艺单信息</legend>

        <p class="title">基本信息</p>
        <div class="child-box">
          <span style="display: inline-block;margin-right: 30px">定制数量：{{taskInfo.orderQuantity}}件</span>
          <span>胚样试衣：{{taskInfo.fitting === '正常不含胚订单' || taskInfo.fitting === '返工不含胚' ? '否' : '是'}}</span>
        </div>

        <p class="title">设计稿及设计说明</p>
        <div class="img-box">
          <div class="back-img" v-for="item in taskInfo.designUrl"
               v-img-preview="item"
               :style="{backgroundImage:'url(' + item + ')',width: showPrintPreview ? '95%' : '19%',paddingTop:showPrintPreview ? '95%' : '19%'}"></div>
          <!--<img v-bind:style="{width: showPrintPreview ? '95%' : '19%'}" v-for="item in taskInfo.designUrl"
               v-bind:src="item" v-img-preview="item">-->
        </div>

        <p class="title">设计师要求</p>
        <div class="child-box">
          <p v-html="taskInfo.designDescription" style="width: 70%"></p>
        </div>

        <!--<p class="title">款式</p>
        <div class="child-box">
          <span v-for="item in taskInfo.orderTypeStr">
          <el-tag type="gray"
                  style="margin-right: 10px">{{item}}</el-tag>
          </span>
        </div>-->

        <p class="title">量体表</p>
        <p style="margin-bottom: 10px">设计尺寸表</p>

        <div class="realData">
          <table class="dx-table" width="40%" style="float: left;">
            <tr>
              <td width="50%">上衣</td>
              <td width="50%">成衣尺寸</td>
              <!--<td width="24%">版师建议尺寸</td>
              <td width="24%">设计师确定成衣尺寸</td>-->
            </tr>
            <tr v-for="item in taskInfo.first_ElectronMeasure">
              <td v-text="item.name_str"></td>
              <td v-text="item.designerSize || '-'"></td>
              <!--<td v-text="item.SampleDesignerSize"></td>
              <td v-text="item.designerSize"></td>-->
            </tr>
          </table>
          <table class="dx-table" width="40%" style="float: left;border-left: none">
            <tr>
              <td width="50%">下衣/裙装</td>
              <td width="50%">成衣尺寸</td>
              <!--<td width="24%">版师建议尺寸</td>
              <td width="24%">设计师确定成衣尺寸</td>-->
            </tr>
            <tr v-for="item in taskInfo.last_ElectronMeasure">
              <td v-text="item.name_str"></td>
              <td v-text="item.designerSize || '-'"></td>
              <!--<td v-text="item.SampleDesignerSize"></td>
              <td v-text="item.designerSize"></td>-->
            </tr>
          </table>
        </div>


        <p style="margin-bottom: 10px">顾客净寸表</p>
        <div class="realData">
          <table class="dx-table" width="40%" style="float: left;">
            <tr v-for="item in taskInfo.first_storeCustomerBodyList">
              <td width="50%" v-text="item.labelName"></td>
              <td width="50%" v-text="item.strSize || '-'"></td>
            </tr>
          </table>
          <table class="dx-table" width="40%" style="float: left;border-left: none">
            <tr v-for="item in taskInfo.last_storeCustomerBodyList">
              <td width="50%" v-text="item.labelName"></td>
              <td width="50%" v-text="item.strSize || '-'"></td>
            </tr>
          </table>
        </div>

        <p class="title">客户量体图片</p>
        <div class="img-box">
          <!--<img v-for="item in taskInfo.customerBodyPicList"
               v-bind:src="item.pictureUrl" v-img-preview="item.pictureUrl">-->
          <div class="back-img" v-for="item in taskInfo.customerBodyPicList"
               :style="{backgroundImage:'url(' + item.pictureUrl + ')'}" v-img-preview="item.pictureUrl"></div>
        </div>

        <div class="img-box">
          <p style="width: 100%">客户要求：
            <span v-text="orderInfo.description"></span>
          </p>
        </div>


        <p class="title">面料信息</p>
        <table class="dx-table" width="80%">
          <tr>
            <td width="20%">编号</td>
            <td width="20%">色号</td>
            <td width="40%">图片</td>
            <td width="20%">备注</td>
          </tr>
          <tr v-for="item in taskInfo.lining">
            <td v-text="item.serialNumber"></td>
            <td v-text="item.colourNumber"></td>
            <td>
              <img style="max-height: 80px"
                   v-if="item.pictrue || item.picture"
                   v-bind:src="item.pictrue || item.picture"
                   v-img-preview="item.pictrue || item.picture">
            </td>
            <td v-text="item.remark"></td>
          </tr>
        </table>

        <p class="title" style="margin-top: 20px">里料信息</p>
        <table class="dx-table" width="80%" style="margin-bottom: 20px">
          <tr>
            <td width="20%">编号</td>
            <td width="20%">色号</td>
            <td width="40%">图片</td>
            <td width="20%">备注</td>
          </tr>
          <tr v-for="item in taskInfo.material">
            <td v-text="item.serialNumber"></td>
            <td v-text="item.colourNumber"></td>
            <td>
              <img style="max-height: 80px"
                   v-if="item.pictrue || item.picture"
                   v-bind:src="item.pictrue || item.picture"
                   v-img-preview="item.pictrue || item.picture">
            </td>
            <td v-text="item.remark || ''"></td>
          </tr>
        </table>

        <p class="title">辅料信息</p>
        <table class="dx-table" width="80%" style="margin-bottom: 20px">
          <tr>
            <td width="20%">名称</td>
            <td width="20%">编号</td>
            <td width="40%">图片</td>
            <td width="20%">备注</td>
          </tr>
          <tr v-for="item in taskInfo.accessory">
            <td v-text="item.rawMaterials"></td>
            <td v-text="item.match"></td>
            <td>
              <img style="max-height: 80px"
                   v-if="item.pictrue || item.picture"
                   v-bind:src="item.pictrue || item.picture"
                   v-img-preview="item.pictrue || item.picture">
            </td>
            <td v-text="item.remark"></td>
          </tr>
        </table>
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

    <ul class="tag-box" v-bind:class="{'dx-hide':showPrintPreview}">
      <li @click="goTag('basic-info')">基本信息</li>
      <li @click="goTag('field-img')">版式图下载</li>
      <li @click="goTag('order-info')">顾客下单信息</li>
      <li @click="goTag('design-info')">工艺单信息</li>
    </ul>


    <!--接收/拒绝/分配/质检/发货  弹窗-->
    <el-dialog
      :title="operateForm.titleList[operateForm.showType]"
      :visible.sync="showOperateForm" size="tiny">
      <el-form :model="operateForm" label-width="80px" style="max-width: 400px">
        <el-form-item label="配送方式" v-if="operateForm.showType === 5">
          <el-radio-group v-model="operateForm.type">
            <el-radio label="TX自物流"></el-radio>
            <el-radio label="第三方物流"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="负责人" :required="true">
          <el-input v-model="operateForm.name" placeholder="负责人"></el-input>
        </el-form-item>

        <el-form-item label="联系电话">
          <el-input v-model="operateForm.phone" placeholder="联系电话"></el-input>
        </el-form-item>

        <el-form-item label="快递公司" :required="true"
                      v-if="operateForm.showType === 5"
                      v-show="operateForm.type === '第三方物流'">
          <el-select v-model="operateForm.expressCompanyId" placeholder="快递公司" style="width: 100%">
            <el-option v-for="(item,index) in expressCompany" :key="index" :label="item.companyName"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="快递单号" :required="true"
                      v-if="operateForm.showType === 5"
                      v-show="operateForm.type === '第三方物流'">
          <el-input v-model="operateForm.expressNo" placeholder="快递单号"></el-input>
        </el-form-item>

        <el-form-item label="生产状态" :required="true"
                      v-if="operateForm.showType === 2"
                      v-show="operateForm.type === 1">
          <el-select v-model="operateForm.tacheId" placeholder="生产状态" style="width: 100%">
            <!--<el-option label="已打版" value="2"></el-option>-->
            <el-option label="已领料" value="3"></el-option>
            <el-option label="已裁剪" value="4"></el-option>
            <el-option label="已缝制" value="6"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注"
                      v-if="operateForm.showType !== 1">
          <el-input type="textarea" v-model="operateForm.remark"></el-input>
        </el-form-item>

        <el-form-item label="拒绝原因"
                      v-if="operateForm.showType === 1"
                      :required="true">
          <el-input type="textarea" v-model="operateForm.remark"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="showOperateForm = false">取 消</el-button>
        <el-button type="primary" @click="submitOperateForm">确 定</el-button>
      </div>
    </el-dialog>

    <!--更新生产状态 弹窗 :close-on-click-modal="false"-->
    <el-dialog title="更新生产状态" size="large" :visible.sync="showUpdateOperate">
      <el-steps :space="100/updateOrderStep.length + '%'"
                finish-status="success"
                :active="updateOrderStepActive"
                :center="true">
        <el-step v-for="(item,index) in updateOrderStep" :key="index"
                 :icon="index === updateOrderStepActive ? 'edit' : ''">
          <b slot="title" v-text="item.title"
             v-if="index !== updateOrderStepActive"></b>

          <!--编辑更新信息框-->
          <div slot="title" v-if="index === updateOrderStepActive">
            <el-popover
              placement="bottom"
              width="300"
              v-model="showUpdateOperateForm"
              trigger="click">
              <el-form :inline="true" :model="orderStepFrom" label-width="80px">
                <el-form-item label="负责人" :required="true" v-if="index !== 0">
                  <el-input v-model="orderStepFrom.name" placeholder="负责人"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" v-if="index !== 0">
                  <el-input v-model="orderStepFrom.phone" placeholder="联系电话"></el-input>
                </el-form-item>
                <el-form-item :label="index === 0 ? '开始时间' : '完成时间'" :required="true">
                  <el-date-picker
                    v-model="orderStepFrom.recordDate"
                    type="datetime"
                    :clearable="false"
                    format="yyyy-MM-dd HH:mm"
                    :editable="false"
                    placeholder="选择时间">
                  </el-date-picker>
                </el-form-item>

                <div style="margin-left: 80px">
                  <el-button type="primary" @click="submitUpdateOrderStep(item.tacheType)">确定更新</el-button>
                  <el-button @click="showUpdateOperateForm = false">取消更新</el-button>
                </div>
              </el-form>

              <b slot="reference" v-text="item.title"
                 style="cursor: pointer;padding-top:28px;position: absolute;top: 0;left:0;z-index: 2;width: 90px"></b>
            </el-popover>
          </div>


          <p slot="description" v-text="item.recordDate"></p>
          <p slot="description"
             v-if="item.principalName"
             v-text="'负责人：' + item.principalName"></p>
          <p slot="description"
             v-if="item.principalPhone"
             v-text="'电话：' + item.principalPhone"></p>
        </el-step>
      </el-steps>
    </el-dialog>

  </div>

</template>

<script>
  import Vue from 'vue'
  import _ from 'underscore'
  import store from 'store'
  import {
    buttonGroup,
    tag,
    button,
    dialog,
    Message,
    MessageBox,
    collapse,
    CollapseItem,
    steps,
    step,
    popover,
    Radio,
    RadioGroup,
    form,
    FormItem,
    select,
    DatePicker,
    option
  } from 'element-ui'


  Vue.use(button);
  Vue.use(tag);
  Vue.use(buttonGroup);
  Vue.use(dialog);
  Vue.use(collapse);
  Vue.use(CollapseItem);
  Vue.use(steps);
  Vue.use(step);
  Vue.use(popover);
  Vue.use(Radio);
  Vue.use(form);
  Vue.use(FormItem);
  Vue.use(select);
  Vue.use(option);
  Vue.use(DatePicker);
  Vue.use(RadioGroup);

  export default {
    name: 'info',
    data: function () {
      return {
        collapseShow: [],
        taskOrderStep: [],
        showPrintPreview: false,
        orderInfo: {
          firstCategoryName: '',
          secondCategoryName: '',
          thirdCategoryName: ''
        },
        taskInfo: {
          orderQuantity: 0
        },
        operateForm: {
          orderNo: '',
          name: '',
          phone: '',
          remark: '',
          type: '',
          tacheId: '',
          titleList: ['接受', '拒绝', '分配', '质检通过', '质检不通过', '发货', '确认收货'],
          showType: '',
          expressCompanyId: '', // 物流公司id
          expressNo: '' // 物流编号
        },
        orderStepFrom: {orderNo: '', tacheId: '', name: '', phone: '', recordDate: new Date()},
        updateOrderStep: [],
        updateOrderStepActive: 0, // 更新生产状态最后一步下标
        showUpdateOperate: false, // 是否显示更新生产状态弹窗
        showUpdateOperateForm: false, // 是否显示更新生产状态表单填写
        showOperateForm: false,
        expressCompany: []
      }
    },
    created: function () {
      let _this = this;

      this.getInfo();

      this.$parent.updateBreadcrumb([
        {name: '订单管理'},
        {name: '订单列表', path: '/order'},
        {name: this.$route.meta.name}
      ]);

      // 获取快递公司
      this.ajax.get('/order/expressConpany')
        .then(function (data) {
          _this.expressCompany = data;
        });
    },
    methods: {
      getInfo: function () {
        let _this = this;
        // 订单详情
        this.ajax.get('/order/getOrderInfoDetil', {orderNo: this.$route.query.id})
          .then(function (data) {
            // 订单状态
            data.tacheId = _this.filterStatus(data.tacheId);

            // 用户图片
            if (data.pictures) {
              data.pictures = _.compact(data.pictures.split(';'));
            }
            _this.orderInfo = data;
          });

        // 工艺单详情
        this.ajax.get('/order/getTaskOrderInfoDetil', {orderNo: this.$route.query.id})
          .then(function (data) {
            _this.taskInfo = _this.filterTaskData(data);
          });

        // 处理信息
        this.ajax.get('/order/findWorkOrderTache', {orderNo: this.$route.query.id})
          .then(function (data) {
            data = _.filter(data, function (val) {
              if (val.img) {
                val.img = val.img.split(',');
              } else {
                val.img = [];
              }
              return val;
            });
            _this.taskOrderStep = data;
            _this.collapseShow = _.range(data.length);
          });
      },
      filterStatus: function (value) {
        switch (value + '') {
          case '8':
          case '9':
            return '待门店修改';
          case '10':
            return '待接单';
          case '16':
            return '待分配';
          case '17':
            return '生产中';
          case '18':
            return '待质检';
          case '19':
            return '待发货';
          case '20':
          case '21':
          case '11':
            return '待门店验收';
          case '22':
            return '待工厂收货';
          default:
            return '已完成';
        }
      },
      filterTaskData: function (data) {
        let orderBadyConfig
          , orderTypeConfig
          , orderBadyLast
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
        _.map(JSON.parse(data.orderBady), function (val) {
          val.name_str = orderBadyConfig[val.id.trim()];
          if (val.id.indexOf('Dress') !== 0) {
            data.first_ElectronMeasure.push(val);
          } else {
            data.last_ElectronMeasure.push(val);
          }
        });

        // 款式数据过滤
        data.orderTypeStr = [];
        _.map(JSON.parse(data.orderType), function (val) {
          val = parseInt(val) - 1;
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

        switch (data.fitting) {
          case 0:
            data.fitting = '正常不含胚订单';
            break;
          case 1:
            data.fitting = '正常含胚订单';
            break;
          case 2:
            data.fitting = '返工不含胚';
            break;
          case 3:
            data.fitting = '返工含胚订单';
            break;
        }

        data.lining = JSON.parse(data.lining);
        data.material = JSON.parse(data.material);
        data.accessory = JSON.parse(data.accessory);
        data.cadUrl = JSON.parse(data.cadUrl);

        return data;
      },
      showOperateFormBox: function (tIndex, type) {
        this.operateForm.showType = tIndex;
        this.operateForm.type = type;
        this.operateForm.orderNo = this.taskInfo.orderNo;
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

        // 接收/拒绝订单
        if (this.operateForm.showType === 0 || this.operateForm.showType === 1) {
          if (!this.operateForm.remark && this.operateForm.type === 1) {
            return Message({
              message: '请填写拒绝原因',
              type: 'warning'
            });
          }
          this.ajax.post('/order/receiveOrderInfo', this.operateForm)
            .then(function () {
              Message({
                message: '已{0}'.format(_this.operateForm.type === 1 ? '拒绝，等待门店修改' : '接收成功'),
                type: 'success'
              });
              _this.$router.push({path: '/order'});
            });
        }
        // 分配订单
        else if (this.operateForm.showType === 2) {
          if (this.operateForm.type === 1 && !this.operateForm.tacheId) {
            return Message({
              message: '请指定生产状态',
              type: 'warning'
            });
          }

          this.ajax.post('/order/allocationOrder', this.operateForm)
            .then(function () {
              Message({
                message: '分配成功',
                type: 'success'
              });
              _this.$router.push({path: '/order'});
            });
        }
        // 订单质检
        else if (this.operateForm.showType === 3 || this.operateForm.showType === 4) {
          this.ajax.post('/order/qualityMonitoring', this.operateForm)
            .then(function () {
              Message({
                message: '质检提交成功',
                type: 'success'
              });
              _this.$router.push({path: '/order'});
            });
        }
        // 订单发货
        else if (this.operateForm.showType === 5) {
          let newOperateForm = null;
          if (this.operateForm.type === '第三方物流') {
            if (!this.operateForm.expressCompanyId || !this.operateForm.expressNo) {
              return Message({
                message: '请填写物流信息',
                type: 'warning'
              });
            }
          } else {
            this.operateForm.expressCompanyId = '';
            this.operateForm.expressNo = '';
          }
          newOperateForm = _.clone(this.operateForm);
          newOperateForm.type = newOperateForm.type === 'TX自物流' ? 1 : 2;
          this.ajax.post('/order/orderSendOut', newOperateForm)
            .then(function () {
              Message({
                message: '发货成功',
                type: 'success'
              });
              _this.$router.push({path: '/order'});
            });
        }
        // 确认收货
        else if (this.operateForm.showType === 6) {
          this.ajax.post('/order/confirmReceived', this.operateForm)
            .then(function () {
              Message({
                message: '已成功确认收货',
                type: 'success'
              });
              _this.$router.push({path: '/order'});
            });
        }
      },
      showUpdateOperateBox: function () { // 获取显示生产状态
        let _this = this
          , list = [
          {title: '开始生产', tacheType: 1},
//          {title: '已打版', tacheType: 2},
          {title: '已领料', tacheType: 3},
          {title: '已裁剪', tacheType: 4}
        ];

        if (_this.taskInfo.fitting === '正常不含胚订单' || _this.taskInfo.fitting === '返工不含胚') {
          list.push({title: '已缝制', tacheType: 6});
          list.push({title: '已整烫', tacheType: 7});
        } else if (_this.taskInfo.fitting === '正常含胚订单' || _this.taskInfo.fitting === '返工含胚订单') {
          list.push({title: '已缝制半成品', tacheType: 5});
          list.push({title: '已缝制完成', tacheType: 6});
          list.push({title: '已整烫', tacheType: 7});
        }

        this.orderStepFrom = this.$options.data().orderStepFrom;
        this.showUpdateOperate = true;
        this.updateOrderStepActive = 0;
        this.orderStepFrom.orderNo = this.taskInfo.orderNo;

        this.ajax.get('/order/findOrderStatus', {orderNo: this.taskInfo.orderNo})
          .then(function (data) {
            data = data || [];
            _this.updateOrderStep = _.filter(list, function (val, index) {
              _.extend(val, _.findWhere(data, {factoryTacheId: val.tacheType}));
              if (val.factoryTacheId) {
                _this.updateOrderStepActive = index + 1;
              }
              return val;
            });
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
      },
      submitUpdateOrderStep: function (tacheId) { // 提交更新生产状态
        let _this = this
          , dateFilter = Vue.filter('date');
        if (!this.orderStepFrom.name && this.updateOrderStepActive !== 0) {
          return Message({
            message: '请填写负责人',
            type: 'warning'
          });
        }
        if (!this.orderStepFrom.recordDate) {
          return Message({
            message: '请选择{0}时间'.format(this.updateOrderStepActive === 0 ? '开始' : '完成'),
            type: 'warning'
          });
        }
        this.orderStepFrom.recordDate = dateFilter(this.orderStepFrom.recordDate, 4);
        this.orderStepFrom.tacheId = tacheId;
        this.ajax.post('/order/updateOrderStatus', this.orderStepFrom)
          .then(function () {
            Message({
              message: '更新生产状态成功',
              type: 'success'
            });

            if (tacheId === 7 || tacheId === 5) {
              return _this.$router.push({path: '/order'});
            }
            _this.getInfo();
            _this.showUpdateOperateBox();
//            _this.showUpdateOperate = false;
            _this.showUpdateOperateForm = false;
          });
      },
      goTag: function (id) {
        $('html,body').scrollTop($('#' + id).offset().top - 110);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .order-list-info .el-collapse-item .el-icon-arrow-right {
    display: none;
  }

  .order-list-info .el-collapse-item .el-collapse-item__header {
    background-color: #fbfbfb;
  }

  .order-list-info .el-collapse-item .el-collapse-item__wrap {
    background-color: #ffffff;
  }

  .order-list-info .el-collapse-item .content-item {
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 10px;
  }
</style>
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

  .oli-box .field-box .img-box > .back-img {
    width: 19%;
    padding-top: 19%;
    margin-right: 1%;
    float: left;
    margin-bottom: 10px;
    background-size: cover;
    background-position: center;
  }

  .oli-box .designInfo .table table {
    margin-right: 2%;
    display: inline-block;
    margin-bottom: 20px;
    vertical-align: top;
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

  .order-list-info .tag-box {
    position: fixed;
    right: 50px;
    top: 40%;
    padding-top: 10px;
    padding-bottom: 10px;
    /*background-color: #ffffff;*/
  }

  .order-list-info .tag-box:before {
    content: '';
    position: absolute;
    height: 100%;
    width: 1px;
    background-color: #999999;
    left: 50%;
    z-index: -1;
    top: 0;
  }

  .order-list-info .tag-box li {
    line-height: 30px;
    text-align: center;
    border: solid 1px #eeeeee;
    background-color: #ffffff;
    margin-top: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    width: 100px;
  }

  .order-list-info .tag-box li:hover {
    color: #FF9900;
  }
</style>
