<p align="center">
  <img width="100" src="https://i.imgur.com/Yn70tqI.png">
  <h1 align="center">ReacType Change Log</h1>
</p>

**Version 11.0.0 Changes:**

- Added Next.js functionality
  - Next.js projects will generate the right code needed for exporting a Next.js application
  - Link & Image elements have been added
  - Link components are able to couple with a page to enable SSR
  - Current canvas can be saved as a page to be coupled with a Next.js Link element
  - Image element can accept special attribute that allow for it to optimize performance
- Added Redux and began migrating some state over for ease of development (debugging & readability)
- Fixed bug causing electron to crash when closing the window rather than going to file > exit
- Fixed bug causing app to crash when project was changed to either Next.js or Gatsby.js
- Fixed GitHub OAuth
  - added Passport.js & Passport-Github libraries for strategies which takes care of all the credential exchanges and session information
  - linked electron front end to talk to backend to exchange credentials
- Fixed code preview not displaying properly
- Fixed dark mode not syncing properly across pages

**Version 11.0.0 Stretch Features:**

- Move more state away from the react hook & context API and into the Redux store
  - This will be very time consuming but will make implementing new features much easier
  - Highly suggest you read Redux documentation on best practices before diving into this
  - This will improve performance by reducing the amount of unneccessary re-render. The context API causes certain pieces of state to be needlessly coupled
  - Debugging is much easier by the use of Redux dev tools which allow time travel debugging
  - Code will be easier to read and thus data flow will be easier to visualize
- Tried to implement peer to peer communication via webRTC with redux swarmlog but was not successful. Look into websockets.
- Save project (state) onto local storage for guests
