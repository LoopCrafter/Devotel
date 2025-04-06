import { FormPage, ApplicationsPage, NotFound } from "@/pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "@/components/shared";
function App() {
  return (
    <>
      <Router>
        <Header />
        <div className=" p-4 dark:dark:bg-dark-surface/98 min-h-screen">
          <Routes>
            <Route path="/" element={<FormPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
