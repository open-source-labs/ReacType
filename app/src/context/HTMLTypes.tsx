import { HTMLType } from '../interfaces/Interfaces';
import React from 'react';

import ImageIcon from '@material-ui/icons/Image';
import ParagraphIcon from '@material-ui/icons/LocalParking';
import FormIcon from '@material-ui/icons/Description';
import HeaderIcon from '@material-ui/icons/TextFormat';
import ButtonIcon from '@material-ui/icons/EditAttributes';
import LinkIcon from '@material-ui/icons/Link';
import ListIcon from '@material-ui/icons/List';

const HTMLTypes: HTMLType[] = [
  {
    id: 11,
    tag: 'div',
    name: 'Div',
    style: {},
    placeHolderShort: 'div',
    placeHolderLong: '',
    icon: HeaderIcon
  },
  // do not move this separator element out of index 1 in this array
  // in componentReducer.ts, separator is referenced as 'initialState.HTMLTypes[1]'
  {
    id: 1000,
    tag: 'separator',
    name: 'separator',
    style: { border: 'none'},
    placeHolderShort: '',
    placeHolderLong: '',
    icon: ''
  },
  {
    id: 1,
    tag: 'img',
    name: 'Image',
    style: {},
    placeHolderShort: 'image',
    placeHolderLong: '',
    icon: ImageIcon
  },
  {
    id: 2,
    tag: 'form',
    name: 'Form',
    style: {},
    placeHolderShort: 'form',
    placeHolderLong: '',
    icon: FormIcon
  },
  {
    id: 4,
    tag: 'button',
    name: 'Button',
    style: {},
    placeHolderShort: 'button',
    placeHolderLong: '',
    icon: ButtonIcon
  },
  {
    id: 6,
    tag: 'a',
    name: 'Link',
    style: {},
    placeHolderShort: 'link',
    placeHolderLong: '',
    icon: LinkIcon
  },
  {
    id: 8,
    tag: 'p',
    name: 'Paragraph',
    style: {},
    placeHolderShort: 'paragraph',
    placeHolderLong: '',
    icon: ParagraphIcon
  },
  {
    id: 9,
    tag: 'h1',
    name: 'Header 1',
    style: {},
    placeHolderShort: 'header 1',
    placeHolderLong: '',
    icon: HeaderIcon
  },
  {
    id: 10,
    tag: 'h2',
    name: 'Header 2',
    style: {},
    placeHolderShort: 'header 2',
    placeHolderLong: '',
    icon: HeaderIcon
  },
  {
    id: 5,
    tag: 'span',
    name: 'Span',
    style: {},
    placeHolderShort: 'span',
    placeHolderLong: '',
    icon: HeaderIcon
  },
  {
    id: 12,
    tag: 'input',
    name: 'Input',
    style: {},
    placeHolderShort: 'input',
    placeHolderLong: '',
    icon: HeaderIcon
  },
  {
    id: 13,
    tag: 'label',
    name: 'Label',
    style: {},
    placeHolderShort: 'label',
    placeHolderLong: '',
    icon: HeaderIcon
  },
  {
    id: 14,
    tag: 'ol',
    name: 'Ordered List',
    style: {},
    placeHolderShort: 'ordered list',
    placeHolderLong: '',
    icon: ListIcon
  },
  {
    id: 15,
    tag: 'ul',
    name: 'Unordered List',
    style: {},
    placeHolderShort: 'unordered list',
    placeHolderLong: '',
    icon: ListIcon
  },
  {
    id: 16,
    tag: 'menu',
    name: 'Menu',
    style: {},
    placeHolderShort: 'menu',
    placeHolderLong: '',
    icon: ListIcon
  },
  {
    id: 3,
    tag: 'li',
    name: 'List',
    style: {},
    placeHolderShort: 'list item',
    placeHolderLong: '',
    icon: ListIcon
  },
  {
    id: 17,
    tag: 'Switch',
    name: 'Switch',
    style: {},
    placeHolderShort: 'Switch',
    placeHolderLong: '',
    icon: ListIcon
  }, 
  {
    id: 18,
    tag: 'Link',
    name: 'LinkTo',
    style: {},
    placeHolderShort: 'link to',
    placeHolderLong: '',
    icon: ListIcon
  },
  {
    id: -1,
    tag: 'Route',
    name: 'Route',
    style: {},
    placeHolderShort: 'Route',
    placeHolderLong: '',
    icon: LinkIcon
  }
];

export default HTMLTypes;
