# potfo

A React app built with Vite, Redux Toolkit, RTK Query and React Router.

## Tech stack

| Tool | Purpose |
| --- | --- |
| [React 19](https://react.dev/) | UI library |
| [Vite](https://vite.dev/) | Dev server and build tool |
| [Redux Toolkit](https://redux-toolkit.js.org/) | Global state management |
| [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) | Data fetching and caching (included in Redux Toolkit) |
| [React Redux](https://react-redux.js.org/) | React bindings for Redux |
| [React Router](https://reactrouter.com/) | Client-side routing |
| [ESLint](https://eslint.org/) | Linting |

## Getting started

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:5173)
npm run dev
```

## Environment variables

Environment variables live in `.env` in the project root. Vite only exposes variables to the app when their names start with `VITE_`.

| Variable | Description |
| --- | --- |
| `VITE_API_BASE_URL` | Base URL of the backend API that RTK Query calls. If it's empty, requests go to the app's own origin. |

```env
VITE_API_BASE_URL=https://api.example.com
```

Restart the dev server after changing `.env`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint on the project |

## Folder structure

```
potfo/
├── public/                 Static files served as-is (favicon, etc.)
├── src/
│   ├── app/
│   │   └── store.js        Redux store setup
│   ├── services/
│   │   └── api.js          Base RTK Query API (endpoints are injected per feature)
│   ├── features/           One folder per feature: its slice and API endpoints
│   ├── components/         Reusable UI components shared across pages
│   ├── pages/              Page components, one per route
│   ├── layouts/            Layout wrappers (header, footer, sidebar)
│   ├── routes/             Route definitions
│   ├── hooks/              Custom React hooks
│   ├── utils/              Helper functions
│   ├── constants/          App-wide constants
│   ├── assets/             Images, icons and fonts imported in code
│   ├── App.jsx             Root component
│   ├── App.css             Root component styles
│   ├── index.css           Global styles
│   └── main.jsx            Entry point: mounts the app with the Redux Provider and BrowserRouter
├── .env                    Environment variables
├── index.html              HTML entry
├── vite.config.js          Vite config
├── eslint.config.js        ESLint config
└── package.json
```

## How the app is wired

`main.jsx` wraps `<App />` in the Redux `<Provider>` and `<BrowserRouter>`. Every component can therefore use the store, the RTK Query hooks and routing.

```
main.jsx
└── <Provider store={store}>
    └── <BrowserRouter>
        └── <App />
```

## Adding a feature

Each feature gets its own folder in `src/features/`, for example:

```
src/features/projects/
├── projectsApi.js      RTK Query endpoints for this feature
└── projectsSlice.js    Local state for this feature (only if it needs any)
```

### 1. Add API endpoints

Inject endpoints into the shared base API instead of creating a new `createApi`:

```js
// src/features/projects/projectsApi.js
import { api } from '../../services/api'

export const projectsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => '/projects',
    }),
    addProject: builder.mutation({
      query: (body) => ({ url: '/projects', method: 'POST', body }),
    }),
  }),
})

export const { useGetProjectsQuery, useAddProjectMutation } = projectsApi
```

Use the generated hooks in a component:

```jsx
import { useGetProjectsQuery } from '../features/projects/projectsApi'

function Projects() {
  const { data, isLoading, error } = useGetProjectsQuery()
  // ...
}
```

### 2. Add a slice (optional)

Only needed for client-side state that doesn't come from the API:

```js
// src/features/projects/projectsSlice.js
import { createSlice } from '@reduxjs/toolkit'

const projectsSlice = createSlice({
  name: 'projects',
  initialState: { selectedId: null },
  reducers: {
    selectProject: (state, action) => {
      state.selectedId = action.payload
    },
  },
})

export const { selectProject } = projectsSlice.actions
export default projectsSlice.reducer
```

Then register the reducer in `src/app/store.js`:

```js
import projectsReducer from '../features/projects/projectsSlice'

reducer: {
  [api.reducerPath]: api.reducer,
  projects: projectsReducer,
},
```
