import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyAccountPage from './pages/MyAccountPage';
import PrivateRoute from './components/PrivateRoute';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import BookingPage from './pages/BookingPage';
import BookingSearchPage from './pages/BookingSearchPage';
import ReviewsPage from './pages/ReviewsPage';
import BookingSuccessPage from './pages/BookingSuccessPage';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />} >
        <Route index element={<HomePage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/menu' element={<MenuPage />} />
        <Route path='/myBag' element={<CartPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/booking' element={<BookingPage />} />
        <Route path='/booking/search' element={<BookingSearchPage />} />
        <Route path='/booking/success' element={<BookingSuccessPage />} />
        <Route path='/reviews' element={<ReviewsPage />} />
        <Route path='' element={<PrivateRoute />}>
          <Route path='/account' element={<MyAccountPage />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App
