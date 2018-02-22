const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  userid: state => state.user.userid,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  userinfos: state => state.user.userinfos,
  selectedoption: state => state.goodstype.selectedOptions,
  selectedlabel: state => state.goodstype.selectedLabels,
  addRouters: state => state.permission.addRouters
}
export default getters
