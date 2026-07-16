import './App.css'
import StudentList from './components/StudentList';
import { useState } from 'react';


const App = () => {


  const [items, setItems] = useState([
    { id: 1, name: 'Milk', status: 'Buy' },
    { id: 2, name: 'Bread', status: 'Buy' },
    { id: 3, name: 'Jam', status: 'Buy' },
    { id: 4, name: 'Eggs', status: 'Buy' }
  ]);

  const onItemClick = (index) => {



    // console.log('Item clicked:', items[index]);

    if(items[index].status === 'Buy'){

      const updatedItems = [...items];

      updatedItems[index].status = 'Done';
      setItems(updatedItems);
    }
    
    

  }

  return <>
    <ul className='g-list'>
      {items.map((item, index) => (
        <li className={`g-item ${item.status === 'Done' && 'item-done'}`} key={item.id}>
          {item.name} <span onClick={()=>{onItemClick(index)}} className={`buy ${item.status === 'Done' && 'buy-done'}`}>{item.status}</span>
        </li>
      ))}
    </ul>
  </>

}




/*

function App() {

  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <main className="student-page">
      <section className="student-shell">

        <button onClick={incrementCount}>Count: {count}</button>
      </section>
    </main>
  )
}

*/

export default App
