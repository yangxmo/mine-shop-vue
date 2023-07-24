import { request } from '@/utils/request.js'

/**
 * 商品分类 API JS
 */

export default {

  /**
   * 获取商品分类列表
   * @returns
   */
  getList (params = {}) {
    return request({
      url: 'goods/category/index',
      method: 'get',
      params
    })
  },

  /**
    * 获取商品分类选择树
    * @returns
    */
  tree () {
    return request({
      url: 'goods/category/tree',
      method: 'get'
    })
  },


  /**
   * 添加商品分类
   * @returns
   */
  save (data = {}) {
    return request({
      url: 'goods/category/save',
      method: 'post',
      data
    })
  },

  /**
   * 读取商品分类
   * @returns
   */
  read (id) {
    return request({
      url: 'goods/category/read/' + id,
      method: 'get',
      data
    })
  },

  /**
   * 将商品分类删除，有软删除则移动到回收站
   * @returns
   */
  deletes (data) {
    return request({
      url: 'goods/category/delete',
      method: 'delete',
      data
    })
  },

  /**
   * 从回收站获取商品分类数据列表
   * @returns
   */
  getRecycleList (params = {}) {
    return request({
      url: 'goods/category/recycle',
      method: 'get',
      params
    })
  },

  /**
   * 恢复商品分类数据
   * @returns
   */
  recoverys (data) {
    return request({
      url: 'goods/category/recovery',
      method: 'put',
      data
    })
  },

  /**
   * 真实删除商品分类
   * @returns
   */
  realDeletes (data) {
    return request({
      url: 'goods/category/realDelete',
      method: 'delete',
      data
    })
  },

  /**
   * 更改商品分类数据
   * @returns
   */
  changeStatus (data = {}) {
    return request({
      url: 'goods/category/changeStatus',
      method: 'put',
      data
    })
  },

  /**
   * 更新商品分类数据
   * @returns
   */
  update (id, data = {}) {
    return request({
      url: 'goods/category/update/' + id,
      method: 'put',
      data
    })
  },

  /**
    * 商品分类导入
    * @returns
    */
  importExcel (data = {}) {
    return request({
      url: 'goods/category/import',
      method: 'post',
      data
    })
  },

  /**
   * 商品分类下载模板
   * @returns
   */
  downloadTemplate () {
    return request({
      url: 'goods/category/downloadTemplate',
      method: 'post',
      responseType: 'blob'
    })
  },

  /**
   * 商品分类导出
   * @returns
   */
  exportExcel (params = {}) {
    return request({
      url: 'goods/category/export',
      method: 'post',
      responseType: 'blob',
      params
    })
  },


}