import { HTMLType } from './interfaces/InterfacesNew';

import ImageIcon from '@material-ui/icons/Image';
import ParagraphIcon from '@material-ui/icons/LocalParking';
import FormIcon from '@material-ui/icons/Description';
import HeaderIcon from '@material-ui/icons/TextFormat';
import ButtonIcon from '@material-ui/icons/EditAttributes';
import LinkIcon from '@material-ui/icons/Link';
import ListIcon from '@material-ui/icons/List';

const HTMLTypes: HTMLType[] = [
  {
    id: 1,
    tag: 'img',
    name: 'Image',
    style: {},
    placeHolderShort: '',
    placeHolderLong: '',
    icon: ImageIcon
  },
  {
    id: 2,
    tag: 'form',
    name: 'Form',
    style: {},
    placeHolderShort: '',
    placeHolderLong: '',
    icon: FormIcon
  },
  {
    id: 3,
    tag: 'li',
    name: 'List',
    style: { color: 'purple' },
    placeHolderShort: 'This is a list',
    placeHolderLong: '',
    icon: ListIcon
  },
  {
    id: 4,
    tag: 'button',
    name: 'Button',
    style: {},
    placeHolderShort: '',
    placeHolderLong: '',
    icon: ButtonIcon
  },
  {
    id: 6,
    tag: 'a',
    name: 'Link',
    style: {},
    placeHolderShort: '',
    placeHolderLong: '',
    icon: LinkIcon
  },
  {
    id: 8,
    tag: 'p',
    name: 'Paragraph',
    style: {},
    placeHolderShort: '',
    placeHolderLong: '',
    icon: ParagraphIcon
  },
  {
    id: 9,
    tag: 'h1',
    name: 'Header 1',
    style: {},
    placeHolderShort: '',
    placeHolderLong: '',
    icon: HeaderIcon
  },
  {
    id: 10,
    tag: 'h2',
    name: 'Header 2',
    style: {},
    placeHolderShort: '',
    placeHolderLong: '',
    icon: HeaderIcon
  },
  {
    id: 11,
    tag: 'div',
    name: 'Div',
    style: {},
    placeHolderShort: '',
    placeHolderLong: '',
    icon: HeaderIcon
  }
];

export default HTMLTypes;
