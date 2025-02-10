import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateFetus from './component/CreateFetus/CreateFetus';
import CreateFetusHealth from './component/CreateFetusHealth/CreateFetusHealth';
import Header from './component/Header/Header';
import ManageUsersPage from './component/Admin/ManagementUserPage';
import { Provider } from 'react-redux';
import { store } from './store/config';
import MyProfile from './component/Profile/Profile';
import Footer from './component/Footer/Footer';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <main className="main-content" style={{ flex: '1' }}>
            <Routes>
              <Route path="/" element={<CreateFetus />} />
              <Route path="/create-fetus" element={<CreateFetus />} />
              <Route path="/create-fetus-health" element={<CreateFetusHealth />} />
              <Route path="/management-users" element={<ManageUsersPage />} />
              <Route path='/profile' element={<MyProfile />} />
            </Routes>
          </main>
          <Footer /> {/* Sử dụng component Footer của bạn */}
        </div>
      </Router>
    </Provider>
  );
}

export default App;