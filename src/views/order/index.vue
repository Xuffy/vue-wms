<template>
  <div class="order-list dx-content-box">
    <div class="top-box">
      <el-form :inline="true" :model="queryForm" label-width="70px">
        <el-form-item label="订单编号">
          <el-input v-model="queryForm.orderNo" placeholder="订单编号" style="width: 243px"></el-input>
        </el-form-item>

        <el-form-item label="订单类型">
          <el-select v-model="queryForm.orderType" clearable placeholder="订单类型" style="width: 243px">
            <el-option label="正常不含胚订单" value="0"></el-option>
            <el-option label="正常含胚订单" value="1"></el-option>
            <el-option label="返工含胚订单" value="2"></el-option>
            <el-option label="返工不含胚" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商家名称">
          <el-input v-model="queryForm.storeName" placeholder="商家名称" style="width: 243px"></el-input>
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

        <el-form-item label="订单状态">
          <el-select v-model="queryForm.status" clearable placeholder="订单状态" style="width: 243px">
            <el-option label="待接单" value="0"></el-option>
            <el-option label="生产中" value="1"></el-option>
            <el-option label="待商家修改" value="3"></el-option>
            <el-option label="已完成" value="2"></el-option>
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
        </el-form-item>
      </el-form>

      <el-badge :value="0" class="item" style="margin-right: 20px;margin-bottom: 20px">
        <el-button size="small" @click="fastQuery">待接单</el-button>
      </el-badge>
      <el-badge :value="0" class="item" style="margin-right: 20px;margin-bottom: 20px">
        <el-button :disabled="true" size="small">待分配</el-button>
      </el-badge>
      <el-badge :value="0" class="item" style="margin-right: 20px;margin-bottom: 20px">
        <el-button :disabled="true" size="small">生产中</el-button>
      </el-badge>
      <el-badge :value="0" class="item" style="margin-right: 20px;margin-bottom: 20px">
        <el-button :disabled="true" size="small">待质检</el-button>
      </el-badge>
      <el-badge :value="0" class="item" style="margin-right: 20px;margin-bottom: 20px">
        <el-button :disabled="true" size="small">待发货</el-button>
      </el-badge>
      <el-badge :value="0" class="item" style="margin-right: 20px;margin-bottom: 20px">
        <el-button :disabled="true" size="small">待商家验收</el-button>
      </el-badge>

      <el-badge :value="0" class="item" style="margin-right: 20px;margin-bottom: 20px">
        <el-button :disabled="true" size="small">待工厂收货</el-button>
      </el-badge>
    </div>

    <div class="list-box">
      <el-table
        style="width: 100%"
        :data="listData"
        border>
        <el-table-column
          type="index"
          label="序号"
          width="70"
          align="center">
        </el-table-column>

        <el-table-column
          prop="orderNo"
          label="订单编号"
          align="center">
        </el-table-column>

        <el-table-column
          prop="fitting"
          align="center"
          label="订单类型">
        </el-table-column>

        <el-table-column
          prop="tacheId"
          align="center"
          label="订单状态">
        </el-table-column>

        <el-table-column
          prop="orderName"
          align="center"
          label="服装类型">
        </el-table-column>

        <el-table-column
          prop="storeName"
          align="center"
          label="商家名称">
        </el-table-column>

        <el-table-column
          prop="designerName"
          align="center"
          label="设计师姓名">
        </el-table-column>

        <el-table-column
          prop="designerPhone"
          align="center"
          label="设计师电话">
        </el-table-column>

        <el-table-column
          prop="taskOrderCreateDate"
          align="center"
          label="工艺单创建时间">
        </el-table-column>

        <el-table-column
          prop="upTacheUpdate"
          align="center"
          label="上一环节操作时间">
        </el-table-column>

        <el-table-column
          label="操作"
          align="center">
          <template scope="scope">
            <el-button type="text" size="small"
                       style="color: #0066CC"
                       @click="$router.push({path:'/order/info',query:{id:scope.row.orderNo}})">查看
            </el-button>
            <el-button type="text"
                       style="color: #0066CC"
                       size="small" v-if="scope.row.tacheId == '待接单'"
                       @click="showOperateFormBox(0,scope.row)">接收
            </el-button>
            <el-button type="text" size="small"
                       style="color: #0066CC"
                       v-if="scope.row.tacheId == '待接单'"
                       @click="showOperateFormBox(1,scope.row)">拒绝
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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

  </div>
</template>

<script>
  import Vue from 'vue'
  import $ from 'zepto'
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
    table,
    tableColumn,
    cascader,
    dialog,
    Message
  } from 'element-ui'

  Vue.use(form);
  Vue.use(select);
  Vue.use(option);
  Vue.use(button);
  Vue.use(datePicker);
  Vue.use(formItem);
  Vue.use(table);
  Vue.use(badge);
  Vue.use(tableColumn);
  Vue.use(cascader);
  Vue.use(pagination);
  Vue.use(dialog);

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
        clothingType: [],
        clothingTypeList: [],
        queryForm: {
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
          type: ''
        },
        showOperateForm: false,
        listData: []
      }
    },
    created: function () {
      this.$parent.updateBreadcrumb([
        {name: '订单管理'},
        {name: this.$route.meta.name}
      ]);
      this.getList();
      this.getCategoryList();
    },
    methods: {
      getList: function (cruPage) {
        let _this = this;
        this.queryForm.page = (cruPage || this.paging.cur) - 1;
        this.queryForm.pageLength = this.paging.size;
        return this.ajax.get('/order/getOrderInfoList', this.queryForm)
          .then(function (data) {
            _this.paging.total = data.totalSize;
            _this.listData = _.filter(data.data, function (val) {
              val.tacheId = _this.filterStatus(val.tacheId);
              switch (val.fitting) {
                case '0':
                  val.fitting = '正常不含胚订单';
                  break;
                case '1':
                  val.fitting = '正常含胚订单';
                  break;
                case '2':
                  val.fitting = '返工含胚订单';
                  break;
                case '3':
                  val.fitting = '返工不含胚';
                  break;
              }
              return val;
            });
          });
      },
      getCategoryList: function () {
        let _this = this;
        this.ajax.get('/order/findCategoryList').then(function (data) {
          _this.clothingTypeList = data;
        });
      },
      handleSizeChange(val) {
        this.paging.size = val;
        this.getList();
      },
      filterStatus: function (value) {
        switch (value) {
          case '8':
          case '9':
            return '待商家修改';
          case '10':
            return '待接单';
          case '11':
            return '生产中';
          default:
            return '已完成';
        }
      },
      fastQuery: function () {
        this.queryForm.status = '0';
        this.getList();
      },
      showOperateFormBox: function (type, item) {
        this.operateForm.type = type;
        this.operateForm.orderNo = item.orderNo;
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


        this.ajax.post('/order/receiveOrderInfo',this.operateForm)
          .then(function () {
            Message({
              message: '已{0}'.format(_this.operateForm.type === 1 ? '拒绝，等待商家修改' : '接收成功'),
              type: 'success'
            });

            _this.getList();
            _this.showOperateForm = false;
            _this.operateForm = _this.$options.data().operateForm;
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
