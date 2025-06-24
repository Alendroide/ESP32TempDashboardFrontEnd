import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import ReportPage from "./pages/ReportPage";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {
  return (
    <DefaultLayout>
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<ReportPage />} path="/report" />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
