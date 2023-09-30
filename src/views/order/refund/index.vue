<template>
  <div class="ma-content-block lg:flex justify-between p-4">
    <!-- CRUD 组件 -->
    <ma-crud :options="options" :columns="columns" ref="crudRef">
      <!-- 操作列扩展 -->
      <template #operationAfterExtend="{ record }">

        <a-space v-if="record.refund_examine_status == 1">
            <a-button type="primary" v-auth="['order:refund:audit']" @click="openAudit(record)">审核</a-button>
        </a-space>
        <a-space v-if="record.refund_status == 1 && record.refund_examine_status == 2">
          <a-button type="primary" v-auth="['order:refund:refund']" @click="openRefund(record)">退款</a-button>
        </a-space>
        <a-space>
          <a-button type="primary" v-auth="['order:refund:read']" @click="openInfo(record)">详情</a-button>
        </a-space>

      </template>

      <!-- 发货 -->
    </ma-crud>

    <refund ref="refund" />
    <audit ref="audit" />
    <info ref="info" />

  </div>
</template>
<script setup>
import {ref, reactive, computed} from 'vue'
import orderRefund from '@/api/order/orderRefund'
import { Message } from '@arco-design/web-vue'
import tool from '@/utils/tool'
import * as common from '@/utils/common'
import Refund from "./compoments/refund.vue";
import Audit from "./compoments/audit.vue";
import Info from "./compoments/info.vue";

const crudRef = ref()
const refund = ref()
const audit = ref()
const info = ref()

const openRefund = (record) => {
  refund.value.open(record)
}

const openAudit = (record) => {
  audit.value.open(record)
}

const openInfo = (record) => {
  info.value.open(record)
}

const options = reactive({
  id: 'ms_order_refund',
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
  api: orderRefund.getList,
  export: {
    show: true,
    url: 'order/refund/export',
    auth: ['order:refund:export']
  }
})

const columns = reactive([
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
    title: "退款单号",
    dataIndex: "refund_order_no",
    formType: "input",
    width:120,
    search: true,
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "退款金额",
    dataIndex: "refund_price",
    formType: "input-number",
    search: false,
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "审核状态",
    dataIndex: "refund_examine_status",
    formType: "select",
    search: true,
    addDisplay: false,
    editDisplay: false,
    multiple: false,
    dict: {
      data: [
        {
          label: "待审核",
          value: "1"
        },
        {
          label: "审核成功",
          value: "2"
        },
        {
          label: "审核失败",
          value: "3"
        }
      ],
      translation: true
    }
  },
  {
    title: "退款状态",
    dataIndex: "refund_status",
    formType: "select",
    search: true,
    addDisplay: false,
    editDisplay: false,
    multiple: false,
    dict: {
      data: [
        {
          label: "待退款",
          value: "1"
        },
        {
          label: "退款成功",
          value: "2"
        },
        {
          label: "退款失败",
          value: "3"
        }
      ],
      translation: true
    }
  },
  {
    title: "申请时间",
    dataIndex: "refund_apply_time",
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
<script> export default { name: 'order:refund' } </script>