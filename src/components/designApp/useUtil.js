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
    let { rotate } = useUtil.getBBoxByMatrix(orgMatrixImgBd);
    let { scale } = useUtil.getBBoxByMatrix(orgMatrixImg);
    let tempMatrix = orgMatrixImgBd.rotate(
      -rotate,
      imgBd.getBBox().cx,
      imgBd.getBBox().cy
    );
    let x = tempMatrix.e;
    let y = tempMatrix.f;
    // 返回数据
    return {
      rotate: rotate,
      scale: scale,
      x: x,
      y: y,
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
    matrix.scale(1 / scaleX, 1 / scaleY);
    return {
      scale: scaleX,
      scaleX: scaleX,
      scaleY: scaleY,
      rotate: rotate,
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
    // 获取矩阵
    let orgMatrix = img.attr("transform").localMatrix;
    // 根据矩阵获取缩放比例
    let orgScale = useUtil.getBBoxByMatrix(orgMatrix).scale;
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
    // 获取矩阵
    let orgMatrix = us.imgBd().attr("transform").localMatrix;
    // 根据矩阵获取角度
    let orgRotate = useUtil.getBBoxByMatrix(orgMatrix).rotate;
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
