// 获取元素(el)在 body 上的信息
import { useQueue } from "@/components/designApp/queue";
import { useSnap } from "@/components/designApp/useSnap";
import { useUtil } from "@/components/designApp/useUtil";

export function getOffset(el) {
  var box = el.getBoundingClientRect(),
    doc = el.ownerDocument,
    body = doc.body,
    docElem = doc.documentElement,
    clientTop = docElem.clientTop || body.clientTop || 0,
    clientLeft = docElem.clientLeft || body.clientLeft || 0,
    zoom = 1;
  if (body.getBoundingClientRect) {
    var bound = body.getBoundingClientRect();
    zoom = (bound.right - bound.left) / body.clientWidth;
  }
  if (zoom > 1) {
    clientTop = 0;
    clientLeft = 0;
  }
  var top =
      box.top / zoom +
      (window.pageYOffset ||
        (docElem && docElem.scrollTop / zoom) ||
        body.scrollTop / zoom) -
      clientTop,
    left =
      box.left / zoom +
      (window.pageXOffset ||
        (docElem && docElem.scrollLeft / zoom) ||
        body.scrollLeft / zoom) -
      clientLeft;
  // 右下角坐标
  box.x2 = box.right / zoom;
  box.y2 = box.bottom / zoom;
  // 宽高
  box.w = box.right - box.left;
  box.h = box.bottom - box.top;
  // 圆心坐标
  box.cx = box.left + box.w / 2;
  box.cy = box.top + box.h / 2;
  // 对角线长度
  box.line = Math.sqrt(
    Math.pow(box.x2 - box.x, 2) + Math.pow(box.y2 - box.y, 2)
  );
  return {
    top: top,
    left: left,
    box,
    x: box.x,
    y: box.y,
    ...box,
  };
}

// 求两点之间的距离
export function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

/*
 * 求三个坐标的 cosA 值
 * 坐标 [0,0] [50,50] [50,0]
 * [0,0] [50,50] 为边a
 * [0,0] [50,50] 为边b
 * [50,0] [50,50] 为边c
 * 求ab的角度
 * */
export function getAngle(x1, y1, x2, y2, x3, y3) {
  let a = getDistance(x1, y1, x2, y2);
  let b = getDistance(x1, y1, x3, y3);
  let c = getDistance(x2, y2, x3, y3);
  let value = Math.acos((a * a + b * b - c * c) / (2 * a * b));
  return (value * 180) / Math.PI;
}

/*
 * 获取鼠标方向
 * x,y = 参考坐标
 * x1,y1 = 鼠标坐标
 * 规则：
 * up: y2 > y
 * down: y2 < y
 * left: x2 < x
 * right: x2 > x
 * */
export function getMouseDirection(x, y, x2, y2) {
  let direction;
  // 移动方向
  if (y2 > y) {
    direction = "up";
  } else if (y2 < y) {
    direction = "down";
  } else if (x2 > x) {
    direction = "right";
  } else if (x2 < x) {
    direction = "left";
  }
  return direction;
}

/*
 * 获取象限
 * ox,oy = 中心点坐标
 * x2,y2 = 鼠标坐标
 * 如果 x2 > ox && y2 < oy, 则在第一象限
 * 如果 x2 < ox && y2 < oy, 则在第二象限
 * 如果 x2 < ox && y2 > oy, 则在第三象限
 * 如果x2 > ox && y2 > oy, 则在第四象限
 * */
export function getQuadrant(ox, oy, x2, y2) {
  let quadrant;
  if (x2 > ox && y2 < oy) {
    quadrant = 1;
  } else if (x2 < ox && y2 < oy) {
    quadrant = 2;
  } else if (x2 < ox && y2 > oy) {
    quadrant = 3;
  } else if (x2 > ox && y2 > oy) {
    quadrant = 4;
  }
  return quadrant;
}

