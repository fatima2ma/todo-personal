import './App.css';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Header from './components/Header';
import SignIn from './pages/outh/Signin';
import SignUp from './pages/outh/Signup';
import ForgetPassword from './pages/outh/ForgetPassword';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IsClosedSideProvider } from './context/IsClosedSide';
function App() {
  return (
    <BrowserRouter>
      <div className="App bg-gray-600 w-full min-h-screen flex flex-col gap-0.5">
        <IsClosedSideProvider>
        <Header/>
        <div className='main w-full h-full flex items-center justify-center'>
          <Routes>
            <Route path='/' element={<SignIn/>}/>
            <Route path='/home' element={<PrivateRoute/>}>
              <Route path='/home' element={<Home/>}/>
            </Route>
            
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/forgetpassword' element={<ForgetPassword/>}/>
          </Routes>
        </div>
        </IsClosedSideProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
