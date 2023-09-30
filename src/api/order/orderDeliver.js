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
        // 固定查询待发货
        params.order_status = 4;
        return request({
            url: 'order/base/index',
            method: 'get',
            params
        })
    },

    /**
     * 订单发货
     * @returns
     */
    delivery (data = {}) {
        return request({
            url: 'order/delivery/delivery',
            method: 'post',
            data
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
     * 读取订单基础表
     * @returns
     */
    getLogisticsTypeList () {
        return request({
            url: 'order/delivery/logisticsTypeList',
            method: 'get',
        })
    },

    /**
     * 订单基础表导出
     * @returns
     */
    exportExcel (params = {}) {
        // 固定查询待发货
        params.order_status = 4;
        return request({
            url: 'order/base/export',
            method: 'post',
            responseType: 'blob',
            params
        })
    },


}