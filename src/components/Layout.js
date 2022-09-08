import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { editInActive } from "../features/transaction/transactionSlice";

export default function Layout({ children }) {
    const dispatch = useDispatch();

    const handleHome = () => {
        dispatch(editInActive());
    };
    
    return (
        <div className="App">
            <div className="header">
                <h1>
                    <NavLink to="/" onClick={handleHome} style={{textDecoration: "none", color: "white"}}>Expense Tracker</NavLink>
                </h1>
            </div>

            <div className="main">
                <div className="container">{children}</div>
            </div>

            <div className="footer">&copy;2022 Learn with Sumit</div>
        </div>
    );
}
 