<p align="center">
  <img width="100" src="https://i.imgur.com/Yn70tqI.png">
  <h1 align="center">ReacType Change Log</h1>
</p>

**Version 20.0.0 Changes**

Changes:<br>

- Developer Improvement:
  - Migrated from Webpack to Vite, improving HMR times drastically
  - Deployed app using Heroku isntead of AWS decreasing time to deployment
- User Features:
  - Collaboration Room:
    - Implemented live chat and video functionality using socket.IO
    - Added authentication and error handling to joining existing rooms
  - UI updates to enhance user experience
    - In addition to drag to add, users are now able to click to add
    - Updated left panel to include user information and settings
    - Added scroll and zoom buttons to canvas. Scroll now automatically scrolls to bottom once enough elements are added
    - Updated UI design to reflect a more modern look
- Bugs Fixed
  - Canvas - All appropriate elements can now be nested - Nested Elements in the code preview now accurately reflect nested elements
  - Bottom Panel - Now opens by onclick instead of hover
  - Users can now delete elements without first clicking it and then the X. This applies to the nested components as well.

Recommendations for Future Enhancements:<br>

- Fix bottom panel to only close upon clicking the icon, and not anywhere else
- Populate settings tab in the left panel with additional functionality
- Allow users to modify code dynamically in the code preview and reflect visual componenets in real time
- Add zoom in and zoom out / scroll functionality to code preview and component tree
- Convert from 95% to 100% typescript
- Add more functionality to the nav bar
- List active rooms to join
- Clean up unnecessary code / comments
- a tags which are nested do not display accurate code in code preview
- Eliminate all unneeded Webpack associated files/folders/etc...
- Remove the many deprecated dependencies
- Allow users to send links/reactions via the chat.
- Implement MUI/Shadcn in addition to standard html elements on left panel so that users are able to start off with pre styled elements

**Version 19.0.0 Changes**

Changes:<br>

- Developer Improvement:
  - Typescript conversion continued and now sits at ~95%
- User Features:
  - Collaboration Room:
    - Bug Fixes:
      - Debug “Leave Room” functionality removing username from the users list
      - Debug “Join Room” functionality so the current canvas does not reset upon new user joining collaboration
      - Debug Code Preview button that sent error if toggled more than once and does not force toggled view to other users in the room
    - Collaboration room is now ready for release (v1)
      - Implemented live cursor tracking with on/off function where multiple users can choose to see the other users mouse cursors in real-time in the same canvas.
      - Added keydown functionality to “Join Room” by triggering button click on keyboard “Enter”
      - Reconfigured web socket initiation to force new connection when joining room
    - Refactored the way changes were being passed to other users in the collaboration room
      - Significantly reduces the amount of data being passed among users by passing only the payload for each individual action, triggering singular updates for other users in the collaboration environment
      - Added Event Emitters for each action that updates canvas
      - Created a websocket service layer to maintain a single socket instance throughout the app
    - User List:
      - Displays the username and mouse cursor of all connected users in a particular room with a specific color scheme
  - UI updated to enhance user experience
    - Rendered MUI Icons in HTML Element Panel
    - Redesigned drag-n-drop to be more intuitive and professionalize application design.
    - Updated styling to overall style and theme to maintain consistency across the application
    - Removed Tailwind and CSS save buttons in Customization panel for cleaner UI and drying up repetitive functionality

Recommendations for Future Enhancements:<br>

- Fix Undo & Redo functionality. Undo & Redo buttons on the customization page not functioning as expected.
- Update Electron for desktop application use. Resolve electron app functionality to coincide with web app functionality.
- Add Change Log/View Edit History feature in app
- v.17 recommendations regarding the Marketplace are still undeveloped.
- Expand testing coverage. Continue fixing old tests which rely on outdated dependencies, and implementing new tests.
- Continue Typescript conversion. Consider toggling noImplicitAny to find all 'any' cases that can be addressed.
- Continue cleanup of outdated and unused code and files.
- Future teams could look into data structures for scaling on the server side of the app to improve data transmitting and multiple server functionality.
- Continue modularizing code. Many large, unwieldy files that should be broken up into more modular components still exist.
- Fix the reset of context manager and state manager when a user leaves the room.
- Collaboration room:
  - Allow for given HTML components to be nested into custom created components
  - Collaboration Room feature can be further scaled with AWS servers and clients for better experiences. The feature currently is limited to access with only 1 AWS cloud server.
  - True real-time rendering so users can see components as they're being dragged onto the canvas, rather than only when they're placed.
  - List of active rooms so users can simply pick one to join. Will likely be paired with a password feature for security, so only users with the proper credentials can join a particular room.
  - Chat Feature in Collaboration Room
  - Currently, the live tracking cursor is rendered based on the users username/nickname. If multiple users create the same username/nickname, the most recent username/nickname creator will override the former. Possible solution to this issue could be to store cursor with the socket id rather than username/nickname. "

