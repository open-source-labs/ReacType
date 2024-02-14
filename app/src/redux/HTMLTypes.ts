import { TroubleshootSharp } from '@mui/icons-material';
import { HTMLType } from '../interfaces/Interfaces';

//properties for all HTML components

const HTMLTypes: HTMLType[] = [
  {
    id: 11,
    tag: 'div',
    name: 'Div',
    style: {},
    placeHolderShort: 'div',
    placeHolderLong: '',
    icon: 'Code',
    framework: 'reactClassic',
    nestable: true
  },
  // do not move this separator element out of index 1 in this array
  // in componentReducer.ts, separator is referenced as 'initialState.HTMLTypes[1]'
  {
    id: 1000,
    tag: 'separator',
    name: 'separator',
    style: { border: 'none' },
    placeHolderShort: '',
    placeHolderLong: '',
    icon: null,
    framework: '',
    nestable: true
  },
  {
    id: 1,
    tag: 'a',
    name: 'Link',
    style: {},
    placeHolderShort: 'link',
    placeHolderLong: '',
    icon: 'Link',
    framework: 'reactClassic',
    nestable: true
  },
  {
    id: 2,
    tag: 'h1',
    name: 'Header 1',
    style: {},
    placeHolderShort: 'header 1',
    placeHolderLong: '',
    icon: 'TextFormat',
    framework: 'reactClassic',
    nestable: true
  },
  {
    id: 4,
    tag: 'h2',
    name: 'Header 2',
    style: {},
    placeHolderShort: 'header 2',
    placeHolderLong: '',
    icon: 'TextFormat',
    framework: 'reactClassic',
    nestable: true
  },
  {
    id: 6,
    tag: 'span',
    name: 'Span',
    style: {},
    placeHolderShort: 'span',
    placeHolderLong: '',
    icon: 'ShortTextOutlined',
    framework: 'reactClassic',
    nestable: true
  },
  {
    id: 8,
    tag: 'p',
    name: 'Paragraph',
    style: {},
    placeHolderShort: 'paragraph',
    placeHolderLong: '',
    icon: 'NotesOutlined',
    framework: 'reactClassic',
    nestable: true
  },
  {
    id: 9,
    tag: 'form',
    name: 'Form',
    style: {},
    placeHolderShort: 'form',
    placeHolderLong: '',
    icon: 'Description',
    framework: 'reactClassic',
    nestable: true
  },
  {
    id: 10,
    tag: 'input',
    name: 'Input',
    style: {},
    placeHolderShort: 'input',
    placeHolderLong: '',
    icon: 'EditOutlined',
    framework: 'reactClassic',
    nestable: false
  },
  {
    id: 5,
    tag: 'button',
    name: 'Button',
    style: {},
    placeHolderShort: 'button',
    placeHolderLong: '',
    icon: 'EditAttributes',
    framework: 'reactClassic',
    nestable: true
  },

  {
    id: 12,
    tag: 'img',
    name: 'Img',
    style: {},
    placeHolderShort: 'image',
    placeHolderLong: '',
    icon: 'Image',
    framework: 'reactClassic',
    nestable: false
  },
  {
    id: 13,
    tag: 'label',
    name: 'Label',
    style: {},
    placeHolderShort: 'label',
    placeHolderLong: '',
    icon: 'MoreOutlined',
    framework: 'reactClassic',
    nestable: true
  },
  {
    id: 14,
    tag: 'menu',
    name: 'Menu',
    style: {},
    placeHolderShort: 'menu',
    placeHolderLong: '',
    icon: 'FeaturedPlayListOutlined',
    framework: 'reactClassic',
    nestable: true
  },
  {
    id: 15,
    tag: 'ol',
    name: 'Ordered List',
    style: {},
    placeHolderShort: 'ordered list',
    placeHolderLong: '',
    icon: 'FormatListNumberedOutlined',
    framework: 'reactClassic',
    nestable: true
  },
  {
    id: 16,
    tag: 'ul',
    name: 'Unordered List',
    style: {},
    placeHolderShort: 'unordered list',
    placeHolderLong: '',
    icon: 'FormatListBulletedOutlined',
    framework: 'reactClassic',
    nestable: true
  },
  {
    id: 3,
    tag: 'li',
    name: 'List',
    style: {},
    placeHolderShort: 'list item',
    placeHolderLong: '',
    icon: 'ListAltOutlined',
    framework: 'reactClassic',
    nestable: true
  },
  {
    id: 17,
    tag: 'Switch',
    name: 'Switch',
    style: {},
    placeHolderShort: 'Switch',
    placeHolderLong: '',
    icon: 'ToggleOffOutlined',
    framework: 'reactClassic',
    nestable: true
  },
  {
    id: -1,
    tag: 'Route',
    name: 'Route',
    style: {},
    placeHolderShort: 'Route',
    placeHolderLong: '',
    icon: 'RouteOutlined',
    framework: 'reactClassic',
    nestable: true
  },
  {
    id: 18,
    tag: 'Link',
    name: 'LinkTo',
    style: {},
    placeHolderShort: 'LinkTo',
    placeHolderLong: '',
    icon: 'DatasetLinkedOutlined',
    framework: 'reactClassic',
    nestable: true
  },
  {
    id: 19,
    tag: 'Link',
    name: 'LinkHref',
    style: {},
    placeHolderShort: 'LinkHref',
    placeHolderLong: '',
    icon: 'Link',
    framework: 'nextjs',
    nestable: true
  },
  {
    id: 20,
    tag: 'Image',
    name: 'Image',
    style: {},
    placeHolderShort: 'Image',
    placeHolderLong: '',
    icon: 'ImageIcon',
    framework: 'nextjs',
    nestable: false
  }
];
export default HTMLTypes;
