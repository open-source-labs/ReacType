// import React, { useState } from 'react';
// import {
//   Button,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Select,
//   MenuItem,
//   TextField,
//   FormControl
// } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import FormSelector from '../../components/form/Selector';
// import makeStyles from '@mui/styles/makeStyles';
// import { Redo, Undo } from '@mui/icons-material';


// const MUIProps = ({ isThemeLight }): JSX.Element => {
//   const classes = useStyles(isThemeLight);
//   const dispatch = useDispatch();
//   const [selectedProps, setSelectedProps] = useState({});
//   const [eventOptionsVisible, setEventOptionsVisible] = useState(false);
//   const [flexOptionsVisible, setFlexOptionsVisible] = useState(false);
//   const [eventRowsVisible, setEventRowsVisible] = useState(false);
//   const [buttonSize, setButtonSize] = useState('');
//   const [buttonColor, setButtonColor] = useState('');
//   const [buttonVariant, setButtonVariant] = useState('');
//   const [buttonDisabled, setButtonDisabled] = useState('');
//   const [buttonDisableElevation, setButtonDisableElevation] = useState('');
//   const [buttonDisableRipple, setButtonDisableRipple] = useState('');
//   const [buttonFullWidth, setButtonFullWidth] = useState('');
//   const [typographyVariant, setTypographyVariant] = useState('');
//   const [typographyParagraph, setTypographyParagraph] = useState('');
//   const [typographyNoWrap, setTypographyNoWrap] = useState('');
//   const [typographyGutterBottom, setTypographyGutterBottom] = useState('');
//   const [typographyAlign, setTypographyAlign] = useState('');
//   const [cardRaised, setCardRaised] = useState('');
//   const [textFieldColor, setTextFieldColor] = useState('');
//   const [textFieldMargin, setTextFieldMargin] = useState('');
//   const [textFieldMultiline, setTextFieldMultiline] = useState('');
//   const [textFieldFullWidth, setTextFieldFullWidth] = useState('');
//   const [textFieldError, setTextFieldError] = useState('');
//   const [textFieldDisable, setTextFieldDisable] = useState('');
//   const [textFieldAutoFocus, setTextFieldAutoFocus] = useState('');
//   const [textFieldVariant, setTextFieldVariant] = useState('');
//   const [textFieldSize, setTextFieldSize] = useState('');
//   const [buttonGroupColor, setButtonGroupColor] = useState('');
//   const [buttonGroupOrientation, setButtonGroupOrientation] = useState('');
//   const [buttonGroupSize, setButtonGroupSize] = useState('');
//   const [buttonGroupVariant, setButtonGroupVariant] = useState('');
//   const [buttonGroupDisable, setbuttonGroupDisable] = useState('');

//   const handleSend = () => {
//     // Handle sending selected props
//   };

//   const handlePropChange = (propName, propValue) => {
//     setSelectedProps((prevProps) => ({
//       ...prevProps,
//       [propName]: propValue
//     }));
//   };

//   const renderPropInputs = (propsArray) => {
//     return propsArray.map((prop) => (
//       <div key={prop.name}>
//         <label>{prop.name}:</label>
//         <Select
//           value={selectedProps[prop.name] || ''}
//           onChange={(e) => handlePropChange(prop.name, e.target.value)}
//         >
//           <MenuItem value={''}>None</MenuItem>
//           {prop.type.split('|').map((option) => (
//             <MenuItem key={option} value={option}>
//               {option}
//             </MenuItem>
//           ))}
//         </Select>
//       </div>
//     ));
//   };




//   // const resetFields = () => {
//   //   const childrenArray = deepIterate(configTarget.children);
//   //   for (const element of childrenArray) {
//   //     if (configTarget.child && element.childId === configTarget.child.id) {
//   //       const attributes = element.attributes;
//   //       const style = element.style;
//   //       setCompText(attributes.compText ? attributes.compText : '');
//   //       setCompLink(attributes.compLink ? attributes.compLink : '');
//   //       setCssClasses(attributes.cssClasses ? attributes.cssClasses : '');
//   //     }
//   //   }
//   //   const style = configTarget.child
//   //     ? configTarget.child.style
//   //     : configTarget.style;
//   //   setDisplayMode(style.display ? style.display : '');
//   //   setFlexDir(style.flexDirection ? style.flexDirection : '');
//   //   setFlexJustify(style.justifyContent ? style.justifyContent : '');
//   //   setFlexAlign(style.alignItems ? style.alignItems : '');
//   //   setCompWidth(style.width ? style.width : '');
//   //   setCompHeight(style.height ? style.height : '');
//   //   setBGColor(style.backgroundColor ? style.backgroundColor : '');
//   //   setEventAll(['', '']);
//   // };


  

