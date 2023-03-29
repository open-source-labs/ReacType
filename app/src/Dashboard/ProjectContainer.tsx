import React, { useState} from 'react';
import { ThemeProvider, Theme, StyledEngineProvider, useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { useQuery } from '@apollo/client';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { GET_PROJECTS } from './gqlStrings';
import Project from './Project';
import NavBarDash from './NavbarDash';
import { useSelector } from 'react-redux';
import { theme1, theme2 } from '../public/styles/theme';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


// Implement Apollo Client useQuery hook to retrieve data from the server through graphQL. This includes 2 steps:
// 1) Impliment Apollo Provider in the top component in ./src/index.js, this allows children components access to the queried data
// 2) useQuery hook will update the data stored in Apollo Client's cache and automatically trigger child components rendering


// setting light and dark themes (navbar and background); linked to theme.ts
const lightTheme = theme1;
const darkTheme = theme2; // dark mode color in theme.ts not reached

const arrToComponent = arr =>
  arr.map((proj, index) => (
    <Project
      key={index}
      name={proj.name}
      likes={proj.likes}
      published={proj.published}
      userId={proj.userId}
      username={proj.username}
      createdAt={proj.createdAt}
      id={proj.id}
      comments={proj.comments}
    />
  ));

// Start Pulled from materialUI to create a tab panel
const a11yProps = (index: any) => ({
  id: `vertical-tab-${index}`,
  'aria-controls': `vertical-tabpanel-${index}`
});

interface LinkTabProps {
  label?: string;
  href?: string;
}
const LinkTab = (props: LinkTabProps) => (
  <Tab
    onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
    }}
    {...props}
  />
);
const TabPanelItem = (props: TabPanelProps): JSX.Element => {
  const theme = useTheme();
  const { children, index, value, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    display: 'flex'
  },
  tabs: {
    // borderRight: `1px solid ${theme.palette.divider}`
  }
}));
// End of prefab code to generate a tab panel
const ProjectContainer = (): JSX.Element => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  // old code from project container
  const myVar = {};
  // Need this for the individual user dasboard, for now, dashboard shows all projects from all users
  const userSSID = window.localStorage.getItem('ssid') || 'unavailable';
  const username = window.localStorage.getItem('username') || 'unavailable';
  const [isThemeLight, setTheme] = useState(true);
  const style = useSelector(store => store.styleSlice)
  // hook for sorting menu
  const [selectedOption, setSelectedOption] = useState('RATING');
  const sortByRating = projects => {
    // generate a sorted array of public projects based on likes
    const sortedRatings = projects.sort((a, b) => b.likes - a.likes);
    return sortedRatings;
  };
  const sortByDate = projects => {
    // generate a sorted array of public projects based on date
    const sortedRatings = projects.sort((a, b) => b.createdAt - a.createdAt);
    return sortedRatings;
  };
  const sortByUser = projects => {
    // generate a sorted array of public projects based on username
    const sortedRatings = projects.sort((a, b) => b.username - a.username);
    return sortedRatings;
  };
  // function for selecting drop down sorting menu
  const optionClicked = value => {
    setSelectedOption(value);
  };
  // useQuery hook abstracts fetch request
  const { loading, error, data } = useQuery(GET_PROJECTS, {
    pollInterval: 2000,
    variables: myVar
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error}</p>;
  // based on resolver(getAllProject) for this query, the data is stored in the data object with the key 'getAllProjects'
  const projects = data.getAllProjects;
  
  //create array to hold the data recieved in the public dashboard the will be conditionally rendered
  let sortedProjects = projects.filter(proj => {
    return proj.published;
  });
  const userProjects = projects.filter(proj => {
    return proj.username === username;
  });
  // checking which sorting method was selected from drop down menu and invoking correct sorting function
  if (selectedOption === 'DATE') sortedProjects = sortByDate(sortedProjects);
  else if (selectedOption === 'USER')
    sortedProjects = sortByUser(sortedProjects);
  else if (selectedOption === 'RATING')
    sortedProjects = sortByRating(sortedProjects);
  // create array to hold the components Project of loggin-in users
  // generate an array of Project components based on queried data
  const userDisplay = arrToComponent(userProjects);
  // create an array of components Project that will be conditionally rendered
  const sortedDisplay = arrToComponent(sortedProjects);
  // old code from Project Container
  return (
    <div className={classes.root}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={isThemeLight ? lightTheme : darkTheme}>
          <div className={'dashboardContainer'}>
            <NavBarDash
              setTheme={setTheme}
              // styles={[style]} 
              isThemeLight={isThemeLight}
              optionClicked={optionClicked}
            />
            <div className={'userDashboard'}>
              <Tabs
                variant="scrollable"
                orientation="vertical"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
              >
                <LinkTab label="Shared Dashboard" {...a11yProps(0)} />
                <LinkTab label="Private Dashboard" {...a11yProps(1)} />
              </Tabs>
              <TabPanelItem className={'projectPanel'} value={value} index={0}>
                <h1> Shared Dashboard </h1>
                <div className="projectContainer">{sortedDisplay}</div>
              </TabPanelItem>
              <TabPanelItem className={'projectPanel'} value={value} index={1}>
                <h1> Private Dashboard </h1>
                <div className="projectContainer">{userDisplay}</div>
              </TabPanelItem>
            </div>
          </div>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};
export default ProjectContainer;
