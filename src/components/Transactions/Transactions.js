import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchTransactions, updateFilterMode, updatePage, updateTotalTransactions } from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";

export default function Transactions() {
    const dispatch = useDispatch();

    const { transactions, isLoading, isError } = useSelector(
        (state) => state.transaction
    );

    const getLastFiveTransactions = () => {
        const result = transactions.slice(Math.max(transactions.length - 5, 0));
        return result;
    };

    const handleSeeAllTransactions = () => {
        dispatch(updatePage(1));
        dispatch(updateFilterMode("all"));
        dispatch(updateTotalTransactions(1));
    };

    useEffect(() => {
        dispatch(fetchTransactions({
            page: "",
            limit: "",
            filterMode: "", 
            searchText: "",
        }));
    }, [dispatch]);

    // decide what to render
    let content = null;
    if (isLoading) content = <p>Loading...</p>;
 
    if (!isLoading && isError)
        content = <p className="error">There was an error occured</p>;
 
    if (!isLoading && !isError && transactions?.length > 0) {
        content = getLastFiveTransactions().map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
        ));
    }

    if (!isLoading && !isError && transactions?.length === 0) {
        content = <p>No transactions found!</p>;
    }

    return (
        <>
            <p className="second_heading">Your Transactions:</p>

            <div className="conatiner_of_list_of_transactions">
                <ul>{content}</ul>
            </div>

            <NavLink to="/all-transactions" onClick={handleSeeAllTransactions} className="custom-btn">See All Transaction</NavLink>
        </>
    );
}
