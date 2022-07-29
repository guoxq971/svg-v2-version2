import { useSnap } from "./useSnap";

export class useUtil {
  /*
   * 获取图片信息，根据传入的图片id
   * @param {String} svgId 设计器的svgId
   * @param {String} imgId 图片id
   * @return {Object} 图片信息 {rotate, scale}
   * */
  static getBBoxByImage(svgId, imgId) {
    // 获取sNode节点
    let us = new useSnap(svgId, imgId);
    let imgBd = us.imgBd();
    let img = us.img();
    // 获取原始矩阵
    let orgMatrixImgBd = imgBd.attr("transform").localMatrix;
    let orgMatrixImg = img.attr("transform").localMatrix;
    // 根据原始矩阵获取
    let { rotate, scale, x, y } = useUtil.getBBoxByMatrix(
      orgMatrixImg,
      orgMatrixImgBd
    );
    // 返回数据
    return {
      rotate: rotate,
      scale: scale,
      x: x,
      y: y,
    };
  }

  /*
   * 获取矩阵对应信息，根据传入的矩阵和图片大小
   * @param {object} imgMatrix 设计图矩阵
   * @param {object} imgBdMatrix 设计图边框矩阵
   * */
  static getBBoxByMatrix(imgMatrix, imgBdMatrix) {
    let imgMatrixBbox, imgBdMatrixBbox;
    if (typeof imgMatrix === "string") {
      let arr = imgMatrix.split("matrix(")[1].split(")")[0].split(",");
      imgMatrix = Snap.matrix(...arr);
    }
    if (typeof imgBdMatrix === "string") {
      let arr = imgBdMatrix.split("matrix(")[1].split(")")[0].split(",");
      imgBdMatrix = Snap.matrix(...arr);
    }
    imgMatrixBbox = imgMatrix.split();
    imgMatrixBbox = { ...imgMatrixBbox, scale: imgMatrixBbox.scalex };
    imgBdMatrixBbox = imgBdMatrix.split();
    imgBdMatrixBbox = { ...imgBdMatrixBbox, scale: imgBdMatrixBbox.scalex };
    return {
      imgMatrix,
      imgBdMatrix,
      imgMatrixBbox,
      imgBdMatrixBbox,
      rotate: imgBdMatrixBbox.rotate,
      scale: imgMatrixBbox.scale,
      x: imgBdMatrixBbox.dx,
      y: imgBdMatrixBbox.dy,
    };
  }

  /*
   * 获取矩阵，根据指定的图片和指定的缩放比例scale(累加)
   * @param {string} svgId svgId
   * @param {string} imgId imgId
   * @param {number} scale 缩放比例
   * @return {object} {imgMatrix, bbox} {矩阵, sNode.getBBox}
   * */
  static getMatrixByScalePlus(svgId, imgId, scale) {
    // 获取sNode节点
    let us = new useSnap(svgId, imgId);
    let img = us.img();
    // 设置缩放
    let IM = img.attr("transform").localMatrix;
    let bbox = img.getBBox();
    IM.scale(scale, scale, bbox.cx, bbox.cy);
    bbox = img.getBBox();
    // 返回矩阵
    return {
      imgMatrix: IM,
      bbox,
    };
  }

  /*
   * 获取矩阵，根据指定的图片和指定的缩放比例scale(真实)
   * @param {string} svgId svgId
   * @param {string} imgId imgId
   * @param {number} scale 缩放比例
   * @return {object} {imgMatrix} {矩阵}
   * */
  static getMatrixByScaleReal(svgId, imgId, scale) {
    // 获取sNode节点
    let us = new useSnap(svgId, imgId);
    let img = us.img();
    let bbox = img.getBBox();
    // 根据矩阵获取缩放比例
    let orgScale = useUtil.getBBoxByImage(svgId, imgId).scale;
    // 获取缩放比例为1时候的矩阵
    let obj = useUtil.getMatrixByScalePlus(svgId, imgId, 1 / orgScale);
    obj.imgMatrix.scale(scale, scale, obj.bbox.cx, obj.bbox.cy);
    // 返回矩阵
    return {
      imgMatrix: obj.imgMatrix,
      bbox: bbox,
    };
  }

