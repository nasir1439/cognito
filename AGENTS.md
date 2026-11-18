# Cognito LMS: Project Guide

This file records the repository architecture and working conventions verified from the checked-in source. Keep it aligned with the code when the architecture changes. Do not assume local environment values, production infrastructure, or behavior not described here.

## Repository layout

- `client/`: React single-page application built with Vite.
  - `src/App.jsx`: browser router and page route tree.
  - `src/main.jsx`: React root, Redux provider, theme provider, initial user load, and toast host.
  - `src/app/`: Redux store and combined reducer.
  - `src/features/`: auth state and RTK Query API slices.
  - `src/components/`: shared route guards, layout utilities, and UI components.
  - `src/pages/student/`: student-facing course, search, profile, learning, and progress pages.
  - `src/pages/admin/`: instructor dashboard, course, and lecture pages.
  - `src/layout/`: shared application layout.
  - `src/lib/`, `src/assets/`: shared utilities and assets.
- `server/`: Node.js API using Express and Mongoose.
  - `index.js`: environment loading, database connection, middleware, route mounting, and server startup.
  - `routes/`: user, course, media, purchase, and progress route definitions.
  - `controllers/`: request handlers and domain operations.
  - `models/`: Mongoose schemas for users, courses, lectures, purchases, and course progress.
  - `middleware/`: JWT cookie authentication middleware.
  - `utils/`: token generation, Cloudinary setup, and Multer configuration.
  - `database/`: MongoDB connection.
- Root and package `.gitignore` files exclude generated dependencies/build output and environment files. Server ignores local uploads.

## Tooling and dependencies

### Client

- ES modules, JavaScript, JSX; React 19 and React DOM.
- Vite 7 with `@vitejs/plugin-react` and `@tailwindcss/vite`.
- Redux Toolkit and React Redux; RTK Query is provided by Redux Toolkit.
- React Router DOM 7.
- Tailwind CSS 4, Radix UI packages, class-variance-authority, clsx, and tailwind-merge.
- Tiptap editor packages, React Player, Recharts, Lucide React, next-themes, and Sonner.
- Axios is used for the lecture media upload path; most API calls use RTK Query.
- `@` aliases to `client/src` in both `vite.config.js` and `jsconfig.json`.
- Available scripts: `npm run dev`, `npm run build`, `npm run lint`, and `npm run preview` (run from `client/`). ESLint uses the flat config in `eslint.config.js`.

### Server

- ES modules on Node.js; Express 5, Mongoose 9, dotenv, cookie-parser, and CORS.
- Authentication uses jsonwebtoken and bcrypt.
- Uploads use Multer; media storage uses Cloudinary.
- Payments use Stripe.
- Available script: `npm run dev` using nodemon (run from `server/`). No test, build, or lint script is defined in `server/package.json`.

## Server architecture and routes

`server/index.js` loads dotenv, calls the MongoDB connection helper, configures JSON parsing, cookie parsing, and credentialed CORS, then mounts routers. The API prefix is `/api/v1`:

- `/user`: register, login, logout, profile, profile update.
- `/course`: course CRUD-like operations, lectures, publishing, published list, and search.
- `/media`: media upload.
- `/purchase`: checkout, webhook, purchased courses, and purchase status.
- `/progress`: course and lecture progress operations.

Controllers use Mongoose models directly. Schemas define user roles (`student` or `instructor`), course/lecture relationships, purchase states (`pending`, `completed`, `failed`), and a unique user/course progress index. Authentication middleware attaches the verified JWT subject to `req.id`.

## Authentication, authorization, and routing

- Registration hashes passwords with bcrypt. Login compares the submitted password and calls `generateToken`.
- The JWT payload contains `userId`; lifetime is one day. `generateToken` sets a `token` cookie with `httpOnly: true`, `sameSite: "strict"`, and a one-day max age. `secure` is not set in the current code.
- Protected API handlers use `isAuthenticated`, which reads `req.cookies.token`, verifies it using `SECRET_KEY`, and assigns the decoded user ID to `req.id`.
- Logout clears the cookie by setting an empty value and `maxAge: 0`.
- Client auth state is kept in `features/authSlice.js`. The `authApi` login/profile load handlers populate that state; logout dispatches the logged-out action.
- `main.jsx` and `app/store.js` both initiate user loading. `ProtectedRoute.jsx` uses the profile RTK Query hook; `ProtectedRoutes.jsx` exports Redux-state checks for authenticated users and instructors. `PurchaseCourseProtedtedRoute.jsx` checks purchase status before rendering progress.
- `App.jsx` declares public landing, categories, and about routes; protected student pages; and instructor pages nested under `/admin`. The instructor role string is `instructor`.
- Client route guards improve navigation but are not API authorization. For new protected operations, enforce access on the server as well.

