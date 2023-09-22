import { request } from '@/utils/request.js'

/**
 * 服务模板 API JS
 */

export default {

  /**
   * 获取服务模板分页列表
   * @returns
   */
  getList (params = {}) {
    return request({
      url: 'goods/clause/index',
      method: 'get',
      params
    })
  },

  /**
   * 添加服务模板
   * @returns
   */
  save (data = {}) {
    return request({
      url: 'goods/clause/save',
      method: 'post',
      data
    })
  },

  /**
   * 更新服务模板数据
   * @returns
   */
  update (id, data = {}) {
    return request({
      url: 'goods/clause/update/' + id,
      method: 'put',
      data
    })
  },

  /**
   * 读取服务模板
   * @returns
   */
  read (id) {
    return request({
      url: 'goods/clause/read/' + id,
      method: 'get',
      data
    })
  },

  /**
   * 将服务模板删除，有软删除则移动到回收站
   * @returns
   */
  deletes (data) {
    return request({
      url: 'goods/clause/delete',
      method: 'delete',
      data
    })
  },


}