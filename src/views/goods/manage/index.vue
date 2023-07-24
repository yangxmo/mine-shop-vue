<template>
  <div class="ma-content-block lg:flex justify-between p-4">
    <!-- CRUD 组件 -->
    <ma-crud :options="options" :columns="columns" ref="crudRef">
    </ma-crud>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import goods from '@/api/goods/goods'
import { Message } from '@arco-design/web-vue'
import tool from '@/utils/tool'
import * as common from '@/utils/common'

const crudRef = ref()



const switchStatus = (statusValue, id, statusName) => {
  goods.changeStatus({ id, statusName, statusValue }).then( res => {
    res.success && Message.success(res.message)
  }).catch( e => { console.log(e) } )
}


const options = reactive({
  id: 'ms_goods',
  rowSelection: {
    showCheckedAll: true
  },
  pk: 'id',
  operationColumn: true,
  operationWidth: 160,
  formOption: {
    viewType: 'modal',
    width: 1000
  },
  api: goods.getList,
  recycleApi: goods.getRecycleList,
  add: {
    show: true,
    api: goods.save,
    auth: ['goods:manage:save']
  },
  edit: {
    show: true,
    api: goods.update,
    auth: ['goods:manage:update']
  },
  delete: {
    show: true,
    api: goods.deletes,
    auth: ['goods:manage:delete'],
    realApi: goods.realDeletes,
    realAuth: ['goods::realDeletes']
  },
  recovery: {
    show: true,
    api: goods.recoverys,
    auth: ['goods:manage:recovery']
  },
  import: {
    show: true,
    url: 'goods/manage/import',
    templateUrl: 'goods//downloadTemplate',
    auth: ['goods::import']
  },
  export: {
    show: true,
    url: 'goods/manage/export',
    auth: ['goods::export']
  }
})

const columns = reactive([
  {
    title: "商品唯一标识",
    dataIndex: "goods_no",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    hide: true
  },
  {
    title: "商品名称",
    dataIndex: "goods_name",
    formType: "input",
    search: true,
    commonRules: {
      required: true,
      message: "请输入商品名称"
    }
  },
  {
    title: "销售价",
    dataIndex: "goods_price",
    formType: "input-number",
    search: true,
    commonRules: {
      required: true,
      message: "请输入商品建议销售价"
    },
    min: 0,
    max: 999999,
    precision: 2
  },
  {
    title: "参考价格",
    dataIndex: "goods_market_price",
    formType: "input-number",
    search: true,
    commonRules: {
      required: true,
      message: "请输入参考价格，返回价格区间，可能为空"
    },
    min: 0,
    max: 999999,
    precision: 2
  },
  {
    title: "商品库存",
    dataIndex: "goods_sale",
    formType: "input-number",
    search: true,
    commonRules: {
      required: true,
      message: "请输入商品库存"
    },
    min: 0,
    max: 999999
  },
  {
    title: "商品图片",
    dataIndex: "goods_images",
    formType: "resource",
    hide: false,
    search: true,
    commonRules: {
      required: true,
      message: "请输入商品图片"
    },
    type: "image",
    multiple: true,
    onlyData: false
  },
  {
    title: "商品视频",
    dataIndex: "goods_video",
    formType: "resource",
    search: false,
    hide: true,
    type: "video",
  },
  {
    title: "产品分组",
    dataIndex: "goods_category_name",
    formType: "select",
    search: true,
    commonRules: {
      required: true,
      message: "请输入分组名称"
    },
    dict: {
        data: [
          {
            label:"测试",
            value:"1"
          }
        ]
    }
  },
  {
    title: "商品状态",
    dataIndex: "goods_status",
    formType: "select",
    search: true,
    commonRules: {
      required: true,
      message: "请输入商品状态(1上架2下架)"
    },
    dict: {
      data: [
        {
          label: "上架",
          value: "1"
        },
        {
          label: "下架",
          value: "2"
        }
      ],
      translation: true
    }
  },
  {
    title: "商品语言",
    dataIndex: "goods_language",
    formType: "select",
    search: true,
    commonRules: {
      required: true,
      message: "请输入商品语言（1中文2英文）"
    },
    dict: {
      data: [
        {
          label: "中文",
          value: "1"
        },
        {
          label: "英文",
          value: "2"
        }
      ],
      translation: true
    }
  },
  {
    title: "商品详情",
    dataIndex: "goods_description",
    formType: "editor",
    hide: true
  },
  {
    title: "",
    dataIndex: "created_at",
    formType: "date",
    addDisplay: false,
    editDisplay: false,
    hide: true,
    showTime: true
  },
  {
    title: "",
    dataIndex: "updated_at",
    formType: "date",
    addDisplay: false,
    editDisplay: false,
    hide: true,
    showTime: true
  },
  {
    title: "",
    dataIndex: "deleted_at",
    formType: "date",
    addDisplay: false,
    editDisplay: false,
    hide: true,
    showTime: true
  }
])
</script>
<script> export default { name: 'goods:manage' } </script>