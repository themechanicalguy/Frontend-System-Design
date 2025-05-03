import About from "./components/about";
import Body from "./components/body";
import Comment from "./components/Comment/Comment";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Login from "./components/login";
// import ProtectedRoutes from "./components/protected-routes";
import { useState } from "react";
import { LangKey } from "./utils/langConstants";

function App() {
  const [lang, setLang] = useState<LangKey>("en");

  console.log(lang);
  return (
    <>
      <header className="text-2xl font-bold py-5 bg-black text-amber-300 text-center flex">
        Hello World
        <nav className="px-20 m-2 w-[1200px] flex justify-between text-lg">
          <a href="/">Home </a>
          <a href="/about">About </a>
          <a href="/login">Login </a>
          <a href="/comment">Comments </a>
          <select
            onChange={(e) => setLang(e.target.value as LangKey)}
            className=""
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ma">Marathi</option>
            <option value="od">Odia</option>
          </select>
        </nav>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />} />
          {/* Bad Approach - or putting condition in Route is also not the proper way */}
          {/* <Route
            path="/about"
            element={isAuthenticated ? <About /> : <Login />}
          /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About lang={lang} />} />
          <Route path="/comment" element={<Comment />} />
          {/* <Route element={<ProtectedRoutes />}>
            <Route path="/about" element={<About lang={lang} />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