//   const handleMUIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const inputVal = e.target.value;
//     switch (e.target.name) {
//       case 'buttonSize':
//         setButtonSize(inputVal)
//         break;
//       case 'buttonColor':
//         setButtonColor(inputVal)
//         break;
//       case 'buttonDisabled':
//         setButtonDisabled(inputVal)
//         break;
//       case 'buttonDisableRipple':
//         setButtonDisableRipple(inputVal)
//         break;
//       case 'buttonFullWidth':
//         setButtonFullWidth(inputVal)
//         break;
//       case 'typographyVariant':
//         setTypographyVariant(inputVal)
//         break;
//       case 'typographyParagraph':
//         setTypographyParagraph(inputVal)
//         break;
//       case 'buttonVariant':
//         setButtonVariant(inputVal)
//         break;
//       case 'buttonDisableElevation':
//         setButtonDisableElevation(inputVal)
//         break;
//       case 'typographyNoWrap':
//         setTypographyNoWrap(inputVal)
//         break;
//       case 'typographyGutterBottom':
//         setTypographyGutterBottom(inputVal)
//         break;
//       case 'typographyAlign':
//         setTypographyAlign(inputVal)
//         break;
//       case 'cardRaised':
//         setCardRaised(inputVal)
//         break;
//       case 'textFieldMultiline':
//         setTextFieldMultiline(inputVal)
//         break;
//       case 'textFieldFullWidth':
//         setTextFieldFullWidth(inputVal)
//         break;
//       case 'textFieldError':
//         setTextFieldError(inputVal)
//         break;
//       case 'textFieldDisable':
//         setTextFieldDisable(inputVal)
//         break;
//       case 'textFieldAutoFocus':
//         setTextFieldAutoFocus(inputVal)
//         break;
//       case 'textFieldColor':
//         setTextFieldColor(inputVal)
//         break;
//       case 'textFieldMargin':
//         setTextFieldMargin(inputVal)
//         break; 
//       case 'textFieldVariant':
//         setTextFieldVariant(inputVal)
//         break;
//       case 'textFieldSize':
//         setTextFieldSize(inputVal)
//         break;
//       case 'buttonGroupColor':
//         setButtonGroupColor(inputVal)
//         break;
//       case 'buttonGroupOrientation':
//         setButtonGroupOrientation(inputVal)
//         break;
//       case 'buttonGroupSize':
//         setButtonGroupSize(inputVal)
//         break;
//       case 'buttonGroupVariant':
//         setButtonGroupVariant(inputVal)
//         break;
//       case 'buttonGroupDisable':
//         setbuttonGroupDisable(inputVal)
//         break;
//       default:
//         break;
//     }
//   };

//   const marginTopAmount = () => {
//     let totalMargin = 0;
//     if (eventOptionsVisible) totalMargin += 90;
//     if (flexOptionsVisible) totalMargin = Math.max(totalMargin, 210);
//     if (eventRowsVisible) totalMargin = Math.max(totalMargin, 335);
//     return `${totalMargin}px`;
//   };

//   return (
//     <div>
//       {/* Button Customization Options */}
//       <Accordion className={classes.accordion}>
//         <AccordionSummary className={classes.accordionSummary}>
//           Button
//         </AccordionSummary>
//         <AccordionDetails className={classes.accordionDetails}>
//           <section className={classes.buttonSection}>
//             <div className={classes.buttonLeftDiv}>
//               {/* Size Properties for Button */}
//               <FormSelector
//                 classes={classes}
//                 selectValue={buttonSize} // Using muiDisplayMode for Material UI state
//                 handleChange={handleMUIChange} // Using handleMUIChange for Material UI props
//                 title="Size:"
//                 name="buttonSize" // Matching with the name in the change handler
//                 items={[
//                   { value: '', text: 'default' },
//                   { value: 'small', text: 'small' },
//                   { value: 'medium', text: 'medium' },
//                   { value: 'large', text: 'large' }
//                 ]}
//               />

//               {/* Color Properties for Button */}
//               <FormSelector
//                 classes={classes}
//                 selectValue={buttonColor} // Using muiDisplayMode for Material UI state
//                 handleChange={handleMUIChange} // Using handleMUIChange for Material UI props
//                 title="Color:"
//                 name="buttonColor" // Matching with the name in the change handler
//                 items={[
//                   { value: '', text: 'default' },
//                   { value: 'inherit', text: 'inherit' },
//                   { value: 'primary', text: 'primary' },
//                   { value: 'secondary', text: 'secondary' },
//                   { value: 'success', text: 'success' },
//                   { value: 'error', text: 'error' },
//                   { value: 'info', text: 'info' },
//                   { value: 'warning', text: 'warning' }
//                 ]}
//               />

//               {/* Variant Properties for Button */}
//               <FormSelector
//                 classes={classes}
//                 selectValue={buttonVariant} // Using muiDisplayMode for Material UI state
//                 handleChange={handleMUIChange} // Using handleMUIChange for Material UI props
//                 title="Variant:"
//                 name="buttonVariant" // Matching with the name in the change handler
//                 items={[
//                   { value: '', text: 'default' },
//                   { value: 'contained', text: 'contained' },
//                   { value: 'outlined', text: 'outlined' },
//                   { value: 'text', text: 'text' }
//                 ]}
//               />

//               {/* href Properties for Button */}
//               <div className={classes.configRow}>
//                 <div
//                   className={
//                     isThemeLight
//                       ? `${classes.configType} ${classes.lightThemeFontColor}`
//                       : `${classes.configType} ${classes.darkThemeFontColor}`
//                   }
//                 >
//                   <h3>href:</h3>
//                 </div>
//                 <div className={classes.configValue}>
//                   <FormControl className={classes.formControl}>
//                     <TextField
//                       name="href"
//                       className={classes.select}
//                       inputProps={{
//                         className: isThemeLight
//                           ? `${classes.selectInput} ${classes.lightThemeFontColor}`
//                           : `${classes.selectInput} ${classes.darkThemeFontColor}`
//                       }}
//                       // value={BGColor}
//                       // onChange={handleChange}
//                       placeholder="www.reactype.dev"
//                     />
//                   </FormControl>
//                 </div>
//               </div>
//             </div>

//             {/* Button Right Div */}
//             <div className={classes.buttonRightDiv}>
//               {/* Disable Options for Button */}
//               <FormSelector
//                 classes={classes}
//                 selectValue={buttonDisabled} // Using muiDisplayMode for Material UI state
//                 handleChange={handleMUIChange} // Using handleMUIChange for Material UI props
//                 title="Disabled:"
//                 name="buttonDisabled" // Matching with the name in the change handler
//                 items={[
//                   { value: '', text: 'default' },
//                   { value: 'true', text: 'true' },
//                   { value: 'false', text: 'false' }
//                 ]}
//               />

