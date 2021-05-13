import React from 'react';
import createState from '../../../resources/state_tutorial_images/CreateState.png';
import stateTable from '../../../resources/state_tutorial_images/StateTable.png';
import codePreview from '../../../resources/state_tutorial_images/CodePreview.png';
import deleteState from '../../../resources/state_tutorial_images/DeleteState.gif';



const States: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>State Features</h1>
      <hr />
      <h2>Create New State Hook</h2>
      <p className={classes.text}>
        To create a new state hook for your prototype application by going to the Creation Panel tab in the bottom Panel. Type in a key
        and value for the state hook and it's type. Once done, press the save button to save the state hook.<br/><br/>
        <div className={classes.imgWrapper}>
          <img className={classes.medImg} src={createState} />
        </div>
        <br/><br/>
        Created state hooks can be viewed to the right in tabular form. This table will immediately add any created state hook.<br/><br/>
        <div className={classes.imgWrapper}>
          <img className={classes.medImg} src={stateTable} />
        </div><br></br>
        Created state hooks will also be visible in the <span className={classes.notLink} onClick={() => setPage('Code Preview')} >code preview</span>.<br/><br/>
        <div className={classes.imgWrapper}>
          <img className={classes.medImg} src={codePreview} />
        </div>
      </p>
      <hr />
      <h2>Delete State Hook</h2>
      <p className={classes.text}>
        To delete a created state hook, click the corresponding X for the state hook on the state hook table.<br/><br/>
        <div className={classes.imgWrapper}>
          <img className={classes.img} src={deleteState} />
      </div>
      </p>
      <hr />
    </div>
  );
};

export default States;
