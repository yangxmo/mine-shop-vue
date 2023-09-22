<template>
  <div class="ma-content-block lg:flex justify-between p-4">
    <!-- CRUD 组件 -->
    <ma-crud :options="options" :columns="columns" ref="crudRef">
    </ma-crud>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import goodsAttributes from '@/api/goods/goodsAttributes'
import { Message } from '@arco-design/web-vue'
import tool from '@/utils/tool'
import * as common from '@/utils/common'

const crudRef = ref()



const switchStatus = (statusValue, id, statusName) => {
  goodsAttributes.changeStatus({ id, statusName, statusValue }).then( res => {
    res.success && Message.success(res.message)
  }).catch( e => { console.log(e) } )
}


const options = reactive({
  id: 'ms_goods_attributes',
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
  api: goodsAttributes.getList,
  add: {
    show: true,
    api: goodsAttributes.save,
    auth: ['goods:attributes:save']
  },
  edit: {
    show: true,
    api: goodsAttributes.update,
    auth: ['goods:attributes:update']
  },
  delete: {
    show: true,
    api: goodsAttributes.deletes,
    auth: ['goods:attributes:delete']
  }
})

const columns = reactive([
  {
    title: "",
    dataIndex: "id",
    formType: "input",
    addDisplay: false,
    editDisplay: false,
    hide: true,
    commonRules: {
      required: true,
      message: "请输入"
    }
  },
  {
    title: "商品编号",
    dataIndex: "goods_no",
    formType: "input",
    search: true,
    commonRules: {
      required: true,
      message: "请输入商品编号"
    }
  },
  {
    title: "商品属性编号",
    dataIndex: "attr_no",
    formType: "input",
    search: true,
    commonRules: {
      required: true,
      message: "请输入商品属性编号"
    }
  },
  {
    title: "商品属性名",
    dataIndex: "attributes_name",
    formType: "input",
    search: true,
    commonRules: {
      required: true,
      message: "请输入商品属性名"
    }
  }
])
</script>
<script> export default { name: 'goods:attributes' } </script>