//               {/* Disable Elevation Options for Button */}
//               <FormSelector
//                 classes={classes}
//                 selectValue={buttonDisableElevation} // Using muiDisplayMode for Material UI state
//                 handleChange={handleMUIChange} // Using handleMUIChange for Material UI props
//                 title="Disable Elevation:"
//                 name="buttonDisableElevation" // Matching with the name in the change handler
//                 items={[
//                   { value: '', text: 'default' },
//                   { value: 'true', text: 'true' },
//                   { value: 'false', text: 'false' }
//                 ]}
//               />

//               {/* Disable Focus Ripple Options for Button */}
//               <FormSelector
//                 classes={classes}
//                 selectValue={buttonDisableRipple} // Using muiDisplayMode for Material UI state
//                 handleChange={handleMUIChange} // Using handleMUIChange for Material UI props
//                 title="Disable Ripple:"
//                 name="buttonDisableRipple" // Matching with the name in the change handler
//                 items={[
//                   { value: '', text: 'default' },
//                   { value: 'true', text: 'true' },
//                   { value: 'false', text: 'false' }
//                 ]}
//               />

//               {/* Full Width Options for Button */}
//               <FormSelector
//                 classes={classes}
//                 selectValue={buttonFullWidth} // Using muiDisplayMode for Material UI state
//                 handleChange={handleMUIChange} // Using handleMUIChange for Material UI props
//                 title="Full Width:"
//                 name="buttonFullWidth" // Matching with the name in the change handler
//                 items={[
//                   { value: '', text: 'default' },
//                   { value: 'true', text: 'true' },
//                   { value: 'false', text: 'false' }
//                 ]}
//               />
//             </div>
//           </section>
//           <div className={classes.buttonRow}
//             style={{ marginTop: marginTopAmount() }}
//             >
//               <div>
//                <Button
//                 variant="contained"
//                 color="primary"
//                 className={
//                   isThemeLight
//                     ? `${classes.button} ${classes.saveButtonLight}`
//                     : `${classes.button} ${classes.saveButtonDark}`
//                 }
//                 // onClick={console.log('')}
//                 id="saveButton"
//                 sx={{
//                   textTransform: 'capitalize',
//                   padding: '4px 8px', // Reduces padding inside the button
//                   fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                   minWidth: '64px', // Optionally reduce the minimum width
//                   height: '32px' // Optionally reduce the height
//                 }}                >
//                 Save
//               </Button>
//               </div>
             
//               <div>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   className={
//                     isThemeLight
//                       ? `${classes.button} ${classes.saveButtonLight}`
//                       : `${classes.button} ${classes.saveButtonDark}`
//                   }
//                   // onClick={}
//                   sx={{
//                     textTransform: 'capitalize',
//                     padding: '4px 8px', // Reduces padding inside the button
//                     fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                     minWidth: '64px', // Optionally reduce the minimum width
//                     height: '32px' // Optionally reduce the height
//                   }}                  >
//                   Delete Instance
//                 </Button>
//               </div>
//               <div style={{ marginLeft: '17px' }}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 className={classes.button}
//                 sx={{
//                   textTransform: 'capitalize',
//                   padding: '4px 8px', // Reduces padding inside the button
//                   fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                   minWidth: '64px', // Optionally reduce the minimum width
//                   height: '32px' // Optionally reduce the height
//                 }}  
//                 // onClick={handleUndo}
//               >
//                 <Undo />
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 className={classes.button}
//                 sx={{
//                   textTransform: 'capitalize',
//                   padding: '4px 8px', // Reduces padding inside the button
//                   fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                   minWidth: '64px', // Optionally reduce the minimum width
//                   height: '32px' // Optionally reduce the height
//                 }}  
//                 // onClick={handleRedo}
//               >
//                 <Redo />
//               </Button>
//             </div>
//               </div>
//               </AccordionDetails>
//           </Accordion>

//       {/* TextField Customization Options */}
//       <Accordion className={classes.accordion}>
//         <AccordionSummary className={classes.accordionSummary}>
//           TextField
//         </AccordionSummary>
//         <AccordionDetails className={classes.accordionDetails}>
//           <section className={classes.buttonSection}>
//             <div className={classes.buttonLeftDiv}>
              
//               {/* Color Properties for TextField */}
//               <FormSelector
//                 classes={classes}
//                 selectValue={textFieldColor} // Using muiDisplayMode for Material UI state
//                 handleChange={handleMUIChange} // Using handleMUIChange for Material UI props
//                 title="Color:"
//                 name="textFieldColor" // Matching with the name in the change handler
//                 items={[
//                   { value: '', text: 'default' },
//                   { value: 'primary', text: 'primary' },
//                   { value: 'secondary', text: 'secondary' },
//                   { value: 'error', text: 'error' },
//                   { value: 'info', text: 'info' },
//                   { value: 'success', text: 'success' },
//                   { value: 'warning', text: 'warning' }
//                 ]}
//               />

//               {/* Margin Properties for TextField */}
//               <FormSelector
//                 classes={classes}
//                 selectValue={textFieldMargin} // Using muiDisplayMode for Material UI state
//                 handleChange={handleMUIChange} // Using handleMUIChange for Material UI props
//                 title="Margin:"
//                 name="textFieldMargin" // Matching with the name in the change handler
//                 items={[
//                   { value: '', text: 'default' },
//                   { value: 'dense', text: 'dense' },
//                   { value: 'none', text: 'none' },
//                   { value: 'normal', text: 'normal' }
//                 ]}
//               />

