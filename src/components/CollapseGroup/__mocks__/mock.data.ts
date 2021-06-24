type Item = {
  name: string;
  text?: string;
  disabled?: boolean;
};
export const collapseItems: Item[] = [
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
  { name: 'disabled', disabled: true, text: 'Lorem ipsum dolor sit.' },
  {
    name: 'пять',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit ipsum optio repellat voluptatem.',
  },
];
export const exampleItems: Item[] = [
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
