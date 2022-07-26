/*
 * 队列中的当前项
 * */
export class CurrentQueue {
  // 操作中的所有设计图
  imageList;
  // 当前操作的设计图id
  actionImageId;
  // 层级相关
  curSid;
  cutSid;
  layerType;
  layerList;

  // 构造函数
  constructor(param) {
    this.setCurSid(param.curSid || "");
    this.setCutSid(param.cutSid | "");
    this.setLayerType(param.layerType || "default");
    this.setLayerList(param.layerList || []);
    this.setImageList(param.imageList);
    this.setActionImageId(param.actionImageId);
  }
  /*
   * 获取队列中的产品
   * @return {Prod} 产品class
   * */
  getProd() {
    let prod;
    let detail = this.imageList.find(
      (image) => image.getId() === this.getActionImageId()
    );
    let image = detail.getImage();
    prod = image.getProd();
    return prod;
  }
  setImageList(imageList) {
    this.imageList = imageList;
  }
  setActionImageId(actionImageId) {
    this.actionImageId = actionImageId;
  }
  getImageList() {
    return this.imageList;
  }
  getActionImageId() {
    return this.actionImageId;
  }

  getCurSid() {
    return this.curSid;
  }

  setCurSid(curSid) {
    this.curSid = curSid;
  }

  getCutSid() {
    return this.cutSid;
  }

  setCutSid(cutSid) {
    this.cutSid = cutSid;
  }

  getLayerType() {
    return this.layerType;
  }

  setLayerType(layerType) {
    this.layerType = layerType;
  }

  getLayerList() {
    return this.layerList;
  }

  setLayerList(layerList) {
    this.layerList = layerList;
  }
}
