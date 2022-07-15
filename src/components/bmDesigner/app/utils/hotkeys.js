import hotkeys from "hotkeys-js";
import { getActiveImage, getProd } from "@/components/bmDesigner/app/designUse";

export function hotkeyInit(param) {
  // 缩放-方向键
  scaleDirectionKeys();
  // 旋转-方向键
  rotateDirectionKeys();
  // 移动-方向键
  moveDirectionKeys();
  // 常用键
  commonKeys(param);
}

// 常用键
function commonKeys(param) {
  const keys = ["ctrl+c"];
  hotkeys(keys.toString(), function (event, handler) {
    event.preventDefault();
    if (!getProd().hasImageAction()) return;
    switch (handler.key) {
      case "ctrl+c":
        param.copy && param.copy();
        break;
      default:
        alert(event);
    }
  });
}

// 移动-方向键
function moveDirectionKeys() {
  const keys = [
    "down",
    "up",
    "left",
    "right",
    "down+left",
    "down+right",
    "up+left",
    "up+right",
  ];
  hotkeys(keys.toString(), function (event, handler) {
    event.preventDefault();
    if (!getProd().hasImageAction()) return;
    let image = getActiveImage();
    switch (handler.key) {
      case "down":
        image.imageMove(0, 1);
        break;
      case "up":
        image.imageMove(0, -1);
        break;
      case "left":
        image.imageMove(-1, 0);
        break;
      case "right":
        image.imageMove(1, 0);
        break;
      case "down+left":
        image.imageMove(-1, 1);
        break;
      case "down+right":
        image.imageMove(1, 1);
        break;
      case "up+left":
        image.imageMove(-1, -1);
        break;
      case "up+right":
        image.imageMove(1, -1);
        break;
      default:
        alert(event);
    }
  });
}

// 旋转-方向键
function rotateDirectionKeys() {
  const keys = ["ctrl+down", "ctrl+up", "ctrl+left", "ctrl+right"];
  hotkeys(keys.toString(), function (event, handler) {
    event.preventDefault();
    if (!getProd().hasImageAction()) return;
    let image = getActiveImage();
    switch (handler.key) {
      case "ctrl+down":
        image.imageRotate(1);
        break;
      case "ctrl+up":
        image.imageRotate(-1);
        break;
      case "ctrl+left":
        image.imageRotate(-1);
        break;
      case "ctrl+right":
        image.imageRotate(1);
        break;
      default:
        alert(event);
    }
  });
}

// 缩放-方向键
function scaleDirectionKeys() {
  const keys = ["alt+down", "alt+up", "alt+left", "alt+right"];
  hotkeys(keys.toString(), function (event, handler) {
    event.preventDefault();
    if (!getProd().hasImageAction()) return;
    let image = getActiveImage();
    switch (handler.key) {
      case "alt+down":
        image.imageScale(0.99);
        break;
      case "alt+up":
        image.imageScale(1.01);
        break;
      case "alt+left":
        image.imageScale(0.99);
        break;
      case "alt+right":
        image.imageScale(1.01);
        break;
      default:
        alert(event);
    }
  });
}
