<template>
  <div class="ma-content-block lg:flex justify-between p-4">
    <!-- CRUD 组件 -->
    <ma-crud :options="options" :columns="columns" ref="crudRef">
      <!-- 操作列扩展 -->
      <template #operationAfterExtend="{ record }">

        <a-space v-if="record.order_status == 4">
            <a-button type="primary" v-auth="['order:delivery:delivery']" @click="openDelivery(record)">发货</a-button>
        </a-space>
        <a-space v-if="record.order_status == 5">
          <a-button type="primary" v-auth="['order:delivery:delivery']" @click="openDelivery(record)">修改发货</a-button>
        </a-space>

      </template>

      <!-- 发货 -->
    </ma-crud>

    <delivery ref="delivery" />

  </div>
</template>
<script setup>
import {ref, reactive, computed} from 'vue'
import orderDelivery from '@/api/order/orderDeliver'
import { Message } from '@arco-design/web-vue'
import tool from '@/utils/tool'
import * as common from '@/utils/common'
import Delivery from "./compoments/delivery.vue";

const crudRef = ref()
const delivery = ref()

const openDelivery = (record) => {
  delivery.value.open(record)
}

const options = reactive({
  id: 'ms_order_delivery',
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
  api: orderDelivery.getList,
  export: {
    show: true,
    url: 'order/delivery/export',
    auth: ['order:delivery:export']
  }
})

const columns = reactive([
  {
    title: "用户ID",
    dataIndex: "order_create_user_id",
    formType: "input",
    width: 80,
    search: true,
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "订单号",
    dataIndex: "order_no",
    formType: "input",
    width:120,
    search: true,
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "总金额",
    dataIndex: "order_price",
    formType: "input",
    search: false,
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
    title: "实际支付",
    dataIndex: "order_pay_price",
    formType: "input",
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
    title: "支付时间",
    dataIndex: "order_pay_time",
    formType: "date",
    width: 160,
    search: true,
    addDisplay: false,
    editDisplay: false,
    showTime: true
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
    formType: "date",
    search: true,
    width: 160,
    addDisplay: false,
    editDisplay: false,
    showTime: true
  },
  {
    title: "订单备注",
    dataIndex: "order_remark",
    formType: "input",
    addDisplay: false,
    editDisplay: false
  },
])
</script>
<script> export default { name: 'order:delivery' } </script>