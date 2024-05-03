import React from 'react';
import createState from '../../../resources/state_tutorial_images/CreateState.png';
import codePreview from '../../../resources/state_tutorial_images/CodePreview.png';
import fullStateManageTab from '../../../resources/state_tutorial_images/fullStateManageTab.png'; 
import table1 from '../../../resources/state_tutorial_images/table1.gif';
import table3 from '../../../resources/state_tutorial_images/table3.gif';
import deleteState2 from '../../../resources/state_tutorial_images/delete.gif';
import display from '../../../resources/state_tutorial_images/display.gif';
import codePreview2 from '../../../resources/state_tutorial_images/CodePreview2.png';

const States: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>State Management</h1>
      <hr />
      <h2>Step 1: Click on the State Management Tab</h2>
      <p className={classes.text}>
        Within this tab, there are two sections: "Create/Edit" and "Display".
        <br/><br/>
        <div className={classes.imgWrapper}>
          <img width="600" height="145" src={fullStateManageTab} />
        </div>
        </p>
        <h2>Step 2: Create a New State Variable</h2>
      <p className={classes.text}>
        In the "Create/Edit" section of the State Manager, you can declare a new state variable. First make sure that you have selected the correct component on the left. This new state variable will be created inside the component highlighted with a red dot (as shown below). 
        <br/><br/>You can create your state variable with a key, an intial value, and a type (ex: string, number, boolean, etc).<br/><br/>
        <div className={classes.imgWrapper}>
          <img className={classes.medImg} src={createState} />
        </div>
        <br/><br/>
        You will now see your new state variable in the "Current Component State" table. Also, you can see the React Hook that has been created for this state variable.
        <br/><br/>
        <div className={classes.imgWrapper}>
          <img width="600" src={table1} />
      </div> 
        </p>
        <h2>Step 3: Pass in Props from Parent Component</h2>
      <p className={classes.text}>
        In the "Create/Edit" section of the State Manager, you can also view props available from the parent component. You can choose to import any of the state variables, with or without their associated React Hooks. 
        <br/><br/>Just click the plus sign next to the state you want to import into the current component. This will automatically update the "Passed In Props from Parent" table on the far right.<br/><br/>
        <div className={classes.imgWrapper}>
          <img width="1100" src={table3} />
        </div>
        </p>
      <h2>Step 4: Delete Any Unnecessary State Variables</h2>
      <p className={classes.text}>
        If there are any state variables you want to delete, you can do so in the "Create/Edit" tab!
        <br/><br/>You can delete a state variable that was created in the current component by clicking the X next to it in the "Current Component State" table. <br/><br/>
        You can also delete state from the "Passed In Props From Parent" table. This will delete the passed in props from the current component, but won't delete the original state variable inside the parent component.
        <br/><br/>
        For example, in the gif below, we can see the "num" state variable being deleted from the component "Row". Its associated React Hook is also automatically deleted. 
        <br/><br/>
        Then, the "setDarkMode" React Hook is deleted from "Passed In Props From Parent: App". However, if we click over to the "App" parent component, the "setDarkMode" React Hook is still available. 
        <br/><br/>
        <div className={classes.imgWrapper}>
          <img width="1300" src={deleteState2} />
        </div>
        </p>
        <br/><br/>
      <h2>Step 5: Visualize the State Flow of Your Prototype Application</h2>
      <p className={classes.text}>
        Once you've added all your state variables to your components, you can click on the "Display" section of the State Manager. Here, you can see a tree diagram that shows the relationship between the components you have created. Click on each component to see its state variables -- including passed in props! <br/><br/>
        On the left side of the screen, click on other root components (if using Classic React) or pages (if using Next.js or GatsbyJS) to see their tree diagrams too.  
        <br/><br/>
        <div className={classes.imgWrapper}>
          <img width="1400" src={display} />
        </div>
        <br/><br/>
        Created state variables and React Hooks will also be visible in the <span className={classes.notLink} onClick={() => setPage('Code Preview')} >code preview</span>.<br/><br/>
        You can see below that the "num" and its associated React Hook have been passed in to the "Row" component from its parent component. 
        <br/><br/>
        On line 10, the state variable "darkMode" has been passed into the "Row" component from its parent, but without its React Hook, since we chose not to pass the hook down from the parent component. 
        <br/><br/>
        <div className={classes.imgWrapper}>
          <img className={classes.medImg} src={codePreview2} />
        </div>
      </p>
      <hr />
    </div>
  );
};

export default States;
