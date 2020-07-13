import React from 'react';
import { View } from 'react-native';
import { FormFactor } from '@youi/react-native-youi';
import { ListItem, ListItemPressEvent, ListItemFocusEvent } from './listitem';
import { Asset } from '../adapters/asset';

interface TvContainerProps {
  data: Asset[];
  onPressItem?: ListItemPressEvent;
  onFocusItem?: ListItemFocusEvent;
  focusable?: boolean;
}

// eslint-disable-next-line max-len
export const TvContainer: React.FunctionComponent<TvContainerProps> = ({
  data,
  onPressItem,
  onFocusItem,
  focusable,
}) => {
  if (data.length !== 2) return null;
  return (
    <View style={{ flexDirection: FormFactor.isHandset ? 'row' : 'column', justifyContent: 'center' }}>
      <ListItem
        focusable={focusable}
        onPress={onPressItem}
        onFocus={onFocusItem}
        shouldChangeFocus={false}
        imageType={{ type: FormFactor.isHandset ? 'Poster' : 'Backdrop', size: 'Small' }}
        data={data[0]}
      />
      <ListItem
        focusable={focusable}
        onPress={onPressItem}
        onFocus={onFocusItem}
        shouldChangeFocus={false}
        imageType={{ type: FormFactor.isHandset ? 'Poster' : 'Backdrop', size: 'Small' }}
        data={data[1]}
      />
    </View>
  );
};
