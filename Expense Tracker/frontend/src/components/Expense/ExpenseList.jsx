import TransactionInfoCard from "@/Cards/TransactioninfoCard"
import moment from "moment"
import { LuDownload } from "react-icons/lu"

const ExpenseList=({transactions,onDelete,onDownload})=>{
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">All Expanses</h5>
                <button className="card-btn" onClick={onDownload}>
                    <LuDownload className="text-base"></LuDownload>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactions?.map((expense)=>{
                    console.log(expense)
                    return <TransactionInfoCard
                    key={expense._id}
                    title={expense.category}
                    date={moment(expense.date).format("Do MMM YYYY")}
                    amount={expense.amount}
                    type="expense"
                    onDelete={()=>onDelete(expense._id)}

                    
                    ></TransactionInfoCard>
                })}

            </div>
        </div>
    )
}

export default ExpenseList