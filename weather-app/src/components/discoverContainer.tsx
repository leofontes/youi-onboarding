/* eslint-disable max-len */

import React from 'react';
import { View } from 'react-native';
import { ListItem } from '.';
import { Asset } from '../adapters/asset';
import { ListItemPressEvent, ListItemFocusEvent } from './listitem';
import { FormFactor } from '@youi/react-native-youi';
import { AdListItem } from './adManager/list-item-ad';

interface DiscoverContainerProps {
  data: Asset[];
  onPressItem?: ListItemPressEvent;
  onFocusItem?: ListItemFocusEvent;
  focusable?: boolean;
  index: number;
}

// eslint-disable-next-line max-lines-per-function
export const DiscoverContainer: React.FunctionComponent<DiscoverContainerProps> = ({
  data,
  onPressItem,
  onFocusItem,
  focusable,
  index,
}) => {
  if (data.length !== 3) return null;

  const smallItems = (
    <View style={{ flexDirection: 'row', justifyContent: FormFactor.isHandset ? 'space-between' : 'flex-start' }}>
      <ListItem
        focusable={focusable}
        onPress={onPressItem}
        onFocus={onFocusItem}
        shouldChangeFocus={index % 2 !== 0}
        imageType={{ type: 'Backdrop', size: 'Small' }}
        data={data[0]}
      />
      {index !== 1 ? (
        <ListItem
          focusable={focusable}
          onPress={onPressItem}
          onFocus={onFocusItem}
          shouldChangeFocus={index % 2 !== 0}
          imageType={{ type: 'Backdrop', size: 'Small' }}
          data={data[1]}
        />
      ) : (
        <AdListItem focusable={focusable} onPress={onPressItem} onFocus={onFocusItem} />
      )}
    </View>
  );
  const largeItem = (
    <ListItem
      focusable={focusable}
      onPress={onPressItem}
      onFocus={onFocusItem}
      shouldChangeFocus={index % 2 === 0}
      imageType={{ type: 'Backdrop', size: 'Large' }}
      data={data[2]}
    />
  );
  if (index % 2) {
    return (
      <View style={{ backgroundColor: 'transparent' }}>
        {smallItems}
        {largeItem}
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: 'transparent' }}>
      {largeItem}
      {smallItems}
    </View>
  );
};