**Version 18.0.0 Changes**

Changes:<br>

- Developer Improvements:
  - Typescript conversion continued and now sits at ~90%
  - Dev Bug Fixes:
    - Deleted ts-coverage files and added folder to git.ignore so TS conversion status is properly reflected on the GitHub repository.
    - Cleaned up outdated code and removed multiple unused and duplicate files, particularly those related to the now-obsolete Dark Mode functionality and some other lingering code from the v.17 migration.
  - Modularity:
    - Migrated large portions of RoomContainer functionality into smaller components to improve the reusability of code.
    - Created more interface types for reusability to multiple parts of the applications.
- User Features:
  - Collaboration Room:
    - Implemented room functionality where multiple users can see and interact with the same canvas state in real time.
    - Dynamically handles the host logic of the collab room, where the oldest connected client is the one serving the room's state.
    - Fixed backend web socket connections with the clients, allowing full duplex connections between multiple clients and servers.
    - Note: The collaboration room is in beta
  - User List:
    - List that displays all connected users in a particular room.
    - Dynamically updates when users join or leave a room.
    - Automatically updates the new host in the room to the next oldest user.
  - Join/Nickname Button:
    - Allows users to specify which room to join, and what name to display upon joining the room.
    - The button only shows when the user is not connected to the room, requiring both fields to be filled out.

Recommendations for Future Enhancements:<br>

- Chat functionality so users in the same room can discuss their projects.
- List of active rooms so users can simply pick one to join. Will likely be paired with a password feature for security, so only users with the proper credentials can join a particular room.
- True real-time rendering so users can see components as they're being dragged onto the canvas, rather than only when they're placed.
- Optimize performance of room state updates
- v.17 recommendations regarding the Marketplace are still undeveloped.
- Solve residual bugs. Undo & Redo buttons on the customization page not functioning as expected. Backend bugs persist as seen in the console when running the dev environment. Persistent Redux error that causes page to rerender more often than necessary.
- Resolve electron app functionality to coincide with web app functionality.
- For the state manager option in the data table there is a MuiData-menu that is not visible when clicking it and after the filter option is clicked it creates a white space in the bottom of the page.
- Expand testing coverage. Continue fixing old tests which rely on outdated dependencies, and implementing new tests.
- Continue modularizing code. Many large, unwieldy files that should be broken up into more modular components still exist.
- Continue Typescript conversion. Consider toggling noImplicitAny to find all 'any' cases that can be addressed.
- Continue cleanup of outdated and unused code and files.
- Collaboration feature still needs to be improved for scalability with AWS servers and clients for better experiences. The feature currently is limited to access with only 1 AWS cloud server.
- Future teams could look into data structures for scaling on the server side of the app to improve data transmitting and multiple server functionality.

**Version 17.0.0 Changes**

Changes:<br>

- Developer Improvements:
  - Testing Coverage:
    - Version 17 added testing for the added marketplace-related components
    - Testing coverage sits at ~60%
  - Typescript continued and now sits at ~80%
  - Dev Bug Fixes:
    - Additional logic added for edge cases in inputs for state manager (passing in non-Arrays/non-Objects as Array type and Object type).
    - Fixed issue with the bottom panel not dragging or sticking to the mouse when the mouse is over the demo render iframe
    - Cleaned up hundreds of lines of outdated code and archived multiple unused and duplicate files
  - OAuth now linked to standalone Gmail and GitHub accounts
