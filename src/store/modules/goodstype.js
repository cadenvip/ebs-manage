const goodstype = {
  state: {
    selectedOptions: [],
    selectedLabels: {
      label: '',
      subLabel: ''
    }
  },
  mutations: {
    SET_SELECTEDOPTION: (state, options) => {
      state.selectedOptions = options
    },
    SET_SELECTEDLABELS: (state, options) => {
      state.selectedLabels = options
    }
  }
}

export default goodstype
