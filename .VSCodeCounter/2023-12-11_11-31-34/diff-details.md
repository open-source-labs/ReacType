# Diff Details

Date : 2023-12-11 11:31:34

Directory /Users/rose/Desktop/immersive/ReacType/app

Total : 167 files,  15045 codes, 1183 comments, 1095 blanks, all 17323 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [__tests__/BottomTabs.test.tsx](/__tests__/BottomTabs.test.tsx) | TypeScript JSX | -207 | -3 | -24 | -234 |
| [__tests__/DragAndDrop.test.tsx](/__tests__/DragAndDrop.test.tsx) | TypeScript JSX | -69 | 0 | -9 | -78 |
| [__tests__/NavBar.test.tsx](/__tests__/NavBar.test.tsx) | TypeScript JSX | -222 | -18 | -55 | -295 |
| [__tests__/componentReducer.test.ts](/__tests__/componentReducer.test.ts) | TypeScript | -243 | -36 | -20 | -299 |
| [__tests__/contextReducer.test.js](/__tests__/contextReducer.test.js) | JavaScript | -140 | -25 | -31 | -196 |
| [__tests__/gql.projects.test.ts](/__tests__/gql.projects.test.ts) | TypeScript | -122 | -16 | -6 | -144 |
| [__tests__/helper.test.tsx](/__tests__/helper.test.tsx) | TypeScript JSX | -6 | 0 | -2 | -8 |
| [__tests__/marketplace.test.tsx](/__tests__/marketplace.test.tsx) | TypeScript JSX | -111 | -3 | -20 | -134 |
| [__tests__/playwright/example.spec.ts](/__tests__/playwright/example.spec.ts) | TypeScript | 0 | -13 | -6 | -19 |
| [__tests__/projects.test.ts](/__tests__/projects.test.ts) | TypeScript | -60 | -9 | -3 | -72 |
| [__tests__/server.test.tsx](/__tests__/server.test.tsx) | TypeScript JSX | -320 | -58 | -57 | -435 |
| [__tests__/signIn.test.tsx](/__tests__/signIn.test.tsx) | TypeScript JSX | -49 | 0 | -3 | -52 |
| [__tests__/spec.ts](/__tests__/spec.ts) | TypeScript | -1 | -26 | -6 | -33 |
| [__tests__/stateManagementReducer.test.js](/__tests__/stateManagementReducer.test.js) | JavaScript | -267 | -20 | -23 | -310 |
| [__tests__/tree.test.tsx](/__tests__/tree.test.tsx) | TypeScript JSX | -108 | -3 | -3 | -114 |
| [__tests__/userAuth.test.ts](/__tests__/userAuth.test.ts) | TypeScript | -79 | -160 | -24 | -263 |
| [app/.electron/main.js](/app/.electron/main.js) | JavaScript | 136 | 356 | 22 | 514 |
| [app/.electron/menu.js](/app/.electron/menu.js) | JavaScript | 230 | 29 | 8 | 267 |
| [app/.electron/preload.js](/app/.electron/preload.js) | JavaScript | 30 | 22 | 3 | 55 |
| [app/.electron/preloadFunctions/chooseAppDir.js](/app/.electron/preloadFunctions/chooseAppDir.js) | JavaScript | 17 | 4 | 5 | 26 |
| [app/.electron/preloadFunctions/cookies.js](/app/.electron/preloadFunctions/cookies.js) | JavaScript | 19 | 0 | 7 | 26 |
| [app/.electron/preloadFunctions/format.js](/app/.electron/preloadFunctions/format.js) | JavaScript | 11 | 3 | 3 | 17 |
| [app/.electron/protocol.js](/app/.electron/protocol.js) | JavaScript | 50 | 17 | 9 | 76 |
| [app/.electron/render.js](/app/.electron/render.js) | JavaScript | 8 | 1 | 1 | 10 |
| [app/src/Dashboard/NavbarDash.tsx](/app/src/Dashboard/NavbarDash.tsx) | TypeScript JSX | 167 | 8 | 2 | 177 |
| [app/src/Dashboard/Project.tsx](/app/src/Dashboard/Project.tsx) | TypeScript JSX | 208 | 15 | 7 | 230 |
| [app/src/Dashboard/ProjectContainer.tsx](/app/src/Dashboard/ProjectContainer.tsx) | TypeScript JSX | 155 | 24 | 12 | 191 |
| [app/src/Dashboard/gqlStrings.ts](/app/src/Dashboard/gqlStrings.ts) | TypeScript | 51 | 2 | 6 | 59 |
| [app/src/Dashboard/styles.css](/app/src/Dashboard/styles.css) | CSS | 76 | 0 | 17 | 93 |
| [app/src/components/App.tsx](/app/src/components/App.tsx) | TypeScript JSX | 33 | 67 | 14 | 114 |
| [app/src/components/ContextAPIManager/AssignTab/AssignContainer.tsx](/app/src/components/ContextAPIManager/AssignTab/AssignContainer.tsx) | TypeScript JSX | 114 | 5 | 9 | 128 |
| [app/src/components/ContextAPIManager/AssignTab/components/ComponentDropDrown.tsx](/app/src/components/ContextAPIManager/AssignTab/components/ComponentDropDrown.tsx) | TypeScript JSX | 90 | 5 | 10 | 105 |
| [app/src/components/ContextAPIManager/AssignTab/components/ComponentTable.tsx](/app/src/components/ContextAPIManager/AssignTab/components/ComponentTable.tsx) | TypeScript JSX | 48 | 1 | 3 | 52 |
| [app/src/components/ContextAPIManager/AssignTab/components/ContextDropDown.tsx](/app/src/components/ContextAPIManager/AssignTab/components/ContextDropDown.tsx) | TypeScript JSX | 87 | 5 | 11 | 103 |
| [app/src/components/ContextAPIManager/AssignTab/components/ContextTable.tsx](/app/src/components/ContextAPIManager/AssignTab/components/ContextTable.tsx) | TypeScript JSX | 66 | 1 | 6 | 73 |
| [app/src/components/ContextAPIManager/ContextManager.tsx](/app/src/components/ContextAPIManager/ContextManager.tsx) | TypeScript JSX | 60 | 0 | 8 | 68 |
| [app/src/components/ContextAPIManager/CreateTab/CreateContainer.tsx](/app/src/components/ContextAPIManager/CreateTab/CreateContainer.tsx) | TypeScript JSX | 126 | 4 | 11 | 141 |
| [app/src/components/ContextAPIManager/CreateTab/components/AddContextForm.tsx](/app/src/components/ContextAPIManager/CreateTab/components/AddContextForm.tsx) | TypeScript JSX | 138 | 7 | 11 | 156 |
| [app/src/components/ContextAPIManager/CreateTab/components/AddDataForm.tsx](/app/src/components/ContextAPIManager/CreateTab/components/AddDataForm.tsx) | TypeScript JSX | 59 | 3 | 6 | 68 |
| [app/src/components/ContextAPIManager/CreateTab/components/DataTable.tsx](/app/src/components/ContextAPIManager/CreateTab/components/DataTable.tsx) | TypeScript JSX | 64 | 1 | 4 | 69 |
| [app/src/components/ContextAPIManager/DisplayTab/DisplayContainer.tsx](/app/src/components/ContextAPIManager/DisplayTab/DisplayContainer.tsx) | TypeScript JSX | 45 | 2 | 6 | 53 |
| [app/src/components/StateManagement/CreateTab/CreateContainer.tsx](/app/src/components/StateManagement/CreateTab/CreateContainer.tsx) | TypeScript JSX | 11 | 0 | 4 | 15 |
| [app/src/components/StateManagement/CreateTab/components/StatePropsPanel.tsx](/app/src/components/StateManagement/CreateTab/components/StatePropsPanel.tsx) | TypeScript JSX | 582 | 12 | 21 | 615 |
| [app/src/components/StateManagement/CreateTab/components/TableParentProps.tsx](/app/src/components/StateManagement/CreateTab/components/TableParentProps.tsx) | TypeScript JSX | 136 | 5 | 13 | 154 |
| [app/src/components/StateManagement/CreateTab/components/TablePassedInProps.tsx](/app/src/components/StateManagement/CreateTab/components/TablePassedInProps.tsx) | TypeScript JSX | 127 | 7 | 9 | 143 |
| [app/src/components/StateManagement/CreateTab/components/TableStateProps.tsx](/app/src/components/StateManagement/CreateTab/components/TableStateProps.tsx) | TypeScript JSX | 140 | 4 | 10 | 154 |
| [app/src/components/StateManagement/DisplayTab/DataTable.tsx](/app/src/components/StateManagement/DisplayTab/DataTable.tsx) | TypeScript JSX | 99 | 4 | 8 | 111 |
| [app/src/components/StateManagement/DisplayTab/DisplayContainer.tsx](/app/src/components/StateManagement/DisplayTab/DisplayContainer.tsx) | TypeScript JSX | 63 | 6 | 6 | 75 |
| [app/src/components/StateManagement/DisplayTab/Tree.tsx](/app/src/components/StateManagement/DisplayTab/Tree.tsx) | TypeScript JSX | 152 | 31 | 22 | 205 |
| [app/src/components/StateManagement/DisplayTab/useResizeObserver.ts](/app/src/components/StateManagement/DisplayTab/useResizeObserver.ts) | TypeScript | 19 | 2 | 3 | 24 |
| [app/src/components/StateManagement/StateManagement.tsx](/app/src/components/StateManagement/StateManagement.tsx) | TypeScript JSX | 59 | 2 | 9 | 70 |
| [app/src/components/bottom/BottomPanel.tsx](/app/src/components/bottom/BottomPanel.tsx) | TypeScript JSX | 48 | 5 | 14 | 67 |
| [app/src/components/bottom/BottomTabs.tsx](/app/src/components/bottom/BottomTabs.tsx) | TypeScript JSX | 207 | 5 | 8 | 220 |
| [app/src/components/bottom/CodePreview.tsx](/app/src/components/bottom/CodePreview.tsx) | TypeScript JSX | 99 | 7 | 14 | 120 |
| [app/src/components/bottom/CreationPanel.tsx](/app/src/components/bottom/CreationPanel.tsx) | TypeScript JSX | 15 | 2 | 3 | 20 |
| [app/src/components/bottom/StylesEditor.tsx](/app/src/components/bottom/StylesEditor.tsx) | TypeScript JSX | 67 | 3 | 9 | 79 |
| [app/src/components/bottom/UseStateModal.tsx](/app/src/components/bottom/UseStateModal.tsx) | TypeScript JSX | 59 | 1 | 4 | 64 |
| [app/src/components/form/Selector.tsx](/app/src/components/form/Selector.tsx) | TypeScript JSX | 53 | 0 | 4 | 57 |
| [app/src/components/left/ComponentDrag.tsx](/app/src/components/left/ComponentDrag.tsx) | TypeScript JSX | 64 | 4 | 5 | 73 |
| [app/src/components/left/ComponentsContainer.tsx](/app/src/components/left/ComponentsContainer.tsx) | TypeScript JSX | 57 | 0 | 5 | 62 |
| [app/src/components/left/ContentArea.tsx](/app/src/components/left/ContentArea.tsx) | TypeScript JSX | 40 | 0 | 5 | 45 |
| [app/src/components/left/DragDropPanel.tsx](/app/src/components/left/DragDropPanel.tsx) | TypeScript JSX | 102 | 14 | 5 | 121 |
| [app/src/components/left/ElementsContainer.tsx](/app/src/components/left/ElementsContainer.tsx) | TypeScript JSX | 51 | 1 | 8 | 60 |
| [app/src/components/left/HTMLItem.tsx](/app/src/components/left/HTMLItem.tsx) | TypeScript JSX | 142 | 8 | 8 | 158 |
| [app/src/components/left/HTMLPanel.tsx](/app/src/components/left/HTMLPanel.tsx) | TypeScript JSX | 328 | 17 | 27 | 372 |
| [app/src/components/left/RoomsContainer.tsx](/app/src/components/left/RoomsContainer.tsx) | TypeScript JSX | 256 | 27 | 19 | 302 |
| [app/src/components/left/Sidebar.tsx](/app/src/components/left/Sidebar.tsx) | TypeScript JSX | 81 | 0 | 8 | 89 |
| [app/src/components/login/FBPassWord.tsx](/app/src/components/login/FBPassWord.tsx) | TypeScript JSX | 190 | 2 | 14 | 206 |
| [app/src/components/login/SignIn.tsx](/app/src/components/login/SignIn.tsx) | TypeScript JSX | 326 | 36 | 21 | 383 |
| [app/src/components/login/SignUp.tsx](/app/src/components/login/SignUp.tsx) | TypeScript JSX | 316 | 2 | 16 | 334 |
| [app/src/components/main/AddLink.tsx](/app/src/components/main/AddLink.tsx) | TypeScript JSX | 98 | 1 | 6 | 105 |
| [app/src/components/main/AddRoute.tsx](/app/src/components/main/AddRoute.tsx) | TypeScript JSX | 27 | 0 | 4 | 31 |
| [app/src/components/main/Arrow.tsx](/app/src/components/main/Arrow.tsx) | TypeScript JSX | 82 | 0 | 6 | 88 |
| [app/src/components/main/Canvas.tsx](/app/src/components/main/Canvas.tsx) | TypeScript JSX | 122 | 22 | 12 | 156 |
| [app/src/components/main/CanvasContainer.tsx](/app/src/components/main/CanvasContainer.tsx) | TypeScript JSX | 46 | 2 | 8 | 56 |
| [app/src/components/main/DeleteButton.tsx](/app/src/components/main/DeleteButton.tsx) | TypeScript JSX | 29 | 0 | 7 | 36 |
| [app/src/components/main/DemoRender.tsx](/app/src/components/main/DemoRender.tsx) | TypeScript JSX | 201 | 14 | 21 | 236 |
| [app/src/components/main/DirectChildComponent.tsx](/app/src/components/main/DirectChildComponent.tsx) | TypeScript JSX | 66 | 8 | 8 | 82 |
| [app/src/components/main/DirectChildHTML.tsx](/app/src/components/main/DirectChildHTML.tsx) | TypeScript JSX | 68 | 7 | 12 | 87 |
| [app/src/components/main/DirectChildHTMLNestable.tsx](/app/src/components/main/DirectChildHTMLNestable.tsx) | TypeScript JSX | 170 | 18 | 17 | 205 |
| [app/src/components/main/IndirectChild.tsx](/app/src/components/main/IndirectChild.tsx) | TypeScript JSX | 46 | 2 | 4 | 52 |
| [app/src/components/main/RouteLink.tsx](/app/src/components/main/RouteLink.tsx) | TypeScript JSX | 65 | 7 | 5 | 77 |
| [app/src/components/main/SeparatorChild.tsx](/app/src/components/main/SeparatorChild.tsx) | TypeScript JSX | 118 | 13 | 13 | 144 |
| [app/src/components/marketplace/MarketplaceCard.tsx](/app/src/components/marketplace/MarketplaceCard.tsx) | TypeScript JSX | 209 | 4 | 14 | 227 |
| [app/src/components/marketplace/MarketplaceCardContainer.tsx](/app/src/components/marketplace/MarketplaceCardContainer.tsx) | TypeScript JSX | 24 | 0 | 4 | 28 |
| [app/src/components/marketplace/Searchbar.tsx](/app/src/components/marketplace/Searchbar.tsx) | TypeScript JSX | 41 | 14 | 16 | 71 |
| [app/src/components/right/ComponentPanel.tsx](/app/src/components/right/ComponentPanel.tsx) | TypeScript JSX | 322 | 19 | 17 | 358 |
| [app/src/components/right/ComponentPanelItem.tsx](/app/src/components/right/ComponentPanelItem.tsx) | TypeScript JSX | 76 | 12 | 2 | 90 |
| [app/src/components/right/ComponentPanelRoutingItem.tsx](/app/src/components/right/ComponentPanelRoutingItem.tsx) | TypeScript JSX | 98 | 27 | 10 | 135 |
| [app/src/components/right/DeleteProjects.tsx](/app/src/components/right/DeleteProjects.tsx) | TypeScript JSX | 170 | 5 | 11 | 186 |
| [app/src/components/right/ExportButton.tsx](/app/src/components/right/ExportButton.tsx) | TypeScript JSX | 83 | 109 | 21 | 213 |
| [app/src/components/right/LoginButton.tsx](/app/src/components/right/LoginButton.tsx) | TypeScript JSX | 87 | 3 | 12 | 102 |
| [app/src/components/right/OpenProjects.tsx](/app/src/components/right/OpenProjects.tsx) | TypeScript JSX | 155 | 5 | 5 | 165 |
| [app/src/components/right/ProjectManager.tsx](/app/src/components/right/ProjectManager.tsx) | TypeScript JSX | 137 | 21 | 18 | 176 |
| [app/src/components/right/SaveProjectButton.tsx](/app/src/components/right/SaveProjectButton.tsx) | TypeScript JSX | 97 | 5 | 7 | 109 |
| [app/src/components/right/SimpleModal.tsx](/app/src/components/right/SimpleModal.tsx) | TypeScript JSX | 102 | 0 | 5 | 107 |
| [app/src/components/right/createModal.tsx](/app/src/components/right/createModal.tsx) | TypeScript JSX | 35 | 0 | 4 | 39 |
| [app/src/components/top/NavBar.tsx](/app/src/components/top/NavBar.tsx) | TypeScript JSX | 258 | 0 | 15 | 273 |
| [app/src/components/top/NavBarButtons.tsx](/app/src/components/top/NavBarButtons.tsx) | TypeScript JSX | 250 | 14 | 20 | 284 |
| [app/src/components/top/NewExportButton.tsx](/app/src/components/top/NewExportButton.tsx) | TypeScript JSX | 79 | 0 | 11 | 90 |
| [app/src/components/top/PublishModal.tsx](/app/src/components/top/PublishModal.tsx) | TypeScript JSX | 52 | 0 | 3 | 55 |
| [app/src/constants/ErrorMessages.ts](/app/src/constants/ErrorMessages.ts) | TypeScript | 10 | 0 | 1 | 11 |
| [app/src/constants/ItemTypes.ts](/app/src/constants/ItemTypes.ts) | TypeScript | 5 | 0 | 1 | 6 |
| [app/src/constants/Styling.ts](/app/src/constants/Styling.ts) | TypeScript | 6 | 0 | 1 | 7 |
| [app/src/containers/AppContainer.tsx](/app/src/containers/AppContainer.tsx) | TypeScript JSX | 49 | 3 | 8 | 60 |
| [app/src/containers/CustomizationPanel.tsx](/app/src/containers/CustomizationPanel.tsx) | TypeScript JSX | 1,016 | 29 | 25 | 1,070 |
| [app/src/containers/LeftContainer.tsx](/app/src/containers/LeftContainer.tsx) | TypeScript JSX | 21 | 0 | 5 | 26 |
| [app/src/containers/MainContainer.tsx](/app/src/containers/MainContainer.tsx) | TypeScript JSX | 109 | 6 | 14 | 129 |
| [app/src/containers/MarketplaceContainer.tsx](/app/src/containers/MarketplaceContainer.tsx) | TypeScript JSX | 76 | 0 | 14 | 90 |
| [app/src/helperFunctions/auth.ts](/app/src/helperFunctions/auth.ts) | TypeScript | 67 | 5 | 5 | 77 |
| [app/src/helperFunctions/changePositionValidation.ts](/app/src/helperFunctions/changePositionValidation.ts) | TypeScript | 40 | 4 | 3 | 47 |
| [app/src/helperFunctions/cloneDeep.ts](/app/src/helperFunctions/cloneDeep.ts) | TypeScript | 28 | 1 | 1 | 30 |
| [app/src/helperFunctions/combineStyles.ts](/app/src/helperFunctions/combineStyles.ts) | TypeScript | 12 | 3 | 1 | 16 |
| [app/src/helperFunctions/componentNestValidation.ts](/app/src/helperFunctions/componentNestValidation.ts) | TypeScript | 11 | 3 | 2 | 16 |
| [app/src/helperFunctions/cssRefresh.tsx](/app/src/helperFunctions/cssRefresh.tsx) | TypeScript JSX | 14 | 2 | 3 | 19 |
| [app/src/helperFunctions/generateCode.ts](/app/src/helperFunctions/generateCode.ts) | TypeScript | 526 | 35 | 23 | 584 |
| [app/src/helperFunctions/manageSeparators.ts](/app/src/helperFunctions/manageSeparators.ts) | TypeScript | 82 | 11 | 5 | 98 |
| [app/src/helperFunctions/projectGetSaveDel.ts](/app/src/helperFunctions/projectGetSaveDel.ts) | TypeScript | 124 | 3 | 14 | 141 |
| [app/src/helperFunctions/randomPassword.ts](/app/src/helperFunctions/randomPassword.ts) | TypeScript | 20 | 0 | 2 | 22 |
| [app/src/helperFunctions/renderChildren.tsx](/app/src/helperFunctions/renderChildren.tsx) | TypeScript JSX | 115 | 13 | 3 | 131 |
| [app/src/helperFunctions/zipFiles.ts](/app/src/helperFunctions/zipFiles.ts) | TypeScript | 23 | 8 | 3 | 34 |
| [app/src/index.tsx](/app/src/index.tsx) | TypeScript JSX | 82 | 5 | 13 | 100 |
| [app/src/interfaces/Interfaces.ts](/app/src/interfaces/Interfaces.ts) | TypeScript | 164 | 5 | 13 | 182 |
| [app/src/interfaces/declarations.d.ts](/app/src/interfaces/declarations.d.ts) | TypeScript | 5 | 0 | 1 | 6 |
| [app/src/interfaces/global.ts](/app/src/interfaces/global.ts) | TypeScript | 7 | 0 | 2 | 9 |
| [app/src/plugins/fetch-plugin.ts](/app/src/plugins/fetch-plugin.ts) | TypeScript | 59 | 0 | 4 | 63 |
| [app/src/plugins/unpkg-path-plugin.ts](/app/src/plugins/unpkg-path-plugin.ts) | TypeScript | 24 | 3 | 0 | 27 |
| [app/src/public/index-prod.ejs](/app/src/public/index-prod.ejs) | HTML | 15 | 0 | 1 | 16 |
| [app/src/public/index.ejs](/app/src/public/index.ejs) | HTML | 23 | 0 | 1 | 24 |
| [app/src/public/styles/globalDefaultStyles.ts](/app/src/public/styles/globalDefaultStyles.ts) | TypeScript | 16 | 0 | 3 | 19 |
| [app/src/public/styles/style.css](/app/src/public/styles/style.css) | CSS | 665 | 59 | 142 | 866 |
| [app/src/public/styles/theme.ts](/app/src/public/styles/theme.ts) | TypeScript | 57 | 1 | 5 | 63 |
| [app/src/redux/HTMLTypes.ts](/app/src/redux/HTMLTypes.ts) | TypeScript | 243 | 4 | 3 | 250 |
| [app/src/redux/reducers/rootReducer.ts](/app/src/redux/reducers/rootReducer.ts) | TypeScript | 14 | 2 | 4 | 20 |
| [app/src/redux/reducers/slice/appStateSlice.ts](/app/src/redux/reducers/slice/appStateSlice.ts) | TypeScript | 1,132 | 146 | 63 | 1,341 |
| [app/src/redux/reducers/slice/codePreviewSlice.ts](/app/src/redux/reducers/slice/codePreviewSlice.ts) | TypeScript | 23 | 1 | 6 | 30 |
| [app/src/redux/reducers/slice/contextReducer.ts](/app/src/redux/reducers/slice/contextReducer.ts) | TypeScript | 90 | 6 | 10 | 106 |
| [app/src/redux/reducers/slice/roomSlice.ts](/app/src/redux/reducers/slice/roomSlice.ts) | TypeScript | 28 | 5 | 3 | 36 |
| [app/src/redux/reducers/slice/styleSlice.ts](/app/src/redux/reducers/slice/styleSlice.ts) | TypeScript | 23 | 1 | 6 | 30 |
| [app/src/redux/store.ts](/app/src/redux/store.ts) | TypeScript | 20 | 13 | 8 | 41 |
| [app/src/tree/TreeChart.tsx](/app/src/tree/TreeChart.tsx) | TypeScript JSX | 146 | 28 | 10 | 184 |
| [app/src/tree/useResizeObserver.ts](/app/src/tree/useResizeObserver.ts) | TypeScript | 19 | 2 | 3 | 24 |
| [app/src/tutorial/CSSEditor.tsx](/app/src/tutorial/CSSEditor.tsx) | TypeScript JSX | 37 | 0 | 3 | 40 |
| [app/src/tutorial/Canvas.tsx](/app/src/tutorial/Canvas.tsx) | TypeScript JSX | 42 | 0 | 3 | 45 |
| [app/src/tutorial/CodePreview.tsx](/app/src/tutorial/CodePreview.tsx) | TypeScript JSX | 23 | 0 | 4 | 27 |
| [app/src/tutorial/ComponentTree.tsx](/app/src/tutorial/ComponentTree.tsx) | TypeScript JSX | 43 | 0 | 3 | 46 |
| [app/src/tutorial/Customization.tsx](/app/src/tutorial/Customization.tsx) | TypeScript JSX | 170 | 0 | 3 | 173 |
| [app/src/tutorial/HtmlElements.tsx](/app/src/tutorial/HtmlElements.tsx) | TypeScript JSX | 43 | 0 | 4 | 47 |
| [app/src/tutorial/KeyboardShortcuts.tsx](/app/src/tutorial/KeyboardShortcuts.tsx) | TypeScript JSX | 36 | 0 | 3 | 39 |
| [app/src/tutorial/Pages.tsx](/app/src/tutorial/Pages.tsx) | TypeScript JSX | 50 | 0 | 4 | 54 |
| [app/src/tutorial/ReusableComponents.tsx](/app/src/tutorial/ReusableComponents.tsx) | TypeScript JSX | 36 | 0 | 4 | 40 |
| [app/src/tutorial/RouteLinks.tsx](/app/src/tutorial/RouteLinks.tsx) | TypeScript JSX | 42 | 0 | 3 | 45 |
| [app/src/tutorial/States.tsx](/app/src/tutorial/States.tsx) | TypeScript JSX | 85 | 0 | 3 | 88 |
| [app/src/tutorial/Styling.tsx](/app/src/tutorial/Styling.tsx) | TypeScript JSX | 43 | 0 | 2 | 45 |
| [app/src/tutorial/Tutorial.tsx](/app/src/tutorial/Tutorial.tsx) | TypeScript JSX | 158 | 2 | 3 | 163 |
| [app/src/tutorial/TutorialPage.tsx](/app/src/tutorial/TutorialPage.tsx) | TypeScript JSX | 219 | 0 | 6 | 225 |
| [app/src/utils/createApplication.util.ts](/app/src/utils/createApplication.util.ts) | TypeScript | 378 | 10 | 7 | 395 |
| [app/src/utils/createFiles.util.ts](/app/src/utils/createFiles.util.ts) | TypeScript | 39 | 3 | 2 | 44 |
| [app/src/utils/createGatsbyApp.util.ts](/app/src/utils/createGatsbyApp.util.ts) | TypeScript | 178 | 5 | 7 | 190 |
| [app/src/utils/createGatsbyFiles.util.ts](/app/src/utils/createGatsbyFiles.util.ts) | TypeScript | 36 | 5 | 1 | 42 |
| [app/src/utils/createNextApp.util.ts](/app/src/utils/createNextApp.util.ts) | TypeScript | 197 | 6 | 4 | 207 |
| [app/src/utils/createNextFiles.util.ts](/app/src/utils/createNextFiles.util.ts) | TypeScript | 36 | 4 | 6 | 46 |
| [app/src/utils/createNonce.ts](/app/src/utils/createNonce.ts) | TypeScript | 4 | 5 | 4 | 13 |
| [app/src/utils/createTestSuite.util.ts](/app/src/utils/createTestSuite.util.ts) | TypeScript | 190 | 3 | 12 | 205 |
| [app/src/utils/createTestSuiteClassic.util.ts](/app/src/utils/createTestSuiteClassic.util.ts) | TypeScript | 124 | 0 | 18 | 142 |
| [app/src/utils/createTestSuiteNext.util.ts](/app/src/utils/createTestSuiteNext.util.ts) | TypeScript | 210 | 0 | 18 | 228 |
| [app/src/utils/exportProject.util.ts](/app/src/utils/exportProject.util.ts) | TypeScript | 31 | 2 | 4 | 37 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details