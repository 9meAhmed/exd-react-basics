import { useState, useEffect, memo, useCallback, use } from 'react';

const ToDoList = () =>{

    // const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');


    const onFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newItem = formData.get('item-name');

        setItems(prevItems => [...prevItems, newItem]);

        e.target.reset()
    }

    const markAsCompleted = useCallback((id) => {
        setFilteredItems(prevItems => prevItems.map((item, index) => {
            if(item.id === id){
                return {...item, completed: true};
            }
            return item;
        }));

    }, []);

    const fetchTodoItems = useCallback(() => {
        fetch('http://localhost:3000/grossary-items')
        .then(res => {return res.json()})
        .then((res)=>{
            // setItems([...res.todos]);
            setFilteredItems([...res.todos]);
        });
    }, []);


    useEffect(() => {

        fetchTodoItems();

    }, []);

    return (<>
        <div className="container mt-4">
            <ul className="list-group">
                <li className='list-group-item'>
                    <form onSubmit={(e) => { onFormSubmit(e) }}>
                        <div className="input-group">
                            <input type="text" name='item-name' className="form-control" placeholder="Enter Item Name..." aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="submit">Add</button>
                            </div>
                        </div>
                    </form>
                </li>
                <li className='list-group-item'>
                    <select className="form-select" aria-label="Default select example" onChange={(e) => {setFilterStatus(e.target.value)}}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                </li>
                {
                    filteredItems.length === 0 ? (
                        <li className="list-group-item">No items in the list.</li>
                    ) : (
                        filteredItems.filter(item => {
                            if(filterStatus === 'all') return true;
                            if(filterStatus === 'completed') return item.completed;
                            if(filterStatus === 'pending') return !item.completed;
                        }).map((item, index) => (
                            <TodoItem key={item.id} item={item} markAsCompleted={markAsCompleted}/>
                        ))
                    )
                }
            </ul>
        </div>
    </>);
}

export default ToDoList;

const TodoItem = memo(({item, markAsCompleted}) => {
    
    console.log("TodoItem rendered", item);
    return (
        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            {item.todo}

            {
                    item.completed ? <button className="btn btn-success btn-sm">Completed</button> : <button onClick={() => {markAsCompleted(item.id)}} className="btn btn-danger btn-sm">Mark as Completed</button>
            }
            
        </li>
    );
});