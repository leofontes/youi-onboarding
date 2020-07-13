import { DeviceInfo, Ref } from '@youi/react-native-youi';
import { NativeModules, findNodeHandle } from 'react-native';
import { once } from 'lodash';

const systemName = DeviceInfo.getSystemName();
const { Cloud, RefUtils } = NativeModules;

interface AurynHelper {
  hasHardwareBackButton: boolean;
  isRoku: boolean;
  updateCloudScene: (component: React.RefObject<any>) => void;
  togglePointerEvents: (ref: Ref, enabled: boolean) => boolean;
  toggleParentPointerEvents: (ref: Ref, enabled: boolean) => boolean;
}

export const AurynHelper: AurynHelper = {
  hasHardwareBackButton: !['iOS'].includes(systemName),
  isRoku: Cloud.isCloudServer,
  updateCloudScene: (component) => {
    if (!Cloud.isCloudServer || !component.current) return;
    setTimeout(() => {
      Cloud.exportSubtree(findNodeHandle(component.current), false);
      Cloud.sendFocusMap();
    }, 300);
  },
  togglePointerEvents: once((ref: Ref, enabled: boolean) => {
    RefUtils.setPointerEvents(findNodeHandle(ref), enabled);
    return true;
  }),
  toggleParentPointerEvents: once((ref: Ref, enabled: boolean) => {
    RefUtils.setParentCompositionPointerEvents(findNodeHandle(ref), enabled);
    return true;
  }),
};