//               {/* Size Properties for TextField */}
//               <FormSelector
//                 classes={classes}
//                 selectValue={textFieldSize} // Using muiDisplayMode for Material UI state
//                 handleChange={handleMUIChange} // Using handleMUIChange for Material UI props
//                 title="Size:"
//                 name="textFieldSize" // Matching with the name in the change handler
//                 items={[
//                   { value: '', text: 'default' },
//                   { value: 'small', text: 'small' },
//                   { value: 'medium', text: 'medium' },
//                 ]}
//               />

//               {/* Variant Properties for TextField */}
//               <FormSelector
//                 classes={classes}
//                 selectValue={textFieldVariant} // Using muiDisplayMode for Material UI state
//                 handleChange={handleMUIChange} // Using handleMUIChange for Material UI props
//                 title="Variant:"
//                 name="textFieldVariant" // Matching with the name in the change handler
//                 items={[
//                   { value: '', text: 'default' },
//                   { value: 'filled', text: 'filled' },
//                   { value: 'outlined', text: 'outlined' },
//                   { value: 'standard', text: 'standard' }
//                 ]}
//               />

//               {/* Name Properties for TextField */}
//               <div className={classes.configRow}>
//                 <div
//                   className={
//                     isThemeLight
//                       ? `${classes.configType} ${classes.lightThemeFontColor}`
//                       : `${classes.configType} ${classes.darkThemeFontColor}`
//                   }
//                 >
//                   <h3>Name:</h3>
//                 </div>
//                 <div className={classes.configValue}>
//                   <FormControl className={classes.formControl}>
//                     <TextField
//                       name="name"
//                       className={classes.select}
//                       inputProps={{
//                         className: isThemeLight
//                           ? `${classes.selectInput} ${classes.lightThemeFontColor}`
//                           : `${classes.selectInput} ${classes.darkThemeFontColor}`
//                       }}
//                       // value={BGColor}
//                       // onChange={handleChange}
//                       placeholder="ReacType"
//                     />
//                   </FormControl>
//                 </div>
//               </div>
//                 {/* Placeholder div for TextField */}
//               <div className={classes.configRow}>
//                 <div
//                   className={
//                     isThemeLight
//                       ? `${classes.configType} ${classes.lightThemeFontColor}`
//                       : `${classes.configType} ${classes.darkThemeFontColor}`
//                   }
//                 >
//                   <h3>Placeholder:</h3>
//                 </div>
//                 <div className={classes.configValue}>
//                   <FormControl className={classes.formControl}>
//                     <TextField
//                       name="placeholder"
//                       className={classes.select}
//                       inputProps={{
//                         className: isThemeLight
//                           ? `${classes.selectInput} ${classes.lightThemeFontColor}`
//                           : `${classes.selectInput} ${classes.darkThemeFontColor}`
//                       }}
//                       // value={BGColor}
//                       // onChange={handleChange}
//                       placeholder="ReacType"
//                     />
//                   </FormControl>
//               </div>              
//             </div>

//               {/* Id div for TextField */}
//               <div className={classes.configRow}>
//                 <div
//                   className={
//                     isThemeLight
//                       ? `${classes.configType} ${classes.lightThemeFontColor}`
//                       : `${classes.configType} ${classes.darkThemeFontColor}`
//                   }
//                 >
//                   <h3>Id:</h3>
//                 </div>
//                 <div className={classes.configValue}>
//                   <FormControl className={classes.formControl}>
//                     <TextField
//                       name="id"
//                       className={classes.select}
//                       inputProps={{
//                         className: isThemeLight
//                           ? `${classes.selectInput} ${classes.lightThemeFontColor}`
//                           : `${classes.selectInput} ${classes.darkThemeFontColor}`
//                       }}
//                       // value={BGColor}
//                       // onChange={handleChange}
//                       placeholder="ReacType"
//                     />
//                   </FormControl>
//               </div>              
//             </div>
//            </div>
    
//             {/* textField Right Div */}
//             <div className={classes.buttonRightDiv}>

//               {/* Auto Complete Options for TextField */}
//               <FormSelector
//                 classes={classes}
//                 selectValue={textFieldAutoFocus} // Using muiDisplayMode for Material UI state
//                 handleChange={handleMUIChange} // Using handleMUIChange for Material UI props
//                 title="Auto Focus:"
//                 name="textFieldAutoFocus" // Matching with the name in the change handler
//                 items={[
//                   { value: '', text: 'default' },
//                   { value: 'true', text: 'true' },
//                   { value: 'false', text: 'false' }
//                 ]}
//               />

//               {/* Disable Options for TextField */}
//               <FormSelector
//                 classes={classes}
//                 selectValue={textFieldDisable} // Using muiDisplayMode for Material UI state
//                 handleChange={handleMUIChange} // Using handleMUIChange for Material UI props
//                 title="Disable:"
//                 name="textFieldDisable" // Matching with the name in the change handler
//                 items={[
//                   { value: '', text: 'default' },
//                   { value: 'true', text: 'true' },
//                   { value: 'false', text: 'false' }
//                 ]}
//               />

//               {/* Error Options for TextField */}
//               <FormSelector
//                 classes={classes}
//                 selectValue={textFieldError} // Using muiDisplayMode for Material UI state
//                 handleChange={handleMUIChange} // Using handleMUIChange for Material UI props
//                 title="Error:"
//                 name="textFieldError" // Matching with the name in the change handler
//                 items={[
//                   { value: '', text: 'default' },
//                   { value: 'true', text: 'true' },
//                   { value: 'false', text: 'false' }
//                 ]}
//               />

