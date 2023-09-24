import { request } from '@/utils/request.js'

/**
 * 用户数据表 API JS
 */

export default {

  /**
   * 获取用户数据表分页列表
   * @returns
   */
  getList (params = {}) {
    return request({
      url: 'users/user/index',
      method: 'get',
      params
    })
  },

  /**
   * 添加用户数据表
   * @returns
   */
  save (data = {}) {
    return request({
      url: 'users/user/save',
      method: 'post',
      data
    })
  },

  /**
   * 更新用户数据表数据
   * @returns
   */
  update (id, data = {}) {
    return request({
      url: 'users/user/update/' + id,
      method: 'put',
      data
    })
  },

  /**
   * 读取用户数据表
   * @returns
   */
  read (id) {
    return request({
      url: 'users/user/read/' + id,
      method: 'get',
      data
    })
  },

  /**
   * 将用户数据表删除，有软删除则移动到回收站
   * @returns
   */
  deletes (data) {
    return request({
      url: 'users/user/delete',
      method: 'delete',
      data
    })
  },

  /**
   * 从回收站获取用户数据表数据列表
   * @returns
   */
  getRecycleList (params = {}) {
    return request({
      url: 'users/user/recycle',
      method: 'get',
      params
    })
  },

  /**
   * 恢复用户数据表数据
   * @returns
   */
  recoverys (data) {
    return request({
      url: 'users/user/recovery',
      method: 'put',
      data
    })
  },

  /**
   * 真实删除用户数据表
   * @returns
   */
  realDeletes (data) {
    return request({
      url: 'users/user/realDelete',
      method: 'delete',
      data
    })
  },

  /**
   * 更改用户数据表数据
   * @returns
   */
  changeStatus (data = {}) {
    return request({
      url: 'users/user/changeStatus',
      method: 'put',
      data
    })
  },

  /**
   * 修改用户数据表数值数据，自增自减
   * @returns
   */
  numberOperation (data = {}) {
    return request({
      url: 'users/user/numberOperation',
      method: 'put',
      data
    })
  },

  /**
   * 用户数据表导出
   * @returns
   */
  exportExcel (params = {}) {
    return request({
      url: 'users/user/export',
      method: 'post',
      responseType: 'blob',
      params
    })
  },


}