import ToDoitem from "./ToDoitem"
import styles from './ToDoitems.module.css'

const TodosItems=({todoItems})=>{
    return <div className={styles.itemsContainer}>
        {todoItems.map((ele)=>{
        return <ToDoitem todoDate={ele.dueDate} todoName={ele.name}></ToDoitem>  
        })}
    </div>   
}

export default TodosItems