import React from 'react';
import { ButtonRef, ButtonRefProps } from '@youi/react-native-youi';
import { AurynHelper } from '../aurynHelper';

export const BackButton: React.FunctionComponent<Partial<ButtonRefProps>> = ({ focusable, ...otherProps }) => (
  <ButtonRef
    {...otherProps}
    name="Btn-Back"
    visible={!AurynHelper.hasHardwareBackButton}
    focusable={focusable && !AurynHelper.hasHardwareBackButton}
  />
);
