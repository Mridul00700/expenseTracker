import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseForm from './component/ExpenseForm';
import Alert from './component/Alert';
import ExpenseList from './component/ExpenseList';
import uuid from 'react-uuid';



// const initialExpense = [
//   { id: uuid(), charge: "rent", amount: 1500 },
//   { id: uuid(), charge: "car", amount: 2500 },
//   { id: uuid(), charge: "credit bill", amount: 1200 }
// ];
const initialExpense = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []


function App() {

  const [expenses, setExpenses] = useState(initialExpense);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAmount = e => {
    setAmount(e.target.value)
  }
  const handleCharge = e => {
    setCharge(e.target.value)
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false })
    }, 7000)

  }

  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== '' && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(expense => {
          return expense.id === id ? { ...expense, charge, amount } : expense;
        });
        setExpenses(tempExpenses);
        handleAlert({ type: 'success', text: 'item Edited' });
        setEdit(false);
      } else {
        const expense = { id: uuid(), charge, amount };
        setExpenses([...expenses, expense]);
        handleAlert({ type: 'success', text: 'item added' });
      }
      setCharge('');
      setAmount('');
    } else {
      handleAlert({ type: 'danger', text: `charge can't be empty and amount has to greater than zero` })
    }

  }

  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: 'danger', text: 'All items  deleted' });
  }

  const handleDelete = (id) => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: 'danger', text: 'item deleted' });
  }

  const handleEdit = id => {
    let expense = expenses.find((expense) => expense.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);

  }

  return ( <
        >
    {
      alert.show && < Alert type={alert.type}
        text={alert.text}
      />} <
            h1 > budget calculator < /h1> <
            main className="App" >
        <
          ExpenseForm charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        /> <
          ExpenseList expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        /> < /
            main > <
            h1 >
          total spending: < span className="total" >
            $ {
              expenses.reduce((acc, curr) => {
                return acc += parseInt(curr.amount);
              }, 0)
            } <
                /span> < /
            h1 >

            <
            />
        );
    }

    export default App;