import React, { Component } from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import FormIcon from '@material-ui/icons/Description';
import ButtonIcon from '@material-ui/icons/EditAttributes';
import LinkIcon from '@material-ui/icons/Link';
import ListIcon from '@material-ui/icons/List';
import ParagraphIcon from '@material-ui/icons/LocalParking';
import Grid from '@material-ui/core/Grid';

interface HTMLCompPropsInt {
  classes: any;
  addChild: any;
  native: boolean;
}

interface StateInt {
  HtmlComponentName: string;
}

class HTMLComponentPanel extends Component<HTMLCompPropsInt, StateInt> {
  state = {
    HtmlComponentName: ''
  };

  handleChange = (event: any) => {
    this.setState({
      HtmlComponentName: event.target.value
    });
  };

  handleCreateHTMLChild = (type: string) => {
    this.props.addChild({ title: type, childType: type, HTMLInfo: {} });
  };

  render(): JSX.Element {
    const { classes } = this.props;
    // refactor of HTML elements panel
    const elementButtons = [
      {
        name: 'Image',
        button: <ImageIcon style={{ color: '#e0e0e0' }} />
      },
      {
        name: 'Form',
        button: <FormIcon style={{ color: '#e0e0e0' }} />
      },
      {
        name: 'Button',
        button: <ButtonIcon style={{ color: '#e0e0e0' }} />
      },
      {
        name: 'Link',
        button: <LinkIcon style={{ color: '#e0e0e0' }} />
      },
      {
        name: 'List',
        button: <ListIcon style={{ color: '#e0e0e0' }} />
      },
      {
        name: 'Paragraph',
        button: <ParagraphIcon style={{ color: '#e0e0e0' }} />
      }
    ];

    // creates the relevant MaterialUI components for each HTML element in the array above
    const buttonGrids = elementButtons.map(element => (
      <Grid item xs={6} key={`grid-${element.name}`}>
        <IconButton
          key={`button-${element.name}`}
          className={classes.label}
          aria-label={element.name}
          size="medium"
          onClick={() => {
            this.handleCreateHTMLChild(element.name);
          }}
        >
          <span className={classes.elemName}>{element.name}</span>
          {element.button}
        </IconButton>
      </Grid>
    ));

    return (
      <div className={classes.container}>
        <div className={classes.header}>Add HTML Elements</div>
        <Grid container spacing={3} alignItems="center">
          {buttonGrids}
        </Grid>
      </div>
    );
  }
}

function styles(theme: Theme): any {
  return {
    container: {
      textAlign: 'center',
      paddingRight: '10%'
    },
    header: {
      color: '#fff',
      cursor: 'default',
      fontSize: '1.8em',
      textShadow: '2px 2px 2px black',
      paddingBottom: '20px',
      paddingLeft: '15px'
    },
    elemName: {
      paddingRight: '10px'
    },
    label: {
      color: '#e0e0e0',
      textShadow: '2px 2px 2px black',
      transition: 'font-size 350ms ease-in-out',
      '&:hover': {
        fontSize: '1.85em'
      }
    }
  };
}

export default withStyles(styles)(HTMLComponentPanel);
