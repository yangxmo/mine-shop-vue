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
    <template #title>退款审核</template>

    <ma-form v-model="form" v-model:columns="columns" @onSubmit="submit" ref="maformRef">
    </ma-form>
  </a-modal>
</template>

<script setup>
import {ref, reactive} from 'vue'
import {Message} from '@arco-design/web-vue';
import orderRefund from '@/api/order/orderRefund'

const form = ref({})
const maformRef = ref()
const close = ref()
const visible = ref(false)
const emit = defineEmits(['success'])

const open = async (record) => {
  visible.value = true
  form.value.refund_order_no = record.refund_order_no
}

const columns = reactive([
  {
    dataIndex: "refund_examine_status",
    title: "审核状态",
    formType: "radio",
    defaultValue: 1,
    rules: [{
      required: true,
      message: "请选择审核状态"
    }],
    dict: {
      data: [
        {'value': 1, 'label': '通过'},
        {'value': 2, 'label': '不通过'}
      ]
    }
  },
  {
    dataIndex: "refund_examine_fail_msg",
    title: "拒绝原因",
    formType: "input",
    rules: [{
      required: true,
      message: "请输入拒绝原因"
    }]
  }
])

const submit = async (data) => {
  await orderRefund.audit(data).then(async res => {
    if (res.code === 200 && res.success) {
      Message.success('审核提交成功')
      visible.value = false
    }
  })
}

defineExpose({open})

</script>

<style scoped>
</style>