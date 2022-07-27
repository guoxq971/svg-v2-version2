import { useSnap } from "../../../../designApp/useSnap";

export class ImageMove {
  static imgMove(svgId, imgId, x, y) {
    let us = new useSnap(svgId, imgId);
    let imgBd = us.imgBd();
    let editBd = us.editBd();
    let matrix = imgBd.attr("transform").localMatrix;
    // matrix.e += x;
    // matrix.f += y;
    matrix.translate(x, y);
    imgBd.attr("transform", matrix);
    editBd.attr("transform", matrix);
  }
  x;
  y;

  start(x, y, event, id) {
    this.x = x;
    this.y = y;
  }

  move(dx, dy, x, y, event, imgId, svgId) {
    let _x = x - this.x;
    let _y = y - this.y;
    ImageMove.imgMove(svgId, imgId, _x, _y);
    // 移动
    this.x = x;
    this.y = y;
  }

  end(event, id) {}
}
