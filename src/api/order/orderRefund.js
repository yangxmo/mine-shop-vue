import {request} from '@/utils/request.js'

/**
 * 订单售后表 API JS
 */

export default {

    /**
     * 获取订单表分页列表
     * @returns
     */
    getList(params = {}) {
        return request({
            url: 'order/refund/index',
            method: 'get',
            params
        })
    },

    /**
     * 获取订单商品表列表
     * @returns
     */
    getGoodsList(order_no) {
        return request({
            url: 'order/refund/getGoodsList/' + order_no,
            method: 'get',
        })
    },

    /**
     * 读取订单基础表
     * @returns
     */
    read(params = {}) {
        return request({
            url: 'order/refund/read',
            method: 'get',
            params
        })
    },

    /**
     * 审核
     * @returns
     */
    audit(data = {}) {
        return request({
            url: 'order/refund/audit',
            method: 'post',
            data
        })
    },

    /**
     * 订单基础表导出
     * @returns
     */
    exportExcel(params = {}) {
        return request({
            url: 'order/refund/export',
            method: 'post',
            responseType: 'blob',
            params
        })
    },


}