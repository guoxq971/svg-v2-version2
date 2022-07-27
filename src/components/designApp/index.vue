<template>
  <div style="position: relative">
    <!--    <div style="position: absolute">-->
    <!--      <el-button @click="prod.mode = 'edit'">编辑模式</el-button>-->
    <!--      <el-button @click="prod.mode = 'preview'">预览模式</el-button>-->
    <!--      <el-button>当前设计图id: {{ prod.activeId }}</el-button>-->
    <!--    </div>-->
    <svg
      :id="`svg-${id}`"
      height="544"
      version="1.1"
      width="544"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      style="border: 1px dotted green"
    >
      <defs>
        <clipPath :id="prodMode.preview" test="[预览模式]-d1">
          <path :d="prod.previewD1"></path>
        </clipPath>
        <clipPath :id="prodMode.edit" test="[编辑模式]-d2">
          <path :d="prod.editD2"></path>
        </clipPath>
      </defs>
      <path
        :class="`editBdRedPath-${id}`"
        test="[编辑模式]边框红色虚线path"
        :style="{
          strokeDasharray: 5,
          display: displayByMode(prod.editBdRedPath.type),
        }"
        fill="#ffffff"
        stroke="#ff0000"
        :d="prod.editBdRedPath.d"
        :transform="prod.editBdRedPath.transform"
      ></path>
      <image
        test="[预览模式]背景图"
        :href="prod.previewBgImage.href"
        :x="prod.previewBgImage.x"
        :y="prod.previewBgImage.y"
        :width="prod.previewBgImage.width"
        :height="prod.previewBgImage.height"
        :style="{ display: displayByMode(prod.previewBgImage.type) }"
      ></image>
      <g
        test="设计图-组合"
        :transform="prod.designGroup.transform"
        :class="`designGroup-${id}`"
      >
        <rect
          :class="`designGroupRect-${id}`"
          test="设计图组合rect"
          :x="prod.designGroup.rect.x"
          :y="prod.designGroup.rect.y"
          :width="prod.designGroup.rect.width"
          :height="prod.designGroup.rect.height"
          fill="none"
          style=""
        ></rect>
        <rect
          test="设计图组合rect"
          :x="prod.designGroup.rect.x"
          :y="prod.designGroup.rect.y"
          :width="prod.designGroup.rect.width"
          :height="prod.designGroup.rect.height"
          fill="none"
          :style="{ clipPath: `url(#${prod.mode})` }"
        ></rect>
        <!--设计图组合-->
        <designImage
          v-for="item in prod.imageList"
          :key="item.id"
          :active-id="prod.activeId"
          :mode="prod.mode"
          :image="item"
          :svg-id="id"
          :prod="prod"
          @imgClick="imgClick"
        />
      </g>
      <image
        test="[预览模式]产品图"
        :href="prod.previewProdImage.href"
        :x="prod.previewProdImage.x"
        :y="prod.previewProdImage.y"
        :width="prod.previewProdImage.width"
        :height="prod.previewProdImage.height"
        :style="{
          pointerEvents: 'none',
          display: displayByMode(prod.previewProdImage.type),
        }"
      ></image>
      <path
        :class="`editProdRedPath-${id}`"
        test="[设计模式][产品的红色虚线]path-d3"
        :d="prod.editProdRedPath.d"
        fill="none"
        stroke="#ff0000"
        :style="{
          strokeWidth: 1.8,
          strokeDasharray: 5,
          display: displayByMode(prod.editProdRedPath.type),
        }"
        :transform="prod.editProdRedPath.transform"
      ></path>
      <rect
        :class="`editBdBackRect-${id}`"
        test="[编辑模式]边框的黑色虚线rect"
        :x="prod.editBdBackRect.x"
        :y="prod.editBdBackRect.y"
        :width="prod.editBdBackRect.width"
        :height="prod.editBdBackRect.height"
        fill="none"
        stroke="#000000"
        :style="{
          strokeDasharray: 2,
          display: displayByMode(prod.editBdBackRect.type),
        }"
        :transform="prod.editBdBackRect.transform"
      ></rect>
    </svg>
  </div>
</template>

<script>
import { ProdInterface, ProdMode } from "./interface/prod";
import { mock } from "../bmDesigner/mock";
import designImage from "./componetns/designImage";
import { uuid } from "../bmDesigner/app/utils/util";
import { useSnap } from "./useSnap";
import { useUtil } from "./useUtil";
import { useQueue } from "@/components/designApp/queue";

