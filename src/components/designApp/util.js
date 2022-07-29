// 获取元素(el)在 body 上的信息
import { useQueue } from "@/components/designApp/queue";
import { useSnap } from "@/components/designApp/useSnap";
import { useUtil, useVueProd } from "@/components/designApp/useUtil";
import { DesignImage } from "@/components/designApp/interface/prod";

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

/*
 * vue数据深拷贝(撤回、恢复中使用)
 * */
export function vueSet(set, data, vueData, key) {
  let types = ["string", "number", "boolean", "undefined", "null"];
  if (types.includes(typeof data)) {
    set(vueData, key, data);
  } else if (Array.isArray(data)) {
    if (key === "imageList") {
      let ids = data.map((item) => item.id);
      // 1. [删除]去掉已经删除的图片
      vueData[key] = vueData[key].filter((item) => ids.includes(item.id));
      data.forEach((dataItem, dataIndex) => {
        // 2. [更新]添加新增的图片和更新的图片
        let i = vueData[key].findIndex((item) => dataItem.id === item.id);
        if (i !== -1) {
          vueSet(set, dataItem, vueData[key], i);
        }
        // 3. [新增]没找到就是新增
        else {
          // console.error("没找到就是新增");
          let that = useVueProd().vurProd;
          let img;
          if (dataItem.type === "img") {
            img = that.prod.addImage(
              { ...dataItem.imageData, svgId: that.id },
              dataItem.imageData
            );
          } else if (dataItem.type === "bg") {
            img = that.prod.addImageBg({
              ...dataItem.imageData,
              svgId: that.id,
            });
          }
          img.id = dataItem.id;
          vueSet(set, dataItem, that.prod.imageList, dataIndex);
        }
      });
      // 4. [排序] 对图片进行排序
      let list = [];
      data.forEach((dataItem) => {
        let i = vueData[key].findIndex((item) => dataItem.id === item.id);
        if (i !== -1) list.push(vueData[key][i]);
      });
      vueData[key] = list;
    } else {
      console.error("处理到了数组，可能会出现问题");
      data.forEach((item, index) => {
        vueSet(set, item, vueData[key], index);
      });
    }
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

/*
 * 撤回
 * */
export function vueUndo() {
  let queueProd = useQueue().undo();
  let set = useVueProd().vurProd.$set;
  if (queueProd) {
    vueSet(set, queueProd, useVueProd().vurProd, "prod");
  }
}

/*
 * 回退
 * */
export function vueRedo() {
  let queueProd = useQueue().redo();
  let set = useVueProd().vurProd.$set;
  if (queueProd) {
    vueSet(set, queueProd, useVueProd().vurProd, "prod");
  }
}
