<template>
  <div class="ma-content-block lg:flex justify-between p-4">
    <!-- CRUD 组件 -->
    <ma-crud :options="options" :columns="columns" ref="crudRef">
    </ma-crud>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import goodsClause from '@/api/goods/goodsClause'
import { Message } from '@arco-design/web-vue'
import tool from '@/utils/tool'
import * as common from '@/utils/common'

const crudRef = ref()




const options = reactive({
  id: 'ms_goods_clause',
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
  api: goodsClause.getList,
  add: {
    show: true,
    api: goodsClause.save,
    auth: ['goods:clause:save']
  },
  edit: {
    show: true,
    api: goodsClause.update,
    auth: ['goods:clause:update']
  },
  delete: {
    show: true,
    api: goodsClause.deletes,
    auth: ['goods:clause:delete']
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
    title: "服务名称",
    dataIndex: "name",
    formType: "input",
    search: true,
    commonRules: {
      required: true,
      message: "请输入服务名称"
    }
  },
  {
    title: "服务条款",
    dataIndex: "term",
    formType: "checkbox",
    search: true,
    width: 250,
    commonRules: {
      required: true,
      message: "请输入服务条款"
    },
    dict: {
      data: [
        {
          label: "极速退款",
          value: "1"
        },
        {
          label: "七天无理由",
          value: "2"
        },
        {
          label: "包邮",
          value: "3"
        },
        {
          label: "正品保证",
          value: "4"
        },
        {
          label: "48小时发货",
          value: "5"
        },
        {
          label: "不支持七天无理由退款",
          value: "6"
        }
      ],
      translation: true
    }
  },
  {
    title: "排序",
    dataIndex: "sort",
    formType: "input-number",
    addDefaultValue: 0,
    min:0,
    commonRules: {
      required: true,
      message: "请输入服务条款排序"
    }
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
    formType: "date",
    addDisplay: false,
    editDisplay: false,
    width: 150
  },
])
</script>
<script> export default { name: 'goods:clause' } </script>