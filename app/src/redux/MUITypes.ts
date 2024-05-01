import { MUIType } from '../interfaces/Interfaces';

/* INPUTS
21. Autocomplete
//separator id: 1000 (first index)
22. Button
23. Button Group
24. Checkbox
25. Floating Action Button
26. Radio Group
27. Rating
28. Select
29. Slider
30. Switch
31. Text Field
32. Transfer List
33. Toggle Button

DATA DISPLAY
34. Avatar
35. Badge
36. Chip
37. Divider
38. Icons
39. Material Icons
40. List
41. Table
42. Tooltip
43. Typography

FEEDBACK
44. Alert
45. Backdrop
46. Dialog
47. Progress
48. Skeleton
49. Snackbar

SURFACES
50. Accordion
51. App Bar
52. Card
53. Paper

NAVIGATION
54. Bottom Navigation
55. Breadcrumbs
56. Drawer
57. Link
58. Menu
59. Pagination
60. Speed Dial
61. Stepper
62. Tabs

LAYOUT
63. Box
64. Container
65. Grid
66. Grid v2
67. NEW
68. Stack
69. Image List
70. Hidden

UTILS
71. Click-Away Listener
72. CSS Baseline
73. Modal
74. No SSR
75. Popover
76. Popper
77. Portal
78. Textarea Autosize
79. Transitions
80. useMediaQuery */

