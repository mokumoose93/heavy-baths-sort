import { GitHubBanner, Refine, WelcomePage, Authenticated } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { dataProvider, liveProvider, authProvider } from "./providers";
import { Home, ForgotPassword, Login, Register, CompanyList } from "./pages";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import Layout from "./components/layout";
import { resources } from "./config/resources";
import Create from "./pages/company/create";
import Edit from "./pages/company/edit";
import EditPage from "./pages/company/edit";
import TasksList from "./pages/tasks/list";
import CreateTask from "./pages/tasks/create";
import EditTask from "./pages/tasks/edit";
import FilesList from "./pages/files/files-list";

// import { createClient } from "graphql-ws";
// import { authProvider } from "./authProvider";
// import { ColorModeContextProvider } from "./contexts/color-mode";

// const API_URL = "https://api.nestjs-query.refine.dev/graphql";
// const WS_URL = "wss://api.nestjs-query.refine.dev/graphql";

// const gqlClient = new GraphQLClient(API_URL);
// const wsClient = createClient({ url: WS_URL });

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={resources}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "sK1Exc-kEc28a-madOn7",
                liveMode: "auto",
              }}
            >
              <Routes>
                {/* <Route index element={<WelcomePage />} /> */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  element={
                    <Authenticated
                      key="authenticated-layout"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>}
                >
                  <Route index element={<Home />} />
                  <Route path="/companies">
                    <Route index element={<CompanyList />} />
                    <Route path="new" element={<Create />} />
                    <Route path="edit/:id" element={<EditPage />} />
                  </Route>
                  <Route
                    path="/tasks"
                    element={
                      <TasksList>
                        <Outlet />
                      </TasksList>
                    }
                  >
                    <Route path="new" element={<CreateTask />} />
                    <Route path="edit/:id" element={<EditTask />} />
                  </Route>
                  <Route path="/files">
                    <Route index element={<FilesList />} />

                  </Route>
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