//               {/* Full Width Options for TextField */}
//               <FormSelector
//                 classes={classes}
//                 selectValue={textFieldFullWidth} // Using muiDisplayMode for Material UI state
//                 handleChange={handleMUIChange} // Using handleMUIChange for Material UI props
//                 title="Full Width:"
//                 name="textFieldFullWidth" // Matching with the name in the change handler
//                 items={[
//                   { value: '', text: 'default' },
//                   { value: 'true', text: 'true' },
//                   { value: 'false', text: 'false' }
//                 ]}
//               />

//               {/* Multiline Options for TextField */}
//               <FormSelector
//                 classes={classes}
//                 selectValue={textFieldMultiline} // Using muiDisplayMode for Material UI state
//                 handleChange={handleMUIChange} // Using handleMUIChange for Material UI props
//                 title="Multiline:"
//                 name="textFieldMultiline" // Matching with the name in the change handler
//                 items={[
//                   { value: '', text: 'default' },
//                   { value: 'true', text: 'true' },
//                   { value: 'false', text: 'false' }
//                 ]}
//               />
//             </div>
//           </section>
//           <div className={classes.buttonRow}
//             style={{ marginTop: marginTopAmount() }}
//             >
//               <div>
//                <Button
//                 variant="contained"
//                 color="primary"
//                 className={
//                   isThemeLight
//                     ? `${classes.button} ${classes.saveButtonLight}`
//                     : `${classes.button} ${classes.saveButtonDark}`
//                 }
//                 // onClick={console.log('')}
//                 id="saveButton"
//                 sx={{
//                   textTransform: 'capitalize',
//                   padding: '4px 8px', // Reduces padding inside the button
//                   fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                   minWidth: '64px', // Optionally reduce the minimum width
//                   height: '32px' // Optionally reduce the height
//                 }}                >
//                 Save
//               </Button>
//               </div>
             
//               <div>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   className={
//                     isThemeLight
//                       ? `${classes.button} ${classes.saveButtonLight}`
//                       : `${classes.button} ${classes.saveButtonDark}`
//                   }
//                   // onClick={}
//                   sx={{
//                     textTransform: 'capitalize',
//                     padding: '4px 8px', // Reduces padding inside the button
//                     fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                     minWidth: '64px', // Optionally reduce the minimum width
//                     height: '32px' // Optionally reduce the height
//                   }}                  >
//                   Delete Instance
//                 </Button>
//               </div>
//               <div style={{ marginLeft: '17px' }}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 className={classes.button}
//                 sx={{
//                   textTransform: 'capitalize',
//                   padding: '4px 8px', // Reduces padding inside the button
//                   fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                   minWidth: '64px', // Optionally reduce the minimum width
//                   height: '32px' // Optionally reduce the height
//                 }}  
//                 // onClick={handleUndo}
//               >
//                 <Undo />
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 className={classes.button}
//                 sx={{
//                   textTransform: 'capitalize',
//                   padding: '4px 8px', // Reduces padding inside the button
//                   fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                   minWidth: '64px', // Optionally reduce the minimum width
//                   height: '32px' // Optionally reduce the height
//                 }}  
//                 // onClick={handleRedo}
//               >
//                 <Redo />
//               </Button>
//             </div>
//               </div>
//               </AccordionDetails>
//           </Accordion>

//       {/* Card Customization Options */}
//       <Accordion className={classes.accordion}>
//         <AccordionSummary className={classes.accordionSummary}>
//           Card
//         </AccordionSummary>
//         <AccordionDetails className={classes.accordionDetails}>
//           <section className={classes.buttonSection}>
//           <div style={{ display: 'flex', flexDirection: 'column' }}>
//             {/* {renderPropInputs(inputPropsArray2)} */}
//             <FormSelector
//               classes={classes}
//               selectValue={cardRaised}
//               handleChange={handleMUIChange}
//               title="Raised:"
//               name="cardRaised"
//               items={[
//                 { value: '', text: 'default' },
//                 { value: 'false', text: 'false' },
//                 { value: 'true', text: 'true' },
//               ]}
//               /> 
//           </div>
//           </section>
//           <div className={classes.buttonRow}
//             style={{ marginTop: marginTopAmount() }}
//             >
//               <div>
//                <Button
//                 variant="contained"
//                 color="primary"
//                 className={
//                   isThemeLight
//                     ? `${classes.button} ${classes.saveButtonLight}`
//                     : `${classes.button} ${classes.saveButtonDark}`
//                 }
//                 // onClick={console.log('')}
//                 id="saveButton"
//                 sx={{
//                   textTransform: 'capitalize',
//                   padding: '4px 8px', // Reduces padding inside the button
//                   fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                   minWidth: '64px', // Optionally reduce the minimum width
//                   height: '32px' // Optionally reduce the height
//                 }}                >
//                 Save
//               </Button>
//               </div>
             
//               <div>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   className={
//                     isThemeLight
//                       ? `${classes.button} ${classes.saveButtonLight}`
//                       : `${classes.button} ${classes.saveButtonDark}`
//                   }
//                   // onClick={}
//                   sx={{
//                     textTransform: 'capitalize',
//                     padding: '4px 8px', // Reduces padding inside the button
//                     fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                     minWidth: '64px', // Optionally reduce the minimum width
//                     height: '32px' // Optionally reduce the height
//                   }}                  >
//                   Delete Instance
//                 </Button>
//               </div>
//               <div style={{ marginLeft: '17px' }}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 className={classes.button}
//                 sx={{
//                   textTransform: 'capitalize',
//                   padding: '4px 8px', // Reduces padding inside the button
//                   fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                   minWidth: '64px', // Optionally reduce the minimum width
//                   height: '32px' // Optionally reduce the height
//                 }}  
//                 // onClick={handleUndo}
//               >
//                 <Undo />
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 className={classes.button}
//                 sx={{
//                   textTransform: 'capitalize',
//                   padding: '4px 8px', // Reduces padding inside the button
//                   fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                   minWidth: '64px', // Optionally reduce the minimum width
//                   height: '32px' // Optionally reduce the height
//                 }}  
//                 // onClick={handleRedo}
//               >
//                 <Redo />
//               </Button>
//             </div>
//               </div>
//               </AccordionDetails>
//           </Accordion>

