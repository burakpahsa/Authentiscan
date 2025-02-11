import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Scanner } from "./components/layout/Home";
import { AdminPanel } from "./components/layout/AdminPanel";
import { Header } from "./components/layout/Header";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { Session } from "@supabase/auth-js";
import { Login } from "./components/layout/AdminPanel/Login";

function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <Header session={session}/>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Scanner />} />
            <Route path="/admin*" element={session ? <AdminPanel /> : <Login/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
