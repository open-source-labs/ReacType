import React, { useState, useContext } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { stateContext } from '../context/context';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  select: {
    fontSize: '1.25em',
    '> .MuiSelect-icon': {
      color: 'white'
    }
  },
  selectInput: {
    color: '#fff',
    paddingTop: '15px',
    paddingLeft: '15px'
  },
  formControl: {
    minWidth: '125px',
    backgroundColor: 'rgba(255,255,255,0.15)'
  },
  configRow: {
    display: 'flex',
    paddingLeft: '25px',
    paddingRight: '25px',
    marginTop: '20px',
  },
  configType: {
    color: '#fff',
    minWidth: '185px',
    fontSize: '1em'
  },
  configValue: {
    marginLeft: '20px'
  },
  buttonRow: {
    textAlign: 'center',
    marginTop: '25px', 
    '& > .MuiButton-textSecondary' : {
      color: 'rgba(255,0,0,0.75)'
    }
  },
  button: {
    fontSize: '1rem',
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  compName: {
    color: '#01d46d',
    fontSize: '1.25rem'
  }
});

const RightContainer = ():JSX.Element  => {
  const classes = useStyles();
  const [state, dispatch] = useContext(stateContext);

  const [displayMode, setDisplayMode] = useState('');
  const [flexDir, setFlexDir] = useState('');
  const [flexJustify, setFlexJustify] = useState('');
  const [flexAlign, setFlexAlign] = useState('');
  const [BGColor, setBGColor] = useState('');

  const [compWidth, setCompWidth] = useState('');
  const [compHeight, setCompHeight] = useState('');


  const handleChange = (e: React.ChangeEvent<{value: any}>) => {
    let inputVal = e.target.value;
    switch(e.target.name) {
      case 'display':
        setDisplayMode(inputVal);
        break;
      case 'flexdir':
        setFlexDir(inputVal);
        break;
      case 'flexjust':
        setFlexJustify(inputVal);
        break;
      case 'flexalign':
        setFlexAlign(inputVal);
        break;
      case 'width':
        setCompWidth(inputVal);
        break;
      case 'height':
        setCompHeight(inputVal);
        break;
      case 'bgcolor':
        setBGColor(inputVal);
        break;
    }
  }

  const getFocus = () => {
    const focusTarget = state.components.find(comp => {
      return comp.id === state.canvasFocus.componentId;
    })
    return focusTarget;
  }

  const handleSave = ():Object => {
    const styleObj = {};
    if (displayMode !== '') styleObj.display = displayMode;
    if (flexDir !== '') styleObj.flexDirection = flexDir;
    if (flexJustify !== '') styleObj.justifyContent = flexJustify;
    if (flexAlign !== '') styleObj.alignItems = flexAlign;
    if (compWidth !== '') styleObj.width = compWidth;
    if (compHeight !== '') styleObj.height = compHeight;
    if (BGColor !== '') styleObj.backgroundColor = BGColor;
    console.log(styleObj);
    return styleObj;
  }

  const handleDelete = () => {
    console.log('DELETING ...');
  }

  return (
    <div className="column right">
      <h4>Configuration options for <span className={classes.compName}>{getFocus().name}</span></h4>
      <div className={classes.configRow}>
        <div className={classes.configType}>
          <h3>Display:</h3>
        </div>
        <div className={classes.configValue}>
          <FormControl variant="filled" className={classes.formControl}>
            <Select
              value={displayMode}
              name="display"
              onChange={handleChange}
              displayEmpty
              className={classes.select}
              inputProps={{ className: classes.selectInput }}
            >
              <MenuItem value=''></MenuItem>
              <MenuItem value={'block'}>block</MenuItem>
              <MenuItem value={'inline-block'}>inline-block</MenuItem>
              <MenuItem value={'flex'}>flex</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {/* flex options are hidden until display flex is chosen */}
      { displayMode === 'flex' && (
      <div>
        <div className={classes.configRow}>
          <div className={classes.configType}>
            <h3>Flex direction:</h3>
          </div>
          <div className={classes.configValue}>
            <FormControl variant="filled" className={classes.formControl}>
              <Select
                value={flexDir}
                name="flexdir"
                onChange={handleChange}
                displayEmpty
                className={classes.select}
                inputProps={{ className: classes.selectInput }}
              >
                <MenuItem value=''></MenuItem>
                <MenuItem value={'row'}>row</MenuItem>
                <MenuItem value={'column'}>column</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className={classes.configRow}>
          <div className={classes.configType}>
            <h3>Justify content:</h3>
          </div>
          <div className={classes.configValue}>
            <FormControl variant="filled" className={classes.formControl}>
              <Select
                value={flexJustify}
                name="flexjust"
                onChange={handleChange}
                displayEmpty
                className={classes.select}
                inputProps={{ className: classes.selectInput }}
              >
                <MenuItem value=''></MenuItem>
                <MenuItem value={'flex-start'}>flex-start</MenuItem>
                <MenuItem value={'flex-end'}>flex-end</MenuItem>
                <MenuItem value={'center'}>center</MenuItem>
                <MenuItem value={'space-between'}>space-between</MenuItem>
                <MenuItem value={'space-around'}>space-around</MenuItem>
                <MenuItem value={'space-evenly'}>space-evenly</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className={classes.configRow}>
          <div className={classes.configType}>
            <h3>Align items:</h3>
          </div>
          <div className={classes.configValue}>
            <FormControl variant="filled" className={classes.formControl}>
              <Select
                value={flexAlign}
                onChange={handleChange}
                name="flexalign"
                displayEmpty
                className={classes.select}
                inputProps={{ className: classes.selectInput }}
              >
                <MenuItem value=''></MenuItem>
                <MenuItem value={'stretch'}>stretch</MenuItem>
                <MenuItem value={'flex-start'}>flex-start</MenuItem>
                <MenuItem value={'flex-end'}>flex-end</MenuItem>
                <MenuItem value={'center'}>center</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      )}
      <div className={classes.configRow}>
        <div className={classes.configType}>
          <h3>Width:</h3>
        </div>
        <div className={classes.configValue}>
          <FormControl variant="filled" className={classes.formControl}>
            <Select
              value={compWidth}
              name="width"
              onChange={handleChange}
              displayEmpty
              className={classes.select}
              inputProps={{ className: classes.selectInput }}
            >
              <MenuItem value=''></MenuItem>
              <MenuItem value={'auto'}>auto</MenuItem>
              <MenuItem value={'50%'}>50%</MenuItem>
              <MenuItem value={'25%'}>25%</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={classes.configRow}>
        <div className={classes.configType}>
          <h3>Height:</h3>
        </div>
        <div className={classes.configValue}>
          <FormControl variant="filled" className={classes.formControl}>
            <Select
              value={compHeight}
              name="height"
              onChange={handleChange}
              displayEmpty
              className={classes.select}
              inputProps={{ className: classes.selectInput }}
            >
              <MenuItem value=''></MenuItem>
              <MenuItem value={'auto'}>auto</MenuItem>
              <MenuItem value={'100%'}>100%</MenuItem>
              <MenuItem value={'50%'}>50%</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={classes.configRow}>
        <div className={classes.configType}>
          <h3>Background color:</h3>
        </div>
        <div className={classes.configValue}>
          <FormControl variant="filled" className={classes.formControl}>
            <TextField 
              variant="filled"
              name="bgcolor"
              className={classes.select}
              inputProps={{className: classes.selectInput}}
              value={BGColor}
              onChange={handleChange}
            />
          </FormControl>
        </div>
      </div>
      <div className={classes.buttonRow}>
        <Button color="primary" className={classes.button} onClick={handleSave}>
          SAVE
        </Button>
      </div>
      <div className={classes.buttonRow}>
        <Button color="secondary" className={classes.button} onClick={handleDelete}>
          DELETE INSTANCE
        </Button>
      </div>
    </div>
  )
}

export default RightContainer;