export default {
  name: "index",
  components: {
    designImage,
  },
  data() {
    return {
      // svgId
      id: uuid(),
      // 产品的工具类
      prodMode: ProdMode,
      // 产品属性
      prod: new ProdInterface(mock.productList()[0], this),
      queue: null,
    };
  },
  computed: {
    /*
     * 根据模式(mode)和元素类型(type)返回对应的 display
     * @param {number} type 元素类型
     * */
    displayByMode() {
      return (type) => {
        let display = "none";
        if (this.prod.isPreviewMode()) {
          if (ProdMode.isPreview(type)) {
            display = "inline";
          } else if (ProdMode.isEdit(type)) {
            display = "none";
          }
        } else if (this.prod.isEditMode()) {
          if (ProdMode.isPreview(type)) {
            display = "none";
          } else if (ProdMode.isEdit(type)) {
            display = "inline";
          }
        }
        return display;
      };
    },
  },
  watch:{
    "prod.imageList":{
      handler(list){
        this.$emit("changeImageList", list);
      }
    },
  },
  methods: {
    /*
     * 图层-居中
     * @param {number} type 居中类型 x-垂直 y-水平
     * */
    layerAlign(type) {
      let image = this.prod.getActiveImage();
      let bbox = useUtil.getBBoxByImage(image.svgId, image.id, image);
      let us = new useSnap(image.svgId, image.id);
      let promise = new Promise((resolve) => resolve());
      let matrix;
      promise
        .then(() => image.setRotate(0))
        .then(() => image.setScale(1))
        .then(() => (matrix = us.imgBd().attr("transform").localMatrix))
        .then(() => image.setMove(0, 0))
        .then(() => {
          let x = matrix.e;
          let y = matrix.f;
          let designGroupRect = us.designGroupRect();
          let imgBBox = us.img().getBBox();
          let groupRectBBox = designGroupRect.getBBox();
          let alignX = groupRectBBox.cy - imgBBox.w / 2;
          let alignY = groupRectBBox.cx - imgBBox.h / 2;
          // 垂直居中
          if (type === "x") y = alignY;
          // 水平居中
          if (type === "y") x = alignX;
          image.setMove(x, y);
        })
        .then(() => image.setRotate(bbox.rotate))
        .then(() => image.setScale(bbox.scale));
    },
    /*
     * 图层-旋转
     * @param {number} rotate 旋转角度
     * */
    layerRotate(rotate) {
      let image = this.prod.getActiveImage();
      let imageRotate = image.getRotate();
      let afterRotate = imageRotate + rotate;
      afterRotate = afterRotate - (afterRotate % 45);
      image.setRotate(afterRotate);
    },
    /*
     * 图层-显示/隐藏
     * @param {string} imgId 设计图id
     * */
    layerIsShow(imgId) {
      let image = this.prod.getImage(imgId);
      image.setIsShow(!image.isShow);
    },
    /*
     * 图层移动
     * @param {String} type up上/down下/top置顶/bottom置底
     * @param {string} imgId 图片id
     * */
    layerMove(type, imgId) {
      if (this.prod.imageList === 1) {
        this.$message.warning("目前只有一个图层，不能移动");
        return;
      }
      let index;
      let tempIndex;
      function arrMove(index, tempIndex) {
        let temp = this.prod.imageList[index];
        this.$set(this.prod.imageList, index, this.prod.imageList[tempIndex]);
        this.$set(this.prod.imageList, tempIndex, temp);
      }
      index = this.prod.imageList.findIndex((image) => image.id === imgId);
      if (type === "up") {
        if (index === this.prod.imageList.length - 1) {
          this.$message.warning("已经是第一张了");
          return;
        }
        tempIndex = index + 1;
        arrMove(index, tempIndex);
      } else if (type === "down") {
        if (index === 0) {
          this.$message.warning("已经是最后一张了");
          return;
        }
        tempIndex = index - 1;
        arrMove(index, tempIndex);
      } else if (type === "top") {
        if (index === this.prod.imageList.length - 1) {
          this.$message.warning("已经是第一张了");
          return;
        }
        tempIndex = this.prod.imageList.length - 1;
        arrMove(index, tempIndex);
      } else if (type === "bottom") {
        if (index === 0) {
          this.$message.warning("已经是最后一张了");
          return;
        }
        tempIndex = 0;
        arrMove(index, tempIndex);
      }
    },
    /*
     * 选中设计图
     * @param {object} image 设计图的参数
     * */
    selImage(image) {
      let img = this.prod.addImage({ ...image, svgId: this.id });
      this.prod.setActiveId(img.id);
      this.$nextTick(() => this.prod.setEditMode());
    },
    /*
     * 切换产品
     * @param {object} prod 产品的参数
     * */
    changeProd(prod) {
      this.prod = new ProdInterface(prod);
    },
    /*
     * 设计图的点击事件
     * @param {string} imgId 图片id
     * */
    imgClick(imgId) {
      this.prod.setActiveId(imgId);
      this.prod.setEditMode();
    },
    /*
     * 监听鼠标按下，进入预览模式
     * */
    addEventOverall() {
      let that = this;
      document.addEventListener("mousedown", function (e) {
        // 该层级的 dom 上面出现自定义属性 bm
        let isOk = e.path.some((item) => {
          return item.getAttribute ? item?.getAttribute("bm") : "";
        });
        //当前鼠标按下的地方 = 当前是设计模式 && 不存在自定义属性 bm
        if (that.prod.isEditMode() && !isOk) {
          that.prod.setPreviewMode();
        }
      });
    },
    moveCenter() {
      this.$nextTick(() => {
        let us = new useSnap(this.id);
        let svg = us.svg();
        let { cx, cy } = svg.getBBox();
        let prod = this.prod;
        let fn = function (sNode, x, y) {
          let bbox = sNode.getBBox();
          let M = sNode.attr("transform").localMatrix;
          M.translate(
            x - bbox.x - bbox.width / 2,
            y - bbox.y - bbox.height / 2
          );
          return {
            matrix: M,
          };
        };
        prod.designGroup.transform = fn(us.designGroup(), cx, cy).matrix;
        prod.editBdRedPath.transform = fn(us.editBdRedPath(), cx, cy).matrix;
        prod.editBdBackRect.transform = fn(us.editBdBackRect(), cx, cy).matrix;
        prod.editProdRedPath.transform = fn(
          us.editProdRedPath(),
          cx,
          cy
        ).matrix;
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      useQueue().addQueue(this.prod, "初始化添加一个产品");
    });
    // 移动到中心位置
    this.moveCenter();
    // 监听鼠标按下
    this.addEventOverall();
  },
};
</script>

<style scoped></style>