const MUITypes: MUIType[] = [
  {
    id: 21,
    tag: 'autocomplete',
    name: 'Autocomplete',
    style: {},
    placeHolderShort: 'autocomplete',
    placeHolderLong: 'Material UI Autocomplete Component',
    icon: 'EditAttributes',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import TextField from '@mui/material/TextField'",
      "import Autocomplete from '@mui/material/Autocomplete'",
      '\nconst top100Films = [',
      "\t{ label: 'The Shawshank Redemption', year: 1994 },",
      "\t{ label: 'The Godfather', year: 1972 },",
      "\t{ label: 'The Godfather: Part II', year: 1974 },",
      "\t{ label: 'The Dark Knight', year: 2008 },",
      "\t{ label: '12 Angry Men', year: 1957 },",
      '];'
    ],
    stateAndEventHandlers: [],
    defaultProps: [
      'disablePortal options={top100Films} sx={{ width: 300 }} renderInput={(params) => <TextField {...params} label="Movie" />}'
    ],
    propOptions: [
      'options',
      'renderInput',
      'autoComplete',
      'autoHighlight',
      'autoSelect',
      'blurOnSelect',
      'ChipProps',
      'classes',
      'clearIcon',
      'clearOnBlur',
      'clearOnEscape',
      'clearText',
      'closeText',
      'componentsProps',
      'defaultValue',
      'disableClearable',
      'disableCloseOnSelect',
      'disabled',
      'disabledItemsFocusable',
      'disableListWrap',
      'disablePortal',
      'filterOptions',
      'filterSelectedOptions',
      'forcePopupIcon',
      'freeSolo',
      'fullWidth',
      'getLimitTagsText',
      'getOptionDisabled',
      'getOptionKey',
      'getOptionLabel',
      'groupBy',
      'handleHomeEndKeys',
      'id',
      'includeInputInList',
      'inputValue',
      'isOptionEqualToValue',
      'limitTags',
      'ListboxComponent',
      'ListboxProps',
      'loading',
      'loadingText',
      'multiple',
      'noOptionsText',
      'onChange',
      'onClose',
      'onHighlightChange',
      'onInputChange',
      'onOpen',
      'open',
      'openOnFocus',
      'openText',
      'PaperComponent',
      'PopperComponent',
      'popupIcon',
      'readOnly',
      'renderGroup',
      'renderOption',
      'renderTags',
      'selectOnFocus',
      'size',
      'slotProps',
      'sx',
      'value'
    ],
    jsx: [`<Autocomplete id="combo-box-demo" />`],
    componentData: {
      type: 'Autocomplete',
      props: {
        disablePortal: true,
        id: 'combo-box-demo',
        options: 'top100Films',
        sx: { width: 300, m: 1 },
        renderInput: "params => <TextField {...params} label='Movie' />"
      },
      children: []
    },
    children: []
  },
  // do not move this separator element out of index 1 in this array
  // in componentReducer.ts, separator is referenced as 'initialState.HTMLTypes[1]
  {
    id: 1000,
    tag: 'separator',
    name: 'separator',
    style: { border: 'none' },
    placeHolderShort: '',
    placeHolderLong: '',
    icon: null,
    framework: '',
    nestable: true,
    imports: [],
    stateAndEventHandlers: [],
    propOptions: [],
    defaultProps: [],
    jsx: [],
    componentData: {},
    children: []
  },
  {
    id: 22,
    tag: 'mui button',
    name: 'Button',
    style: {},
    placeHolderShort: 'mui button',
    placeHolderLong: 'Material UI Button Component',
    icon: 'EditAttributes',
    framework: 'reactClassic',
    nestable: true,
    imports: ["import Button from '@mui/material/Button'"],
    stateAndEventHandlers: [],
    defaultProps: ['variant="contained"'],
    propOptions: [
      'children',
      'classes',
      'color',
      'component',
      'disabled',
      'disableElevation',
      'disableFocusRipple',
      'disableRipple',
      'endIcon',
      'fullWidth',
      'href',
      'size',
      'startIcon',
      'sx',
      'variant'
    ],
    jsx: [`<Button >Contained</Button>`],
    componentData: {
      type: 'Button',
      props: {
        variant: 'contained',
        color: 'primary',
        sx: { m: 1 }
      },
      children: 'Click Me'
    },
    children: []
  },
  {
    id: 23,
    tag: 'btn group',
    name: 'ButtonGroup',
    style: {},
    placeHolderShort: 'btn group',
    placeHolderLong: 'Material UI ButtonGroup Component',
    icon: 'TableRows',
    framework: 'reactClassic',
    nestable: true,
    imports: [
      "import Button from '@mui/material/Button",
      "import ButtonGroup from '@mui/material/ButtonGroup'"
    ],
    stateAndEventHandlers: [],
    defaultProps: ['variant="contained"'],
    propOptions: [
      'children',
      'classes',
      'color',
      'component',
      'disabled',
      'disableElevation',
      'disableFocusRipple',
      'disableRipple',
      'fullWidth',
      'orientation',
      'size',
      'sx',
      'variant'
    ],
    jsx: [
      `<ButtonGroup aria-label="Basic button group">`,
      `  <Button>One</Button>`,
      `  <Button>Two</Button>`,
      `  <Button>Three</Button>`,
      `</ButtonGroup>`
    ],
    componentData: {
      type: 'ButtonGroup',
      props: {
        variant: 'contained',
        'aria-label': 'Basic button group',
        sx: { m: 1 }
      },
      children: [
        { type: 'Button', children: 'One' },
        { type: 'Button', children: 'Two' },
        { type: 'Button', children: 'Three' }
      ]
    },
    children: []
  },
  {
    id: 24,
    tag: 'checkbox',
    name: 'Checkbox',
    style: {},
    placeHolderShort: 'checkbox',
    placeHolderLong: 'Material UI Checkbox Component',
    icon: 'CheckBoxOutlineBlank',
    framework: 'reactClassic',
    nestable: false,
    imports: ["import Checkbox from '@mui/material/Checkbox'"],
    stateAndEventHandlers: [],
    defaultProps: ['defaultChecked'],
    propOptions: [
      'checked',
      'checkedIcon',
      'classes',
      'color',
      'defaultChecked',
      'disabled',
      'disableRipple',
      'icon',
      'id',
      'indeterminate',
      'indeterminateIcon',
      'inputProps',
      'inputRef',
      'onChange',
      'required',
      'size',
      'sx',
      'value'
    ],
    jsx: [
      `<div>`,
      `  <Checkbox {...{ inputProps: { 'aria-label': 'Checkbox demo' } }} />`,
      `</div>`
    ],
    componentData: {
      type: 'div',
      props: { sx: { m: 1 } },
      children: [
        {
          type: 'Checkbox',
          props: {
            inputProps: { 'aria-label': 'Checkbox demo' },
            defaultChecked: true
          }
        }
      ]
    },
    children: []
  },
  {
    id: 25,
    tag: 'fab',
    name: 'Fab',
    style: {},
    placeHolderShort: 'fab',
    placeHolderLong: 'Material UI Floating Action Button Component',
    icon: 'Add',
    framework: 'reactClassic',
    nestable: true,
    imports: [
      "import Box from '@mui/material/Box'",
      "import Fab from '@mui/material/Fab'",
      "import AddIcon from '@mui/icons-material/Add'"
    ],
    stateAndEventHandlers: [],
    defaultProps: ['color="primary" variant="circular"'],
    propOptions: [
      'children',
      'classes',
      'color',
      'component',
      'disabled',
      'disableFocusRipple',
      'disableRipple',
      'href',
      'size',
      'sx',
      'variant'
    ],
    jsx: [
      `<Box sx={{ '& > :not(style)': { m: 1 } }}>`,
      `  <Fab aria-label="add">`,
      `    <AddIcon />`,
      `  </Fab>`,
      `</Box>`
    ],
    componentData: {
      type: 'Box',
      props: {
        sx: { m: 1, '& > :not(style)': { m: 1 } }
      },
      children: [
        {
          type: 'Fab',
          props: {
            color: 'primary',
            'aria-label': 'add',
            sx: { fontSize: 24 }
          },
          children: '+'
        }
      ]
    },
    children: []
  },
  {
    id: 26,
    tag: 'radio group',
    name: 'RadioGroup',
    style: {},
    placeHolderShort: 'radio group',
    placeHolderLong: 'Material UI Radio Buttons Group Component',
    icon: 'RadioButtonChecked',
    framework: 'reactClassic',
    nestable: true,
    imports: [
      "import Radio from '@mui/material/Radio'",
      "import RadioGroup from '@mui/material/RadioGroup'",
      "import FormControlLabel from '@mui/material/FormControlLabel'",
      "import FormControl from '@mui/material/FormControl'",
      "import FormLabel from '@mui/material/FormLabel'"
    ],
    stateAndEventHandlers: [],
    defaultProps: ['defaultValue="female" name="radio-buttons-group"'],
    propOptions: ['children', 'defaultValue', 'name', 'onChange', 'value'],
    jsx: [
      `<FormControl>`,
      `  <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>`,
      `  <RadioGroup aria-labelledby="demo-radio-buttons-group-label" >`,
      `    <FormControlLabel value="female" control={<Radio />} label="Female" />`,
      `    <FormControlLabel value="male" control={<Radio />} label="Male" />`,
      `    <FormControlLabel value="other" control={<Radio />} label="Other" />`,
      `  </RadioGroup>`,
      `</FormControl>`
    ],
    componentData: {
      type: 'FormControl',
      props: { sx: { m: 1 } },
      children: [
        {
          type: 'FormLabel',
          props: {
            id: 'demo-radio-buttons-group-label'
          },
          children: 'Gender'
        },
        {
          type: 'RadioGroup',
          props: {
            'aria-labelledby': 'demo-radio-buttons-group-label',
            defaultValue: 'female',
            name: 'radio-buttons-group'
          },
          children: [
            {
              type: 'FormControlLabel',
              props: {
                value: 'female',
                control: { type: 'Radio' },
                label: 'Female'
              }
            },
            {
              type: 'FormControlLabel',
              props: {
                value: 'male',
                control: { type: 'Radio' },
                label: 'Male'
              }
            },
            {
              type: 'FormControlLabel',
              props: {
                value: 'other',
                control: { type: 'Radio' },
                label: 'Other'
              }
            }
          ]
        }
      ]
    },
    children: []
  },
  {
    id: 27,
    tag: 'rating',
    name: 'Rating',
    style: {},
    placeHolderShort: 'rating',
    placeHolderLong: 'Material UI Rating Component',
    icon: 'StarBorder',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import Box from '@mui/material/Box'",
      "import Rating from '@mui/material/Rating'",
      "import Typography from '@mui/material/Typography'"
    ],
    stateAndEventHandlers: [
      'const [ratingValue, setRatingValue] = React.useState(2);'
    ],
    defaultProps: ['value={value}'],
    propOptions: [
      'defaultValue',
      'disabled',
      'emptyIcon',
      'emptyLabelText',
      'getLabelText',
      'highlightSelectedOnly',
      'icon',
      'IconContainerComponent',
      'max',
      'name',
      'onChange',
      'onChangeActive',
      'precision',
      'readOnly',
      'size',
      'sx',
      'value'
    ],
    jsx: [
      `<Box sx={{ '& > legend': { mt: 2 } }}>`,
      `  <Typography component="legend">Controlled</Typography>`,
      `  <Rating name="simple-controlled" onChange={(event, newValue) => { setRatingValue(newValue); }} />`,
      `</Box>`
    ],
    componentData: {
      type: 'Box',
      props: {
        sx: { m: 1, '& > legend': { mt: 2 } }
      },
      children: [
        {
          type: 'Typography',
          props: {
            component: 'legend'
          },
          children: 'Controlled'
        },
        {
          type: 'Rating',
          props: {
            name: 'simple-controlled',
            value: 2,
            onChange: 'setRatingValue(newValue)'
          }
        }
      ]
    },
    children: []
  },
  {
    id: 28,
    tag: 'select',
    name: 'Select',
    style: {},
    placeHolderShort: 'select',
    placeHolderLong: 'Material UI Select Component',
    icon: 'ExpandMore',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import Box from '@mui/material/Box'",
      "import InputLabel from '@mui/material/InputLabel'",
      "import MenuItem from '@mui/material/MenuItem'",
      "import FormControl from '@mui/material/FormControl'",
      "import Select from '@mui/material/Select'"
    ],
    stateAndEventHandlers: [],
    defaultProps: [],
    propOptions: [
      'autoWidth',
      'children',
      'classes',
      'defaultOpen',
      'defaultValue',
      'displayEmpty',
      'IconComponent',
      'id',
      'input',
      'inputProps',
      'label',
      'labelId',
      'MenuProps',
      'multiple',
      'native',
      'onChange',
      'onClose',
      'onOpen',
      'open',
      'renderValue',
      'SelectDisplayProps',
      'sx',
      'value',
      'variant'
    ],
    jsx: [
      '<Box sx={{ minWidth: 120 }}>',
      '  <FormControl fullWidth>',
      '    <InputLabel id="demo-simple-select-label">Age</InputLabel>',
      '    <Select labelId="demo-simple-select-label" id="demo-simple-selec" value={age} label="Age" onChange={handleChange}>',
      '      <MenuItem value={10}>Ten</MenuItem>',
      '      <MenuItem value={20}>Twenty</MenuItem>',
      '      <MenuItem value={30}>Thirty</MenuItem>',
      '    </Select>',
      '  </FormControl>',
      '</Box>'
    ],
    componentData: {
      type: 'Box',
      props: {
        sx: { width: 250, m: 1, mt: 2, mb: 2 }
      },
      children: [
        {
          type: 'FormControl',
          props: {
            sx: { width: 250 }
          },
          children: [
            {
              type: 'InputLabel',
              props: {
                id: 'demo-simple-select-label'
              },
              children: 'Age'
            },
            {
              type: 'Select',
              props: {
                labelId: 'demo-simple-select-label',
                id: 'demo-simple-select',
                value: '{age}',
                label: 'Age',
                onChange: '{handleChange}'
              },
              children: [
                {
                  type: 'MenuItem',
                  props: {
                    value: 10
                  },
                  children: 'Ten'
                },
                {
                  type: 'MenuItem',
                  props: {
                    value: 20
                  },
                  children: 'Twenty'
                },
                {
                  type: 'MenuItem',
                  props: {
                    value: 30
                  },
                  children: 'Thirty'
                }
              ]
            }
          ]
        }
      ]
    },
    children: []
  },
  {
    id: 29,
    tag: 'slider',
    name: 'Slider',
    style: {},
    placeHolderShort: 'slider',
    placeHolderLong: 'Material UI Slider Component',
    icon: 'Tune',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import Box from '@mui/material/Box'",
      "import Slider from '@mui/material/Slider'",
      '\nconst initialSliderValue = 30;'
    ],
    stateAndEventHandlers: [
      'const [sliderValue, setSliderValue] = React.useState(30);',
      '\nconst handleChange = (event, newValue) => {',
      '  setSliderValue(newValue);',
      '};\n'
    ],
    defaultProps: [
      "defaultValue={initialSliderValue} sx={{ width: 200 }} aria-label='slider'"
    ],
    propOptions: [
      'aria-label',
      'aria-labelledby',
      'aria-valuetext',
      'classes',
      'color',
      'components',
      'componentsProps',
      'defaultValue',
      'disabled',
      'disableSwap',
      'getAriaLabel',
      'getAriaValueText',
      'marks',
      'max',
      'min',
      'name',
      'onChange',
      'onChangeCommitted',
      'orientation',
      'scale',
      'shiftStep',
      'size',
      'slotProps',
      'slots',
      'step',
      'sx',
      'tabIndex',
      'track',
      'value',
      'valueLabelDisplay',
      'valueLabelFormat'
    ],
    jsx: ['<Box sx={{ width: 200 }}>', '  <Slider />', '</Box>'],
    componentData: {
      type: 'Box',
      props: {
        sx: { width: 200, m: 1 }
      },
      children: [
        {
          type: 'Slider',
          props: {
            defaultValue: 33
          }
        }
      ]
    },
    children: []
  },
  {
    id: 30,
    tag: 'switch',
    name: 'Switch',
    style: {},
    placeHolderShort: 'switch',
    placeHolderLong: 'Material UI Switch Component',
    icon: 'ToggleOn',
    framework: 'reactClassic',
    nestable: false,
    imports: ["import Switch from '@mui/material/Switch'"],
    stateAndEventHandlers: [],
    defaultProps: [
      "inputProps={{ 'aria-label': 'Switch demo' }} defaultChecked"
    ],
    propOptions: [
      'checked',
      'checkedIcon',
      'color',
      'defaultChecked',
      'disabled',
      'disableRipple',
      'edge',
      'icon',
      'id',
      'inputProps',
      'onChange',
      'required',
      'size',
      'sx',
      'value'
    ],
    jsx: [`<div >`, `  <Switch />`, `</div>`],
    componentData: {
      type: 'div',
      props: {},
      children: [
        {
          type: 'Switch',
          props: {
            inputProps: { 'aria-label': 'Switch demo' },
            defaultChecked: true
          }
        }
      ]
    },
    children: []
  },
  {
    id: 31,
    tag: 'textfield',
    name: 'TextField',
    style: {},
    placeHolderShort: 'textfield',
    placeHolderLong: 'Material UI TextField Component',
    icon: 'Input',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import Box from '@mui/material/Box'",
      "import TextField from '@mui/material/TextField'"
    ],
    stateAndEventHandlers: [],
    defaultProps: ['variant="outlined"'],
    propOptions: [
      'autoComplete',
      'autoFocus',
      'classes',
      'color',
      'defaultValue',
      'disabled',
      'error',
      'FormHelperTextProps',
      'fullWidth',
      'helperText',
      'id',
      'InputLabelProps',
      'inputProps',
      'InputProps',
      'inputRef',
      'label',
      'margin',
      'maxRows',
      'minRows',
      'multiline',
      'name',
      'onChange',
      'placeholder',
      'required',
      'rows',
      'select',
      'SelectProps',
      'size',
      'sx',
      'type',
      'value',
      'variant'
    ],
    jsx: [
      `<Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' }}} noValidate autoComplete="off">`,
      `  <TextField id="outlined-basic" label="Outlined" />`,
      `</Box>`
    ],
    componentData: {
      type: 'TextField',
      props: {
        variant: 'outlined',
        label: 'Enter Text',
        helperText: 'Please enter your text here',
        fullWidth: false,
        sx: { m: 1 }
      },
      children: []
    },
    children: []
  },
  {
    id: 33,
    tag: 'toggle-button',
    name: 'ToggleButtonGroup',
    style: {},
    placeHolderShort: 'toggle button',
    placeHolderLong: 'Material UI Toggle Button Component',
    icon: 'TableView',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import ToggleButton from '@mui/material/ToggleButton'",
      "import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'"
    ],
    stateAndEventHandlers: [
      'const [alignment, setAlignment] = React.useState("web");\n'
    ],
    defaultProps: [
      'value={alignment} exclusive onChange={(event, newAlignment) => setAlignment(newAlignment)} aria-label="Platform"'
    ],
    propOptions: [
      'children',
      'classes',
      'color',
      'disabled',
      'exclusive',
      'fullWidth',
      'onChange',
      'orientation',
      'size',
      'sx',
      'value'
    ],
    jsx: [
      `<ToggleButtonGroup >`,
      `  <ToggleButton value="web">Web</ToggleButton>`,
      `  <ToggleButton value="android">Android</ToggleButton>`,
      `  <ToggleButton value="ios">iOS</ToggleButton>`,
      `</ToggleButtonGroup>`
    ],
    componentData: {
      type: 'ToggleButtonGroup',
      props: {
        sx: { m: 1, backgroundColor: '#1976D2' },
        color: 'primary',
        value: '{alignment}',
        exclusive: true,
        onChange: 'handleChange',
        'aria-label': 'Platform'
      },
      children: [
        {
          type: 'ToggleButton',
          props: { value: 'web', sx: { color: 'white' } },
          children: 'Web'
        },
        {
          type: 'ToggleButton',
          props: { value: 'android', sx: { color: 'white' } },
          children: 'Android'
        },
        {
          type: 'ToggleButton',
          props: { value: 'ios', sx: { color: 'white' } },
          children: 'iOS'
        }
      ]
    },
    children: []
  },
  {
    id: 32,
    tag: 'transfer-list',
    name: 'TransferList',
    style: {},
    placeHolderShort: 'transfer-list',
    placeHolderLong: 'Material UI Transfer List Component',
    icon: 'SwapHoriz',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import Grid from '@mui/material/Grid'",
      "import List from '@mui/material/List'",
      "import ListItemButton from '@mui/material/ListItemButton'",
      "import ListItemIcon from '@mui/material/ListItemIcon'",
      "import ListItemText from '@mui/material/ListItemText'",
      "import Checkbox from '@mui/material/Checkbox'",
      "import Button from '@mui/material/Button'",
      "import Paper from '@mui/material/Paper'",
      '\nfunction not(a, b) {',
      '  return a.filter((value) => b.indexOf(value) === -1);\n};',
      '\nfunction intersection(a, b) {',
      '   return a.filter((value) => b.indexOf(value) !== -1);\n};'
    ],
    stateAndEventHandlers: [
      'const [checked, setChecked] = React.useState([]);',
      'const [left, setLeft] = React.useState([0, 1, 2, 3]);',
      'const [right, setRight] = React.useState([4, 5, 6, 7]);',
      '\nconst leftChecked = intersection(checked, left);',
      'const rightChecked = intersection(checked, right);',
      '\nconst handleToggle = (value) => () => {',
      '  const currentIndex = checked.indexOf(value);',
      '  const newChecked = [...checked];',
      '  if (currentIndex === -1) {',
      '    newChecked.push(value);',
      '  } else {',
      '    newChecked.splice(currentIndex, 1);',
      '  }',
      '  setChecked(newChecked);',
      '};',
      '\nconst handleAllRight = () => {',
      '  setRight(right.concat(left));',
      '  setLeft([]);\n};',
      '\nconst handleCheckedRight = () => {',
      '  setRight(right.concat(left.filter(item => checked.includes(item))));',
      '  setLeft(left.filter(item => !checked.includes(item)));',
      '  setChecked(checked.filter(item => !left.includes(item)));\n};',
      '\nconst handleCheckedLeft = () => {',
      '  setLeft(left.concat(right.filter(item => checked.includes(item))));',
      '  setRight(right.filter(item => !checked.includes(item)));',
      '  setChecked(checked.filter(item => !right.includes(item)));\n};',
      '\nconst handleAllLeft = () => {',
      '  setLeft(left.concat(right));',
      '  setRight([]);\n};',
      '\nconst customList = (items) => (',
      '  <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>',
      '  <List dense component="div" role="list">',
      '   {items.map((value) => {',
      '     const labelId = `transfer-list-item-${value}-label`;',
      '     return (',
      '      <ListItemButton key={value} role="listitem" onClick={handleToggle(value)}>',
      '       <ListItemIcon>',
      '       <Checkbox checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple inputProps={{ "aria-labelledby": labelId }} />',
      '       </ListItemIcon>',
      '       <ListItemText id={labelId} primary={`List item ${value + 1}`} />',
      '       </ListItemButton>',
      '    );',
      '   })}',
      '  </List>',
      '  </Paper>\n);'
    ],
    defaultProps: ['sx={{ width: 200, height: 230, overflow: "auto" }}'],
    propOptions: [
      'children',
      'classes',
      'component',
      'dense',
      'disablePadding',
      'subheader',
      'sx'
    ],
    jsx: [
      '<Grid container spacing={2} justifyContent="center" alignItems="center">',
      '  <Grid item>{customList(left)}</Grid>',
      '  <Grid item>',
      '    <Grid container direction="column" alignItems="center">',
      '      <Button sx={{ my: 0.5 }} variant="outlined" size="small" onClick={handleAllRight} disabled={left.length === 0} aria-label="move all right">≫</Button>', // Moves all items from left to right
      '      <Button sx={{ my: 0.5 }} variant="outlined" size="small" onClick={handleCheckedRight} disabled={left.filter(item => checked.includes(item)).length === 0} aria-label="move selected right">&gt;</Button>', // Moves selected items from left to right
      '      <Button sx={{ my: 0.5 }} variant="outlined" size="small" onClick={handleCheckedLeft} disabled={right.filter(item => checked.includes(item)).length === 0} aria-label="move selected left">&lt;</Button>', // Moves selected items from right to left
      '      <Button sx={{ my: 0.5 }} variant="outlined" size="small" onClick={handleAllLeft} disabled={right.length === 0} aria-label="move all left">≪</Button>', // Moves all items from right to left
      '    </Grid>',
      '  </Grid>',
      '  <Grid item>{customList(right)}</Grid>',
      '</Grid>'
    ],
    componentData: {
      type: 'Grid',
      props: {
        container: true,
        spacing: 2,
        justifyContent: 'center',
        alignItems: 'center'
      },
      children: [
        {
          type: 'Grid',
          props: { item: true },
          children: 'customList(left)' // Placeholder for dynamic list function
        },
        {
          type: 'Grid',
          props: { item: true },
          children: [
            {
              type: 'Grid',
              props: {
                container: true,
                direction: 'column',
                alignItems: 'center'
              },
              children: [
                // Detailed button components here with onClick handlers etc.
              ]
            }
          ]
        },
        {
          type: 'Grid',
          props: { item: true },
          children: 'customList(right)' // Placeholder for dynamic list function
        }
      ]
    },
    children: []
  },
  {
    id: 34,
    tag: 'avatar',
    name: 'Avatar',
    style: {},
    placeHolderShort: 'avatar',
    placeHolderLong: 'Material UI Avatar Component',
    icon: 'Person',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import Avatar from '@mui/material/Avatar'",
      "import Stack from '@mui/material/Stack'"
    ],
    stateAndEventHandlers: [],
    defaultProps: [
      'src={imageUrl} alt="User Profile" sx={{ width: 56, height: 56 }}'
    ],
    propOptions: [
      'alt',
      'children',
      'classes',
      'component',
      'imgProps',
      'sizes',
      'slotProps',
      'slots',
      'src',
      'srcSet',
      'sx',
      'variant'
    ],
    jsx: ['<Avatar />'],
    componentData: {
      type: 'Avatar',
      props: {
        alt: 'User Profile',
        src: 'https://images.paramount.tech/uri/mgid:arc:imageassetref:bet.com:211ff3c2-4857-11e7-a442-0e40cf2fc285?format=webp&width=1200',
        sx: {
          m: 1,
          width: 56,
          height: 56,
          border: '2px solid #000', // 1px border
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Box shadow
          borderRadius: '50%' // Rounded corners for circular Avatar
        }
      },
      children: []
    },
    children: []
  },
  {
    id: 35,
    tag: 'badge',
    name: 'Badge',
    style: {},
    placeHolderShort: 'badge',
    placeHolderLong: 'Material UI Badge Component',
    icon: 'Notifications',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import Badge from '@mui/material/Badge';",
      "import MailIcon from '@mui/icons-material/Mail';"
    ],
    stateAndEventHandlers: [],
    defaultProps: ['badgeContent={4} color="primary"'],
    propOptions: [
      'anchorOrigin',
      'badgeContent',
      'children',
      'classes',
      'color',
      'component',
      'components',
      'componentsProps',
      'invisible',
      'max',
      'overlap',
      'showZero',
      'slotProps',
      'slots',
      'sx',
      'variant'
    ],
    jsx: ['<Badge >', '  <MailIcon color="action" />', '</Badge >'],
    componentData: {
      type: 'Badge',
      props: {
        badgeContent: 4,
        color: 'primary',
        sx: { m: 1 }
      },
      children: [
        {
          type: 'SpeedDialIcon',
          props: {
            color: 'action'
          },
          children: []
        }
      ]
    },
    children: []
  },
  {
    id: 36,
    tag: 'chip',
    name: 'Chip',
    style: {},
    placeHolderShort: 'chip',
    placeHolderLong: 'Material UI Chip Component',
    icon: 'Dashboard',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import Chip from '@mui/material/Chip';",
      "import Stack from '@mui/material/Stack';"
    ],
    stateAndEventHandlers: [],
    defaultProps: ['label="Chip Filled" color="primary"'],
    propOptions: [
      'avatar',
      'children',
      'classes',
      'clickable',
      'color',
      'component',
      'deleteIcon',
      'disabled',
      'icon',
      'label',
      'onDelete',
      'size',
      'skipFocusWhenDisabled',
      'sx',
      'variant'
    ],
    jsx: ['<Stack direction="row" spacing = {1} >', '  <Chip />', '</Stack>'],
    componentData: {
      type: 'Chip',
      props: {
        label: 'Chip Filled',
        color: 'primary',
        sx: { m: 1 }
      },
      children: [],
      variant: 'filled'
    },
    children: []
  },
  {
    id: 37,
    tag: 'divider',
    name: 'Divider',
    style: {},
    placeHolderShort: 'divider',
    placeHolderLong: 'Material UI Divider Component',
    icon: 'Description',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import Card from '@mui/material/Card';",
      "import Box from '@mui/material/Box';",
      "import Chip from '@mui/material/Chip';",
      "import Stack from '@mui/material/Stack';",
      "import Divider from '@mui/material/Divider';",
      "import Typography from '@mui/material/Typography';"
    ],
    stateAndEventHandlers: [],
    defaultProps: [],
    propOptions: [
      'absolute',
      'children',
      'classes',
      'component',
      'flexItem',
      'light',
      'orientation',
      'sx',
      'textAlign',
      'variant'
    ],
    jsx: [
      '<Card variant="outlined" sx={{ maxWidth: 360 }}>',
      '  <Box sx={{ p: 2 }}>',
      '    <Stack direction="row" justifyContent="space-between" alignItems="center">',
      '      <Typography gutterBottom variant="h5" component="div">',
      '        Toothbrush',
      '      </Typography>',
      '      <Typography gutterBottom variant="h6" component="div">',
      '        $4.50',
      '      </Typography>',
      '    </Stack>',
      '    <Typography color="text.secondary" variant="body2">',
      '      Pinstriped cornflower blue cotton blouse takes you on a walk to the park or',
      '      just down the hall.',
      '    </Typography>',
      '  </Box>',
      '  <Divider />',
      '  <Box sx={{ p: 2 }}>',
      '    <Typography gutterBottom variant="body2">',
      '      Select type',
      '    </Typography>',
      '    <Stack direction="row" spacing={1}>',
      '      <Chip color="primary" label="Soft" size="small" />',
      '      <Chip label="Medium" size="small" />',
      '      <Chip label="Hard" size="small" />',
      '    </Stack>',
      '  </Box>',
      '</Card>'
    ],
    componentData: {
      type: 'Card',
      props: {
        variant: 'outlined',
        sx: { maxWidth: 360, m: 1 }
      },
      children: [
        {
          type: 'Box',
          props: {
            sx: { p: 2 }
          },
          children: [
            {
              type: 'Stack',
              props: {
                direction: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              },
              children: [
                {
                  type: 'Typography',
                  props: {
                    gutterBottom: true,
                    variant: 'h5',
                    component: 'div'
                  },
                  children: 'Toothbrush'
                },
                {
                  type: 'Typography',
                  props: {
                    gutterBottom: true,
                    variant: 'h6',
                    component: 'div'
                  },
                  children: '$4.50'
                }
              ]
            },
            {
              type: 'Typography',
              props: {
                color: 'text.secondary',
                variant: 'body2'
              },
              children:
                'Pinstriped cornflower blue cotton blouse takes you on a walk to the park or just down the hall.'
            }
          ]
        },
        {
          type: 'Divider'
        },
        {
          type: 'Box',
          props: {
            sx: { p: 2 }
          },
          children: [
            {
              type: 'Typography',
              props: {
                gutterBottom: true,
                variant: 'body2'
              },
              children: 'Select type'
            },
            {
              type: 'Stack',
              props: {
                direction: 'row',
                spacing: 1
              },
              children: [
                {
                  type: 'Chip',
                  props: {
                    color: 'primary',
                    label: 'Soft',
                    size: 'small'
                  }
                },
                {
                  type: 'Chip',
                  props: {
                    label: 'Medium',
                    size: 'small'
                  }
                },
                {
                  type: 'Chip',
                  props: {
                    label: 'Hard',
                    size: 'small'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    children: []
  },
  {
    id: 40,
    tag: 'list',
    name: 'List',
    style: {},
    placeHolderShort: 'list',
    placeHolderLong: 'Material UI List Component',
    icon: 'FormatListBulleted',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import Box from '@mui/material/Box';",
      "import List from '@mui/material/List';",
      "import ListItem from '@mui/material/ListItem';",
      "import ListItemButton from '@mui/material/ListItemButton';",
      "import ListItemIcon from '@mui/material/ListItemIcon';",
      "import ListItemText from '@mui/material/ListItemText';",
      "import Divider from '@mui/material/Divider';",
      "import InboxIcon from '@mui/icons-material/Inbox';",
      "import DraftsIcon from '@mui/icons-material/Drafts';"
    ],
    stateAndEventHandlers: [],
    defaultProps: [],
    propOptions: [
      'children',
      'classes',
      'component',
      'dense',
      'disablePadding',
      'subheader',
      'sx'
    ],
    jsx: [
      "<Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',  border: '1px #e0e0e0 solid' }}>",
      '  <nav aria-label="main mailbox folders">',
      '    <List>',
      '      <ListItem disablePadding>',
      '        <ListItemButton>',
      '          <ListItemIcon>',
      '            <InboxIcon />',
      '          </ListItemIcon>',
      '          <ListItemText primary="Inbox" />',
      '        </ListItemButton>',
      '      </ListItem>',
      '      <ListItem disablePadding>',
      '        <ListItemButton>',
      '          <ListItemIcon>',
      '            <DraftsIcon />',
      '          </ListItemIcon>',
      '          <ListItemText primary="Drafts" />',
      '        </ListItemButton>',
      '      </ListItem>',
      '    </List>',
      '  </nav>',
      '  <Divider />',
      '  <nav aria-label="secondary mailbox folders">',
      '    <List>',
      '      <ListItem disablePadding>',
      '        <ListItemButton>',
      '          <ListItemText primary="Trash" />',
      '        </ListItemButton>',
      '      </ListItem>',
      '      <ListItem disablePadding>',
      '        <ListItemButton component="a" href="#simple-list">',
      '          <ListItemText primary="Spam" />',
      '        </ListItemButton>',
      '      </ListItem>',
      '    </List>',
      '  </nav>',
      '</Box>'
    ],
    componentData: {
      type: 'Box',
      props: {
        sx: {
          width: '100%',
          maxWidth: 360,
          m: 1,
          bgcolor: 'background.paper',
          border: '1px #e0e0e0 solid'
        }
      },
      children: [
        {
          type: 'nav',
          props: { 'aria-label': 'main mailbox folders' },
          children: {
            type: 'List',
            children: [
              {
                type: 'ListItem',
                props: { disablePadding: true },
                children: {
                  type: 'ListItemButton',
                  children: [
                    { type: 'SpeedDialIcon', children: { type: 'InboxIcon' } },
                    { type: 'ListItemText', props: { primary: 'Inbox' } }
                  ]
                }
              },
              {
                type: 'ListItem',
                props: { disablePadding: true },
                children: {
                  type: 'ListItemButton',
                  children: [
                    { type: 'SpeedDialIcon', children: { type: 'DraftsIcon' } },
                    { type: 'ListItemText', props: { primary: 'Drafts' } }
                  ]
                }
              }
            ]
          }
        },
        { type: 'Divider' },
        {
          type: 'nav',
          props: { 'aria-label': 'secondary mailbox folders' },
          children: {
            type: 'List',
            children: [
              {
                type: 'ListItem',
                props: { disablePadding: true },
                children: {
                  type: 'ListItemButton',
                  children: [
                    { type: 'ListItemText', props: { primary: 'Trash' } }
                  ]
                }
              },
              {
                type: 'ListItem',
                props: { disablePadding: true },
                children: {
                  type: 'ListItemButton',
                  props: { component: 'a', href: '#simple-list' },
                  children: [
                    { type: 'ListItemText', props: { primary: 'Spam' } }
                  ]
                }
              }
            ]
          }
        }
      ]
    },
    children: []
  },
  {
    id: 41,
    tag: 'table',
    name: 'Table',
    style: {},
    placeHolderShort: 'table',
    placeHolderLong: 'Material UI Table Component',
    icon: 'TableChart',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import Table from '@mui/material/Table';",
      "import TableBody from '@mui/material/TableBody';",
      "import TableCell from '@mui/material/TableCell';",
      "import TableContainer from '@mui/material/TableContainer';",
      "import TableHead from '@mui/material/TableHead';",
      "import TableRow from '@mui/material/TableRow';",
      "import Paper from '@mui/material/Paper';"
    ],
    stateAndEventHandlers: [],
    defaultProps: [],
    propOptions: [
      'children',
      'classes',
      'component',
      'padding',
      'size',
      'stickyHeader',
      'sx'
    ],
    jsx: [
      '<TableContainer component={Paper}>',
      '  <Table sx={{ minWidth: 650 }} aria-label="simple table">',
      '    <TableHead>',
      '      <TableRow>',
      '        <TableCell>Dessert (100g serving)</TableCell>',
      '        <TableCell align="right">Calories</TableCell>',
      '        <TableCell align="right">Fat&nbsp;(g)</TableCell>',
      '        <TableCell align="right">Carbs&nbsp;(g)</TableCell>',
      '        <TableCell align="right">Protein&nbsp;(g)</TableCell>',
      '      </TableRow>',
      '    </TableHead>',
      '    <TableBody>',
      '      {rows.map((row) => (',
      '        <TableRow',
      '          key={row.name}',
      "          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>",
      '          <TableCell component="th" scope="row">',
      '            {row.name}',
      '          </TableCell>',
      '          <TableCell align="right">{row.calories}</TableCell>',
      '          <TableCell align="right">{row.fat}</TableCell>',
      '          <TableCell align="right">{row.carbs}</TableCell>',
      '          <TableCell align="right">{row.protein}</TableCell>',
      '        </TableRow>',
      '      ))}',
      '    </TableBody>',
      '  </Table>',
      '</TableContainer>'
    ],
    componentData: {
      componentData: {
        type: 'TableContainer',
        props: {
          component: 'Paper'
        },
        children: [
          {
            type: 'Table',
            props: {
              sx: {
                minWidth: 650
              },
              'aria-label': 'simple table'
            },
            children: [
              {
                type: 'TableHead',
                children: [
                  {
                    type: 'TableRow',
                    children: [
                      {
                        type: 'TableCell',
                        children: 'Dessert (100g serving)'
                      },
                      {
                        type: 'TableCell',
                        props: {
                          align: 'right'
                        },
                        children: 'Calories'
                      },
                      {
                        type: 'TableCell',
                        props: {
                          align: 'right'
                        },
                        children: 'Fat (g)'
                      },
                      {
                        type: 'TableCell',
                        props: {
                          align: 'right'
                        },
                        children: 'Carbs (g)'
                      },
                      {
                        type: 'TableCell',
                        props: {
                          align: 'right'
                        },
                        children: 'Protein (g)'
                      }
                    ]
                  }
                ]
              },
              {
                type: 'TableBody',
                children: [
                  {
                    type: 'TableCell',
                    props: {
                      component: 'th',
                      scope: 'row'
                    },
                    children: '{row.name}'
                  },
                  {
                    type: 'TableCell',
                    props: {
                      align: 'right'
                    },
                    children: '{row.calories}'
                  },
                  {
                    type: 'TableCell',
                    props: {
                      align: 'right'
                    },
                    children: '{row.fat}'
                  },
                  {
                    type: 'TableCell',
                    props: {
                      align: 'right'
                    },
                    children: '{row.carbs}'
                  },
                  {
                    type: 'TableCell',
                    props: {
                      align: 'right'
                    },
                    children: '{row.protein}'
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    children: []
  },
  {
    id: 42,
    tag: 'tooltip',
    name: 'Tooltip',
    style: {},
    placeHolderShort: 'tooltip',
    placeHolderLong: 'Material UI Tooltip Component',
    icon: 'Info',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import Button from '@mui/material/Button'",
      "import Tooltip from '@mui/material/Tooltip'"
    ],
    stateAndEventHandlers: [],
    defaultProps: ['title="Add" arrow'],
    propOptions: [
      'arrow',
      'children',
      'classes',
      'components',
      'componentsProps',
      'describeChild',
      'disableFocusListener',
      'disableHoverListener',
      'disableInteractive',
      'disableTouchListener',
      'enterDelay',
      'enterNextDelay',
      'enterTouchDelay',
      'followCursor',
      'id',
      'leaveDelay',
      'leaveTouchDelay',
      'onClose',
      'onOpen',
      'open',
      'placement',
      'PopperComponent',
      'PopperProps',
      'slotProps',
      'slots',
      'sx',
      'title',
      'TransitionComponent',
      'TransitionProps'
    ],
    jsx: ['<Tooltip >', '  <Button>Arrow</Button>', '</Tooltip>'],
    componentData: {
      type: 'Tooltip',
      props: {
        title: 'Add',
        arrow: true,
        sx: { m: 1 }
      },
      children: [
        {
          type: 'Button',
          props: {
            color: 'primary', // This sets the button color to the primary theme color
            sx: {
              bgcolor: 'primary.main', // This sets the background color to the primary color
              color: 'white', // This sets the text color to white
              m: 1
            }
          },
          children: 'Arrow'
        }
      ]
    },
    children: []
  },
  {
    id: 43,
    tag: 'typography',
    name: 'Typography',
    style: {},
    placeHolderShort: 'typography',
    placeHolderLong: 'Material UI Typography Component',
    icon: 'TextFields',
    framework: 'reactClassic',
    nestable: true,
    imports: [
      "import Box from '@mui/material/Box'",
      "import Typography from '@mui/material/Typography'"
    ],
    stateAndEventHandlers: [],
    defaultProps: ['variant="h3"'],
    propOptions: [
      'align',
      'children',
      'classes',
      'component',
      'gutterBottom',
      'noWrap',
      'paragraph',
      'sx',
      'variant',
      'variantMapping'
    ],
    jsx: [`<Typography gutterBottom> h3. Heading </Typography>`],
    componentData: {
      type: 'Typography',
      props: {
        variant: 'h3',
        gutterBottom: true,
        sx: { m: 1 }
      },
      children: 'h3. Heading'
    },
    children: []
  },
  {
    id: 44,
    tag: 'alert',
    name: 'Alert',
    style: {},
    placeHolderShort: 'alert',
    placeHolderLong: 'Material UI Alert Component',
    icon: 'Info',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import Alert from '@mui/material/Alert'",
      "import CheckIcon from '@mui/icons-material/Check'"
    ],
    stateAndEventHandlers: [],
    defaultProps: ['severity="success"'],
    propOptions: [
      'action',
      'children',
      'classes',
      'closeText',
      'color',
      'components',
      'componentsProps',
      'icon',
      'iconMapping',
      'onClose',
      'role',
      'severity',
      'slotProps',
      'slots',
      'sx',
      'variant'
    ],
    jsx: [
      '<Alert icon={<CheckIcon fontSize="inherit" />} severity="success">',
      '  Here is a gentle confirmation that your action was successful.',
      '</Alert>'
    ],
    componentData: {
      type: 'Alert',
      props: {
        icon: '<CheckIcon fontSize="inherit" />',
        severity: 'success'
      },
      children: 'Here is a gentle confirmation that your action was successful.'
    },
    children: []
  },
  {
    id: 45,
    tag: 'backdrop',
    name: 'Backdrop',
    style: {},
    placeHolderShort: 'backdrop',
    placeHolderLong: 'Material UI Backdrop Component',
    icon: 'Info',
    framework: 'reactClassic',
    nestable: true,
    imports: [
      "import Backdrop from '@mui/material/Backdrop'",
      "import CircularProgress from '@mui/material/CircularProgress'",
      "import Button from '@mui/material/Button'"
    ],
    stateAndEventHandlers: [],
    defaultProps: ['open={open}'],
    propOptions: [
      'children',
      'classes',
      'component',
      'components',
      'componentsProps',
      'invisible',
      'slotProps',
      'slots',
      'sx',
      'TransitionComponent',
      'transitionDuration'
    ],
    jsx: [
      '<Backdrop',
      '  sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}',
      '  open={open}',
      '  onClick={handleClose}',
      '>',
      '  <CircularProgress color="inherit" />',
      '</Backdrop>'
    ],
    componentData: {
      type: 'Backdrop',
      props: {
        sx: { color: '#fff', zIndex: '(theme) => theme.zIndex.drawer + 1' },
        open: '{open}',
        onClick: '{handleClose}'
      },
      children: '<CircularProgress color="inherit" />'
    },
    children: []
  },
  {
    id: 46,
    tag: 'dialog',
    name: 'Dialog',
    style: {},
    placeHolderShort: 'dialog',
    placeHolderLong: 'Material UI Dialog Component',
    icon: 'Info',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import Dialog from '@mui/material/Dialog'",
      "import Button from '@mui/material/Button'",
      "import Avatar from '@mui/material/Avatar'",
      "import List from '@mui/material/List'",
      "import ListItem from '@mui/material/ListItem'",
      "import ListItemAvatar from '@mui/material/ListItemAvatar'",
      "import ListItemButton from '@mui/material/ListItemButton'",
      "import ListItemText from '@mui/material/ListItemText'",
      "import DialogTitle from '@mui/material/DialogTitle'",
      "import PersonIcon from '@mui/icons-material/Person'",
      "import AddIcon from '@mui/icons-material/Add'",
      "import Typography from '@mui/material/Typography'",
      "{ blue } from '@mui/material/colors'"
    ],
    stateAndEventHandlers: [],
    defaultProps: ['open={open}'],
    propOptions: [
      'aria-describedby',
      'aria-labelledby',
      'BackdropComponent',
      'children',
      'classes',
      'disableEscapeKeyDown',
      'fullScreen',
      'fullWidth',
      'maxWidth',
      'onBackdropClick',
      'onClose',
      'PaperComponent',
      'PaperProps',
      'scroll',
      'sx',
      'TransitionComponent',
      'transitionDuration',
      'TransitionProps'
    ],
    jsx: [
      '<Dialog onClose={handleClose} open={open}>',
      '  <DialogTitle>Set backup account</DialogTitle>',
      '  <List sx={{ pt: 0 }}>',
      '    {emails.map((email) => (',
      '      <ListItem disableGutters key={email}>',
      '        <ListItemButton onClick={() => handleListItemClick(email)}>',
      '          <ListItemAvatar>',
      '            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>',
      '              <PersonIcon />',
      '            </Avatar>',
      '          </ListItemAvatar>',
      '          <ListItemText primary={email} />',
      '        </ListItemButton>',
      '      </ListItem>',
      '    ))}',
      '    <ListItem disableGutters>',
      '      <ListItemButton autoFocus onClick={() => handleListItemClick("addAccount")}>',
      '        <ListItemAvatar>',
      '          <Avatar>',
      '            <AddIcon />',
      '          </Avatar>',
      '        </ListItemAvatar>',
      '        <ListItemText primary="Add account" />',
      '      </ListItemButton>',
      '    </ListItem>',
      '  </List>',
      '</Dialog>'
    ],
    componentData: {
      type: 'Dialog',
      props: {
        onClose: '{handleClose}',
        open: '{open}'
      },
      children: [
        {
          type: 'DialogTitle',
          children: 'Set backup account'
        },
        {
          type: 'List',
          props: { sx: { pt: 0 } },
          children: [
            '{emails.map((email) => (',
            '  <ListItem disableGutters key={email}>',
            '    <ListItemButton onClick={() => handleListItemClick(email)}>',
            '      <ListItemAvatar>',
            '        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>',
            '          <PersonIcon />',
            '        </Avatar>',
            '      </ListItemAvatar>',
            '      <ListItemText primary={email} />',
            '    </ListItemButton>',
            '  </ListItem>',
            '))}',
            '  <ListItem disableGutters>',
            '    <ListItemButton autoFocus onClick={() => handleListItemClick("addAccount")}>',
            '      <ListItemAvatar>',
            '        <Avatar>',
            '          <AddIcon />',
            '        </Avatar>',
            '      </ListItemAvatar>',
            '      <ListItemText primary="Add account" />',
            '    </ListItemButton>',
            '  </ListItem>'
          ]
        }
      ]
    },
    children: []
  },
  {
    id: 47,
    tag: 'progress',
    name: 'Progress',
    style: {},
    placeHolderShort: 'progress',
    placeHolderLong: 'Material UI Circular Progress With Label Component',
    icon: 'Info',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress'",
      "import Typography from '@mui/material/Typography'",
      "import Box from '@mui/material/Box'"
    ],
    stateAndEventHandlers: [],
    defaultProps: ['value={progress}'],
    propOptions: ['value'],
    jsx: [
      '<Box sx={{ position: "relative", display: "inline-flex" }}>',
      '  <CircularProgress variant="determinate" value={progress} />',
      '  <Box',
      '    sx={{',
      '      top: 0,',
      '      left: 0,',
      '      bottom: 0,',
      '      right: 0,',
      '      position: "absolute",',
      '      display: "flex",',
      '      alignItems: "center",',
      '      justifyContent: "center"',
      '    }}',
      '  >',
      '    <Typography variant="caption" component="div" color="text.secondary">',
      '      {`${Math.round(progress)}%`}',
      '    </Typography>',
      '  </Box>',
      '</Box>'
    ],
    componentData: {
      type: 'Box',
      props: { sx: { position: 'relative', display: 'inline-flex' } },
      children: [
        {
          type: 'CircularProgress',
          props: { variant: 'determinate', value: '{progress}' }
        },
        {
          type: 'Box',
          props: {
            sx: {
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }
          },
          children: [
            {
              type: 'Typography',
              props: {
                variant: 'caption',
                component: 'div',
                color: 'text.secondary',
                children: '{`${Math.round(progress)}%`}'
              }
            }
          ]
        }
      ]
    },
    children: []
  },
  {
    id: 48,
    tag: 'skeleton',
    name: 'Skeleton',
    style: {},
    placeHolderShort: 'skeletont',
    placeHolderLong: 'Material UI Skeleton Component',
    icon: 'Info',
    framework: 'reactClassic',
    nestable: true,
    imports: [
      "import Typography, { TypographyProps } from '@mui/material/Typography'",
      "import Skeleton from '@mui/material/Skeleton'",
      "import Grid from '@mui/material/Grid'"
    ],
    stateAndEventHandlers: [],
    defaultProps: ['loading'],
    propOptions: [
      'animation',
      'children',
      'classes',
      'component',
      'height',
      'sx',
      'variant',
      'width'
    ],
    jsx: [
      '<Grid container spacing={8}>',
      '  <Grid item xs>',
      '    <TypographyDemo loading />',
      '  </Grid>',
      '  <Grid item xs>',
      '    <TypographyDemo />',
      '  </Grid>',
      '</Grid>'
    ],
    componentData: {
      type: 'SkeletonTypography',
      props: {},
      children: [
        {
          type: 'Grid',
          props: { container: true, spacing: 8 },
          children: [
            {
              type: 'Grid',
              props: { item: true, xs: true },
              children: [
                {
                  type: 'TypographyDemo',
                  props: { loading: true }
                }
              ]
            },
            {
              type: 'Grid',
              props: { item: true, xs: true },
              children: [
                {
                  type: 'TypographyDemo'
                }
              ]
            }
          ]
        }
      ]
    },
    children: []
  },
  {
    id: 49,
    tag: 'simplesnackbar',
    name: 'SimpleSnackbar',
    style: {},
    placeHolderShort: 'simplesnackbar',
    placeHolderLong: 'Material UI Simple Snackbar Component',
    icon: 'Info',
    framework: 'reactClassic',
    nestable: true,
    imports: [
      "import Button from '@mui/material/Button'",
      "import Snackbar from '@mui/material/Snackbar'",
      "import IconButton from '@mui/material/IconButton'",
      "import CloseIcon from '@mui/icons-material/Close'"
    ],
    stateAndEventHandlers: [],
    defaultProps: [],
    propOptions: [
      'action',
      'anchorOrigin',
      'autoHideDuration',
      'children',
      'classes',
      'ClickAwayListenerProps',
      'ContentProps',
      'disableWindowBlurListener',
      'key',
      'message',
      'onClose',
      'open',
      'resumeHideDuration',
      'sx',
      'TransitionComponent',
      'transitionDuration',
      'TransitionProps'
    ],
    jsx: [
      '<div>',
      '  <Button onClick={handleClick}>Open Snackbar</Button>',
      '  <Snackbar',
      '    open={open}',
      '    autoHideDuration={6000}',
      '    onClose={handleClose}',
      '    message="Note archived"',
      '    action={action}',
      '  />',
      '</div>'
    ],
    componentData: {
      type: 'SimpleSnackbar',
      props: {},
      children: [
        {
          type: 'Button',
          props: { onClick: '{handleClick}' },
          children: 'Open Snackbar'
        },
        {
          type: 'Snackbar',
          props: {
            open: '{open}',
            autoHideDuration: 6000,
            onClose: '{handleClose}',
            message: 'Note archived',
            action: '{action}'
          }
        }
      ]
    },
    children: []
  },
  {
    id: 50,
    tag: 'accordion',
    name: 'Accordion',
    style: {},
    placeHolderShort: 'accordion',
    placeHolderLong: 'Material UI Accordion Component',
    icon: 'ExpandMore',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import Accordion from '@mui/material/Accordion'",
      "import AccordionActions from '@mui/material/AccordionActions'",
      "import AccordionSummary from '@mui/material/AccordionSummary'",
      "import AccordionDetails from '@mui/material/AccordionDetails'",
      "import ExpandMoreIcon from '@mui/icons-material/ExpandMore'",
      "import Button from '@mui/material/Button'"
    ],
    stateAndEventHandlers: [],
    defaultProps: [],
    propOptions: [
      'children',
      'classes',
      'defaultExpanded',
      'disabled',
      'disableGutters',
      'expanded',
      'onChange',
      'slotProps',
      'slots',
      'square',
      'sx',
      'TransitionComponent',
      'TransitionProps'
    ],
    jsx: [
      '<Accordion>',
      "  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1-content' id='panel1-header'>",
      '    Accordion 1',
      '  </AccordionSummary>',
      '  <AccordionDetails>',
      '    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      '  </AccordionDetails>',
      '  <AccordionActions>',
      '    <Button>Cancel</Button>',
      '    <Button>Agree</Button>',
      '  </AccordionActions>',
      '</Accordion>'
    ],
    componentData: {
      type: 'Accordion',
      props: { sx: { m: 1 } },
      children: [
        {
          type: 'AccordionSummary',
          props: {
            expandIcon: '<ExpandMoreIcon />',
            'aria-controls': 'panel1-content',
            id: 'panel1-header'
          },
          children: 'Accordion 1'
        },
        {
          type: 'AccordionDetails',
          children:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
        },
        {
          type: 'AccordionActions',
          children: [
            {
              type: 'Button',
              children: 'Cancel'
            },
            {
              type: 'Button',
              children: 'Agree'
            }
          ]
        }
      ]
    },
    children: []
  },
  {
    id: 51,
    tag: 'appbar',
    name: 'AppBar',
    style: {},
    placeHolderShort: 'appbar',
    placeHolderLong: 'Material UI AppBar Component',
    icon: 'Menu',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import AppBar from '@mui/material/AppBar'",
      "import Box from '@mui/material/Box'",
      "import Toolbar from '@mui/material/Toolbar'",
      "import Typography from '@mui/material/Typography'",
      "import Button from '@mui/material/Button'",
      "import IconButton from '@mui/material/IconButton'",
      "import MenuIcon from '@mui/icons-material/Menu'"
    ],
    stateAndEventHandlers: [],
    defaultProps: ['position="static"'],
    propOptions: [
      'children',
      'classes',
      'color',
      'enableColorOnDark',
      'position',
      'sx'
    ],
    jsx: [
      '<Box sx={{ flexGrow: 1 }}>',
      '  <AppBar >',
      '    <Toolbar>',
      "      <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>",
      '        <MenuIcon />',
      '      </IconButton>',
      "      <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>",
      '        News',
      '      </Typography>',
      "      <Button color='inherit'>Login</Button>",
      '    </Toolbar>',
      '  </AppBar>',
      '</Box>'
    ],
    componentData: {
      type: 'Box',
      props: {
        sx: { flexGrow: 1, m: 1 }
      },
      children: [
        {
          type: 'AppBar',
          props: {
            position: 'static'
          },
          children: [
            {
              type: 'Toolbar',
              children: [
                {
                  type: 'IconButton',
                  props: {
                    size: 'large',
                    edge: 'start',
                    color: 'inherit',
                    'aria-label': 'menu',
                    sx: { mr: 2 }
                  },
                  children: '<MenuIcon />'
                },
                {
                  type: 'Typography',
                  props: {
                    variant: 'h6',
                    component: 'div',
                    sx: { flexGrow: 1 }
                  },
                  children: 'News'
                },
                {
                  type: 'Button',
                  props: {
                    color: 'inherit'
                  },
                  children: 'Login'
                }
              ]
            }
          ]
        }
      ]
    },
    children: []
  },
  {
    id: 52,
    tag: 'card',
    name: 'Card',
    style: {},
    placeHolderShort: 'card',
    placeHolderLong: 'Material UI Card Component',
    icon: 'CardTravel',
    framework: 'reactClassic',
    nestable: true,
    imports: [
      "import Box from '@mui/material/Box'",
      "import Card from '@mui/material/Card'",
      "import CardActions from '@mui/material/CardActions'",
      "import CardContent from '@mui/material/CardContent'",
      "import Button from '@mui/material/Button'",
      "import Typography from '@mui/material/Typography'"
    ],
    stateAndEventHandlers: [],
    defaultProps: ['sx={{ minWidth: 275 }}'],
    propOptions: ['children', 'classes', 'raised', 'sx'],
    jsx: [
      `<Card >`,
      `  <CardContent>`,
      `    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>`,
      `      Word of the Day`,
      `    </Typography>`,
      `    <Typography variant="h5" component="div">`,
      `      benevolent`,
      `    </Typography>`,
      `    <Typography sx={{ mb: 1.5 }} color="text.secondary">`,
      `      adjective`,
      `    </Typography>`,
      `    <Typography variant="body2">`,
      `      well meaning and kindly.`,
      `      <br />`,
      `      {'"a benevolent smile"'}`,
      `    </Typography>`,
      `  </CardContent>`,
      `  <CardActions>`,
      `    <Button size="small">Learn More</Button>`,
      `  </CardActions>`,
      `</Card>`
    ],
    componentData: {
      type: 'Card',
      props: { sx: { m: 1 } },
      children: [
        {
          type: 'CardContent',
          props: {},
          children: [
            {
              type: 'Typography',
              props: {
                sx: { fontSize: 14 },
                color: 'text.secondary',
                gutterBottom: true
              },
              children: 'Word of the Day'
            },
            {
              type: 'Typography',
              props: { variant: 'h5', component: 'div' },
              children: 'benevolent'
            },
            {
              type: 'Typography',
              props: { sx: { mb: 1.5 }, color: 'text.secondary' },
              children: 'adjective'
            },
            {
              type: 'Typography',
              props: { variant: 'body2' },
              children: ['well meaning and kindly.', '"a benevolent smile"']
            }
          ]
        },
        {
          type: 'CardActions',
          props: {},
          children: [
            {
              type: 'Button',
              props: {
                size: 'small'
              },
              children: 'Learn More'
            }
          ]
        }
      ]
    },
    children: []
  },
  {
    id: 53,
    tag: 'paper',
    name: 'Paper',
    style: {},
    placeHolderShort: 'paper',
    placeHolderLong: 'Material UI Paper Component',
    icon: 'Layers',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import Box from '@mui/material/Box'",
      "import Paper from '@mui/material/Paper'"
    ],
    stateAndEventHandlers: [],
    defaultProps: [],
    propOptions: [
      'children',
      'classes',
      'component',
      'elevation',
      'square',
      'sx',
      'variant'
    ],
    jsx: [
      "<Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1, width: 128, height: 128 } }}>",
      '  <Paper elevation={0} />',
      '  <Paper />',
      '  <Paper elevation={3} />',
      '</Box>'
    ],
    componentData: {
      type: 'Box',
      props: {
        sx: {
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 128,
            height: 128
          }
        }
      },
      children: [
        {
          type: 'Paper',
          props: {
            elevation: 0,
            sx: { backgroundColor: '#121212' }
          }
        },
        {
          type: 'Paper',
          props: {
            sx: { backgroundColor: '#1E1E1E' }
          }
        },
        {
          type: 'Paper',
          props: {
            elevation: 3,
            sx: { backgroundColor: '#252525' }
          }
        }
      ]
    },
    children: []
  },
  {
    id: 54,
    tag: 'bottomNavigation',
    name: 'Bottom Navigation',
    style: {},
    placeHolderShort: 'bottomNavigation',
    placeHolderLong: 'Material UI Bottom Navigation Component',
    icon: 'Navigation',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import Box from '@mui/material/Box'",
      "import BottomNavigation from '@mui/material/BottomNavigation'",
      "import BottomNavigationAction from '@mui/material/BottomNavigationAction'",
      "import RestoreIcon from '@mui/icons-material/Restore'",
      "import FavoriteIcon from '@mui/icons-material/Favorite'",
      "import LocationOnIcon from '@mui/icons-material/LocationOn'"
    ],
    stateAndEventHandlers: ['const [value, setValue] = React.useState(0);\n'],
    defaultProps: [
      'showLabels value={value} onChange={(event, newValue) => {setValue(newValue)}}'
    ],
    propOptions: [
      'children',
      'classes',
      'component',
      'onChange',
      'showLabels',
      'sx',
      'value'
    ],
    jsx: [
      '<Box sx={{ width: 500 }}>',
      '  <BottomNavigation >',
      "    <BottomNavigationAction label='Recents' icon={<RestoreIcon />} />",
      "    <BottomNavigationAction label='Favorites' icon={<FavoriteIcon />} />",
      "    <BottomNavigationAction label='Nearby' icon={<LocationOnIcon />} />",
      '  </BottomNavigation>',
      '</Box>'
    ],
    componentData: {
      type: 'Box',
      props: {
        sx: { width: 500 }
      },
      children: [
        {
          type: 'BottomNavigation',
          props: {
            value: '{value}',
            onChange: '{(event, newValue) => setValue(newValue)}',
            showLabels: true,
            sx: { backgroundColor: '#0671E3' }
          },
          children: [
            {
              type: 'BottomNavigationAction',
              props: {
                label: 'Recents',
                icon: '<RestoreIcon />',
                sx: { backgroundColor: '#0671E3', color: 'white' }
              }
            },
            {
              type: 'BottomNavigationAction',
              props: {
                label: 'Favorites',
                icon: '<FavoriteIcon />',
                sx: { backgroundColor: '#0671E3', color: 'white' }
              }
            },
            {
              type: 'BottomNavigationAction',
              props: {
                label: 'Nearby',
                icon: '<LocationOnIcon />',
                sx: { backgroundColor: '#0671E3', color: 'white' }
              }
            }
          ]
        }
      ]
    },
    children: []
  },
  {
    id: 55,
    tag: 'breadcrumbs',
    name: 'Breadcrumbs',
    style: {},
    placeHolderShort: 'breadcrumbs',
    placeHolderLong: 'Material UI Breadcrumbs Component',
    icon: 'Breadcrumb',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import Breadcrumbs from '@mui/material/Breadcrumbs'",
      "import Link from '@mui/material/Link'",
      "import RestoreIcon from '@mui/icons-material/Restore'",
      "import FavoriteIcon from '@mui/icons-material/Favorite'",
      "import LocationOnIcon from '@mui/icons-material/LocationOn'",
      '\nfunction handleClick(event) {',
      '  event.preventDefault();',
      '  console.info("You clicked a breadcrumb.");\n};'
    ],
    stateAndEventHandlers: [],
    defaultProps: ['onClick={(event) => handleClick(event)}'],
    propOptions: [
      'children',
      'classes',
      'component',
      'expandText',
      'itemsAfterCollapse',
      'itemsBeforeCollapse',
      'maxItems',
      'separator',
      'slotProps',
      'slots',
      'sx'
    ],
    jsx: [
      "<div role='presentation' onClick={handleClick}>",
      "  <Breadcrumbs aria-label='breadcrumb'>",
      "    <Link underline='hover' color='inherit' href='/'>MUI</Link>",
      "    <Link underline='hover' color='inherit' href='/material-ui/getting-started/installation/'>Core</Link>",
      "    <Link underline='hover' color='text.primary' href='/material-ui/react-breadcrumbs/' aria-current='page'>Breadcrumbs</Link>",
      '  </Breadcrumbs>',
      '</div>'
    ],
    componentData: {
      type: 'div',
      props: {
        role: 'presentation',
        onClick: '{handleClick}'
      },
      children: [
        {
          type: 'Breadcrumbs',
          props: {
            'aria-label': 'breadcrumb'
          },
          children: [
            {
              type: 'Link',
              props: {
                underline: 'hover',
                color: 'inherit',
                href: '/'
              },
              children: 'MUI'
            },
            {
              type: 'Link',
              props: {
                underline: 'hover',
                color: 'inherit',
                href: '/material-ui/getting-started/installation/'
              },
              children: 'Core'
            },
            {
              type: 'Link',
              props: {
                underline: 'hover',
                color: 'text.primary',
                href: '/material-ui/react-breadcrumbs/',
                'aria-current': 'page'
              },
              children: 'Breadcrumbs'
            }
          ]
        }
      ]
    },
    children: []
  },
  {
    id: 63,
    tag: 'box',
    name: 'Box',
    style: {},
    placeHolderShort: 'box',
    placeHolderLong: 'Material UI Box Component',
    icon: 'CheckBoxOutlineBlank',
    framework: 'reactClassic',
    nestable: true,
    imports: ["import Box from '@mui/material/Box'"],
    stateAndEventHandlers: [],
    defaultProps: [
      'component="section" sx={{ p: 2, border: "1px dashed grey" }}'
    ],
    propOptions: ['component', 'sx'],
    jsx: ['<Box />'],
    componentData: {
      type: 'Box',
      props: {
        component: 'section',
        sx: { p: 2, border: '1px dashed grey', m: 1 }
      },
      children: ['This Box renders as an HTML section element.']
    },
    children: []
  }
];

export default MUITypes;