- User Features:
  - UI updated with a modern style for a better developer experience
    - Added many user feedback alerts for a better experience including alerts for when projects are published, cloned, deleted, HTML custom tags are created, context created, or custom components created.
    - Built a specific buttons menu that individually displays the HTML elements, reusable components created, and join room option.
    - Redesigned the state manager panel option to be readable and functional.
    - Drop down menu now closes only when the user clicks outside of the menu
  - Marketplace:
    - Implemented a dedicated area for developers to share their projects
    - Routing handled by React Router
    - Projects can also be cloned to the user's account to be used and edited with the addition of a button
    - Added search functionality to search by username and project name
    - Included a separate section in the Saved Projects and Delete Projects modal in the Manage Project menu for cloned projects from the Marketplace
  - Publish/Unpublish Button:
    - Publish feature on the web app allows users to publish their saved project files into the Marketplace from the main app page
    - Dynamically switches between publish/unpublish depending on whether the loaded project is in the Marketplace

Recommendations for Future Enhancements:<br>

- Add a comment section and description section for each published project
- Consider maybe a way for users to pull individual components from one project into another
- Use localforage or other methods to store unsaved projects either on logout or accidental closure of the browser, so that when the user opens the browser again it is still there.
- Continue expanding testing coverage. Improve testing by adding additional unit tests, expanding end-to-end testing, and introducing integration testing.
- Continue quality Typescript conversion. Continue to fix type errors within component files.
- Modularize appStateSlice file. Further modularization is needed for readability and maintainability.
- Solve residual bugs. Undo & Redo buttons on customization page not functioning as expected. Backend bugs persist as seen in the console when running the dev environment. Resolve electron app functionality to coincide with web app functionality.
- Take a look at the join room functionality using web sockets in order to allow users to collaborate on the same project at the same time.
- For the state manager option in the data table there is a MuiData-menu that is not visible when clicking it and after the filter option is clicked it creates a white space in the bottom of the page.
- Continue code cleanup. Continue cleanup of outdated and unused code and files

**Version 16.0.0 Changes**

Changes:<br>

- Developer Improvements:
  - Testing Coverage:
    - Version 16 introduces end-to-end testing with Playwright and adds additional unit testing with React Testing Library.
    - Testing coverage has now doubled since version 15, and now sits at just over 50% coverage.
    - Transitioned away from Enzyme to maintain consistency with RTL and Jest.
  - Typescript Conversion:
    - Upped typescript coverage from 30% to 80%.
    - Fixed multiple type errors in component files.
  - Added CI pipeline for testing:
    - Transitioned away from Travis CI to Github Actions for improved CI pipeline. Github Actions will now run all tests upon each pull request to dev.
  - Updated OAuth and Sign In Features:
    - Sign in feature now connected to the latest database version.
    - Fixed bug that allowed only one OAuth user to sign in at a time.
    - Github OAuth is now connected to Adam Vanek.
  - Dev Bug Fixes:
    - Debugged ‘worker error’ on code preview & style editor by refactoring Ace-Build components.
    - Additional logic added for edge cases in inputs for context manager, state manager, and signup features.
    - Cleaned up hundreds of lines of outdated code and deleted multiple unused and duplicate files
  - Dependency Updates:
    - All previously outdated dependencies are now updated. Time it takes for the app to bundle in dev is now cut in half.
- User Features:
  - Export Button:
    - Export feature on the web app now allows users to download the current project as a zip file with modularized component folder, html, and css file included.
    - Export feature is now available to all users including guests.
  - CSS Live Rendering:
    - CSS Editor changes now rendered visually in the demo page on save.
  - UI Changes:
    - Fixed multiple contrast issues with white text displaying on white background in State Manger Display tab tables, state management tables, table menu dropdowns, Context Manager tables, and Context Manager display.
    - Adjusted context manager interface for improved UX when creating context and saving key/value pairs.
    - Fixed border styling within modals and error messages that were cutting off inputs on focus.
    - Added save button to customization tab.
  - Bug Fixes:
    - Manage project features for registered users now successfully saves, opens, and deletes projects.
    - State Manager now successfully deletes state from parent components.
    - Context Manager display chart renders correctly.
    - CSS Editor contents now persist after rerender.

Recommendations for Future Enhancements:<br>

