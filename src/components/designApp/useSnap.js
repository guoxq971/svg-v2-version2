export class useSnap {
  constructor(svgId, imgId) {
    this.svgId = svgId;
    this.imgId = imgId;
  }
  svg() {
    return Snap(`#svg-${this.svgId}`);
  }
  designGroup() {
    return Snap(`#svg-${this.svgId}`)?.select(`.designGroup-${this.svgId}`);
  }
  img() {
    return Snap(`#svg-${this.svgId}`)?.select(`.img-${this.imgId}`);
  }
  imgBd() {
    return Snap(`#svg-${this.svgId}`)?.select(`.imgBd-${this.imgId}`);
  }
  editBd() {
    return Snap(`#svg-${this.svgId}`)?.select(`.editBd-${this.imgId}`);
  }
  editRect() {
    return Snap(`#svg-${this.svgId}`)?.select(`.editRect-${this.imgId}`);
  }
  editRotate() {
    return Snap(`#svg-${this.svgId}`)?.select(`.editRotate-${this.imgId}`);
  }
  editMove() {
    return Snap(`#svg-${this.svgId}`)?.select(`.editMove-${this.imgId}`);
  }
  editScale() {
    return Snap(`#svg-${this.svgId}`)?.select(`.editScale-${this.imgId}`);
  }
  editDelete() {
    return Snap(`#svg-${this.svgId}`)?.select(`.editDelete-${this.imgId}`);
  }
}
