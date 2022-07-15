// 监听鼠标按下
import { DesignProxy } from "../index";

export function addEventOverall() {
  // image.mousedown > mousedown
  document.addEventListener("mousedown", function (e) {
    // 该层级的 dom 上面出现自定义属性 bm
    let result = e.path.some((item) => {
      return item.getAttribute ? item?.getAttribute("bm") : "";
    });
    //当前鼠标按下的地方 = 当前是设计模式 && 不存在自定义属性 bm
    if (DesignProxy().isEditMode() && !result) {
      DesignProxy().setPreviewMode();
    }
  });
}
