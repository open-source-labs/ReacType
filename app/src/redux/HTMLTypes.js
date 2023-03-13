// import { HTMLType } from '../interfaces/Interfaces';
import React from 'react';
import ImageIcon from '@mui/icons-material/Image';
import ParagraphIcon from '@mui/icons-material/LocalParking';
import FormIcon from '@mui/icons-material/Description';
import HeaderIcon from '@mui/icons-material/TextFormat';
import ButtonIcon from '@mui/icons-material/EditAttributes';
import LinkIcon from '@mui/icons-material/Link';
import ListIcon from '@mui/icons-material/List';
const HTMLTypes = [
  {
    id: 11,
    tag: 'div',
    name: 'Div',
    style: {},
    placeHolderShort: 'div',
    placeHolderLong: '',
    icon: HeaderIcon,
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
    icon: '',
    framework: '',
    nestable: true
  },
  {
    id: 1,
    tag: 'img',
    name: 'Img',
    style: {},
    placeHolderShort: 'image',
    placeHolderLong: '',
    icon: ImageIcon,
    framework: 'reactClassic',
    nestable: false
  },
  {
    id: 2,
    tag: 'form',
    name: 'Form',
    style: {},
    placeHolderShort: 'form',
    placeHolderLong: '',
    icon: FormIcon,
    framework: 'reactClassic',
    nestable: true
  },
  {
    id: 4,
    tag: 'button',
    name: 'Button',
    style: {},
    placeHolderShort: 'button',
    placeHolderLong: '',
    icon: ButtonIcon,
    framework: 'reactClassic',
    nestable: false
  },
  {
    id: 6,
    tag: 'a',
    name: 'Link',
    style: {},
    placeHolderShort: 'link',
    placeHolderLong: '',
    icon: LinkIcon,
    framework: 'reactClassic',
    nestable: false
  },
  {
    id: 8,
    tag: 'p',
    name: 'Paragraph',
    style: {},
    placeHolderShort: 'paragraph',
    placeHolderLong: '',
    icon: ParagraphIcon,
    framework: 'reactClassic',
    nestable: false
  },
  {
    id: 9,
    tag: 'h1',
    name: 'Header 1',
    style: {},
    placeHolderShort: 'header 1',
    placeHolderLong: '',
    icon: HeaderIcon,
    framework: 'reactClassic',
    nestable: false
  },
  {
    id: 10,
    tag: 'h2',
    name: 'Header 2',
    style: {},
    placeHolderShort: 'header 2',
    placeHolderLong: '',
    icon: HeaderIcon,
    framework: 'reactClassic',
    nestable: false
  },
  {
    id: 5,
    tag: 'span',
    name: 'Span',
    style: {},
    placeHolderShort: 'span',
    placeHolderLong: '',
    icon: HeaderIcon,
    framework: 'reactClassic',
    nestable: false
  },
  {
    id: 12,
    tag: 'input',
    name: 'Input',
    style: {},
    placeHolderShort: 'input',
    placeHolderLong: '',
    icon: HeaderIcon,
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
    icon: HeaderIcon,
    framework: 'reactClassic',
    nestable: false
  },
  {
    id: 14,
    tag: 'ol',
    name: 'Ordered List',
    style: {},
    placeHolderShort: 'ordered list',
    placeHolderLong: '',
    icon: ListIcon,
    framework: 'reactClassic',
    nestable: true
  },
  {
    id: 15,
    tag: 'ul',
    name: 'Unordered List',
    style: {},
    placeHolderShort: 'unordered list',
    placeHolderLong: '',
    icon: ListIcon,
    framework: 'reactClassic',
    nestable: true
  },
  {
    id: 16,
    tag: 'menu',
    name: 'Menu',
    style: {},
    placeHolderShort: 'menu',
    placeHolderLong: '',
    icon: ListIcon,
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
    icon: ListIcon,
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
    icon: ListIcon,
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
    icon: LinkIcon,
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
    icon: ListIcon,
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
    icon: ListIcon,
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
    icon: ListIcon,
    framework: 'nextjs',
    nestable: false
  }
];
export default HTMLTypes;
