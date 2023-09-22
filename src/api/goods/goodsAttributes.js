import { request } from '@/utils/request.js'

/**
 * 商品属性表 API JS
 */

export default {

  /**
   * 获取商品属性表分页列表
   * @returns
   */
  getList (params = {}) {
    return request({
      url: 'goods/attributes/index',
      method: 'get',
      params
    })
  },

  /**
   * 添加商品属性表
   * @returns
   */
  save (data = {}) {
    return request({
      url: 'goods/attributes/save',
      method: 'post',
      data
    })
  },

  /**
   * 更新商品属性表数据
   * @returns
   */
  update (id, data = {}) {
    return request({
      url: 'goods/attributes/update/' + id,
      method: 'put',
      data
    })
  },

  /**
   * 读取商品属性表
   * @returns
   */
  read (id) {
    return request({
      url: 'goods/attributes/read/' + id,
      method: 'get',
      data
    })
  },

  /**
   * 将商品属性表删除，有软删除则移动到回收站
   * @returns
   */
  deletes (data) {
    return request({
      url: 'goods/attributes/delete',
      method: 'delete',
      data
    })
  },

  /**
   * 更改商品属性表数据
   * @returns
   */
  changeStatus (data = {}) {
    return request({
      url: 'goods/attributes/changeStatus',
      method: 'put',
      data
    })
  },


}