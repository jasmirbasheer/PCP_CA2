import "./App.css";
import AppRouter from "./routers/AppRouter";
import { OrdersProvider } from "./context/OrdersContext";

const App = () => {
  return (
    <OrdersProvider>
      <AppRouter />
    </OrdersProvider>
  );
};

export default App;
