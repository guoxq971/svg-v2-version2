import {
  ProxyCreateDesign,
  ProxyCreateQueueManager,
  ProxyCreateUseQueue,
} from "./utils/proxy";

export const DesignProxy = ProxyCreateDesign;
export const QueueProxy = ProxyCreateQueueManager;
export const useQueue = ProxyCreateUseQueue;
