import { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../layouts/EmojiPickerPopup";
const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChanges = (key, value) => setIncome({ ...income, [key]: value });
  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChanges("icon", selectedIcon)}
      ></EmojiPickerPopup>
      <Input
        value={income.source}
        onChange={({ target }) => handleChanges("source", target.value)}
        label="Income Source"
        placeholder="Freelance Salary etc"
        type="text"
      ></Input>
      <Input
        value={income.amount}
        onChange={({ target }) => handleChanges("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      ></Input>
      <Input
        value={income.date}
        onChange={({ target }) => handleChanges("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      ></Input>

      <div className="flex justify-end">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
