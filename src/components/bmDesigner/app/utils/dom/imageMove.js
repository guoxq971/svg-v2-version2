import { useSnap } from "../../../../designApp/useSnap";
import { useUtil } from "@/components/designApp/useUtil";

export class ImageMove {
  x;
  y;

  start(x, y, event, id) {
    this.x = x;
    this.y = y;
  }

  move(dx, dy, x, y, event, imgId, svgId, callback) {
    let _x = x - this.x;
    let _y = y - this.y;
    let obj = useUtil.getMatrixByMovePlus(svgId, imgId, _x, _y);
    callback(obj.imgBdMatrix.e, obj.imgBdMatrix.f);
    // 移动
    this.x = x;
    this.y = y;
  }

  end(event, id) {}
}
