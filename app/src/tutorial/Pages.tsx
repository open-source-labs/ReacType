import React from 'react';
import pages from '../../../resources/pages_images/Pages.png';
import toggle from '../../../resources/pages_images/Toggle.png';
import deletePage from '../../../resources/pages_images/DeletePage.png';
import pagesPanel from '../../../resources/pages_images/PagesPanel.png';
import pageSwapping from '../../../resources/pages_images/PagesSwapping.gif';

const Pages: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Pages</h1>
      <hr />
      <p className={classes.text}>
        Start off by giving your page a name. Make sure to check the page box
        next to the Name input. Then click the add button and it will show in
        the Pages section below.
      </p>
      <div className={classes.imgWrapper}>
        <img src={pages} />
      </div>
      <div className={classes.imgWrapper}>
        <img src={pagesPanel} />
      </div>
      <hr />
      <p className={classes.text}>
        Switch between pages by selecting the Page and customize it by dragging
        the elements you want into the{' '}
        <span className={classes.notLink} onClick={() => setPage('Canvas')}>
          canvas
        </span>{' '}
        of the page you're on. (Note the red dot next to the page name signals
        which page you are currently on).
      </p>
      <div className={classes.imgWrapper}>
        <img src={pageSwapping} className={classes.smallImg} />
      </div>
      
      <hr />
      <p className={classes.text}>
        Delete the selected page by simply clicking the delete button below the style attribute dropdowns.
      </p>
      <div className={classes.imgWrapper}>
        <img src={deletePage} />
      </div>
      <hr />
    </div>
  );
};

export default Pages;