// uuid函数
export function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/*
 * vue深拷贝数据(赋值)
 * - 但是会保留vue数据上的函数
 * @param {function} set this.$set()
 * @param {any} data 数据
 * @param {any} vueData vue数据
 * @param {string} key 键
 * */
export function vueCloneDeep(set, data, vueData, key) {
  let types = ["string", "number", "boolean", "undefined", "null", "function"];
  if (types.includes(typeof data)) set(vueData, key, data);
  else if (Array.isArray(data)) {
    set(vueData, key, []);
    data.forEach((item, index) => {
      vueCloneDeep(set, item, vueData[key], index);
    });
  } else if (typeof data === "object") {
    set(vueData, key, {});
    for (let dataKey in data) {
      if (data.hasOwnProperty(dataKey)) {
        vueCloneDeep(set, data[dataKey], vueData[key], dataKey);
      }
    }
  }
}

/*
 * js深拷贝数据
 * */
export function cloneDeep(data) {
  let types = ["string", "number", "boolean", "undefined", "null", "function"];
  if (types.includes(typeof data)) return data;
  else if (Array.isArray(data)) {
    return data.map((item) => {
      return cloneDeep(item);
    });
  } else if (typeof data === "object") {
    let obj = {};
    for (let dataKey in data) {
      if (data.hasOwnProperty(dataKey)) {
        obj[dataKey] = cloneDeep(data[dataKey]);
      }
    }
    return obj;
  }
}

function vueSet(set, data, vueData, key) {
  let types = ["string", "number", "boolean", "undefined", "null"];
  if (types.includes(typeof data)) {
    set(vueData, key, data);
  } else if (Array.isArray(data)) {
    // if (["imageList"].indexOf(key)) return;
    console.error("处理到了数组");
  } else if (typeof data === "object") {
    for (let dataKey in vueData[key]) {
      if (vueData[key].hasOwnProperty(dataKey)) {
        if (key === "prod") {
          if (["vueThis", "msgType"].includes(dataKey)) continue;
        }
        vueSet(set, data[dataKey], vueData[key], dataKey);
      }
    }
  }
}

export function vueUndo(vueThis, $nextTick) {
  let queueProd = useQueue().undo();
  let vueProd = vueThis.prod;
  let set = vueThis.$set;
  // 设置产品数据
  vueSet(set, queueProd, vueThis, "prod");
  let map = new Map();
  queueProd.imageList.forEach((image, index) => {
    console.log("设置产品数据", image);
    let imgMs = image.image.transform
      .split("matrix(")[1]
      .split(")")[0]
      .split(",");
    let imgBdMs = image.imageBd.transform
      .split("matrix(")[1]
      .split(")")[0]
      .split(",");
    let imageMatrix = new Snap.Matrix(...imgMs);
    let imgBdMatrix = new Snap.Matrix(...imgBdMs);
    // console.log(imageMatrix, imgBdMatrix);
    // console.log(imageMatrix.split(), imgBdMatrix.split());
    console.log(
      "设计图边框:",
      imgBdMatrix,
      useUtil.getBBoxByMatrix(imgBdMatrix)
    );

    // let bbox = useUtil.getBBoxByImage(image.svgId, image.id);
    // map.set(index, { bbox: bbox, imageId: image.id });
  });
  // 设置设计图数据
  set(vueProd, "imageList", []);
  queueProd.imageList.forEach((image) => {
    vueProd.addImage(
      { ...image.imageData, svgId: queueProd.svgId },
      image.imageData
    );
  });
  // $nextTick(() => {
  //   vueProd.imageList.forEach((image, index) => {
  //     let curMap = map.get(index);
  //     if (curMap) {
  //       let p = new Promise((resolve) => resolve());
  //       p.then(() => {
  //         console.log(curMap.bbox);
  //       })
  //         .then(() => image.setMove(curMap.bbox.x, curMap.bbox.y))
  //         .then(() => image.setScale(curMap.bbox.scale))
  //         .then(() => image.setRotate(curMap.bbox.rotate));
  //     }
  //   });
  // });
}

