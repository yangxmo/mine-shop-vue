<template>
  <div class="ma-content-block lg:flex justify-between p-4">
    <!-- CRUD 组件 -->
    <ma-crud :options="options" :columns="columns" ref="crudRef">
    </ma-crud>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import usersBalanceLog from '@/api/users/usersBalanceLog'
import { Message } from '@arco-design/web-vue'
import tool from '@/utils/tool'
import * as common from '@/utils/common'

const crudRef = ref()


const options = reactive({
  id: 'ms_users_balance_log',
  rowSelection: {
    showCheckedAll: true
  },
  pk: 'id',
  operationColumn: false,
  operationWidth: 160,
  formOption: {
    viewType: 'modal',
    width: 600
  },
  api: usersBalanceLog.getList
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
    title: "用户ID",
    dataIndex: "user_id",
    formType: "input",
    search: false,
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "用户名称",
    dataIndex: "user_info.nickname",
    formType: "input",
    search: true,
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "交易类型",
    dataIndex: "type",
    formType: "select",
    search: true,
    addDisplay: false,
    editDisplay: false,
    multiple: false,
    dict: {
      data: [
        {
          label: "充值",
          value: "1"
        },
        {
          label: "提现",
          value: "2"
        },
        {
          label: "转账",
          value: "3"
        },
        {
          label: "退款",
          value: "4"
        },
        {
          label: "扣款",
          value: "5"
        },
        {
          label: "系统",
          value: "6"
        }
      ],
      translation: true
    }
  },
  {
    title: "交易金额",
    dataIndex: "amount",
    formType: "input",
    search: false,
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "交易状态",
    dataIndex: "status",
    formType: "select",
    search: true,
    addDisplay: false,
    editDisplay: false,
    multiple: false,
    dict: {
      data: [
        {
          label: "成功",
          value: "1"
        },
        {
          label: "失败",
          value: "2"
        },
        {
          label: "处理中",
          value: "3"
        }
      ],
      translation: true
    }
  },
  {
    title: "交易前余额",
    dataIndex: "before_balance",
    formType: "input-number",
    search: false,
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "交易后余额",
    dataIndex: "after_balance",
    formType: "input-number",
    search: false,
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
    formType: "date",
    addDisplay: false,
    editDisplay: false,
    showTime: true
  },
  {
    title: "备注",
    dataIndex: "remark",
    formType: "input",
    addDisplay: false,
    editDisplay: false
  }
])
</script>
<script> export default { name: 'users:balanceLog' } </script>