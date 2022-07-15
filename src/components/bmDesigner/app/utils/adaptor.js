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

/*
 * 设计图入参适配器
 * - 复制的时候用到
 * - 设计器切换产品的时候用到
 * */
export function imageAdapterV2(data) {
  return {
    id: data.id,
    name: data.name,
    sid: data.sid,
    url: data.url,
  };
}

// 设计图入参适配器
export function imageAdaptor(image, data) {
  data.sid = image.getId();
  return {
    sid: data.sid,
    type: "img",
    sNode: image,
    id: data.id,
    url: data.url,
    name: data.name,
    isShow: true,
  };
}

// (背景图)设计图入参适配器
export function bgImageAdaptor(image) {
  return {
    sid: image.getId(),
    type: "bg",
    sNode: image,
    id: "",
    url: "",
    name: `${image.getColor()}`,
    color: image.getColor(),
    isShow: true,
  };
}
