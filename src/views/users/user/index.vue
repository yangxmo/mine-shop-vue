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
      <!-- 头像列 -->
      <template #avatar="{ record }">
        <a-avatar>
          <img :src="record.avatar || '/avatar.jpg'" style="object-fit: cover" />
        </a-avatar>
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
import {ref, reactive} from 'vue'
import user from '@/api/users/user'
import {Message} from '@arco-design/web-vue'
import tool from '@/utils/tool'
import * as common from '@/utils/common'

const crudRef = ref()


const numberOperation = (newValue, id, numberName) => {
  user.numberOperation({id, numberName, numberValue: newValue}).then(res => {
    res.success && Message.success(res.message)
  }).catch(e => {
    console.log(e)
  })
}

const switchStatus = (statusValue, id, statusName) => {
  user.changeStatus({id, statusName, statusValue}).then(res => {
    res.success && Message.success(res.message)
  }).catch(e => {
    console.log(e)
  })
}


const options = reactive({
  id: 'ms_users_user',
  rowSelection: {
    showCheckedAll: true
  },
  pk: 'id',
  operationColumn: true,
  operationWidth: 160,
  formOption: {
    viewType: 'drawer',
    width: 500
  },
  api: user.getList,
  recycleApi: user.getRecycleList,
  add: {
    show: true,
    api: user.save,
    auth: ['users:user:save']
  },
  edit: {
    show: true,
    api: user.update,
    auth: ['users:user:update']
  },
  delete: {
    show: true,
    api: user.deletes,
    auth: ['users:user:delete'],
    realApi: user.realDeletes,
    realAuth: ['users:user:realDeletes']
  },
  recovery: {
    show: true,
    api: user.recoverys,
    auth: ['users:user:recovery']
  },
  export: {
    show: true,
    url: 'users/user/export',
    auth: ['users:user:export']
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
  },
  {
    title: '头像', dataIndex: 'avatar', width: 75, formType: 'upload',
    type: 'image', rounded: true, labelWidth: '86px'
  },
  {
    title: "手机号",
    dataIndex: "mobile",
    formType: "input-number",
    width: 120,
    search: true,
    commonRules: {
      required: true,
      pattern: /^1[3456789]\d{9}$/,
      message: "请输入正确的手机号"
    }
  },
  {
    title: "用户昵称",
    dataIndex: "nickname",
    formType: "input",
    search: true,
    commonRules: {
      required: false,
      message: "请输入用户昵称"
    }
  },
  {
    title: "用户性别",
    dataIndex: "sex",
    formType: "radio",
    search: true,
    commonRules: {
      required: true,
      message: "请输入用户性别"
    },
    dict: {
      data: [
        {
          label: "男",
          value: "1"
        },
        {
          label: "女",
          value: "2"
        }
      ],
      translation: true
    }
  },
  {
    title: "邮箱",
    dataIndex: "email",
    formType: "input",
    search: true,
    commonRules: {
      pattern: /^.+@.+$/i,
      message: "请输入正确的邮箱"
    }
  },
  {
    title: "密码",
    dataIndex: "password",
    formType: "input-password",
    hide: true,
    commonRules: {
      required: true,
      message: "请输入密码"
    },
    type: "password"
  },

  {
    title: "真实姓名",
    dataIndex: "real_name",
    formType: "input",
    search: false
  },
  {
    title: "用户状态",
    dataIndex: "status",
    formType: "select",
    search: true,
    commonRules: {
      required: true,
      message: "请选择用户状态"
    },
    dict: {
      data: [
        {
          label: "正常",
          value: "1"
        },
        {
          label: "封禁",
          value: "2"
        }
      ],
      translation: true
    }
  },
  {
    title: "会员等级",
    dataIndex: "level",
    formType: "input-number",
    min: 1,
    max: 5,
    search: true,
    commonRules: {
      required: true,
      message: "请输入用户会员等级"
    }
  },
  {
    title: "邀请码",
    dataIndex: "invite_code",
    formType: "input",
    search: false
  },
  {
    title: "邀请人",
    dataIndex: "invite_code_by",
    formType: "input",
    search: false,
    addDisplay: false,
    editDisplay: false
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
    formType: "date",
    width:180,
    addDisplay: false,
    editDisplay: false,
    hide: false,
    showTime: true
  },
  {
    title: "更新时间",
    dataIndex: "updated_at",
    formType: "date",
    addDisplay: false,
    editDisplay: false,
    hide: true,
    showTime: true
  }
])
</script>
<script> export default {name: 'users:user'} </script>