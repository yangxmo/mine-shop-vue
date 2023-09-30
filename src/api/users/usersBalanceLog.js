import { request } from '@/utils/request.js'

/**
 * 表注释 API JS
 */

export default {

  /**
   * 获取表注释分页列表
   * @returns
   */
  getList (params = {}) {
    return request({
      url: 'users/balanceLog/index',
      method: 'get',
      params
    })
  },


}