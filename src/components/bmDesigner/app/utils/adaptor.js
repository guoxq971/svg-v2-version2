// 入参适配器
export function prodAdaptor(param) {
  return {
    tag: "design",
    container: "#design",
    id: param.id,
    d1: param.d1,
    d2: param.d2,
    d3: param.d3,
    bgUrl: param.bgImg,
    prodUrl: param.productImg,
  };
}
