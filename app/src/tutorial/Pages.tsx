import React from 'react';
import pages from '../../../resources/pages_images/Pages.png';
import toggle from '../../../resources/pages_images/Toggle.png';
import deletepage from '../../../resources/pages_images/DeletePage.png';
import addelements from '../../../resources/pages_images/AddElements.png';

// import Grid from '@material-ui/core/Grid';

// import ComponentPanel from '../components/left/ComponentPanel';
// import HTMLPanel from '../components/left/HTMLPanel';

// Left-hand portion of the app, where component options are displayed

const Pages: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div className="tutorial_styling">
      <h1 style={{ color: 'black' }}>Pages</h1>
      <hr />
      <br />
      <img src={pages} />
      <p>
        Start off by giving your page a name. Make sure to check the page box
        next to the textbox. Then, simply click the add button and it'll show in
        the pages section below.
      </p>
      <br />
      <img src={toggle} style={{ marginRight: '20px' }} />
      <img src={addelements} style={{ outline: '1px solid black' }} />
      <br />
      <p>
        Switch between pages by selecting the page and customize it by dragging
        the elements you want into the canvas of the page you're on. (Note the
        green dot next to the page name shows you which page you are currently
        on).
      </p>
      <br />
      <img src={deletepage} />
      <p>Delete the page by simply clicking the button.</p>
    </div>
  );
};

export default Pages;
