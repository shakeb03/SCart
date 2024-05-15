import logo from './logo.svg';
import './App.css';
import Routers from './routes/Routers';
import { AuthProvider } from './AuthContext';
import { CartContextProvider } from './CartContext';

function App() {
  return (
    <AuthProvider>
      <CartContextProvider>
        <Routers />
      </CartContextProvider>
    </AuthProvider>
  );
}

export default App;
