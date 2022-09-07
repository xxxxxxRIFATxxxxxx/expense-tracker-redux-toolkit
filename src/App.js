import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import AllTransactions from "./components/Transactions/AllTransactions";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/all-transactions" element={<AllTransactions />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
