import React from 'react';
import links2 from '../../../resources/route_links_tutorial_images/links2.PNG';
import links3 from '../../../resources/route_links_tutorial_images/links3.PNG';
import links4 from '../../../resources/route_links_tutorial_images/links4.PNG';
import links6 from '../../../resources/route_links_tutorial_images/links6.PNG';
import linksCanvas from '../../../resources/route_links_tutorial_images/links-canvas.PNG';

const RouteLinks: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Next.js Route Links</h1>
      <hr/>
      <h2>Route Links are only available for Next.js and Gatsby.js projects.</h2>
      <p className={classes.text}>Users are able to drag-and-drop 'Link' components onto the canvas which allow navigation to different <span className={classes.notLink} onClick={() => setPage('Pages')} >pages</span>.</p>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={linksCanvas}></img>
      </div>
      <hr/>
      <p className={classes.text}>Each page found in the '<span className={classes.notLink} onClick={() => setPage('Pages')} >Pages</span>' section can be navigated to via a 'Link'. Clicking on the 'Route Link' dropdown will display all the created pages in your application.</p>
      <div className={classes.imgWrapper}>
        <img className={classes.smallImg} src={links2}></img>
        <img className={classes.smallImg} src={links3}></img>
      </div>
      <hr/>
      <p className={classes.text}>The code generator will automatically <code>import Link from 'next/link'</code> and create your Link component in the bottom panel.</p>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={links4}></img>
      </div>
      <hr/>
      <p className={classes.text}>Clicking on a Link component on the <span className={classes.notLink} onClick={() => setPage('Canvas')} >canvas</span> will navigate to the corresponding page.</p>
      <div className={classes.imgWrapper}>
        <img className={classes.smallImg} src={links6}></img>
      </div>
      <hr/>
      <p className={classes.text}>For more information on 'Link' for Next.js, please <a href="https://nextjs.org/docs/api-reference/next/link" target="_blank">visit the official documentation section at nextjs.org.</a> For more information on 'Link' for Gatsby.js, please <a href="https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/" target="_blank">visit the official documentation section at www.gatsbyjs.com.</a></p>
      <hr/>
    </div>
  );
};

export default RouteLinks;
