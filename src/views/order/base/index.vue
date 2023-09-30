<template>
  <div class="ma-content-block lg:flex justify-between p-4">
    <!-- CRUD 组件 -->
    <ma-crud :options="options" :columns="columns" ref="crudRef">
      <!-- 操作列扩展 -->
      <template #operationAfterExtend="{ record }">

        <a-space v-if="record.order_status == 4">
          <a-button type="primary" v-auth="['order:base:audit']" @click="openDeliver(record)">发货</a-button>
        </a-space>

        <a-space>
          <a-button type="primary" v-auth="['order:base:read']" @click="openInfo(record)">详情</a-button>
        </a-space>

      </template>
    </ma-crud>

    <deliver ref="deliver" />
    <info ref="info" />

  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import orderBase from '@/api/order/orderBase'
import * as common from '@/utils/common'
import Info from './compoments/info.vue'
import Deliver from './compoments/deliver.vue'
import Audit from "@/views/order/refund/compoments/audit.vue";

const crudRef = ref()
const info = ref()
const deliver = ref()

// 发货
const openDeliver = (record) => {
  deliver.value.open(record);
}

// 详情
const openInfo = (record) => {
  info.value.open(record);
}

const options = reactive({
  id: 'ms_order_base',
  rowSelection: {
    showCheckedAll: true
  },
  pk: 'id',
  operationColumn: true,
  operationWidth: 160,
  formOption: {
    viewType: 'modal',
    width: 600
  },
  api: orderBase.getList,
  export: {
    show: true,
    url: 'order/base/export',
    auth: ['order:base:export']
  }
})

const columns = reactive([
  {
    title: "主键",
    dataIndex: "id",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    hide: true,
    commonRules: {
      required: true,
      message: "请输入主键"
    }
  },
  {
    title: "订单号",
    dataIndex: "order_no",
    formType: "input",
    search: true,
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "总金额",
    dataIndex: "order_price",
    formType: "input",
    search: true,
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "优惠金额",
    dataIndex: "order_discount_price",
    formType: "input",
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "运费金额",
    dataIndex: "order_freight_price",
    formType: "input",
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "实际支付金额",
    dataIndex: "order_pay_price",
    formType: "input",
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "支付时间",
    dataIndex: "order_pay_time",
    formType: "date",
    search: true,
    addDisplay: false,
    editDisplay: false,
    showTime: true
  },
  {
    title: "订单所属企业租户",
    dataIndex: "tenant_id",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    hide: true
  },
  {
    title: "用户ID",
    dataIndex: "order_create_user_id",
    formType: "input",
    search: true,
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "订单状态",
    dataIndex: "order_status",
    formType: "select",
    search: true,
    addDisplay: false,
    editDisplay: false,
    multiple: false,
    dict: {
      data: [
        {
          label: "正常",
          value: "1"
        },
        {
          label: "用户取消",
          value: "2"
        },
        {
          label: "系统取消",
          value: "3"
        },
        {
          label: "待发货",
          value: "4"
        },
        {
          label: "待收货",
          value: "5"
        },
        {
          label: "订单完成",
          value: "6"
        },
        {
          label: "卖家取消",
          value: "7"
        },
        {
          label: "运营商取消",
          value: "8"
        }
      ],
      translation: true
    }
  },
  {
    title: "支付状态",
    dataIndex: "order_pay_status",
    formType: "select",
    search: true,
    addDisplay: false,
    editDisplay: false,
    multiple: false,
    dict: {
      data: [
        {
          label: "待支付",
          value: "1"
        },
        {
          label: "支付成功",
          value: "2"
        }
      ],
      translation: true
    }
  },
  {
    title: "退款状态",
    dataIndex: "order_refund_status",
    formType: "select",
    search: true,
    addDisplay: false,
    editDisplay: false,
    multiple: false,
    dict: {
      data: [
        {
          label: "未退款",
          value: "1"
        },
        {
          label: "部分退款",
          value: "2"
        },
        {
          label: "全部退款",
          value: "3"
        }
      ],
      translation: true
    }
  },
  {
    title: "支付类型",
    dataIndex: "order_pay_type",
    formType: "select",
    search: true,
    addDisplay: false,
    editDisplay: false,
    multiple: false,
    dict: {
      data: [
        {
          label: "余额支付",
          value: "1"
        },
        {
          label: "支付宝",
          value: "2"
        },
        {
          label: "微信",
          value: "3"
        },
        {
          label: "4",
          value: "其他"
        }
      ],
      translation: true
    }
  },
  {
    title: "订单备注",
    dataIndex: "order_remark",
    formType: "input",
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
    formType: "date",
    search: true,
    addDisplay: false,
    editDisplay: false,
    showTime: true
  },
  {
    title: "更新时间",
    dataIndex: "updated_at",
    formType: "date",
    addDisplay: false,
    editDisplay: false,
    hide: true,
    showTime: true
  },
  {
    title: "删除时间",
    dataIndex: "deleted_at",
    formType: "date",
    addDisplay: false,
    editDisplay: false,
    hide: true,
    showTime: true
  }
])
</script>
<script> export default { name: 'order:base' } </script>