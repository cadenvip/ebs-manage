const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  userid: state => state.user.userid,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  selectedoption: state => state.goodstype.selectedOptions
}
export default getters
