import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalContextProvider from "./GlobalContext";
import Layout from "./components/Layout";
import NoPAT from "./components/NoPAT";
import App1 from "./pages/App1";
import App2 from "./pages/App2";
import App3 from "./pages/App3";

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter basename="/repo-collab-auto">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/app1" element={<App1 />} />
            <Route path="/app2" element={<App2 />} />
            <Route path="/app3" element={<App3 />} />
            <Route path="*" element={<NoPAT />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