//       {/* Typography Customization Options */}
//       <Accordion className={classes.accordion}>
//         <AccordionSummary className={classes.accordionSummary}>
//           Typography
//           </AccordionSummary>
//         <AccordionDetails className={classes.accordionDetails}>
//           <section className={classes.buttonSection}>
//           <div style={{ display: 'flex', flexDirection: 'column' }}>
//             {/* {renderPropInputs(inputPropsArray2)} */}
//             <FormSelector
//               classes={classes}
//               selectValue={typographyAlign}
//               handleChange={handleMUIChange}
//               title="Align:"
//               name="typographyAlign"
//               items={[
//                 { value: '', text: 'default' },
//                 { value: 'center', text: 'center' },
//                 { value: 'inherit', text: 'inherit' },
//                 { value: 'justify', text: 'justify' },
//                 { value: 'left', text: 'left' },
//                 { value: 'right', text: 'right' },
//               ]}
//               />
//                <FormSelector
//               classes={classes}
//               selectValue={typographyGutterBottom}
//               handleChange={handleMUIChange}
//               title="GutterBottom:"
//               name="typographyGutterBottom"
//               items={[
//                 { value: '', text: 'default' },
//                 { value: 'true', text: 'true' },
//                 { value: 'false', text: 'false' },
//               ]}
//               /> 
//                <FormSelector
//               classes={classes}
//               selectValue={typographyNoWrap}
//               handleChange={handleMUIChange}
//               title="noWrap:"
//               name="typographyNoWrap"
//               items={[
//                 { value: '', text: 'default' },
//                 { value: 'true', text: 'true' },
//                 { value: 'false', text: 'false' },
//               ]}
//               />
//               </div>
//           <div className={classes.buttonRightDiv}>
//             <FormSelector
//               classes={classes}
//               selectValue={typographyParagraph}
//               handleChange={handleMUIChange}
//               title="Paragraph:"
//               name="typographyParagraph"
//               items={[
//                 { value: '', text: 'default' },
//                 { value: 'true', text: 'true' },
//                 { value: 'false', text: 'false' },
//               ]}
//               /> 
//               <FormSelector
//               classes={classes}
//               selectValue={typographyVariant}
//               handleChange={handleMUIChange}
//               title="Variant:"
//               name="typographyVariant"
//               items={[
//                 { value: '', text: 'default' },
//                 { value: 'body1', text: 'body1' },
//                 { value: 'body2', text: 'body2' },
//                 { value: 'button', text: 'button' },
//                 { value: 'caption', text: 'caption' },
//                 { value: 'h1', text: 'h1' },
//                 { value: 'h2', text: 'h2' },
//                 { value: 'h3', text: 'h3' },
//                 { value: 'h4', text: 'h4' },
//                 { value: 'h5', text: 'h5' },
//                 { value: 'h6', text: 'h6' },
//                 { value: 'inherit', text: 'inherit' },
//                 { value: 'overline', text: 'overline' },
//                 { value: 'subtitle1', text: 'subtitle1' },
//                 { value: 'subtitle2', text: 'subtitle2' },
//                 { value: 'justify', text: 'justify' },
//                 { value: 'left', text: 'left' },
//                 { value: 'right', text: 'right' },
//               ]}
//               />
//               </div>
//               </section>
//               <div className={classes.buttonRow}
//             style={{ marginTop: marginTopAmount() }}
//             >
//               <div>
//                <Button
//                 variant="contained"
//                 color="primary"
//                 className={
//                   isThemeLight
//                     ? `${classes.button} ${classes.saveButtonLight}`
//                     : `${classes.button} ${classes.saveButtonDark}`
//                 }
//                 // onClick={console.log('')}
//                 id="saveButton"
//                 sx={{
//                   textTransform: 'capitalize',
//                   padding: '4px 8px', // Reduces padding inside the button
//                   fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                   minWidth: '64px', // Optionally reduce the minimum width
//                   height: '32px' // Optionally reduce the height
//                 }}              >
//                 Save
//               </Button>
//               </div>
             
//               <div>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   className={
//                     isThemeLight
//                       ? `${classes.button} ${classes.saveButtonLight}`
//                       : `${classes.button} ${classes.saveButtonDark}`
//                   }
//                   // onClick={}
//                   sx={{
//                     textTransform: 'capitalize',
//                     padding: '4px 8px', // Reduces padding inside the button
//                     fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                     minWidth: '64px', // Optionally reduce the minimum width
//                     height: '32px' // Optionally reduce the height
//                   }}                  >
//                   Delete Instance
//                 </Button>
//               </div>
//               <div style={{ marginLeft: '17px' }}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 className={classes.button}
//                 sx={{
//                   textTransform: 'capitalize',
//                   padding: '4px 8px', // Reduces padding inside the button
//                   fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                   minWidth: '64px', // Optionally reduce the minimum width
//                   height: '32px' // Optionally reduce the height
//                 }}  
//                 // onClick={handleUndo}
//               >
//                 <Undo />
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 className={classes.button}
//                 // onClick={handleRedo}
//                 sx={{
//                   textTransform: 'capitalize',
//                   padding: '4px 8px', // Reduces padding inside the button
//                   fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                   minWidth: '64px', // Optionally reduce the minimum width
//                   height: '32px' // Optionally reduce the height
//                 }}  
//               >
//                 <Redo />
//               </Button>
//             </div>
//               </div>
//               </AccordionDetails>
//           </Accordion>

