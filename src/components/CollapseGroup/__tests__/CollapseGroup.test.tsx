import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { IconSun } from '../../../icons/IconSun/IconSun';
import { getSizeByMap } from '../../../utils/getSizeByMap';
import { Badge } from '../../Badge/Badge';
import { cnCollapse, sizeIconMap } from '../../Collapse/Collapse';
import { CollapseGroup } from '../CollapseGroup';

const testId = cnCollapse();

type Item = {
  name: string;
  text?: string;
  disabled?: boolean;
};

export const items: Item[] = [
  {
    name: 'один',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias asperiores delectus eius fuga hic optio qui unde velit vitae voluptatibus! Ab autem dignissimos dolorum eaque, est et fugit ipsum molestias necessitatibus nesciunt ratione, vel veniam. Aspernatur aut consequatur ducimus est explicabo harum nemo, nisi officia placeat quisquam, tempore vitae, voluptates.',
  },
  {
    name: 'два',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur esse explicabo harum illum molestias mollitia pariatur quasi quia tempora vel!',
  },
  { name: 'три', text: 'Lorem ipsum dolor sit amet.' },
];

type renderComponentType = {
  divider?: boolean;
  [k: string]: any;
};

const renderComponent = ({ divider, ...props }: renderComponentType) => {
  const defaultRightSide: React.ReactNode = [
    <Badge label="Статус" size="s" />,
    <IconSun size={getSizeByMap(sizeIconMap, 'm')} />,
  ];
  return render(
    <CollapseGroup
      data-testid={testId}
      divider={divider}
      expandedAll
      isAccordion
      items={items}
      getKey={(item) => item.name}
      getLabel={(item) => item.name}
      getDisabled={(item) => item.disabled ?? false}
      getContent={(item) => item.text}
      getRightSide={(item) => item.disabled || defaultRightSide}
      size="s"
      {...props}
    />,
  );
};

function getRender() {
  return screen.getByTestId(testId);
}

function getLabelText() {
  return getRender().querySelector(`.${cnCollapse('LabelText')}`);
}
function selectDivider() {
  return getRender().querySelectorAll(`.${cnCollapse('Label_divider')}`);
}
function selectCollapse() {
  return getRender().querySelectorAll(`.${cnCollapse()}`);
}
function selectOpenedCollapse() {
  return getRender().querySelectorAll(`.${cnCollapse('Body_isOpen')}`);
}

describe('Компонент CollapseGroup', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent({})).not.toThrow();
  });
  describe('проверка props', () => {
    describe('проверка label', () => {
      it(`label отображается`, () => {
        renderComponent({});
        const labelElement = getLabelText() as HTMLDivElement;
        expect(labelElement.textContent).toEqual('один');
      });
    });
    describe('проверка количества коллапсов', () => {
      it(`3 коллапса`, () => {
        renderComponent({});
        const elements = selectCollapse();
        expect(elements.length).toEqual(3);
      });
    });
    describe('проверка divider', () => {
      it(`3 divider отображаются`, () => {
        renderComponent({ divider: true });
        const elements = selectDivider();
        expect(elements.length).toEqual(3);
      });
    });
    describe('проверка onClick', () => {
      it(`клик должен вызвать callback c ожидаемыми параметрами`, () => {
        const handleClick = jest.fn();

        renderComponent({ onClick: handleClick });

        const element = getLabelText() as HTMLDivElement;

        fireEvent.click(element);
        expect(handleClick).toHaveBeenCalled();
        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(selectOpenedCollapse().length).toEqual(2);
        fireEvent.click(element);
        expect(selectOpenedCollapse().length).toEqual(1);
      });
    });
  });
});
