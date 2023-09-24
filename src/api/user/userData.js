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
      url: 'user/data/index',
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
      url: 'user/data/save',
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
      url: 'user/data/update/' + id,
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
      url: 'user/data/read/' + id,
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
      url: 'user/data/delete',
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
      url: 'user/data/recycle',
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
      url: 'user/data/recovery',
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
      url: 'user/data/realDelete',
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
      url: 'user/data/changeStatus',
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
      url: 'user/data/numberOperation',
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
      url: 'user/data/export',
      method: 'post',
      responseType: 'blob',
      params
    })
  },


}