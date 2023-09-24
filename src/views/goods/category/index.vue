<template>
  <div class="ma-content-block lg:flex justify-between p-4">
    <!-- CRUD 组件 -->
    <ma-crud :options="options" :columns="columns" ref="crudRef">
      <!-- 排序列 -->
      <template #sort="{ record }">
        <a-input-number
            :default-value="record.sort"
            mode="button"
            @change="changeSort($event, record.id)"
            :min="0"
            :max="1000"
        />
      </template>
      <!-- 状态列 -->
      <template #status="{ record }">
        <a-switch
            :checked-value="1"
            unchecked-value="2"
            @change="switchStatus($event, record.id, 'status')"
            :default-checked="record.status == 1"
        />
      </template>
    </ma-crud>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import goodsCategory from '@/api/goods/goodsCategory'
import { Message } from '@arco-design/web-vue'
import tool from '@/utils/tool'
import * as common from '@/utils/common'
import menu from "@/api/system/menu";

const crudRef = ref()

const switchStatus = (statusValue, id, statusName) => {
  goodsCategory.changeStatus({ id, statusName, statusValue }).then( res => {
    res.success && Message.success(res.message)
  }).catch( e => { console.log(e) } )
}

const changeSort = async (value, id) => {
  const response = await goodsCategory.numberOperation({ id, numberName: 'sort', numberValue: value })
  if (response.success) {
    Message.success(response.message)
  }
}


const options = reactive({
  id: 'ms_goods_category',
  rowSelection: {
    showCheckedAll: true
  },
  pk: 'id',
  operationColumn: true,
  operationWidth: 160,
  formOption: {
    viewType: 'drawer',
    width: 600
  },
  isExpand: true,
  api: goodsCategory.getList,
  recycleApi: goodsCategory.getRecycleList,
  add: {
    show: true,
    api: goodsCategory.save,
    auth: ['goods:category:save']
  },
  edit: {
    show: true,
    api: goodsCategory.update,
    auth: ['goods:category:update']
  },
  delete: {
    show: true,
    api: goodsCategory.deletes,
    auth: ['goods:category:delete'],
    realApi: goodsCategory.realDeletes,
    realAuth: ['goods:category:realDeletes']
  },
  recovery: {
    show: true,
    api: goodsCategory.recoverys,
    auth: ['goods:category:recovery']
  },
  import: {
    show: true,
    url: 'goods/category/import',
    templateUrl: 'goods/category/downloadTemplate',
    auth: ['goods:category:import']
  },
  export: {
    show: true,
    url: 'goods/category/export',
    auth: ['goods:category:export']
  }
})

const columns = reactive([
  {
    title: "",
    dataIndex: "id",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    hide: true
  },
  {
    title: '上级分类', dataIndex: 'parent_id', hide: true, formType: 'tree-select',
    dict: { url: 'goods/category/tree', params: { onlyMenu: true } },
    editDefaultValue: (record) => {
      return record.parent_id == 0 ? undefined : record.parent_id
    }
  },
  {
    title: "分组名称",
    dataIndex: "title",
    formType: "input",
    search: true,
    commonRules: {
      required: true,
      message: "请输入分组名称"
    }
  },
  {
    title: "分组下商品总数",
    dataIndex: "feed_count",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    hide: true
  },
  {
    title: "分组状态",
    dataIndex: "status",
    formType: "select",
    search: true,
    commonRules: {
      required: true,
      message: "请输入分组状态（2无用1有用）"
    },
    dict: {
      data:[
        {
          label: "可用",
          value: "1"
        },
        {
          label: "不可用",
          value: "2"
        }
      ]
    }
  },
  {
    title: "分类排序",
    dataIndex: "sort",
    formType: "input-number",
    search: true,
    commonRules: {
      required: true,
      message: "请输入分类排序"
    },
    min: 0,
    max: 999999
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
    formType: "date",
    addDisplay: false,
    editDisplay: false,
    hide: false,
    showTime: true
  },
])
</script>
<script> export default { name: 'goods:category' } </script>