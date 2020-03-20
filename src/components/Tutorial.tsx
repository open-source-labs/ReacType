import React, { Component } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import theme from '../components/theme';
import Button from '@material-ui/core/Button';

interface Props {
  tutorial: number;
  handleNext(tutorial: number): void;
}

class Tutorial extends Component<Props> {
  render(): JSX.Element {
    const { tutorial, handleNext } = this.props;

    let dialog;
    if (!tutorial) dialog = <div />;
    if (tutorial === 1) {
      dialog = (
        <div
          style={{
            gridColumnStart: 'col2',
            gridColumnEnd: 'col4',
            gridRowStart: 'row9',
            gridRowEnd: 'row10',
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            padding: '20px',
            boxShadow: theme.shadows[5],
            wordWrap: 'break-word',
            width: '100%',
            borderRadius: '20px 50px',
          }}
        >
          <h1
            style={{ color: theme.palette.primary.dark }}
            id="transition-modal-title"
          >
            Step 1
          </h1>
          <h2 id="transition-modal-description">
            Upload an image of your website template using the red 'upload
            image' button below.
          </h2>
          <h2 id="transition-modal-description">
            You can remove the image by clicking the button again, or replace
            the image by going to 'File --> Open Image'.
          </h2>
          <Button
            onClick={() => {
              handleNext(2);
            }}
            variant="contained"
            color="inherit"
            style={{ float: 'right' }}
          >
            Next
          </Button>
        </div>
      );
    }
    if (tutorial === 2) {
      dialog = (
        <div
          style={{
            gridColumnStart: 'col2',
            gridColumnEnd: 'col6',
            gridRowStart: 'row2',
            gridRowEnd: 'row3',
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            padding: '20px',
            boxShadow: theme.shadows[5],
            wordWrap: 'break-word',
            width: '100%',
            borderRadius: '20px 50px',
          }}
        >
          <h1
            style={{ color: theme.palette.primary.dark }}
            id="transition-modal-title"
          >
            Step 2
          </h1>
          <h2 id="transition-modal-description">
            Give your component a name add click '+' to add it to your
            collection of components.
          </h2>
          <h2 id="transition-modal-description">
            You can also make each component you create stateful or not
            stateful, and functional or as a class component as well.
          </h2>
          <h2 id="transition-modal-description">
            Once you've added your component, while in the view of the component
            you would like to make the parent of your new component, click '+'
            next to the new component you created to make it a child.
          </h2>
          <Button
            onClick={() => {
              handleNext(3);
            }}
            variant="contained"
            color="inherit"
            style={{ float: 'right' }}
          >
            Next
          </Button>
        </div>
      );
    }
    if (tutorial === 3) {
      dialog = (
        <div
          style={{
            gridColumnStart: 'col6',
            gridColumnEnd: 'col9',
            gridRowStart: 'row9',
            gridRowEnd: 'row10',
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            padding: '20px',
            boxShadow: theme.shadows[5],
            wordWrap: 'break-word',
            width: '100%',
            borderRadius: '20px 50px',
          }}
        >
          <h1
            style={{ color: theme.palette.primary.dark }}
            id="transition-modal-title"
          >
            Step 3
          </h1>
          <h2 id="transition-modal-description">
            Once you have designed your components above, you can add props and
            HTML elements to your components in this bottom panel.
          </h2>
          <h2 id="transition-modal-description">
            While you're working on designing your app, you can also preview the
            code that will be exported and your application's component tree in
            the corresponding tabs.
          </h2>
          <Button
            onClick={() => {
              handleNext(4);
            }}
            variant="contained"
            color="inherit"
            style={{ float: 'right' }}
          >
            Next
          </Button>
        </div>
      );
    }
    if (tutorial === 4) {
      dialog = (
        <div
          style={{
            gridColumnStart: 'col1',
            gridColumnEnd: 'col4',
            gridRowStart: 'row9',
            gridRowEnd: 'row10',
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            padding: '20px',
            boxShadow: theme.shadows[5],
            wordWrap: 'break-word',
            width: '100%',
            borderRadius: '20px 50px',
          }}
        >
          <h1
            style={{ color: theme.palette.primary.dark }}
            id="transition-modal-title"
          >
            Step 4
          </h1>
          <h2 id="transition-modal-description">
            Once you're all done, simply click on the "Export Project" button
            below to export your files for development.
          </h2>
          <h2 id="transition-modal-description">
            You have the option of exporting just the components, or an entire
            React + Express boilerplate with the components you designed.
          </h2>
          <Button
            onClick={() => {
              handleNext(0);
            }}
            variant="contained"
            color="inherit"
            style={{ float: 'right' }}
          >
            Finish!
          </Button>
        </div>
      );
    }
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={tutorial !== 0}
        onClose={() => handleNext(0)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: {enter: 500, exit: 500},
        }}
        style={{
          display: 'grid',
          gridTemplateColumns:
            '[col1] 1fr [col2] 1fr [col3] 1fr [col4] 1fr [col5] 1fr [col6] 1fr [col7] 1fr [col8] 1fr [col9] 1fr [col10] 1fr [end]',
          gridTemplateRows:
            '[row1] 1fr [row2] 1fr [row3] 1fr [row4] 1fr [row5] 1fr [row6] 1fr [row7] 1fr [row8] 1fr [row9] 1fr [row10] 1fr [end]',
        }}
      >
        <Fade in={tutorial !== 0}>{dialog}</Fade>
      </Modal>
    );
  }
}

export default Tutorial;
