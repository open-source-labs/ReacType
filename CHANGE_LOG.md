<p align="center">
  <img width="100" src="https://i.imgur.com/Yn70tqI.png">
  <h1 align="center">ReacType Change Log</h1>
</p>

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
