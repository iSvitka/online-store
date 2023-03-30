import { Routes, Route } from 'react-router-dom';
import { CartPage } from './components/CartPage/CartPage';
import ProductPage from './components/ProductPage/ProductPage';
import { Layout } from './components/Layout/Layout';
import MainPage from './components/MainPage/MainPage';
import { NotFound } from './components/NotFound/NotFound';

function App() {
    return (
        <Routes>
            <Route path="online-store/" element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path="/online-store/*" element={<NotFound />} />
                <Route
                    path="/online-store/:productId"
                    element={<ProductPage />}
                />
                <Route path="/online-store/cart" element={<CartPage />} />
            </Route>
        </Routes>
    );
}

export default App;
