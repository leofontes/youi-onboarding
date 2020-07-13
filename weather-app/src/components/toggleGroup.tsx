import React from 'react';
import { ToggleButton } from '.';
import { ToggleButtonProps } from './toggleButton';

interface ToggleGroupProps {
  initialToggleIndex: number;
  onPressItem: (index: number) => void;
}

export class ToggleGroup extends React.PureComponent<ToggleGroupProps, { activeButtonIndex: number }> {
  state = { activeButtonIndex: -1 };

  initialToggleIndex = this.props.initialToggleIndex;

  render() {
    // eslint-disable-next-line consistent-return
    return React.Children.map(this.props.children, (child, index) => {
      const typedChild = child as React.ReactElement<ToggleButtonProps>;
      if (typedChild.type === ToggleButton) {
        return React.cloneElement(typedChild, {
          onPress: () => {
            this.initialToggleIndex = -1;
            if (this.state.activeButtonIndex === index) return;

            this.setState({ activeButtonIndex: index });

            if (this.props.onPressItem) this.props.onPressItem(index);
            else if (typedChild.props.onPress) typedChild.props.onPress(index);
          },
          toggled: this.initialToggleIndex === index || this.state.activeButtonIndex === index,
          focusOnMount: this.initialToggleIndex === index,
        });
      }
    });
  }
}
