import React, { useEffect, useState } from 'react';

import { IconProps } from '../../icons/Icon/Icon';
import { IconArrowDown } from '../../icons/IconArrowDown/IconArrowDown';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import {
  Collapse,
  collapsePropCloseDirectionIconDefault,
  collapsePropDirectionIconDefault,
  CollapsePropHorizontalSpace,
  collapsePropIconPositionDefault,
  CollapsePropSize,
  collapsePropSizeDefault,
  CollapsePropView,
  collapsePropViewDefault,
} from '../Collapse/Collapse';
import { CollapseIconPropDirection } from '../Collapse/CollapseIcon/CollapseIcon';

type CommonProps<ITEM> = {
  isAccordion?: boolean;
  children?: never;
  icon?: React.FC<IconProps>;
  expandedAll?: boolean;
  items: ITEM[];
  divider?: boolean;
  getLabel: (item: ITEM) => string;
  getKey: (item: ITEM) => string;
  getContent?: (item: ITEM) => React.ReactNode;
  getDisabled?: (item: ITEM) => boolean;
  size?: CollapsePropSize;
  view?: CollapsePropView;
  horizontalSpace?: CollapsePropHorizontalSpace;
  hoverEffect?: boolean;
} & (
  | {
      closeIcon?: React.FC<IconProps>;
      directionIcon?: never;
      closeDirectionIcon?: never;
    }
  | {
      closeIcon?: never;
      directionIcon?: CollapseIconPropDirection;
      closeDirectionIcon?: CollapseIconPropDirection;
    }
) &
  (
    | {
        iconPosition?: 'left';
        getRightSide?: (item: ITEM) => React.ReactNode;
      }
    | {
        iconPosition?: 'right';
        getRightSide?: never;
      }
  );

type Props<ITEM> = PropsWithHTMLAttributesAndRef<CommonProps<ITEM>, HTMLDivElement>;

type CollapseGroup = <ITEM>(props: Props<ITEM>) => React.ReactElement | null;

export const CollapseGroup: CollapseGroup = React.forwardRef((props, ref) => {
  const {
    isAccordion,
    expandedAll,
    items,
    getLabel,
    getKey,
    getContent,
    getDisabled,
    size = collapsePropSizeDefault,
    view = collapsePropViewDefault,
    hoverEffect,
    divider,
    icon = IconArrowDown,
    closeIcon,
    getRightSide,
    horizontalSpace,
    iconPosition = collapsePropIconPositionDefault,
    directionIcon = collapsePropDirectionIconDefault,
    closeDirectionIcon = collapsePropCloseDirectionIconDefault,
    onClick,
    ...otherProps
  } = props;
  const [activeKeys, setActiveKeys] = useState<(string | number)[]>([]);
  useEffect(() => {
    if (!expandedAll) return;
    const allKeys: (string | number)[] = [];
    items.forEach((item) => allKeys.push(getKey(item)));
    setActiveKeys(allKeys);
  }, []);

  const setActiveKey = (key: string | number) => {
    setActiveKeys((prev) => (isAccordion ? [key] : [...prev, key]));
  };
  const deleteActiveKey = (key: string | number) => {
    setActiveKeys((prev) => prev.filter((prevKey) => prevKey !== key));
  };
  const toggleActiveState = (key: string | number) => {
    activeKeys.indexOf(key) === -1 ? setActiveKey(key) : deleteActiveKey(key);
  };
  return (
    <div ref={ref} {...otherProps}>
      {items.map((item) => {
        const key = getKey(item);
        const isDisabled = getDisabled?.(item) ?? false;
        return (
          <Collapse
            iconPosition={iconPosition as 'left'}
            label={getLabel(item)}
            key={key}
            size={size}
            view={view}
            closeIcon={closeIcon as undefined}
            rightSide={getRightSide?.(item)}
            horizontalSpace={horizontalSpace}
            icon={icon}
            directionIcon={directionIcon}
            closeDirectionIcon={closeDirectionIcon}
            hoverEffect={hoverEffect}
            divider={divider}
            isOpen={key && !isDisabled ? activeKeys.includes(key) : false}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              toggleActiveState(key);
              return onClick?.(e);
            }}
          >
            {getContent?.(item)}
          </Collapse>
        );
      })}
    </div>
  );
});
