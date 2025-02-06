import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Scanner } from "./components/layout/Home";
import { AdminPanel } from "./components/layout/AdminPanel";
import { Header } from "./components/layout/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <Header />
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Scanner />} />
            <Route path="/admin*" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
