import React from 'react';

import { exampleItems as items } from '../../../__mocks__/mock.data';
import { IconSun } from '../../../../../icons/IconSun/IconSun';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { getSizeByMap } from '../../../../../utils/getSizeByMap';
import { Badge } from '../../../../Badge/Badge';
import { sizeIconMap } from '../../../../Collapse/Collapse';
import { CollapseGroup } from '../../../CollapseGroup';

export const CollapseGroupExampleAccordionView = () => {
  const defaultRightSide: React.ReactNode = [
    <Badge label="Статус" size="s" />,
    <IconSun size={getSizeByMap(sizeIconMap, 'm')} />,
  ];

  return (
    <div className={cnDocsDecorator('Section')}>
      <CollapseGroup
        items={items}
        isAccordion
        getKey={(item) => item.name}
        getLabel={(item) => item.name}
        getDisabled={(item) => item.disabled ?? false}
        getContent={(item) => item.text}
        getRightSide={(item) => item.disabled || defaultRightSide}
        size="s"
      />
    </div>
  );
};