- Refactor away from MUI. MUI is very opinionated and while creating components with it is easy it leaves a lot to be desired. Dark Mode also needs to be improved as color contrast is very low.
- Continue expanding testing coverage. Improve testing by adding additional unit tests, expanding end-to-end testing, and introducing integration testing.
- Continue quality Typescript conversion. Continue to fix type errors within component files.
- Modularize appStateSlice file. Further modularization is needed for readability and maintainability.
- Solve residual bugs. Undo & Redo buttons on customization page not functioning as expected. Backend bugs persist as seen in the console when running the dev environment. Resolve electron app functionality to coincide with web app functionality.
- Continue code cleanup. Continue cleanup of outdated and unused code and files

**Version 15.0.0 Changes**

Changes:<br>

- Developer Improvements:
  - Redux Toolkit:
    - Migrated state from a combination of useReducer/useContext and Redux to only using Redux Toolkit. This is the recommended modern approach to handling large state management in this sort of application. Enhances the developer experience by enabling the use of the Redux Devtools to debug, and see state/actions in real-time.
  - Dependency Updates
    - New developers can easily npm install without having to use an older version of node or using --legacy-peer-deps
    - Updated to modern versions to take advantage of newer features
- User Features:
  - Websockets:
    - Users can now join rooms to collaborate in realtime
  - Tailwind CSS:
    - In the customization panel users can now choose between inline CSS and Tailwind. These changes are reflected in the live code preview.
  - OAuth:
    - Users may now log in using OAuth which enhances security, and makes sign in a breeze.
  - Deployed Website:
    - Containerized and deployed a working version of the application. Instead of having to download an application users may now interact live.

Recommendations for Future Enhancements:<br>

- Continue working on State Management. There are some changes that can be made to make the application cleaner. Right now the appStateSlice is a large file which houses a lot of the reducer functions. We believe there is a way to further modularize this to make it simpler to read, and iterate upon in the future.
- Convert to using Vite. While developing we ran into issues with webpack taking a long time to reflect changes. Vite is lightweight and enhances the developer experience.
- Expand Testing Coverage. Making a large move of state management made a lot of the testing innefective since it was based upon old ways.
- Refactor away from MUI. MUI is very opinionated and while creating components with it is easy it leaves a lot to be desired.
- Residual Bugs. While migrating state there are a few lingering bugs within the application. This process should be easier now with Redux Devtools availability, but we did not have time to go through every action and conduct thorough testing.

**Version 14.0.0 Changes**

Changes:<br>

- Added functionality & improvements:
  - Event listeners:
    - Added ability to assign event listeners to elements in the bottom customization tab
    - Can name the function on the event or use the default name provided
    - Updates reflected in the code preview render
  - Live code preview: Bottom tool tabs code preview box updates immediately and automatically to reflect the latest changes in state
  - Converted the annotation button into a delete button on the canvas elements and reusable components
  - Code preview render: The formatting for generated code has been corrected for improved readability
- Major UI changes:
  - Left panel:
    - Only display when mouse hovered over
    - When extended, floats in front of the canvas without affecting the main window formatting
  - Bottom panel
    - Retractable feature added
    - Has internal scroll ability in the tabs
    - Resized functionality is stable
  - Added indicator tabs to each signifying to the user their presence
  - Canvas container (upper left):
    - Changed the formatting to a center column with readable size and label orientation
    - Standardized the size of components and rate of growth when nesting
  - Tutorial:
    - Users can now reference tutorials in split-screen mode without the canvas being auto-cleared when going back and forth from the tutorial
- Bug fixes:
  - Reusable component: The drag-and-drop feature for reusable components is now functioning smoothly and without bugs

Recommendations for Future Enhancements:<br>

- Add function content in the current event listeners' function skeleton.
- The code output formatting in generateCode.ts is currently difficult to read, and could be improved for better readability.
- Currently, the project uses two sets of state management tools: useReducer/useContext and Redux. useReducer/useContext is used for handling the customization state, and Redux for managing the code preview, context manager, and dark mode reducer state. However, there seems to be some confusion around how to integrate these two tools effectively. For instance, both tools are used for managing the code preview state, and changing the useReducer/useContext state would replace the corresponding redux state. Need to clean up the logic and find a solution to solve this issue.
- Some of the files structure is not accurate (e.g., customizationPanel.tsx is in the containers folder instead of the bottom folder), need to rearrange the file hierarchy.
- Update packages and resolve package dependency issues.

**Version 13.0.0 Changes**

New Functionality:<br>

