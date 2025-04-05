import { FormPage, ApplicationsPage, NotFound } from "@/routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "@/components";
function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="container mx-auto p-4">
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
