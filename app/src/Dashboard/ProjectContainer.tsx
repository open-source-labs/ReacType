import React, { useState } from 'react';
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  useTheme
} from '@mui/material/styles';
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
  interface DefaultTheme extends Theme {}
}

// Implement Apollo Client useQuery hook to retrieve data from the server through graphQL. This includes 2 steps:
// 1) Impliment Apollo Provider in the top component in ./src/index.js, this allows children components access to the queried data
// 2) useQuery hook will update the data stored in Apollo Client's cache and automatically trigger child components rendering

// setting light and dark themes (navbar and background); linked to theme.ts
const lightTheme = theme1;
const darkTheme = theme2; // dark mode color in theme.ts not reached

/**
 * Transforms an array of project data into an array of <Project> React components.
 * Each project in the array is passed as props to the <Project> component, creating a list
 * of these components based on the provided array. Each component is given a unique `key` prop
 * based on its index in the array to optimize React's rendering process.
 * @param {Array} arr - An array of project objects, where each object contains project data.
 * @returns {Array<JSX.Element>} An array of <Project> components populated with data from the input array.
 */
const arrToComponent = (arr): Array<JSX.Element> =>
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

/**
 * Generates accessibility props for a tab component within a tab panel. These properties help in
 * linking the tab to its corresponding tab panel, improving accessibility and usability for users
 * with assistive technologies.
 * @param {any} index - The index of the tab and its corresponding panel.
 * @returns {Object} An object containing the `id` and `aria-controls` attributes for accessibility purposes.
 */
const a11yProps = (index: any): Object => ({
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    display: 'flex'
  },
  tabs: {
    // borderRight: `1px solid ${theme.palette.divider}`
  }
}));

/**
 * `ProjectContainer` is a React component that manages the display and sorting of project data retrieved
 * from a GraphQL server using the Apollo Client. It provides a user interface with two dashboards:
 * a shared dashboard that displays all published projects and a private dashboard that shows projects
 * created by the currently logged-in user. The component includes sorting functionality based on project
 * rating, creation date, or user.
 *
 * @returns {JSX.Element} The ProjectContainer component which provides a tabbed interface for navigating
 *                        between shared and private dashboards, each displaying a list of projects.
 *
 * This component utilizes MUI's Tabs for navigation between the dashboards. It leverages the Apollo Client's
 * `useQuery` hook to fetch projects data and automatically update the UI upon data changes. Sorting preferences
 * are managed through local state and applied to the project data based on user interaction. The component
 * supports theming and uses `ThemeProvider` to switch between light and dark themes based on user settings.
 *
 * Dependencies:
 * - Apollo Client: For data fetching and state management with GraphQL.
 * - Material-UI: For UI components and theming.
 * - Redux: For managing application-wide state like theme settings.
 *
 * The component is designed to be responsive and accessible, with appropriate ARIA attributes for navigation
 * and content sections. It includes error handling for data fetching issues and a loading state during data
 * retrieval.
 */
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
  const style = useSelector((store) => store.styleSlice);
  // hook for sorting menu
  const [selectedOption, setSelectedOption] = useState('RATING');
  const sortByRating = (projects) => {
    // generate a sorted array of public projects based on likes
    const sortedRatings = projects.sort((a, b) => b.likes - a.likes);
    return sortedRatings;
  };
  const sortByDate = (projects) => {
    // generate a sorted array of public projects based on date
    const sortedRatings = projects.sort((a, b) => b.createdAt - a.createdAt);
    return sortedRatings;
  };
  const sortByUser = (projects) => {
    // generate a sorted array of public projects based on username
    const sortedRatings = projects.sort((a, b) => b.username - a.username);
    return sortedRatings;
  };
  // function for selecting drop down sorting menu
  const optionClicked = (value) => {
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
  let sortedProjects = projects.filter((proj) => {
    return proj.published;
  });
  const userProjects = projects.filter((proj) => {
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
