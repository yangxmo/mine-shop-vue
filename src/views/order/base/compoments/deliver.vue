<!--
 - MineShop is committed to providing solutions for quickly building web applications
 - Please view the LICENSE file that was distributed with this source code,
 - For the full copyright and license information.
 - Thank you very much for using MineShop.
 -
 - @Author X.Mo<root@imoi.cn>
 - @Link   https://gitee.com/xmo/mineadmin-vue
-->

<template>
  <a-modal v-model:visible="visible" :footer="false" draggable width="600px">
    <template #title>订单发货</template>

    <ma-form v-model="form" v-model:columns="columns" @onSubmit="submit" ref="maformRef">

      <template #sku_id="{record}">
        <a-select placeholder="请选择商品" v-for="item in goodsList">
          <option value="{{item.value}}">{{item.label}}</option>
        </a-select>
      </template>
    </ma-form>
  </a-modal>
</template>

<script setup>
import {ref, reactive} from 'vue'
import orderBase from '@/api/order/orderBase'

const form = ref({})
const maformRef = ref()
const goodsList = ref([])
const visible = ref(false)
const emit = defineEmits(['success'])

const open = async (record) => {
  visible.value = true
  const goodsListResponse = await orderBase.getGoodsList(record.order_no)
  form.value.sku_id = goodsListResponse.data
}

const columns = reactive([
  {
    dataIndex: "logistics_name",
    title: "物流公司",
    formType: "select",
    dict: {url: 'order/delivery/logisticsTypeList', props: {label: 'label', value: 'value'}},
    rules: [{
      required: true,
      message: "请选择物流公司"
    }]
  },
  {
    dataIndex: "logistics_no",
    title: "物流单号",
    formType: "input",
    dict: {url: 'order/delivery/logisticsTypeList', props: {label: 'label', value: 'value'}},
    rules: [{
      required: true,
      message: "请输入物流单号"
    }]
  },
  {
    dataIndex: "sku_id",
    title: "发货的商品",
    formType: "select",
    rules: [{
      required: true,
      message: "请选择发货的商品"
    }],
  }
])

const submit = async (done) => {
  emit('success')
  done(true)
}

defineExpose({open})

</script>

<style scoped>
</style>