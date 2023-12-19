import http from "@/utils/http"; // 导入http中创建的axios实例

const svg = {
  // 查询svg列表
  getSvgList({limit, offset} ) {
    return http.get(`/effect/svg?limit=${limit}&offset=${offset}`);
  },
  // 查询svg
  getSvgById({id}) {
    return http.get(`/effect/svg/${id}`);
  },
  // 添加svg
  addSvg(params){
    return http.post(`/effect/svg`, params);
  },
  // 更新svg数据
  updateSvg(params){
    return http.patch(`/effect/svg`, params);
  },
  // 删除svg
  deleteSvg({id}) {
    return http.delete(`/effect/svg/${id}`);
  },
  // 查询字体笔画
  queryStrokes(params){
    return http.post(`/effect/queryStrokes`, params);
  },

};

export default svg;
