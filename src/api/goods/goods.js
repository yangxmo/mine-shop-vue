import { request } from '@/utils/request.js'

/**
 * 商品表 API JS
 */

export default {

    /**
     * 获取商品表分页列表
     * @returns
     */
    getList (params = {}) {
        return request({
            url: 'goods/manage/index',
            method: 'get',
            params
        })
    },

    /**
     * 添加商品表
     * @returns
     */
    save (data = {}) {
        return request({
            url: 'goods/manage/save',
            method: 'post',
            data
        })
    },

    /**
     * 更新商品表数据
     * @returns
     */
    update (id, data = {}) {
        console.log(data)
        return request({
            url: 'goods/manage/update/' + id,
            method: 'put',
            data
        })
    },

    /**
     * 读取商品表
     * @returns
     */
    read (id) {
        return request({
            url: 'goods/manage/read/' + id,
            method: 'get',
            data
        })
    },

    /**
     * 将商品表删除，有软删除则移动到回收站
     * @returns
     */
    deletes (data) {
        return request({
            url: 'goods/manage/delete',
            method: 'delete',
            data
        })
    },

    /**
     * 从回收站获取商品表数据列表
     * @returns
     */
    getRecycleList (params = {}) {
        return request({
            url: 'goods/manage/recycle',
            method: 'get',
            params
        })
    },

    /**
     * 恢复商品表数据
     * @returns
     */
    recoverys (data) {
        return request({
            url: 'goods/manage/recovery',
            method: 'put',
            data
        })
    },

    /**
     * 真实删除商品表
     * @returns
     */
    realDeletes (data) {
        return request({
            url: 'goods/manage/realDelete',
            method: 'delete',
            data
        })
    },

    /**
     * 更改商品表数据
     * @returns
     */
    changeStatus (data = {}) {
        return request({
            url: 'goods/manage/changeStatus',
            method: 'put',
            data
        })
    },

    /**
     * 商品表导入
     * @returns
     */
    importExcel (data = {}) {
        return request({
            url: 'goods/manage/import',
            method: 'post',
            data
        })
    },

    /**
     * 商品表下载模板
     * @returns
     */
    downloadTemplate () {
        return request({
            url: 'goods/manage/downloadTemplate',
            method: 'post',
            responseType: 'blob'
        })
    },

    /**
     * 商品表导出
     * @returns
     */
    exportExcel (params = {}) {
        return request({
            url: 'goods/manage/export',
            method: 'post',
            responseType: 'blob',
            params
        })
    },


}