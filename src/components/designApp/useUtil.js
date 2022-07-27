import { useSnap } from "@/components/designApp/useSnap";

export class useUtil {
  /*
   * 获取图片信息，根据传入的图片id
   * @param {String} svgId 设计器的svgId
   * @param {String} imgId 图片id
   * @return {Object} 图片信息
   * */
  static getBBoxByImage(svgId, imgId) {
    let us = new useSnap(svgId, imgId);
    let orgMatrix = us.imgBd().attr("transform").localMatrix;
    let { rotate, scale } = useUtil.getBBoxByMatrix(orgMatrix);
    return {
      rotate: rotate,
      scale: scale,
    };
  }

  /*
   * 获取矩阵对应的信息，根据传入的矩阵
   * @param {object} matrix 矩阵
   * @return {number} 角度
   * */
  static getBBoxByMatrix(matrix) {
    let { a, b, c, d, e, f } = matrix;
    let rotate = Math.atan2(b, a) * (180.0 / Math.PI);
    let scaleX = Math.sqrt(a * a + b * b);
    let scaleY = Math.sqrt(c * c + d * d);
    return {
      scale: scaleX,
      scaleX: scaleX,
      scaleY: scaleY,
      rotate: rotate,
    };
  }

  static imgScale(svgId, imgId, scale) {
    let us = new useSnap(svgId, imgId);
    let img = us.img();
    let editMove = us.editMove();
    let editRect = us.editRect();
    let editRotate = us.editRotate();
    let editScale = us.editScale();
    let editDelete = us.editDelete();
    let IM = img.attr("transform").localMatrix;
    let bbox = img.getBBox();
    IM.scale(scale, scale, bbox.cx, bbox.cy);
    img.attr({ transform: IM });
    bbox = img.getBBox();
    // 同时改变其他元素
    editRect.attr({
      x: bbox.x,
      y: bbox.y,
      width: bbox.width,
      height: bbox.height,
    });
    editMove.attr({ x: -18 + bbox.x, y: -18 + bbox.y });
    editRotate.attr({ x: bbox.x2, y: -18 + bbox.y });
    editScale.attr({ x: bbox.x2, y: bbox.y2 });
    editDelete.attr({ x: -18 + bbox.x, y: bbox.y2 });
  }

  /*
   * 获取矩阵, 根据指定的图片和指定的移动距离x,y(累加)
   * @param {string} svgId svgId
   * @param {string} imgId imgId
   * @param {number} x 移动距离x
   * @param {number} y 移动距离y
   * @return {object} {imgBdMatrix, editBdMatrix} 矩阵
   * */
  static getMatrixByXyPlus(svgId, imgId, x, y) {
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
  static imgMove(svgId, imgId, x, y) {
    // 矩阵的缩放比例设置为1
    // 矩阵的旋转角度设置为0
    // TODO: 先实现缩放
    let us = new useSnap(svgId, imgId);
    let imgBd = us.imgBd();
    let editBd = us.editBd();
    let obj = useUtil.getMatrixByXyPlus(svgId, imgId, x, y);
    imgBd.attr("transform", obj.imgBdMatrix);
    editBd.attr("transform", obj.editBdMatrix);
  }

  /*
   * 获取矩阵(imgBd、editBd)，根据指定的图片和指定的角度(真实)
   * - ps：传入多少的角度，就会旋转多少的角度
   * @param {string} svgId svgId
   * @param {string} imgId imgId
   * @param {number} angle 角度
   * @return {object} {imgBdMatrix, editBdMatrix} 矩阵
   * */
  static getMatrixByAngleReal(svgId, imgId, angle) {
    let us = new useSnap(svgId, imgId);
    let orgMatrix = us.imgBd().attr("transform").localMatrix;
    let { rotate } = useUtil.getBBoxByMatrix(orgMatrix);
    let obj = useUtil.getMatrixByRotatePlus(svgId, imgId, -rotate);
    let { cx, cy } = obj;
    let a = obj.imgBdMatrix.rotate(angle, cx, cy);
    let b = obj.editBdMatrix.rotate(angle, cx, cy);
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
