const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  sessionid: state => state.user.sessionid,
  userid: state => state.user.userid,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  selectedoption: state => state.goodstype.selectedOptions,
  selectedlabel: state => state.goodstype.selectedLabels,
  routes: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}
export default getters
