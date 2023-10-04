<template>
  <div class="ma-content-block lg:flex justify-between p-4">
    <!-- CRUD 组件 -->
    <ma-crud :options="options" :columns="columns" ref="crudRef">

      <template #tools>
        <!--        <a-button type="primary" align="left" v-auth="['goods:manage:add']" @click="openAdd()">新增</a-button>-->
      </template>

    </ma-crud>

    <add ref="add"/>

  </div>
</template>
<script setup>
import {ref, reactive} from 'vue'
import goods from '@/api/goods/goods'
import {Message} from '@arco-design/web-vue'
import tool from '@/utils/tool'
import * as common from '@/utils/common'
import user from "@/api/system/user";
import Add from "./compoments/add.vue";

const crudRef = ref()
const add = ref()

// 详情
const openAdd = () => {
  add.value.open();
}

const switchStatus = (statusValue, id, statusName) => {
  goods.changeStatus({id, statusName, statusValue}).then(res => {
    res.success && Message.success(res.message)
  }).catch(e => {
    console.log(e)
  })
}


const options = reactive({
  id: 'ms_goods',
  rowSelection: {
    showCheckedAll: true
  },
  pk: 'id',
  operationColumn: true,
  operationWidth: 160,
  dataCompleteRefresh: true,
  formOption: {
    isFull: true,
    viewType: 'modal',
    tagId: 'goods_tag',
    tagName: '商品编辑',
    titleDataIndex: 'goods_name'
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
    auth: ['goods:manage:update'],
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
    formType: 'card',
    title: '基础信息',
    customClass: ['mt-3'],
    bodyStyle: {paddingBottom: 0,},
    hide: true,
    formList: [
      {
        title: '商品基础信息', dataIndex: 'auditReportType', formType: 'radio', labelWidth: '135px',
      },
      {
        formType: 'grid-tailwind',
        colNumber: 3,
        cols: [
          {
            formList: [{
              title: "商品首图",
              dataIndex: "goods_image",
              formType: "upload",
              commonRules: {
                required: true,
                message: "请输入商品图片"
              },
              type: "image",
              multiple: true,
              addDisplay: false,
              editDisplay: false,
              onlyData: true,
              returnType: "url"
            },]
          },
          {
            formList: [
              {
                title: "商品轮播图",
                dataIndex: "goods_images",
                formType: "resource",
                width: 150,
                hide: true,
                commonRules: {
                  required: true,
                  message: "请输入商品图片"
                },
                type: "image",
                multiple: true,
                onlyData: true,
                returnType: "url"
              },]
          },
          {
            formList: [
              {
                title: "商品视频",
                dataIndex: "goods_video",
                formType: "resource",
                search: false,
                hide: true,
                type: "video",
              },
            ]
          }
        ]
      },
      {
        formType: 'grid-tailwind',
        customClass: ['mt-5'],
        colNumber: 2,
        cols: [
          {
            formList: [
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
                title: "商品类型",
                dataIndex: "goods_type",
                formType: "select",
                search: true,
                commonRules: {
                  required: true,
                  message: "请选择商品类型"
                },
                dict: {
                  data: [
                    {
                      label: "实物",
                      value: "1"
                    },
                    {
                      label: "虚拟",
                      value: "2"
                    }
                  ],
                  translation: true
                }
              }
            ]
          },
          {
            formList: [{
              title: "商品库存",
              dataIndex: "goods_sale",
              formType: "input-number",
              search: false,
              commonRules: {
                required: true,
                message: "请输入商品库存"
              },
              min: 0,
              max: 999999
            },
              {
                title: "商品单位",
                dataIndex: "affiliate.goods_unit",
                formType: "input",
                defaultValue: 0,
                search: false,
                hide: true,
                commonRules: {
                  required: true,
                  message: "请输入商品单位"
                },
              },]
          },
          {
            formList: [
              {
                title: "销售价",
                dataIndex: "goods_price",
                formType: "input-number",
                search: false,
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
                search: false,
                commonRules: {
                  required: true,
                  message: "请输入参考价格，返回价格区间，可能为空"
                },
                min: 0,
                max: 999999,
                precision: 2
              }]
          },
          {
            formList: [
              {
                title: '产品分组', dataIndex: 'goods_category_id', hide: true, formType: 'tree-select', select: true,
                dict: {url: 'goods/category/tree'}, params: {onlyMenu: true},
                commonRules: [{required: true, message: '产品分组必选'}],
                editDefaultValue: async (record) => {
                  return record.goods_category_id == 0 ? undefined : record.goods_category_id
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
            ]
          }
        ]
      },
    ]
  },
  {
    hide: true,
    formType: 'card',
    title: '营销信息',
    customClass: ['mt-3'],
    bodyStyle: {paddingBottom: 0,},
    formList: [
      {
        formType: 'grid-tailwind',
        colNumber: 2,
        cols: [
          {
            formList: [
              {
                title: "预售产品",
                dataIndex: "affiliate.goods_is_presell",
                formType: "select",
                search: true,
                hide: true,
                commonRules: {
                  required: true,
                  message: "请选择是否预售（1否2是）"
                },
                dict: {
                  data: [
                    {
                      label: "否",
                      value: "1"
                    },
                    {
                      label: "是",
                      value: "2"
                    }
                  ],
                  translation: true
                },
              },
              {
                title: "限购产品",
                dataIndex: "affiliate.goods_is_purchase",
                formType: "select",
                search: true,
                commonRules: {
                  required: true,
                  message: "请选择是否限购（1否2是）"
                },
                dict: {
                  data: [
                    {
                      label: "否",
                      value: "1"
                    },
                    {
                      label: "是",
                      value: "2"
                    }
                  ],
                  translation: true
                },
              },
            ]
          },
          {
            formList: [
              {
                title: "限购类型",
                dataIndex: "affiliate.goods_purchase_type",
                formType: "select",
                search: true,
                hide: true,
                commonRules: {
                  required: true,
                  message: "请选择限购类型（1否2是）"
                },
                dict: {
                  data: [
                    {
                      label: "单次限购",
                      value: "1"
                    },
                    {
                      label: "全部限购",
                      value: "2"
                    }
                  ],
                  translation: true
                },
                addDisplay: false,
                editDisplay: false
              },
              {
                title: "限购数量",
                dataIndex: "affiliate.goods_purchase_num",
                formType: "input-number",
                min: 0,
                max: 999999,
                hide: true,
                defaultValue: 0,
                search: false,
                commonRules: {
                  required: true,
                  message: "请输入限购数量"
                },
                addDisplay: false,
                editDisplay: false
              },
            ]
          }
        ]
      },
      {
        formType: 'grid-tailwind',
        colNumber: 2,
        cols: [
          {
            formList: [
              {
                title: "会员商品",
                dataIndex: "affiliate.goods_is_vip",
                formType: "select",
                search: true,
                commonRules: {
                  required: true,
                  message: "请选择是否会员商品（1否2是）"
                },
                dict: {
                  data: [
                    {
                      label: "否",
                      value: "1"
                    },
                    {
                      label: "是",
                      value: "2"
                    }
                  ],
                  translation: true
                },
                addDisplay: false,
                editDisplay: false
              },
              {
                title: "购买送积分",
                dataIndex: "affiliate.goods_buy_point",
                formType: "input-number",
                min: 0,
                max: 999999,
                defaultValue: 0,
                search: false,
                hide: true,
                commonRules: {
                  required: true,
                  message: "请输入限购数量"
                },
                addDisplay: false,
                editDisplay: false
              },
            ]
          },
          {
            formList: [
              {
                title: "商品推荐",
                dataIndex: "affiliate.goods_recommend",
                formType: "select",
                search: true,
                commonRules: {
                  required: true,
                  message: "请选择商品推荐（1不推荐2推荐）"
                },
                dict: {
                  data: [
                    {
                      label: "不推荐",
                      value: "1"
                    },
                    {
                      label: "推荐",
                      value: "2"
                    }
                  ],
                  translation: true
                },
                addDisplay: false,
                editDisplay: false
              },
              {
                title: "商品已售数量",
                dataIndex: "affiliate.goods_sales",
                formType: "input-number",
                min: 0,
                max: 999999,
                defaultValue: 0,
                search: false,
                hide: true,
                commonRules: {
                  required: true,
                  message: "请输入已售数量"
                },
                addDisplay: false,
                editDisplay: false
              },
            ]
          }
        ]
      },
    ],
  },
  {
    hide: true,
    formType: 'card',
    title: '物流信息',
    customClass: ['mt-3'],
    bodyStyle: {paddingBottom: 0,},
    formList: [
      {
        formType: 'grid-tailwind',
        colNumber: 2,
        cols: [
          {
            formList: [
              {
                title: "物流方式",
                dataIndex: "affiliate.goods_logistics_type",
                formType: "select",
                search: true,
                commonRules: {
                  required: true,
                  message: "请选择商品物流方式（1物流2门店自提）"
                },
                dict: {
                  data: [
                    {
                      label: "物流",
                      value: "1"
                    },
                    {
                      label: "自提",
                      value: "2"
                    }
                  ],
                  translation: true
                },
                addDisplay: false,
                editDisplay: false
              },
            ]
          },
          {
            formList: [
              {
                title: "运费方式",
                dataIndex: "affiliate.goods_freight_type",
                formType: "select",
                search: true,
                commonRules: {
                  required: true,
                  message: "请选择商品运费方式（1固定邮费2运费模板）"
                },
                dict: {
                  data: [
                    {
                      label: "固定邮费",
                      value: "1"
                    },
                    {
                      label: "运费模板",
                      value: "2"
                    }
                  ],
                  translation: true
                },
                addDisplay: false,
                editDisplay: false
              },
            ]
          }
        ]
      },
    ],
  },
  {
    hide: true,
    formType: 'card',
    title: '商品规格',
    customClass: ['mt-3', 'mb-5'],
    formList: [
      {
        title: '属性信息', dataIndex: 'attributes_data', formType: 'children-form', type: 'table', emptyRow: 1,
        formList: [
          {title: '属性名称', dataIndex: 'attributes_name', rules: [{required: true, message: '请输入属性名称'}]},
          {title: '属性值', dataIndex: 'value', rules: [{required: true, message: '请输入属性的值'}]},
        ]
      },
      {
        title: '规格信息', dataIndex: 'sku_data', formType: 'children-form', type: 'table', emptyRow: 1,
        formList: [
          {
            title: '规格图片',
            dataIndex: 'goods_sku_image',
            formType: "upload",
            width: 50,
            type: "image",
            rules: [{required: true, message: '请选择规格的图片'}]
          },
          {title: 'sku名称', dataIndex: 'goods_sku_name', rules: [{required: true, message: '请输入规格名称'}]},
          {title: 'sku值', dataIndex: 'goods_sku_value', rules: [{required: true, message: '请输入规格的值'}]},
          {
            title: '价格',
            dataIndex: 'goods_sku_price',
            formType: "input-number",
            min: 0,
            max: 999999,
            precision: 2,
            rules: [{required: true, message: '请输入规格的价格'}]
          },
          {
            title: '市场价',
            dataIndex: 'goods_sku_market_price',
            formType: "input-number",
            precision: 2,
            min: 0,
            max: 999999,
            rules: [{required: true, message: '请输入规格的价格'}]
          },
          {
            title: '库存',
            dataIndex: 'goods_sku_sale',
            formType: "input-number",
            min: 0,
            max: 999999,
            rules: [{required: true, message: '请输入规格的价格'}]
          },

        ]
      }
    ],
  },
  {
    hide: true,
    formType: 'card',
    title: '商品简介',
    customClass: ['mt-3'],
    bodyStyle: {paddingBottom: 0,},
    formList: [
      {
        formType: 'grid-tailwind',
        colNumber: 1,
        cols: [
          {
            formList: [
              {
                title: "商品详情",
                dataIndex: "goods_description",
                formType: "editor",
                hide: true,
                addDisplay: false,
                editDisplay: false
              }
            ]
          }
        ]
      },
    ],
  },

  {
    title: "商品唯一标识",
    dataIndex: "id",
    formType: "input",
    hide: true,
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "商品类型",
    dataIndex: "goods_type",
    formType: "select",
    search: true,
    commonRules: {
      required: true,
      message: "请选择商品类型"
    },
    dict: {
      data: [
        {
          label: "实物",
          value: "1"
        },
        {
          label: "虚拟",
          value: "2"
        }
      ],
      translation: true
    },
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "商品名称",
    dataIndex: "goods_name",
    formType: "input",
    search: true,
    commonRules: {
      required: true,
      message: "请输入商品名称"
    },
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "销售价",
    dataIndex: "goods_price",
    formType: "input-number",
    search: false,
    commonRules: {
      required: true,
      message: "请输入商品建议销售价"
    },
    min: 0,
    max: 999999,
    precision: 2,
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "商品单位",
    dataIndex: "affiliate.goods_unit",
    formType: "input",
    defaultValue: 0,
    search: false,
    hide: true,
    commonRules: {
      required: true,
      message: "请输入商品单位"
    },
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "商品首图",
    dataIndex: "goods_image",
    formType: "upload",
    width: 150,
    commonRules: {
      required: true,
      message: "请输入商品图片"
    },
    type: "image",
    multiple: true,
    addDisplay: false,
    editDisplay: false,
    onlyData: true,
    returnType: "url",
  },
  {
    title: "商品图片",
    dataIndex: "goods_images",
    formType: "resource",
    width: 150,
    hide: true,
    commonRules: {
      required: true,
      message: "请输入商品图片"
    },
    type: "image",
    multiple: true,
    onlyData: true,
    returnType: "url",
    addDisplay: false,
    editDisplay: false
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
    },
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "预售产品",
    dataIndex: "affiliate.goods_is_presell",
    formType: "select",
    search: true,
    hide: true,
    commonRules: {
      required: true,
      message: "请选择是否预售（1否2是）"
    },
    dict: {
      data: [
        {
          label: "否",
          value: "1"
        },
        {
          label: "是",
          value: "2"
        }
      ],
      translation: true
    },
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "限购产品",
    dataIndex: "affiliate.goods_is_purchase",
    formType: "select",
    search: true,
    commonRules: {
      required: true,
      message: "请选择是否限购（1否2是）"
    },
    dict: {
      data: [
        {
          label: "否",
          value: "1"
        },
        {
          label: "是",
          value: "2"
        }
      ],
      translation: true
    },
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "会员商品",
    dataIndex: "affiliate.goods_is_vip",
    formType: "select",
    search: true,
    commonRules: {
      required: true,
      message: "请选择是否会员商品（1否2是）"
    },
    dict: {
      data: [
        {
          label: "否",
          value: "1"
        },
        {
          label: "是",
          value: "2"
        }
      ],
      translation: true
    },
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "商品推荐",
    dataIndex: "affiliate.goods_recommend",
    formType: "select",
    search: true,
    commonRules: {
      required: true,
      message: "请选择商品推荐（1不推荐2推荐）"
    },
    dict: {
      data: [
        {
          label: "不推荐",
          value: "1"
        },
        {
          label: "推荐",
          value: "2"
        }
      ],
      translation: true
    },
    addDisplay: false,
    editDisplay: false
  },
])
</script>
<script> export default {name: 'goods:manage'} </script>