//           {/* AutoComplete Customization Options */}
//           <Accordion className={classes.accordion}>
//         <AccordionSummary className={classes.accordionSummary}>
//           AutoComplete
//         </AccordionSummary>
//         <AccordionDetails className={classes.accordionDetails}>
//           <section className={classes.buttonSection}>
//           <div style={{ display: 'flex', flexDirection: 'column' }}>
//             {/* {renderPropInputs(inputPropsArray2)} */}
//             <FormSelector
//               classes={classes}
//               selectValue={cardRaised}
//               handleChange={handleMUIChange}
//               title="Raised:"
//               name="cardRaised"
//               items={[
//                 { value: '', text: 'default' },
//                 { value: 'false', text: 'false' },
//                 { value: 'true', text: 'true' },
//               ]}
//               /> 
//           </div>
//           </section>
//           <div className={classes.buttonRow}
//             style={{ marginTop: marginTopAmount() }}
//             >
//               <div>
//                <Button
//                 variant="contained"
//                 color="primary"
//                 className={
//                   isThemeLight
//                     ? `${classes.button} ${classes.saveButtonLight}`
//                     : `${classes.button} ${classes.saveButtonDark}`
//                 }
//                 // onClick={console.log('')}
//                 id="saveButton"
//                 sx={{
//                   textTransform: 'capitalize',
//                   padding: '4px 8px', // Reduces padding inside the button
//                   fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                   minWidth: '64px', // Optionally reduce the minimum width
//                   height: '32px' // Optionally reduce the height
//                 }}                >
//                 Save
//               </Button>
//               </div>
             
//               <div>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   className={
//                     isThemeLight
//                       ? `${classes.button} ${classes.saveButtonLight}`
//                       : `${classes.button} ${classes.saveButtonDark}`
//                   }
//                   // onClick={}
//                   sx={{
//                     textTransform: 'capitalize',
//                     padding: '4px 8px', // Reduces padding inside the button
//                     fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                     minWidth: '64px', // Optionally reduce the minimum width
//                     height: '32px' // Optionally reduce the height
//                   }}                  >
//                   Delete Instance
//                 </Button>
//               </div>
//               <div style={{ marginLeft: '17px' }}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 className={classes.button}
//                 sx={{
//                   textTransform: 'capitalize',
//                   padding: '4px 8px', // Reduces padding inside the button
//                   fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                   minWidth: '64px', // Optionally reduce the minimum width
//                   height: '32px' // Optionally reduce the height
//                 }}  
//                 // onClick={handleUndo}
//               >
//                 <Undo />
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 className={classes.button}
//                 sx={{
//                   textTransform: 'capitalize',
//                   padding: '4px 8px', // Reduces padding inside the button
//                   fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                   minWidth: '64px', // Optionally reduce the minimum width
//                   height: '32px' // Optionally reduce the height
//                 }}  
//                 // onClick={handleRedo}
//               >
//                 <Redo />
//               </Button>
//             </div>
//               </div>
//               </AccordionDetails>
//           </Accordion>


//           {/* ButtonGroup Customization Options */}
//           <Accordion className={classes.accordion}>
//         <AccordionSummary className={classes.accordionSummary}>
//         ButtonGroup
//         </AccordionSummary>
//         <AccordionDetails className={classes.accordionDetails}>
//           <section className={classes.buttonSection}>
//           <div className={classes.buttonLeftDiv}>
//           <div style={{ display: 'flex', flexDirection: 'column' }}>
          
//             <FormSelector
//               classes={classes}
//               selectValue={buttonGroupColor}
//               handleChange={handleMUIChange}
//               title="Color:"
//               name="buttonGroupColor"
//               items={[
//                 { value: '', text: 'default' },
//                 { value: 'primary', text: 'primary' },
//                 { value: 'secondary', text: 'secondary' },
//                 { value: 'error', text: 'error' },
//                 { value: 'info', text: 'info' },
//                 { value: 'success', text: 'success' },
//                 { value: 'warning', text: 'warning' }
//               ]}
//               /> 

//             <FormSelector
//               classes={classes}
//               selectValue={buttonGroupOrientation}
//               handleChange={handleMUIChange}
//               title="Orientation:"
//               name="buttonGroupOrientation"
//               items={[
//                 { value: '', text: 'default' },
//                 { value: 'horizontal', text: 'horizontal' },
//                 { value: 'vertical', text: 'vertical' },
//               ]}
//               />  

//             <FormSelector
//               classes={classes}
//               selectValue={buttonGroupSize}
//               handleChange={handleMUIChange}
//               title="Size:"
//               name="buttonGroupSize"
//               items={[
//                 { value: '', text: 'default' },
//                 { value: 'small', text: 'small' },
//                 { value: 'medium', text: 'medium' },
//                 { value: 'large', text: 'large' },
//               ]}
//               />

//             <FormSelector
//               classes={classes}
//               selectValue={buttonGroupVariant}
//               handleChange={handleMUIChange}
//               title="Variant:"
//               name="buttonGroupVariant"
//               items={[
//                 { value: '', text: 'default' },
//                 { value: 'contained', text: 'contained' },
//                 { value: 'outlined', text: 'outlined' },
//                 { value: 'text', text: 'text' },
//               ]}
//               /> 

//             <FormSelector
//                 classes={classes}
//                 selectValue={buttonGroupDisable} 
//                 handleChange={handleMUIChange} 
//                 title="Disable:"
//                 name="buttonGroupDisable" 
//                 items={[
//                   { value: '', text: 'default' },
//                   { value: 'true', text: 'true' },
//                   { value: 'false', text: 'false' }
//                 ]}
//               />

//             </div>
//           </div>

//           <div className={classes.buttonRightDiv}>
            