export function vueUndo2(vueThis) {
  let prod = useQueue().undo();
  if (!prod) return;
  let vueProd = vueThis.$refs.designApp.prod;
  if (prod.imageList.length === 0) vueThis.$set(vueProd, "imageList", []);
  else {
    prod.imageList.forEach((item, index) => {
      vueThis.$set(vueProd.imageList[index], "svgId", item.svgId);
      vueThis.$set(vueProd.imageList[index], "type", item.type);
      vueThis.$set(vueProd.imageList[index], "id", item.id);
      vueThis.$set(vueProd.imageList[index], "isShow", item.isShow);
      vueThis.$set(
        vueProd.imageList[index].imageBd,
        "transform",
        item.imageBd.transform
      );
      vueThis.$set(
        vueProd.imageList[index].image,
        "transform",
        item.image.transform
      );
      vueThis.$set(vueProd.imageList[index].image, "href", item.image.href);
      vueThis.$set(vueProd.imageList[index].image, "x", item.image.x);
      vueThis.$set(vueProd.imageList[index].image, "y", item.image.y);
      vueThis.$set(vueProd.imageList[index].image, "width", item.image.width);
      vueThis.$set(vueProd.imageList[index].image, "height", item.image.height);
      vueThis.$set(
        vueProd.imageList[index].editBd,
        "transform",
        item.editBd.transform
      );
      vueThis.$set(vueProd.imageList[index].editRect, "x", item.editRect.x);
      vueThis.$set(vueProd.imageList[index].editRect, "y", item.editRect.y);
      vueThis.$set(
        vueProd.imageList[index].editRect,
        "width",
        item.editRect.width
      );
      vueThis.$set(
        vueProd.imageList[index].editRect,
        "height",
        item.editRect.height
      );
      vueThis.$set(vueProd.imageList[index].imageMove, "x", item.imageMove.x);
      vueThis.$set(vueProd.imageList[index].imageMove, "y", item.imageMove.y);
      vueThis.$set(
        vueProd.imageList[index].imageMove,
        "width",
        item.imageMove.width
      );
      vueThis.$set(
        vueProd.imageList[index].imageMove,
        "height",
        item.imageMove.height
      );
      vueThis.$set(
        vueProd.imageList[index].imageRotate,
        "href",
        item.imageRotate.href
      );
      vueThis.$set(
        vueProd.imageList[index].imageRotate,
        "x",
        item.imageRotate.x
      );
      vueThis.$set(
        vueProd.imageList[index].imageRotate,
        "y",
        item.imageRotate.y
      );
      vueThis.$set(
        vueProd.imageList[index].imageRotate,
        "width",
        item.imageRotate.width
      );
      vueThis.$set(
        vueProd.imageList[index].imageRotate,
        "height",
        item.imageRotate.height
      );
      vueThis.$set(
        vueProd.imageList[index].imageScale,
        "href",
        item.imageScale.href
      );
      vueThis.$set(vueProd.imageList[index].imageScale, "x", item.imageScale.x);
      vueThis.$set(vueProd.imageList[index].imageScale, "y", item.imageScale.y);
      vueThis.$set(
        vueProd.imageList[index].imageScale,
        "width",
        item.imageScale.width
      );
      vueThis.$set(
        vueProd.imageList[index].imageScale,
        "height",
        item.imageScale.height
      );
      vueThis.$set(
        vueProd.imageList[index].imageDelete,
        "href",
        item.imageDelete.href
      );
      vueThis.$set(
        vueProd.imageList[index].imageDelete,
        "x",
        item.imageDelete.x
      );
      vueThis.$set(
        vueProd.imageList[index].imageDelete,
        "y",
        item.imageDelete.y
      );
      vueThis.$set(
        vueProd.imageList[index].imageDelete,
        "width",
        item.imageDelete.width
      );
      vueThis.$set(
        vueProd.imageList[index].imageDelete,
        "height",
        item.imageDelete.height
      );
    });
  }
  useQueue().log();
}