  /*
   * 获取矩阵, 根据指定的图片和指定的移动距离x,y(累加)
   * @param {string} svgId svgId
   * @param {string} imgId imgId
   * @param {number} x 移动距离x
   * @param {number} y 移动距离y
   * @return {object} {imgBdMatrix, editBdMatrix} 矩阵
   * */
  static getMatrixByMovePlus(svgId, imgId, x, y) {
    // 获取sNode节点
    let us = new useSnap(svgId, imgId);
    let imgBd = us.imgBd();
    // 设置移动
    let matrix = imgBd.attr("transform").localMatrix;
    matrix.e += x;
    matrix.f += y;
    // 返回矩阵
    return {
      imgBdMatrix: matrix,
      editBdMatrix: matrix,
    };
  }
  /*
   * 获取矩阵, 根据指定的图片和指定的移动距离x,y(真实)
   * @param {string} svgId svgId
   * @param {string} imgId imgId
   * @param {number} x 移动距离x
   * @param {number} y 移动距离y
   * @return {object} {imgBdMatrix, editBdMatrix} 矩阵
   * */
  static getMatrixByMoveReal(svgId, imgId, x, y) {
    // 记录原始旋转角度
    let orgBBox = useUtil.getBBoxByImage(svgId, imgId);
    // 矩阵的旋转角度设置为0
    let rotatePlus = useUtil.getMatrixByRotatePlus;
    let obj = rotatePlus(svgId, imgId, -orgBBox.rotate);
    obj.imgBdMatrix.e = x;
    obj.imgBdMatrix.f = y;
    obj.editBdMatrix.e = x;
    obj.editBdMatrix.f = y;
    // 旋转为原始角度
    obj.imgBdMatrix.rotate(orgBBox.rotate, orgBBox.cx, orgBBox.cy);
    obj.editBdMatrix.rotate(orgBBox.rotate, orgBBox.cx, orgBBox.cy);
    // 返回矩阵
    return {
      imgBdMatrix: obj.imgBdMatrix,
      editBdMatrix: obj.editBdMatrix,
    };
  }

  /*
   * 获取矩阵(imgBd、editBd)，根据指定的图片和指定的角度(真实)
   * - ps：传入多少的角度，就会旋转多少的角度
   * @param {string} svgId svgId
   * @param {string} imgId imgId
   * @param {number} rotate 角度
   * @return {object} {imgBdMatrix, editBdMatrix} 矩阵
   * */
  static getMatrixByRotateReal(svgId, imgId, rotate) {
    // 获取sNode节点
    let us = new useSnap(svgId, imgId);
    // 根据矩阵获取角度
    let orgRotate = useUtil.getBBoxByImage(svgId, imgId).rotate;
    // 获取0°时候的矩阵
    let obj = useUtil.getMatrixByRotatePlus(svgId, imgId, -orgRotate);
    let { cx, cy } = obj;
    // 将矩阵旋转为指定角度
    let a = obj.imgBdMatrix.rotate(rotate, cx, cy);
    let b = obj.editBdMatrix.rotate(rotate, cx, cy);
    // 返回矩阵
    return {
      imgBdMatrix: a,
      editBdMatrix: b,
    };
  }

  /*
   * 获取矩阵(imgBd、editBd)，根据指定的图片(svgId, imgId)和角度(累加)
   * @param {string} svgId svgId
   * @param {string} imgId imgId
   * @param {number} angle 角度
   * @return {object} {imgBdMatrix, editBdMatrix} 矩阵
   * */
  static getMatrixByRotatePlus(svgId, imgId, angle) {
    // 获取sNode节点
    let us = new useSnap(svgId, imgId);
    let img = us.img();
    let imgBd = us.imgBd();
    let editBd = us.editBd();
    // 设置旋转
    let IM = imgBd.attr("transform").localMatrix;
    let EM = editBd.attr("transform").localMatrix;
    let bbox = img.getBBox();
    IM.rotate(angle, bbox.cx, bbox.cy);
    EM.rotate(angle, bbox.cx, bbox.cy);
    // 返回矩阵
    return {
      cx: bbox.cx,
      cy: bbox.cy,
      imgBdMatrix: IM,
      editBdMatrix: EM,
    };
  }
}

// 单例模式导出产品的vue this
export const useVueProd = (function () {
  let instance;
  return function (vurProd) {
    // 代理函数只做管理单例
    if (instance) {
      return instance;
    }
    return (instance = new vueProd(vurProd));
  };
})();

class vueProd {
  constructor(vueProd) {
    if (vueProd) {
      this.vurProd = vueProd;
    }
  }
}