//           <FormSelector
//                 classes={classes}
//                 selectValue={buttonGroupDisable} 
//                 handleChange={handleMUIChange} 
//                 title="Disable:"
//                 name="buttonGroupDisable" 
//                 items={[
//                   { value: '', text: 'default' },
//                   { value: 'true', text: 'true' },
//                   { value: 'false', text: 'false' }
//                 ]}
//               />

            
//           </div>

//           </section>
//           <div className={classes.buttonRow}
//             style={{ marginTop: marginTopAmount() }}
//             >
//               <div>
//                <Button
//                 variant="contained"
//                 color="primary"
//                 className={
//                   isThemeLight
//                     ? `${classes.button} ${classes.saveButtonLight}`
//                     : `${classes.button} ${classes.saveButtonDark}`
//                 }
//                 // onClick={console.log('')}
//                 id="saveButton"
//                 sx={{
//                   textTransform: 'capitalize',
//                   padding: '4px 8px', // Reduces padding inside the button
//                   fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                   minWidth: '64px', // Optionally reduce the minimum width
//                   height: '32px' // Optionally reduce the height
//                 }}                >
//                 Save
//               </Button>
//               </div>
             
//               <div>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   className={
//                     isThemeLight
//                       ? `${classes.button} ${classes.saveButtonLight}`
//                       : `${classes.button} ${classes.saveButtonDark}`
//                   }
//                   // onClick={}
//                   sx={{
//                     textTransform: 'capitalize',
//                     padding: '4px 8px', // Reduces padding inside the button
//                     fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                     minWidth: '64px', // Optionally reduce the minimum width
//                     height: '32px' // Optionally reduce the height
//                   }}                  >
//                   Delete Instance
//                 </Button>
//               </div>
//               <div style={{ marginLeft: '17px' }}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 className={classes.button}
//                 sx={{
//                   textTransform: 'capitalize',
//                   padding: '4px 8px', // Reduces padding inside the button
//                   fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                   minWidth: '64px', // Optionally reduce the minimum width
//                   height: '32px' // Optionally reduce the height
//                 }}  
//                 // onClick={handleUndo}
//               >
//                 <Undo />
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 className={classes.button}
//                 sx={{
//                   textTransform: 'capitalize',
//                   padding: '4px 8px', // Reduces padding inside the button
//                   fontSize: '0.75rem', // Reduces the font size for a smaller overall appearance
//                   minWidth: '64px', // Optionally reduce the minimum width
//                   height: '32px' // Optionally reduce the height
//                 }}  
//                 // onClick={handleRedo}
//               >
//                 <Redo />
//               </Button>
//             </div>
//               </div>
//               </AccordionDetails>
//           </Accordion>

//           </div>

//   );
// };

// const useStyles = makeStyles({
//   select: {
//     fontSize: '1em',
//     borderRadius: '10px',
//     '> .MuiSelect-icon': {
//       color: '#C6C6C6'
//     }
//   },
//   selectInput: {
//     paddingTop: '15px',
//     paddingLeft: '15px'
//   },
//   formControl: {
//     minWidth: '125px',
//     '&:focus-within': {
//       backgroundColor: 'black', // Attempting to style the control on focus
//     }
//   },
//   configRow: {
//     display: 'flex',
//     paddingLeft: '25px',
//     paddingRight: '25px',
//     marginTop: '20px'
//   },
//   configType: {
//     minWidth: '185px',
//     fontSize: '85%'
//   },
//   configValue: {
//     marginLeft: '20px'
//   },
//   buttonRow: (isThemeLight) => ({
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     textAlign: 'center',
//     marginLeft: '15px',
//     '& > .MuiButton-textSecondary': {
//       color: isThemeLight ? '#808080' : '#ECECEA', // color for delete page
//       border: isThemeLight ? '1px solid #808080' : '1px solid #ECECEA'
//     }
//   }),
//   button: {
//     fontSize: '1rem',
//     padding: '9px 35px',
//     margin: '10px 15px 0 0',
//     borderRadius: '8px'
//   },
//   saveButtonLight: {
//     border: '1px solid #0671e3',
//     backgroundColor: 'rgba(0, 0, 0, 0.2)'
//   },
//   saveButtonDark: {
//     border: '1px solid #3c59ba'
//   },
//   compName: {
//     fontSize: '1rem'
//   },
//   rootCompName: {
//     fontSize: '1.75rem'
//   },
//   // 'Parent Component' font size
//   configHeader: {
//     '& > h4': {
//       fontSize: '1rem',
//       letterSpacing: '0.5px',
//       marginBottom: '10px',
//       marginTop: '10px'
//     }
//   },
//   rootConfigHeader: {
//     height: '70px',
//     '& > h4': {
//       fontSize: '1.75rem',
//       letterSpacing: '0.5px',
//       marginBottom: '0',
//       marginTop: '30px'
//     }
//   },
//   lightThemeFontColor: {
//     color: 'white'
//   },
//   darkThemeFontColor: {
//     color: '#fff'
//   },
//   buttonSection: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start' // Align items to the top
//   },
//   buttonLeftDiv: {
//     flex: '0 0 48%', // Adjust width as needed
//     marginRight: '16px' // Add margin between divs
//   },
//   buttonRightDiv: {
//     flex: '0 0 48%', // Adjust width as needed
//     marginLeft: '16px' // Add margin between divs
//   },
//   accordion: {
//     backgroundColor: 'black',
//     color: 'white',
//     justifyContent: 'center',
  
//   },
//   accordionDetails: {
//     backgroundColor: 'black',
//     color: 'white',

//   },
//   accordionSummary: {
//     justifyContent: 'center',
//     backgroundColor: 'black',
//   },
// });

// export default MUIProps;