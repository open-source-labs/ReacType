import React from 'react';
import pages from '../../../resources/pages_images/Pages.png';
import toggle from '../../../resources/pages_images/Toggle.png';
import deletePage from '../../../resources/pages_images/DeletePage.png';
import addElements from '../../../resources/pages_images/AddElements.png';

const Pages: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Pages</h1>
      <hr />
      <div className={classes.imgWrapper}>
        <img src={pages} />
      </div>
      <p className={classes.text}>
        Start off by giving your page a name. Make sure to check the page box
        next to the textbox. Then, simply click the add button and it'll show in
        the pages section below.
      </p>
      <div className={classes.imgWrapper}>
        <img src={toggle} />
      </div>
      <hr />
      <div className={classes.imgWrapper}>
        <img src={addElements} className={classes.img} />
      </div>
      <p className={classes.text}>
        Switch between pages by selecting the page and customize it by dragging
        the elements you want into the{' '}
        <span className={classes.notLink} onClick={() => setPage('Canvas')}>
          canvas
        </span>{' '}
        of the page you're on. (Note the green dot next to the page name shows
        you which page you are currently on).
      </p>
      <hr />
      <div className={classes.imgWrapper}>
        <img src={deletePage} />
      </div>
      <p className={classes.text}>
        Delete the page by simply clicking the button.
      </p>
      <hr />
    </div>
  );
};

export default Pages;
