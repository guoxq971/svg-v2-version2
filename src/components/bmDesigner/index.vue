<template>
  <div class="bm-design-group">
    <div class="flow-container">
      <div class="btn-group">
        <el-button
          :type="typeActiveName === 'prod' ? 'primary' : ''"
          @click="handlerActive('prod')"
          >选择产品
        </el-button>
        <el-button
          :type="typeActiveName === 'pic' ? 'primary' : ''"
          @click="handlerActive('pic')"
          >选择图片
        </el-button>
        <el-button
          :type="typeActiveName === 'bg' ? 'primary' : ''"
          @click="handlerActive('bg')"
        >
          选择背景
        </el-button>
        <el-button
          :type="typeActiveName === 'text' ? 'primary' : ''"
          @click="handlerActive('text')"
        >
          添加文字
        </el-button>
      </div>
      <div class="show-btn">
        <el-tabs v-model="activeName" v-if="typeActiveName === 'prod'">
          <el-tab-pane label="通用产品" name="1">
            <bmSearchList :list="productList" @clickPic="prodClick" />
          </el-tab-pane>
          <el-tab-pane label="FBA专用产品" name="2">FBA专用产品</el-tab-pane>
          <el-tab-pane label="收藏产品" name="3">收藏产品</el-tab-pane>
        </el-tabs>
        <el-tabs v-model="activeName" v-if="typeActiveName === 'pic'">
          <el-tab-pane label="我的图库" name="1">
            <bmSearchList :list="imageList" @clickPic="picClick" />
          </el-tab-pane>
          <el-tab-pane label="小组图库" name="2">小组图库</el-tab-pane>
          <el-tab-pane label="共享图库" name="3">共享图库</el-tab-pane>
          <el-tab-pane label="收藏图片" name="4">收藏图片</el-tab-pane>
        </el-tabs>
        <el-tabs v-model="activeName" v-if="typeActiveName === 'bg'">
          <el-tab-pane label="背景色" name="1">
            <div style="display: flex; align-items: center">
              <el-color-picker
                size="medium"
                v-model="color"
                show-alpha
                :predefine="predefineColors"
              />
              <div style="margin: 0 10px">{{ color }}</div>
              <el-button type="primary" @click="handlerApplyColor"
                >应用
              </el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-model="activeName" v-if="typeActiveName === 'text'">
          <el-tab-pane label="文字" name="1"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="operator-wrap">
      <!-- 中间-设计器 -->
      <div class="design-container">
        <div class="title-wrap">
          <div class="title" @click="handlerDown">(2317)女款撞色T恤-棉烫印</div>
          <el-button type="text">查看详情 ></el-button>
        </div>
        <!-- 基本信息 -->
        <bmInfo style="margin-bottom: 15px" />
        <!-- 设计区域 -->
        <div class="design-wrap" style="position: relative">
          <div class="left-wrap">
            <div
              class="item-list"
              :class="{ action: item === 1 }"
              v-for="item in 3"
              :key="item"
            ></div>
          </div>
          <div
            id="design"
            class="design-wrap"
            style="width: 750px; height: 550px"
            ref="designBd"
          ></div>
        </div>
      </div>
      <!-- 右侧-操作 -->
      <div class="operator-container" bm="1">
        <div class="btn-group">
          <div class="btn-1">
            <el-button>设计说明</el-button>
            <el-button>快捷键</el-button>
            <el-button>记录</el-button>
            <el-button>全颜色合成</el-button>
            <el-button>保存产品</el-button>
          </div>
          <div class="btn-2">
            <el-button>撤回</el-button>
            <el-button>前进</el-button>
            <el-button>清空</el-button>
            <el-button>关闭图层</el-button>
            <el-button>开启收藏</el-button>
          </div>
        </div>
        <!-- 图层 -->
        <div class="layer-group">
          <div
            :class="{ action: item.sNode.id === activeImgId }"
            class="item-layer"
            v-for="item in layerList"
            :key="item.sid"
          >
            <div class="img">
              <img
                v-if="item.type === 'img'"
                :src="item.url"
                style="height: 25px"
                alt=""
              />
              <div
                v-if="item.type === 'bg'"
                style="width: 25px; height: 25px"
                :style="{ backgroundColor: item.color }"
              ></div>
            </div>
            <div class="name" @click="handlerLayerNameClick(item)">
              {{ item.name }}
            </div>
            <div class="btn-layer">
              <el-button class="item-btn">编辑</el-button>
              <el-button class="item-btn">收藏</el-button>
              <el-button class="item-btn" @click="handlerLayer('up', item)"
                >上移
              </el-button>
              <el-button class="item-btn" @click="handlerLayer('down', item)"
                >下移
              </el-button>
              <el-button class="item-btn" @click="handlerLayerNameClick(item)"
                >切换
              </el-button>
              <el-button class="item-btn" @click="handlerLayerDelClick(item)"
                >删除
              </el-button>
              <el-button class="item-btn" @click="handlerLayerShowClick(item)"
                >{{ item.isShow ? "隐藏" : "显示" }}
              </el-button>
            </div>
          </div>
        </div>
        <!-- 图层-按钮 -->
        <div class="layer-btn-group">
          <div class="btn-1">
            <el-button class="item-btn" @click="handlerStick('up')"
              >置顶
            </el-button>
            <el-button class="item-btn" @click="handlerStick('down')"
              >置底
            </el-button>
            <el-button class="item-btn" @click="handlerLayer('up')"
              >上移
            </el-button>
            <el-button class="item-btn" @click="handlerLayer('down')"
              >下移
            </el-button>
            <el-button class="item-btn" @click="handlerCopy()">复制</el-button>
            <el-button class="item-btn">删除</el-button>
          </div>
          <div class="btn-2">
            <el-button class="item-btn" bm="1" @click="handlerAlign('y')"
              >水平居中
            </el-button>
            <el-button class="item-btn" @click="handlerAlign('x')"
              >垂直居中
            </el-button>
            <el-button class="item-btn" @click="handlerRevere('y')"
              >水平翻转
            </el-button>
            <el-button class="item-btn" @click="handlerRevere('x')"
              >垂直翻转
            </el-button>
            <el-button class="item-btn" @click="handlerScale('bigScale')"
              >等比放大
            </el-button>
            <el-button class="item-btn" @click="handlerScale('smallCenter')"
              >等比缩小
            </el-button>
            <el-button class="item-btn" @click="handlerRotate('left')"
              >左旋45°
            </el-button>
            <el-button class="item-btn" @click="handlerRotate('right')"
              >右旋45°
            </el-button>
            <el-button class="item-btn">宽度最大</el-button>
            <el-button class="item-btn">宽度最小</el-button>
            <el-button class="item-btn">最大化</el-button>
            <div class="item-btn"></div>
          </div>
        </div>
        <!-- 多角度 -->
        <div class="multi-angle">
          <bmSwiper />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bmSwiper from "./components/bmSwiper.vue";
