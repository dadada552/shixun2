import {
    Message
}
from 'element-ui'
const state = {
    carlist: []
}
const mutations = {
    add(state, obj) {
        let index = state.carlist.findIndex((item) => item.product_id == obj.product_id)
        console.log(index);
        if (index == -1) {
            state.carlist.push(obj)
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