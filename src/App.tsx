import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Scanner } from "./components/layout/Home";
import { AdminPanel } from "./components/layout/AdminPanel";
import { QrCode, ShieldCheck, Settings } from "lucide-react";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <ShieldCheck className="w-8 h-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold">AuthentiScan</span>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-blue-600"
                >
                  <QrCode className="w-5 h-5 mr-1" />
                  Scan
                </Link>
                <Link
                  to="/admin"
                  className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-blue-600"
                >
                  <Settings className="w-5 h-5 mr-1" />
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Scanner />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
