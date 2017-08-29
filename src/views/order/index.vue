<template>
  <div class="order-list dx-content-box">
    <div class="top-box">
      <el-form :inline="true" :model="queryForm" label-width="70px">
        <el-form-item label="订单编号">
          <el-input v-model="queryForm.orderNo" placeholder="订单编号" style="width: 243px"></el-input>
        </el-form-item>

        <el-form-item label="含胚情况">
          <el-select v-model="queryForm.orderType" clearable placeholder="含胚情况" style="width: 243px">
            <el-option label="含胚" value="1"></el-option>
            <el-option label="不含胚" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="门店名称">
          <el-input v-model="queryForm.storeName" placeholder="门店名称" style="width: 243px"></el-input>
        </el-form-item>

        <el-form-item label="服装类型">
          <el-cascader
            style="width: 243px"
            :options="clothingTypeList"
            change-on-select
            clearable
            v-model="clothingType"
            :props="{value:'id',children:'childCategories',label:'name'}"></el-cascader>
        </el-form-item>

        <el-form-item label="门店地区">
          <el-select v-model="queryForm.address" clearable placeholder="门店地区" style="width: 243px">
            <el-option v-for="(item,index) in storeList" :label="item.city" :key="index" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="订单状态">
          <el-select v-model="queryForm.status" clearable placeholder="订单状态" style="width: 243px">
            <el-option label="待接单" value="0"></el-option>
            <el-option label="生产中" value="1"></el-option>
            <el-option label="已完成" value="2"></el-option>
            <el-option label="待门店修改" value="3"></el-option>
            <el-option label="待分配" value="4"></el-option>
            <el-option label="待质检" value="5"></el-option>
            <el-option label="待发货" value="6"></el-option>
            <el-option label="待门店验收" value="7"></el-option>
            <el-option label="待工厂收货" value="8"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="生产状态">
          <el-select v-model="queryForm.productionStatus" clearable placeholder="生产状态" style="width: 243px">
            <el-option label="开始生产" value="1"></el-option>
            <el-option label="已领料" value="3"></el-option>
            <el-option label="已裁剪" value="4"></el-option>
            <el-option label="已缝制半成品" value="5"></el-option>
            <el-option label="已缝制" value="6"></el-option>
            <el-option label="已整烫" value="7"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="设计师">
          <el-input v-model="queryForm.designerInfo" placeholder="姓名/电话" style="width: 243px"></el-input>
        </el-form-item>

        <el-form-item label="返工情况">
          <el-select v-model="queryForm.isRework" clearable placeholder="返工情况" style="width: 243px">
            <el-option label="返工" value="0"></el-option>
            <el-option label="未返工" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="订单时间">
          <el-date-picker
            v-model="queryForm.startDate"
            type="date"
            :editable="false"
            placeholder="创建时间" style="width: 120px">
          </el-date-picker>
          <el-date-picker
            v-model="queryForm.endDate"
            type="date"
            :editable="false"
            placeholder="截至时间" style="width: 120px">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitQuery">查询</el-button>
          <el-button type="primary" style="background-color: #ffffff;color: #666;border-color: #e2e2e2"
                     @click="resetQuery">重置
          </el-button>
        </el-form-item>
      </el-form>

      <el-badge :value="0" class="item" style="margin-right: 20px;margin-bottom: 20px">
        <el-button size="small" @click="fastQuery('0')">待接单</el-button>
      </el-badge>
      <el-badge :value="0" class="item" style="margin-right: 20px;margin-bottom: 20px">
        <el-button size="small" @click="fastQuery('4')">待分配</el-button>
      </el-badge>
      <el-badge :value="0" class="item" style="margin-right: 20px;margin-bottom: 20px">
        <el-button size="small" @click="fastQuery('1')">生产中</el-button>
      </el-badge>
      <el-badge :value="0" class="item" style="margin-right: 20px;margin-bottom: 20px">
        <el-button size="small" @click="fastQuery('5')">待质检</el-button>
      </el-badge>
      <el-badge :value="0" class="item" style="margin-right: 20px;margin-bottom: 20px">
        <el-button size="small" @click="fastQuery('6')">待发货</el-button>
      </el-badge>
      <el-badge :value="0" class="item" style="margin-right: 20px;margin-bottom: 20px">
        <el-button size="small" @click="fastQuery('7')">待门店验收</el-button>
      </el-badge>

      <el-badge :value="0" class="item" style="margin-right: 20px;margin-bottom: 20px">
        <el-button size="small" @click="fastQuery('8')">待工厂收货</el-button>
      </el-badge>
    </div>

    <div class="list-box">
      <table class="dx-table" width="100%">
        <tr>
          <th>序号</th>
          <th>订单编号</th>
          <th>订单类型</th>
          <th>订单状态</th>
          <th>服装类型</th>
          <th>门店名称</th>
          <th class="dx-md-hide">设计师姓名</th>
          <th class="dx-md-hide">设计师电话</th>
          <th class="dx-md-hide">工艺单创建时间</th>
          <th class="dx-md-hide">上一环节操作时间</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in listData">
          <td v-text="index + 1"></td>
          <td v-text="item.orderNo"></td>
          <td v-text="item.fitting"></td>
          <td v-text="item.old_tacheId == 17 ? item.factoryTacheName : item.tacheId"></td>
          <td v-text="item.orderName"></td>
          <td v-text="item.storeName"></td>
          <td v-text="item.designerName" class="dx-md-hide"></td>
          <td v-text="item.designerPhone" class="dx-md-hide"></td>
          <td v-text="item.taskOrderCreateDate" class="dx-md-hide"></td>
          <td v-text="item.upTacheUpdate" class="dx-md-hide"></td>
          <td>
            <el-button type="text" size="small"
                       style="color: #0066CC"
                       @click="$router.push({path:'/order/info',query:{id:item.orderNo}})">
              查看
            </el-button>
            <el-button type="text"
                       style="color: #0066CC"
                       size="small" v-if="item.tacheId === '待接单'"
                       @click="showOperateFormBox(0,item,0)">
              接收
            </el-button>
            <el-button type="text" size="small"
                       style="color: #0066CC"
                       v-if="item.tacheId === '待接单'"
                       @click="showOperateFormBox(1,item,1)">
              拒绝
            </el-button>
            <el-button type="text" size="small"
                       style="color: #0066CC"
                       v-if="item.tacheId === '待分配'"
                       @click="showOperateFormBox(2,item,item.isAllocationTache == 1 || item.isAllocationTache == 2 ? 1 : 0)">
              分配
            </el-button>
            <el-button type="text" size="small"
                       style="color: #0066CC"
                       v-if="item.tacheId === '生产中'"
                       @click="showUpdateOperateBox(item)">
              更改生产状态
            </el-button>
            <el-button type="text" size="small"
                       style="color: #0066CC"
                       v-if="item.tacheId === '待质检'"
                       @click="showOperateFormBox(3,item,1)">
              通过
            </el-button>
            <el-button type="text" size="small"
                       style="color: #0066CC"
                       v-if="item.tacheId === '待质检'"
                       @click="showOperateFormBox(4,item,2)">
              不通过
            </el-button>
            <el-button type="text" size="small"
                       style="color: #0066CC"
                       v-if="item.tacheId === '待发货'"
                       @click="showOperateFormBox(5,item,'TX自物流')">
              发货
            </el-button>
            <el-button type="text" size="small"
                       style="color: #0066CC"
                       v-if="item.tacheId === '待工厂收货'"
                       @click="showOperateFormBox(6,item,0)">
              确认收货
            </el-button>

          </td>
        </tr>
      </table>

      <div style="width: 100%;text-align: right">
        <el-pagination
          style="margin-top: 30px"
          v-show="paging.total"
          @size-change="handleSizeChange"
          @current-change="getList"
          :current-page="paging.cur"
          :page-sizes="[10,50,100]"
          :page-size="paging.size"
          layout="total, sizes, prev, pager, next"
          :total="paging.total">
        </el-pagination>
      </div>

    </div>

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
  import store from 'store'
  import _ from 'underscore'
  import {
    form,
    pagination,
    formItem,
    select,
    option,
    button,
    datePicker,
    badge,
    cascader,
    dialog,
    Message,
    steps,
    step,
    popover,
    Radio,
    RadioGroup
  } from 'element-ui'

  Vue.use(form);
  Vue.use(select);
  Vue.use(option);
  Vue.use(button);
  Vue.use(datePicker);
  Vue.use(formItem);
  Vue.use(badge);
  Vue.use(cascader);
  Vue.use(pagination);
  Vue.use(dialog);
  Vue.use(steps);
  Vue.use(step);
  Vue.use(popover);
  Vue.use(Radio);
  Vue.use(RadioGroup);

  export default {
    name: 'order',
    data: function () {
      return {
        paging: {
          cur: 1,
          size: 10,
//          sizeList: [10],
          total: 0
        },
        clothingType: ['', '', ''],
        clothingTypeList: [],
        storeList: [],
        queryForm: {
          address: '',
          designerInfo: '',
          productionStatus: '',
          isRework: '',
          orderNo: '',
          orderType: '',
          storeName: '',
          firstCategoryId: '',
          secondCategoryId: '',
          thirdCategoryId: '',
          startDate: '',
          endDate: '',
          status: ''
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
        expressCompany: [],
        listData: [],
        currentItem: {}
      }
    },
    created: function () {
      let _this = this;

      if (!_.isEmpty(store.get('queryOrderList'))) {
        this.queryForm = store.get('queryOrderList');
      }

      this.$parent.updateBreadcrumb([
        {name: '订单管理'},
        {name: this.$route.meta.name}
      ]);

      this.getList();
      this.getCategoryList();

      // 获取门店
      this.ajax.get('/order/getAllStoreId')
        .then(function (data) {
          _this.storeList = data;
        });

      // 获取快递公司
      this.ajax.get('/order/expressConpany')
        .then(function (data) {
          _this.expressCompany = data;
        });
    },
    methods: {
      getList: function (cruPage) { // 获取列表
        let _this = this;
        this.queryForm.page = (cruPage || this.paging.cur) - 1;
        this.queryForm.pageLength = this.paging.size;
        store.set('queryOrderList', this.queryForm);
        return this.ajax.get('/order/getOrderInfoList', this.queryForm)
          .then(function (data) {
            _this.paging.total = data.totalSize;
            _this.listData = _.filter(data.data, function (val) {
              val.old_tacheId = val.tacheId;
              val.tacheId = _this.filterStatus(val.tacheId);

              switch (val.fitting) {
                case '0':
                  val.fitting = '正常不含胚订单';
                  break;
                case '1':
                  val.fitting = '正常含胚订单';
                  break;
                case '2':
                  val.fitting = '返工不含胚';
                  break;
                case '3':
                  val.fitting = '返工含胚订单';
                  break;
              }
              return val;
            });
          });
      },
      resetQuery: function () {
        this.queryForm = this.$options.data().queryForm;
        this.clothingType = this.$options.data().clothingType;
        store.remove('queryOrderList');
        this.getList();
      },
      getCategoryList: function () {
        let _this = this;
        this.ajax.get('/order/findCategoryList').then(function (data) {
          _this.clothingTypeList = data;

          _this.clothingType[0] = _this.queryForm.firstCategoryId || '';
          _this.clothingType[1] = _this.queryForm.secondCategoryId || '';
          _this.clothingType[2] = _this.queryForm.thirdCategoryId || '';
        });
      },
      handleSizeChange: function (val) {
        this.paging.size = val;
        this.getList();
      },
      filterStatus: function (value) {
        switch (value) {
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
      fastQuery: function (type) {
        this.queryForm.status = type;
        this.getList();
      },
      showOperateFormBox: function (tIndex, item, type) {
        this.operateForm.showType = tIndex;
        this.operateForm.type = type;
        this.operateForm.orderNo = item.orderNo;
        this.showOperateForm = true;
      },
      showUpdateOperateBox: function (item) { // 获取显示生产状态
        let _this = this
          , list = [
          {title: '开始生产', tacheType: 1},
//          {title: '已打版', tacheType: 2},
          {title: '已领料', tacheType: 3},
          {title: '已裁剪', tacheType: 4}
        ];

        if (!item) {
          item = this.currentItem;
        } else {
          this.currentItem = item;
        }

        if (item.fitting === '正常不含胚订单' || item.fitting === '返工不含胚') {
          list.push({title: '已缝制', tacheType: 6});
          list.push({title: '已整烫', tacheType: 7});
        } else if (item.fitting === '正常含胚订单' || item.fitting === '返工含胚订单') {
          list.push({title: '已缝制半成品', tacheType: 5});
          list.push({title: '已缝制完成', tacheType: 6});
          list.push({title: '已整烫', tacheType: 7});
        }

        this.orderStepFrom = this.$options.data().orderStepFrom;
        this.showUpdateOperate = true;
        this.updateOrderStepActive = 0;
        this.orderStepFrom.orderNo = item.orderNo;

        this.ajax.get('/order/findOrderStatus', {orderNo: item.orderNo})
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
              submitAfter();
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
              submitAfter();
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
              submitAfter();
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
              submitAfter();
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
              submitAfter();
            });
        }

        function submitAfter() {
          _this.getList();
          _this.showOperateForm = false;
          _this.operateForm = _this.$options.data().operateForm;
        }
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

            _this.getList();

            if (tacheId === 7 || tacheId === 5) {
              _this.showUpdateOperate = false;
            } else {
              _this.showUpdateOperateBox();
            }
            _this.showUpdateOperateForm = false;
          });
      },
      submitQuery: function () {
        let dateFilter = Vue.filter('date');

        this.queryForm.firstCategoryId = this.clothingType[0] || '';
        this.queryForm.secondCategoryId = this.clothingType[1] || '';
        this.queryForm.thirdCategoryId = this.clothingType[2] || '';
        this.queryForm.startDate = dateFilter(this.queryForm.startDate);
        this.queryForm.endDate = dateFilter(this.queryForm.endDate);
        this.getList().then(function () {
          Message({
            message: '订单列表已更新',
            type: 'success'
          })
        });
      },
    },
    filters: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .order-list .top-box {
    background-color: #ffffff;
    margin: 20px;
    border: solid 1px #e5e5e5;
    padding: 20px;
    margin-top: 0;
  }

  .order-list .list-box {
    margin: 20px;
    text-align: center;
  }
</style>
