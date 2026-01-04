import {Route, Routes} from "react-router-dom";
import Layout from "./Layout.jsx";
import IndexPage from "./Pages/IndexPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import {UserContextProvider} from "./UserContext.jsx";
import {ThemeProvider} from "./ThemeContext.jsx";
import CreatePost from './Pages/CreatePost.jsx';
import PostPage from './Pages/PostPage.jsx';
import EditPost from './Pages/EditPost.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