- Manage state locally: Users can now manage state dynamically within nested components using React Hooks within the state manager tab.
- Add/delete props: For a selected component, users can see a list of available props from the parent, add props, and delete props in case they are not - required later on.
- State/props flow: If state or props are deleted upstream, it will automatically update the state for its children components.
- Visualize state/props flow: Within the display sub-tab of the state manager tab, users can visualize an interactive tree diagram depicting the state initialized in the current component and passed down props from the parent component.

Enhancements:<br>

- Live code preview: Live rendering of code based on any changes in the state and dragging and nesting of components.
- Next.js & Gatsby compatibility: New state manager tab is now compatible with next.js and Gatsby.
- Tutorial: Tutorial is functional and has the latest guides to navigate through the newly added state management tab.

Deployment Updates:<br>

- Electron app is now available for Windows users.
- Web based version of the app is available on Heroku.

Bug Fixes:<br>

- User dashboard: The dashboard works now and shows private and shared projects with the ability for users to drop comments.
- Login/logout: Users can now signup/login/logout now on both development and production environments.
- Manage Projects: Github authenticated users are now able to create and save projects.
- Customization: Use State works as expected now within HTML elements.

What’s next:<br>

- Adding on click functionality within components. Goal: Make a fully functional tic-tac-toe app.
- Incorporating material ui into the components so that exported app has visually appealing components.
- Enabling auto save functionality when dragging and dropping components, and amending component state.
- Allowing users to click and access projects within the dashboard for review.
- Adding more integration and E2E testing.
- Fixing bugs in the heroku (web based) deployment: login/logout, GitHub oauth etc.
- Enabling google oauth in all environments.
- Packaging electron app for Linux users.
- Conversion from monolithic to micro services for better scaling in the future.

**Version 12.0.0 Changes**

- Context Visualizer: You can now visually see what component is consuming which context. As you click on the interactive tree, the component assigned to the context will be revealed.
- React 18: Updated to React 18
- Export Feature: Created an exportable context file, integrated with original codebase. Ready to go code: Added boilerplate codes to components based on which contexts they are consuming.

**A note to future contributors**

Attempted to implement Facebook and Google OAuth via passport but as of Electron’s current version, neither of them not compatible with electron.

**Version 11.0.0 Changes:**

- Added Next.js functionality
  - Next.js projects will generate the right code needed for exporting a Next.js application
  - Link & Image elements have been added
  - Link components are able to couple with a page to enable SSR
  - Next Link components have a drop down menu to quickly and easily link pages
  - Current canvas can be saved as a page to be coupled with a Next.js Link element
  - Files are exported with the appropriate Next.js imports and structure
- Added Redux and began migrating some state over for ease of development (debugging & readability)
- Fixed bug causing electron to crash when closing the window rather than going to file > exit
- Fixed bug causing app to crash when project was changed to either Next.js or Gatsby.js
- Fixed GitHub OAuth
  - added Passport.js & Passport-Github libraries for strategies which takes care of all the credential exchanges and session information
  - linked electron front end to talk to backend to exchange credentials
- Fixed code preview not displaying properly
- Fixed demo render preview so that changes in the canvas appears instantly
  - any links in the demo render preview can now be clicked on and it will take you to its related page
- Properties of each component now persist in the customization tab
- Fixed dark mode not syncing properly across pages

**Version 11.0.0 Stretch Features:**

- Move more state away from the react hook & context API and into the Redux store
  - This will be very time consuming but will make implementing new features much easier
  - Highly suggest you read Redux documentation on best practices before diving into this
  - This will improve performance by reducing the amount of unneccessary re-render. The context API causes certain pieces of state to be needlessly coupled
  - Debugging is much easier by the use of Redux dev tools which allow time travel debugging
  - Code will be easier to read and thus data flow will be easier to visualize
  - Don't move **everything** onto Redux. ie: Material UI uses the context API to handle theme changes
- Enable remote work similar to vscode's live share
  - Tried to implement peer to peer communication via webRTC with redux swarmlog but was not successful
  - Look into using websockets
  - Think about security. What features needs to be implemented for secure sharing?
  - Transfer actions through websockets via Redux middleware (Thunk)?
- Save project (state) onto local storage for guests
- Redesign UI to be more flexible
  - Read material ui docs for best practices.
  - creation panel should be redesigned. Its react component structure is too fragmented.
- Add missing Next.js features
  - Image components need sizing & loading options to capitalize on Next.js' Image optimization
