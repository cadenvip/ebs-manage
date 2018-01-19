const goodstype = {
  state: {
    selectedOptions: []
  },
  mutations: {
    SET_SELECTEDOPTION: (state, options) => {
      state.selectedOptions = options
    }
  }
}

export default goodstype
