# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

```
pa-dashboard-fe
├─ craco.config.js
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ fonts
│  │  ├─ FunnelDisplay-Bold.ttf
│  │  ├─ FunnelDisplay-ExtraBold.ttf
│  │  ├─ FunnelDisplay-Light.ttf
│  │  ├─ FunnelDisplay-Medium.ttf
│  │  ├─ FunnelDisplay-Regular.ttf
│  │  └─ FunnelDisplay-SemiBold.ttf
│  ├─ index.html
│  ├─ login-background-2.jpg
│  ├─ logo-kemnaker-ori.png
│  ├─ logo-kemnaker-sidebar.png
│  ├─ logo-kemnaker.png
│  ├─ Logo.png
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  ├─ pdf-tester.pdf
│  ├─ robots.txt
│  ├─ rokeu-bmn.png
│  ├─ trophy-black.png
│  ├─ trophy-gold.png
│  ├─ trophy-silver.png
│  └─ under-construct.gif
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.js
│  ├─ App.test.js
│  ├─ components
│  │  ├─ Breadcrumbs.jsx
│  │  ├─ Button.jsx
│  │  ├─ Card.jsx
│  │  ├─ Chip.jsx
│  │  ├─ DatePickerInput.jsx
│  │  ├─ Dialog.jsx
│  │  ├─ FileInput.jsx
│  │  ├─ Input.jsx
│  │  ├─ Modal.jsx
│  │  ├─ MultiSelect.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ Paper.jsx
│  │  ├─ PDFViewer.jsx
│  │  ├─ PrivateRoute.jsx
│  │  ├─ Select.jsx
│  │  ├─ Sidebar.jsx
│  │  ├─ Table.jsx
│  │  ├─ TableBody.jsx
│  │  ├─ TableCell.jsx
│  │  ├─ TableHeader.jsx
│  │  ├─ TablePagination.jsx
│  │  ├─ TableRow.jsx
│  │  ├─ TableSortLabel.jsx
│  │  ├─ TextArea.jsx
│  │  ├─ Title.jsx
│  │  └─ User.jsx
│  ├─ constants
│  │  └─ color.jsx
│  ├─ contexts
│  │  ├─ AppContext.js
│  │  └─ AuthContexts.js
│  ├─ index.css
│  ├─ index.js
│  ├─ Layouts
│  │  └─ AppLayout.js
│  ├─ logo.svg
│  ├─ pages
│  │  ├─ Administrator
│  │  │  ├─ BarChart.jsx
│  │  │  ├─ constants.jsx
│  │  │  ├─ DonutChart.jsx
│  │  │  └─ index.js
│  │  ├─ BudgetExecution
│  │  │  ├─ BarChart.jsx
│  │  │  ├─ constants.jsx
│  │  │  ├─ GaugeChart.jsx
│  │  │  ├─ index.js
│  │  │  ├─ TableBudgetExecution.jsx
│  │  │  └─ useBudgetExecution.jsx
│  │  ├─ Compilation
│  │  │  └─ index.js
│  │  ├─ Dashboard
│  │  │  └─ index.js
│  │  ├─ DashboardManagement
│  │  │  └─ index.js
│  │  ├─ Ikpa
│  │  │  └─ index.js
│  │  ├─ ListSatuankerja
│  │  │  ├─ index.js
│  │  │  ├─ pendingDocumentsModal.js
│  │  │  └─ satkerHooks.js
│  │  ├─ LLAT
│  │  │  └─ index.js
│  │  ├─ LoginPage.js
│  │  ├─ MainDashboard
│  │  │  ├─ BarChart.jsx
│  │  │  ├─ BarChartIPA.jsx
│  │  │  ├─ DonutChart.jsx
│  │  │  ├─ DonutChartAkuntansi.jsx
│  │  │  └─ index.js
│  │  ├─ Menu
│  │  │  ├─ index.js
│  │  │  └─ menuHooks.js
│  │  ├─ PTUKSub1
│  │  │  └─ index.js
│  │  ├─ Realisasi
│  │  │  └─ index.js
│  │  ├─ ReportingAccounting
│  │  │  ├─ BarChart.jsx
│  │  │  └─ index.js
│  │  ├─ Soon
│  │  │  └─ index.js
│  │  ├─ StateProperty
│  │  │  ├─ BarChart.jsx
│  │  │  ├─ constants.jsx
│  │  │  ├─ DonutChart.jsx
│  │  │  ├─ index.js
│  │  │  └─ Table.jsx
│  │  ├─ TandaTerima
│  │  │  └─ index.js
│  │  └─ UserManagement
│  │     └─ index.js
│  ├─ reportWebVitals.js
│  ├─ services
│  │  ├─ APIHelper.js
│  │  ├─ FetchHelper.js
│  │  └─ GeneralHelper.js
│  └─ setupTests.js
└─ tailwind.config.js

```