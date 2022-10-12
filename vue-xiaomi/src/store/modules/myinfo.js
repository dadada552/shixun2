import {
    Message
}
from 'element-ui'
const state = {
    infoarr: []
}
const mutations = {
    add(state, obj) {
        let index = state.infoarr.findIndex((item) => item.product_id == obj.product_id)
        if (index == -1) {
            state.infoarr.push(obj)
        } else {
            Message.error('错误，当前商品已经在喜欢列表');
        }
    }
}
const actions = {

}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}