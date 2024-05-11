import { Box } from '@mui/material';
import ComponentsContainer from './ComponentsContainer';
import ElementsContainer from './ElementsContainer';
import React from 'react';
import RoomsContainer from './RoomsContainer';
import ProfilePage from './ProfilePage';
import Settings from './Settings';

interface ContentAreaProps {
  activeTab: number | null;
  isVisible: boolean;
}

/**
 * TabPanel is a functional component that conditionally renders its children
 * based on whether its index matches the currently active tab. This allows for
 * efficient rendering of tabbed content only when the tab is active, improving
 * performance and user experience by not rendering hidden tab content.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The content to be rendered when this tab is active.
 * @param {number | null} props.activeTab - The index of the currently active tab.
 * @param {number} props.index - The index of this specific tab panel.
 * @returns {JSX.Element} A Box component from MUI that renders children if it's the active tab.
 */
const TabPanel: React.FC<{
  children: React.ReactNode;
  activeTab: number | null;
  index: number;
}> = ({ children, activeTab, index }) => {
  return (
    <Box hidden={activeTab !== index}>{activeTab === index && children}</Box>
  );
};

const panels = [
  <ElementsContainer />,
  <ComponentsContainer />,
  <RoomsContainer />,
  <ProfilePage />,
  <Settings />
];

/**
 * ContentArea component that renders different panels based on the active tab.
 * This component acts as a dynamic container for switching between different sections
 * of the application like elements, components, rooms, profile page, and settings
 * depending on user interaction with the tab interface.
 *
 * The visibility of the entire container can be toggled, which is controlled by the `isVisible` prop.
 *
 * @param {Object} props - Component props
 * @param {number | null} props.activeTab - The index of the currently active tab; controls which tab content is visible.
 * @param {boolean} props.isVisible - Flag indicating whether the content area should be displayed.
 * @returns {JSX.Element} The content area component with conditional rendering based on the active tab.
 */
const ContentArea: React.FC<ContentAreaProps> = ({ activeTab, isVisible }) => {
  return (
    <div
      className="left-container"
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <div className="column left">
        {panels.map((panel, idx) => (
          <TabPanel activeTab={activeTab} index={idx} key={idx}>
            {panel}
          </TabPanel>
        ))}
      </div>
    </div>
  );
};

export default ContentArea;
