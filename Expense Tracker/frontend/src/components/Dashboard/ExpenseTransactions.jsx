import TransactionInfoCard from "@/Cards/TransactioninfoCard"
import { LuArrowBigRight } from "react-icons/lu"

const ExpenseTransactions=({transations,onSeeMore})=>{
    return <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Expanses</h5>
            <button className="card-btn" onClick={onSeeMore}>
                See All <LuArrowBigRight className="text-base"></LuArrowBigRight>
            </button>
        </div>

        <div className="mt-6">
            {transations?.slice(0,4)?.map((expense)=>{
                <TransactionInfoCard key={expense._id}
                title={expense.category}
                icon={expense.icon}
                date={moment(expense.date).format("Do MMM YYY")}
                amount={expense.amount}
                type="expense"
                hideDeleteBtn
                />
            })}
            </div>
        
    </div>
}

export default ExpenseTransactions