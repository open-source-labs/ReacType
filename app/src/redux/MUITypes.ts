import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { CardProps as MuiCardProps } from '@mui/material/Card';
import { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';
import { MUIType } from '../interfaces/Interfaces';
import { TroubleshootSharp } from '@mui/icons-material';

interface ButtonSchema {
    id: number;
    tag: string;
    name: string;
    style: React.CSSProperties;
    placeHolderShort: string;
    placeHolderLong: string;
    icon: string;
    framework: string;
    nestable: boolean;
    props: MuiButtonProps;
   }
interface InputSchema {
    id: number;
    tag: string;
    name: string;
    style: React.CSSProperties;
    placeHolderShort: string;
    placeHolderLong: string;
    icon: string;
    framework: string;
    nestable: boolean;
    props: MuiTextFieldProps;
   }
interface CardSchema {
    id: number;
    tag: string;
    name: string;
    style: React.CSSProperties;
    placeHolderShort: string;
    placeHolderLong: string;
    icon: string;
    framework: string;
    nestable: boolean;
    props: MuiCardProps;
   }
interface TypographySchema {
    id: number;
    tag: string;
    name: string;
    style: React.CSSProperties;
    placeHolderShort: string;
    placeHolderLong: string;
    icon: string;
    framework: string;
    nestable: boolean;
    props: MuiTypographyProps;
   }

const MUITypes: MUIType[] = [  
   {
    id: 11,
    tag: 'button',
    name: 'Material UI Button',
    style: {},
    placeHolderShort: 'button',
    placeHolderLong: 'Material UI Button Component',
    icon: 'Code',
    framework: 'reactClassic',
    nestable: true,
    props: {
       variant: 'contained',
       color: 'primary',
       disabled: false,
       // Add other MUI ButtonProps as needed
    },
   },
   {
    id: 21,
    tag: 'input',
    name: 'Material UI TextField',
    style: {},
    placeHolderShort: 'input',
    placeHolderLong: 'Material UI TextField Component',
    icon: 'TextFields',
    framework: 'reactClassic',
    nestable: true,
    props: {
       variant: 'outlined',
       fullWidth: true,
       // Add other MUI TextFieldProps as needed
    },
   },
   {
    id: 31,
    tag: 'card',
    name: 'Material UI Card',
    style: {},
    placeHolderShort: 'card',
    placeHolderLong: 'Material UI Card Component',
    icon: 'CardTravel',
    framework: 'reactClassic',
    nestable: true,
    props: {
       variant: 'outlined',
       // Add other MUI CardProps as needed
    },
   }, 
   {
    id: 41,
    tag: 'typography',
    name: 'Material UI Typography',
    style: {},
    placeHolderShort: 'typography',
    placeHolderLong: 'Material UI Typography Component',
    icon: 'TextFormat',
    framework: 'reactClassic',
    nestable: true,
    props: {
       variant: 'h6',
       // Add other MUI TypographyProps as needed
    },
   }
];

export default MUITypes;