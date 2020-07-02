import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles(theme => ({card: {width: 135,height: 135,textAlign: 'center'},cardActions: {justifyContent: 'center'}}));
export default 
function BasicComponentStyles() {
    const classes = useStyles();const [count, setCount] = useState(0);
    const onIncrement = () => {setCount(count + 1);};
    return ({count}Increment);
} 
    
    
    //The useStyles() hook is built using the makeStyles() function—which takes the exact same styles argument as withStyles(). By calling useStyles() within the component, you have your classes object. Another important thing to point out is that makeStyles is imported from @material-ui/styles, not @material-ui/core/styles.