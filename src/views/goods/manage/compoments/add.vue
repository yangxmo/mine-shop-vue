<template>
  <a-modal v-model:visible="visible" :footer="false" draggable width="1400px">
    <div class="p-5">
      <ma-form v-model="form" :options="options" :columns="columns">
      </ma-form>
    </div>
  </a-modal>
</template>
<script setup>
import {ref, reactive} from 'vue'
import dayjs from 'dayjs'
import orderBase from "@/api/order/orderBase";
import { Message } from '@arco-design/web-vue'

const visible = ref(false)

const form = ref({
  firmCnName: '狂徒张三',
  createTime: dayjs().format('YYYY-MM-DD'),
  auditReportType: '0',
  firmOfficeArea: {province: '河南省', city: '洛阳市'},
})

const options = ref({
  showFormTitle: true,
  formTitle: '订单信息',
  showButtons: false,
})

const open = async (record) => {
  visible.value = true
}

const columns = ref([
  {
    formType: 'card',
    title: '基础信息',
    customClass: ['mt-3'],
    bodyStyle: {paddingBottom: 0,},
    formList: [
      {
        formType: 'grid-tailwind',
        customClass: ['mt-5'],
        colNumber: 2,
        cols: [
          {
            formList: [{
              dataIndex: 'order_no', title: '订单号', labelWidth: '120px', formType: 'input-number', disabled: true
            }]
          },
          {
            formList: [{
              dataIndex: 'order_price',
              title: '订单金额',
              labelWidth: '120px',
              formType: 'input-number',
              disabled: true
            }]
          },
          {
            formList: [{
              dataIndex: 'order_discount_price',
              title: '优惠金额',
              labelWidth: '120px',
              formType: 'input-number',
              disabled: true
            }]
          },
          {
            formList: [{
              dataIndex: 'order_freight_price',
              title: '运费金额',
              labelWidth: '120px',
              formType: 'input-number',
              disabled: true
            }]
          },
          {
            formList: [{
              dataIndex: 'order_pay_price',
              title: '支付金额',
              labelWidth: '120px',
              formType: 'input-number',
              disabled: true
            }]
          },
          {
            formList: [{
              dataIndex: 'created_at',
              title: '创建日期',
              formType: 'date',
              labelWidth: '120px',
              disabled: true,
              showTime: true
            }]
          },
          {
            formList: [{
              dataIndex: 'order_status', title: '订单状态', labelWidth: '120px', formType: 'select',
              dict: {
                data: [
                  {label: '正常', value: 1},
                  {label: '用户取消', value: 2},
                  {label: '系统取消', value: 3},
                  {label: '待发货', value: 4},
                  {label: '待收货', value: 5},
                  {label: '订单完成', value: 6},
                  {label: '卖家取消', value: 7},
                  {label: '运营商取消', value: 8},
                ],
              }
            }]
          },
          {
            formList: [{
              dataIndex: 'order_pay_type', title: '支付类型', labelWidth: '120px', formType: 'select',
              dict: {
                data: [
                  {value: 1, label: '余额支付'},
                  {value: 2, label: '支付宝'},
                  {value: 3, label: '微信'},
                  {value: 4, label: '其他'},
                ],
                translation: true
              },
            }]
          },
        ]
      },
    ]
  },
  {
    formType: 'card',
    title: '产品信息',
    customClass: ['mt-3'],
    bodyStyle: {paddingBottom: 0,},
    formList: [
      {
        title: '产品列表', dataIndex: 'goods', formType: 'children-form', type: 'table', emptyRow: 2,
        formList: [
          {title: '产品名称', dataIndex: 'goods_name', width: 150, formType: "input", disabled: true},
          {title: '产品编号', dataIndex: 'goods_no', width: 150, formType: "input-number", disabled: true},
          {title: '商品数量', dataIndex: 'goods_num', width: 20, formType: "input-number", disabled: true},
          {
            title: '产品原价',
            dataIndex: 'goods_price',
            width: 120,
            formType: "input-number",
            disabled: true
          },
          {
            title: '产品售价',
            dataIndex: 'goods_pay_price',
            width: 120,
            formType: "input-number",
            disabled: true
          },
        ]
      }
    ],
  },
])

defineExpose({open})

</script>