## API integration and error handling

- RTK Query is split into `authApi`, `courseApi`, `purchaseApi`, and `courseProgressApi`; each reducer and middleware is registered in the Redux store.
- API base URLs are currently literal `http://localhost:8080` strings in client API modules. Requests include credentials. The Express server defaults to port `3000`, while its CORS origin is `http://localhost:5173`. Keep these observed values in mind when investigating local connectivity; do not silently assume they match.
- RTK Query endpoints define request methods, URLs, bodies, and cache tags. Course and progress slices use tag invalidation for some mutations.
- Components commonly use mutation `.unwrap()`-style success/error branches and Sonner toasts; inspect the existing component before extending a flow. The lecture video upload uses Axios directly.
- Server responses generally use JSON with a `message` and/or `success` field, but shapes vary by endpoint. Preserve the established endpoint contract when changing a handler and ensure every error path sends a response or forwards the error.
- Do not log credentials, tokens, cookie contents, or sensitive payment data. Avoid returning raw internal errors outside an explicitly development-only response.

## Uploads and external services

- Multer is configured with disk destination `uploads/` and uses `upload.single(...)` on profile photo (`profilePhoto`) and course thumbnail (`courseThumbnail`) routes. The media endpoint accepts `file` at `/api/v1/media/upload-video`.
- `cloudinary.js` configures Cloudinary from `CLOUD_NAME`, `API_KEY`, and `API_SECRET`; `uploadMedia` uses automatic resource type and a long timeout. Profile/course images and lecture video media use Cloudinary helpers.
- Stripe is constructed with `STRIPE_SECRET_KEY`. Checkout creates an INR card session and records a pending `CoursePurchase`; the webhook handler processes `checkout.session.completed`, marks the purchase complete, and enrolls the user. `STRIPE_WEBHOOK_SECRET` is referenced by webhook code.
- Checkout success/cancel URLs currently point to localhost client routes. These values are not environment-configurable in the checked-in implementation.
- Do not put secrets in source, documentation, logs, or client bundles. Use environment configuration for new secret values. No `.env.example` is checked in.

## Configuration and deployment status

- Vite configuration currently contains the React and Tailwind plugins and the `@` source alias.
- ESLint configuration applies recommended JavaScript, React Hooks, and React Refresh rules to JS/JSX files; unused variables are errors except names beginning with uppercase or underscore.
- `.gitignore` files exclude `.env` variants, `node_modules`, generated build directories, logs, and other local artifacts. Server ignores `uploads/`.
- The server reads `PORT`, `MONGO_URI`, `SECRET_KEY`, Cloudinary credentials, Stripe secret, and Stripe webhook secret from environment variables (names verified in source). The codebase has no tracked Docker, CI pipeline, hosting manifest, or production deployment configuration in the current repository inventory.
- `server/database/dbconnect.js` currently includes hard-coded database credential material in comments. Never reproduce it. Treat it as exposed and rotate the credential outside this documentation task; remove any hard-coded secret material in a separately approved code change.

## Development conventions

- Preserve the existing JavaScript/JSX and ES module style unless a task explicitly calls for a migration.
- Keep student pages under `client/src/pages/student/`, instructor pages under `client/src/pages/admin/`, shared components under `client/src/components/`, and backend handlers/models/routes in their corresponding server directories.
- Add or change client API calls in the relevant RTK Query slice and register any new slice's reducer and middleware in both `rootReducer.js` and `store.js`.
- Keep route declarations in `App.jsx` and use the existing route guard patterns where appropriate. Treat all client-side checks as presentation/navigation only; validate identity, role, ownership, and purchase access on the server.
- Add server endpoints through a route module and controller, then mount a new router in `server/index.js` only when adding a new API group.
- Follow existing response conventions where possible, but make failure responses explicit and consistent within the endpoint. Do not swallow exceptions without responding or passing them to error middleware.
- Use the `@/` alias for client imports when consistent with surrounding code. Keep component/file naming consistent with the existing page and component directories.
- Do not add dependencies, alter deployment/configuration files, or change unrelated application behavior unless the task asks for it. Do not commit secrets or environment files.

## Local commands

Run commands from the relevant package directory:

```sh
# client/
npm run dev
npm run build
npm run lint
npm run preview

# server/
npm run dev
```

No test suite or test command is currently defined in either package manifest. Before adding one, first inspect the requested scope and repository state.
