import Api from "@/utils/http"; // 导入http中创建的axios实例

const user = {
  // 查询用户列表
  getUserList({limit, offset} ) {
    return Api.get(`/effect/user?limit=${limit}&offset=${offset}`);
  },
  // 查询用户
  getUserById({id}) {
    return Api.get(`/effect/user/${id}`);
  },
  // 添加用户
  addUser(params){
    return Api.post(`/effect/user`, params);
  },
  // 更新用户数据
  updateUser(params){
    return Api.patch(`/effect/user`, params);
  },
  // 删除用户
  deleteUser({id}) {
    return Api.delete(`/effect/user/${id}`);
  },
  // 登录
  login(params){
    return Api.post(`/effect/login`, params);
  },
  // 退出登录
  logout(params){
    return Api.post(`/effect/logout`, params);
  },
  // 获取用户信息
  getUserInfo(){
    return Api.get(`/effect/getUserInfo`);
  },

  /** role 相关 */   
  // 查询 role 列表
  getRoleList({limit, offset} ) {
    return Api.get(`/effect/role?limit=${limit}&offset=${offset}`);
  },
  // 查询role
  getRoleById({id}) {
    return Api.get(`/effect/role/${id}`);
  },
  // 添加role
  addRole(params){
    return Api.post(`/effect/role`, params);
  },
  // 更新role
  updateRole(params){
    return Api.patch(`/effect/role`, params);
  },
  // 删除role
  deleteRole({id}) {
    return Api.delete(`/effect/role/${id}`);
  },

};

export default user;
