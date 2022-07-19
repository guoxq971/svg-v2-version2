import {
  ProxyCreateDesign,
  ProxyCreateQueueManager,
  ProxyCreateUseDesign,
  ProxyCreateUseQueue,
} from "./utils/proxy";

export const DesignProxy = ProxyCreateDesign;
export const useDesign = ProxyCreateUseDesign;
export const QueueProxy = ProxyCreateQueueManager;
export const useQueue = ProxyCreateUseQueue;
