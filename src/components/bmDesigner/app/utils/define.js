// 设计图-函数执行操作类型-累计操作
export const DEFINE_IMAGE_OSTYPE_PLUS = "plus";
// 设计图-函数执行操作类型-真实操作
export const DEFINE_IMAGE_OSTYPE_REAL = "real";
// 设计图-类型-背景图
export const DEFINE_IMAGE_TYPE_BG = "bg";
// 设计图-类型-设计图
export const DEFINE_IMAGE_TYPE_IMG = "img";
// 设计图-操作类型-移动
export const DEFILE_IMAGE_OSTYPE_MOVE = "move";
// 设计图-操作类型-旋转
export const DEFILE_IMAGE_OSTYPE_ROTATE = "rotate";
// 设计图-操作类型-缩放
export const DEFILE_IMAGE_OSTYPE_SCALE = "scale";
// 设计图-操作类型-复制
export const DEFILE_IMAGE_OSTYPE_COPY = "copy";
// 设计图-操作类型-创建-设计图
export const DEFILE_IMAGE_OSTYPE_CREATE_IMAGE = "createImage";
// 操作记录-操作类型-撤销
export const DEFILE_QUEUE_OSTYPE_UNDO = "undo";
// 操作记录-操作类型-回退
export const DEFILE_QUEUE_OSTYPE_REDO = "redo";

/*
 * 常量中文转化
 * */
export function defineCN(type) {
  switch (type) {
    case DEFINE_IMAGE_OSTYPE_PLUS:
      return "累计操作";
    case DEFINE_IMAGE_OSTYPE_REAL:
      return "真实操作";
    case DEFINE_IMAGE_TYPE_BG:
      return "背景图";
    case DEFINE_IMAGE_TYPE_IMG:
      return "设计图";
    case DEFILE_IMAGE_OSTYPE_MOVE:
      return "移动";
    case DEFILE_IMAGE_OSTYPE_ROTATE:
      return "旋转";
    case DEFILE_IMAGE_OSTYPE_SCALE:
      return "缩放";
    case DEFILE_IMAGE_OSTYPE_COPY:
      return "复制";
    case DEFILE_IMAGE_OSTYPE_CREATE_IMAGE:
      return "创建设计图";
    case DEFILE_QUEUE_OSTYPE_UNDO:
      return "撤销";
    case DEFILE_QUEUE_OSTYPE_REDO:
      return "回退";
    default:
      return "";
  }
}
