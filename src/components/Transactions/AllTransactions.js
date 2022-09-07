import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";

export default function AllTransactions() {
    const [ filterMode, setFilterMode ] = useState("all");

    const dispatch = useDispatch();

    const { transactions, isLoading, isError } = useSelector(
        (state) => state.transaction
    );

    const generatePaginationPage = () => {
        let pages;
        let content = [];


        if (filterMode === "all") {
            pages = Math.ceil(transactions.length / 10);
        }

        else if (filterMode === "income") {
            pages = Math.ceil(transactions.length / 10);
        }

        else if (filterMode === "expense") {
            pages = Math.ceil(transactions.length / 10);
        }

        else if (filterMode === "search") {
            pages = Math.ceil(transactions.length / 10);
        };

        for (let i = 1; i <= pages; i++) {
            content.push(<button key={Math.random()} className="custom-btn">{i}</button>)
        };

        return content;
    };

    const handleFilterMode = (e) => {
        setFilterMode(e.target.value);
    };

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    // decide what to render
    let content = null;
    if (isLoading) content = <p>Loading...</p>;
 
    if (!isLoading && isError)
        content = <p className="error">There was an error occured</p>;
 
    if (!isLoading && !isError && transactions?.length > 0) {
        content = transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
        ));
    }

    if (!isLoading && !isError && transactions?.length === 0) {
        content = <p>No transactions found!</p>;
    }

    return (
        <>
            <div style={{display: "flex"}}>
                <div style={{marginRight: "10px"}}>
                    <input onChange={handleFilterMode} type="radio" name="filterType" value="income" />
                    <span>Income</span>
                </div>

                <div style={{marginRight: "10px"}}>
                    <input onChange={handleFilterMode} type="radio" name="filterType" value="expense" />
                    <span>Expense</span>
                </div>

                <div style={{marginRight: "10px"}}>
                    <input checked={filterMode === "all" ? true : false} onChange={handleFilterMode} type="radio" name="filterType" value="all" />
                    <span>All</span>
                </div>
            </div>

            <div className="conatiner_of_list_of_transactions">
                <ul>{content}</ul>
            </div>

            <div>
                {generatePaginationPage()}
            </div>
        </>
    );
}
