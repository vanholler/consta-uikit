import React from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { collapseItems as items } from '../__mocks__/mock.data';
import { IconSun } from '../../../icons/IconSun/IconSun';
import { getSizeByMap } from '../../../utils/getSizeByMap';
import { createMetadata } from '../../../utils/storybook';
import { Badge } from '../../Badge/Badge';
import {
  collapsePropCloseDirectionIconDefault,
  collapsePropDirectionIcon,
  collapsePropDirectionIconDefault,
  collapsePropHorizontalSpace,
  collapsePropSize,
  collapsePropSizeDefault,
  collapsePropView,
  collapsePropViewDefault,
  sizeIconMap,
} from '../../Collapse/Collapse';
import { CollapseGroup } from '../CollapseGroup';

import mdx from './CollapseGroup.docs.mdx';

const defaultKnobs = () => ({
  size: select('size', collapsePropSize, collapsePropSizeDefault),
  hoverEffect: boolean('hoverEffect', false),
  isAccordion: boolean('isAccordion', false),
  view: select('view', collapsePropView, collapsePropViewDefault),
  divider: boolean('divider', false),
  horizontalSpace: select(
    'horizontalSpace',
    collapsePropHorizontalSpace,
    collapsePropHorizontalSpace[0],
  ),
  directionIcon: select(
    'directionIcon',
    collapsePropDirectionIcon,
    collapsePropDirectionIconDefault,
  ),
  closeDirectionIcon: select(
    'closeDirectionIcon',
    collapsePropDirectionIcon,
    collapsePropCloseDirectionIconDefault,
  ),
});

export function Playground() {
  const {
    size,
    hoverEffect,
    view,
    divider,
    horizontalSpace,
    directionIcon,
    closeDirectionIcon,
    isAccordion,
  } = defaultKnobs();

  const defaultRightSide: React.ReactNode = [
    <Badge label="Статус" size="s" />,
    <IconSun size={getSizeByMap(sizeIconMap, size)} />,
  ];

  return (
    <CollapseGroup
      items={items}
      expandedAll
      isAccordion={isAccordion}
      getKey={(item) => item.name}
      getLabel={(item) => item.name}
      getDisabled={(item) => item.disabled ?? false}
      getContent={(item) => item.text}
      getRightSide={(item) => item.disabled || defaultRightSide}
      size={size}
      hoverEffect={hoverEffect}
      iconPosition="left"
      view={view}
      divider={divider}
      horizontalSpace={horizontalSpace}
      directionIcon={directionIcon}
      closeDirectionIcon={closeDirectionIcon}
    />
  );
}

export default createMetadata({
  title: 'Компоненты|/Отображение данных/CollapseGroup',
  id: 'components/CollapseGroup',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