import bmInfo from "./components/bmInfo.vue";
import bmSearchList from "./components/bmSearchList.vue";
import { mock } from "./mock";
import { DesignProxy } from "./app/index";
import { Prod } from "./app/entity/Prod";
import {
  addImage4TypeByBg,
  addImage4TypeByImg,
  deleteImageById,
  getActiveImage,
  getImageActionId,
  setImageActionId,
} from "./app/designUse/index";
import {
  bgImageAdaptor,
  imageAdaptor,
  layerIndex,
  vueGetActiveImage,
  vueGetImage,
  vueSetTop,
} from "./util";
import { layer } from "./app/utils/layer";
import { swapArrData } from "./app/utils/util";

export default {
  components: { bmSwiper, bmInfo, bmSearchList },
  data() {
    return {
      // 当前激活的设计图id
      activeImgId: "",
      // 产品列表
      productList: mock.productList(),
      // 图片列表
      imageList: mock.imageList(),
      // 图层列表
      layerList: [],
      // 类型激活
      typeActiveName: "prod",
      // 选择产品的激活
      activeName: "1",
      // 背景色
      color: "rgba(255, 69, 0, 0.68)",
      // 背景预设值
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "hsv(51, 100, 98)",
        "hsva(120, 40, 94, 0.5)",
        "hsl(181, 100%, 37%)",
        "hsla(209, 100%, 56%, 0.73)",
        "#c7158577",
      ],
    };
  },
  methods: {
    // 背景色-应用
    handlerApplyColor() {
      const { image, hasBg } = addImage4TypeByBg(this.color);
      if (hasBg) {
        let layer = vueGetImage(this.layerList, image.id);
        layer.name = `${this.color}`;
      } else {
        this.layerList.push(bgImageAdaptor(image));
      }
    },
    // 下载图片
    handlerDown() {},
    /*
     * 图层-上/下移
     * @param {String} type up上/down下
     */
    handlerLayer(type, data, msgFlag = true) {
      // 图层dom操作 + 提示信息
      data = data ? data : vueGetImage(this.layerList, this.activeImgId);
      let result = layer(type, data.sNode, msgFlag);
      // vue数据操作
      this.layerList = layerIndex(result, this.layerList, data, type);
      // return这个是置顶、置底的时候用的
      return result;
    },
    // 图层-删除
    handlerLayerDelClick(data) {
      deleteImageById(data.sid);
    },
    // 图层点击
    handlerLayerNameClick(data) {
      // 设置当前激活的设计图
      setImageActionId(data.sid);
    },
    // 图层-显示、隐藏
    handlerLayerShowClick(data) {
      data.sNode.layerTrigger();
    },
    // 图层-复制
    handlerCopy() {},
    // 图库-选中
    picClick(data) {
      // 设计器添加设计图操作
      let image = addImage4TypeByImg(data);
      // vue数据操作
      let d = imageAdaptor(image, data);
      this.layerList.unshift(d);
      image.setData(d);
      return image;
    },
    // 图库-删除(提供给design类使用)
    handlerImgDel(id) {
      this.layerList.findIndex((item) => {
        if (item?.sid === id) {
          this.layerList.splice(this.layerList.indexOf(item), 1);
        }
      });
    },
    // 设置VUE中的当前激活图片id(提供给design类使用)
    setVueActiveImgId(id = getImageActionId()) {
      this.activeImgId = id;
    },
    // 产品-选中
    prodClick(data) {},
    // 左侧-类型切换
    handlerActive(type) {
      this.typeActiveName = type;
      this.activeName = "1";
    },
    // 左/右旋
    handlerRotate(type) {},
    // 居中
    handlerAlign(type) {},
    // 翻转
    async handlerRevere(type) {},
    // 置顶、置底
    handlerStick(type) {
      vueSetTop(type, this.handlerLayer);
    },
    // 缩放
    handlerScale() {},
  },
  mounted() {
    DesignProxy().addProd(
      new Prod({
        data: this.productList[0],
        imgClick: (id) => this.setVueActiveImgId(id),
        imgDelete: (id) => this.handlerImgDel(id),
      })
    );
  },
};
</script>

<style scoped lang="scss">
@import "css/index";
</style>
