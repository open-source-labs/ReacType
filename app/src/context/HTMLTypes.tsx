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
  // do not move this separator out of order in the array
  {
    id: 1000,
    tag: 'separator',
    name: 'separator',
    style: {},
    placeHolderShort: '',
    placeHolderLong: '',
    icon: ''
  },
  {
    id: 1,
    tag: 'img',
    name: 'Image',
    style: {},
    placeHolderShort: 'Image',
    placeHolderLong: '',
    icon: ImageIcon
  },
  {
    id: 2,
    tag: 'form',
    name: 'Form',
    style: {},
    placeHolderShort: 'Form',
    placeHolderLong: '',
    icon: FormIcon
  },
  {
    id: 3,
    tag: 'li',
    name: 'List',
    style: { color: 'purple' },
    placeHolderShort: (
      <ul>
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
      </ul>
    ),
    placeHolderLong: '',
    icon: ListIcon
  },
  {
    id: 4,
    tag: 'button',
    name: 'Button',
    style: { textAlign: 'center', border: 'none' },
    placeHolderShort: <button>Button</button>,
    placeHolderLong: '',
    icon: ButtonIcon
  },
  {
    id: 6,
    tag: 'a',
    name: 'Link',
    style: { border: 'none' },
    placeHolderShort: <a href="#">Link</a>,
    placeHolderLong: '',
    icon: LinkIcon
  },
  {
    id: 8,
    tag: 'p',
    name: 'Paragraph',
    style: {},
    placeHolderShort:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
    placeHolderLong: '',
    icon: ParagraphIcon
  },
  {
    id: 9,
    tag: 'h1',
    name: 'Header 1',
    style: { fontSize: '2em' },
    placeHolderShort: 'Header 1',
    placeHolderLong: '',
    icon: HeaderIcon
  },
  {
    id: 10,
    tag: 'h2',
    name: 'Header 2',
    style: { fontSize: '1.5em' },
    placeHolderShort: 'Header 2',
    placeHolderLong: '',
    icon: HeaderIcon
  },
  {
    id: 5,
    tag: 'span',
    name: 'Span',
    style: { fontSize: '1.5em' },
    placeHolderShort: 'Span',
    placeHolderLong: '',
    icon: HeaderIcon
  }
];

export default HTMLTypes;
