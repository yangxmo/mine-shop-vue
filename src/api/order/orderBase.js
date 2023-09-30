import { request } from '@/utils/request.js'

/**
 * 订单基础表 API JS
 */

export default {

    /**
     * 获取订单基础表分页列表
     * @returns
     */
    getList (params = {}) {
        return request({
            url: 'order/base/index',
            method: 'get',
            params
        })
    },

    /**
     * 获取订单商品表列表
     * @returns
     */
    getGoodsList (order_no) {
        return request({
            url: 'order/base/getGoodsList/' + order_no,
            method: 'get',
        })
    },

    /**
     * 读取订单基础表
     * @returns
     */
    read (id) {
        return request({
            url: 'order/base/read/' + id,
            method: 'get',
            data
        })
    },

    /**
     * 订单基础表导出
     * @returns
     */
    exportExcel (params = {}) {
        return request({
            url: 'order/base/export',
            method: 'post',
            responseType: 'blob',
            params
        })
    },


}