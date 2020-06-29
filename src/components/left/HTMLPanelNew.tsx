import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import ImageIcon from '@material-ui/icons/Image';
import ParagraphIcon from '@material-ui/icons/LocalParking';
import FormIcon from '@material-ui/icons/Description';
import HeaderIcon from '@material-ui/icons/TextFormat';
import ButtonIcon from '@material-ui/icons/EditAttributes';
import LinkIcon from '@material-ui/icons/Link';
import ListIcon from '@material-ui/icons/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';

const HTMLPanel = (): JSX.Element => {
  const HTMLOptions = [
    {
      name: 'Header',
      id: 400,
      icon: <HeaderIcon />
    },
    {
      name: 'Paragraph',
      id: 401,
      icon: <ParagraphIcon />
    },
    {
      name: 'Image',
      id: 402,
      icon: <ImageIcon />
    },
    {
      name: 'Form',
      id: 403,
      icon: <FormIcon />
    },
    {
      name: 'Button',
      id: 404,
      icon: <ButtonIcon />
    },
    {
      name: 'List',
      id: 405,
      icon: <ListIcon />
    }
  ];
  
  
  const options = HTMLOptions.map(option => {
    const [{ isDragging }, drag] = useDrag({
      item: {
        type: ItemTypes.INSTANCE,
        newInstance: true,
        category: 'HTMLelement',
        name: option.name,
        id: option.id
      },
      collect: (monitor: any) => ({
        isDragging: !!monitor.isDragging()
      })
    });
    return (
      <Grid 
        item
        ref={drag} 
        xs={5} 
        key={`html-${option.name}`} 
        style={{
          color: 'white',
          // this is experimental for version: BLADERUNNER THEME
          backgroundColor: 'transparent',
          // minWidth: '340px',
          minHeight: '80px',
          marginBottom: '15px',
          border: '2px dotted rgba(255,255,255, 0.45)',
          borderRadius: '8px'
        }}>
        
        <h3>{option.name} 
          <span 
            style={{ 
              verticalAlign: '-webkit-baseline-middle',
              marginLeft: '5px' 
            }}>{option.icon}
          </span>
        </h3>
        
      </Grid>
    )
  })
  
  return (
    <div>     
       <h4> HTML Elements</h4>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        {options}
      </Grid>
    </div>
  )
}

export default HTMLPanel;