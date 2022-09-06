import { useState, useEffect } from 'react'


const TodosComp = (props) => {

    //props.todosData --- מערך של משימות פר יוזר
    //props.idForTodos -- מזהה של יוזר

    const [todosUserData, setTodosUserData] = useState([])
    const [newTodo, setNewTodo] = useState({ userId: 0, id: 0, title: "", completed: false })
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {

        setTodosUserData(props.todosData)

    }, [props])


    const markTrue = (e) => {
     
        let userid = props.idForTodos
        let idTask = parseInt(e.target.id) // כי ה ID חזר כמחרוזת
        let titTask = e.target.title
        let newObj = { userId: userid, id: idTask, title: titTask, completed: true }

        props.MarkTask(newObj) // שליחת האובייקט המעודכן לאבא שיעדכן אצלו בסטייט 

    }

    const openNewTodo = () => {
        setIsOpen(true)
    }

    const addNewTodo = () => {
        if (newTodo.title != "" && newTodo.id != todosUserData.findLast(x => x).id)   //לא מאפשר הוספת משימה ריקה 
        {
            props.addTodo(newTodo) //שליחת המשימה החדשה לאבא שיעדכן בסטייט הראשי
            setIsOpen(false)
        }

    }

    const cancelNewTodo = () => {
        setIsOpen(false)
    }

    return (

        <div>
            {
                isOpen ?
                    <div>
                        New Todo - User {props.idForTodos} <br />
                        <form style={{ border: "3px solid gray", height: "100px", textAlign: "center", paddingTop: "50px" }}>

                            <label htmlFor="id_titleTodo"> Title: </label>
                            <input id="id_titleTodo" type="text" onChange={e => setNewTodo({ ...newTodo, userId: props.idForTodos, id: todosUserData.findLast(x => x).id + 1, title: e.target.value })} /><br />
                            
                            <input type="button" value="Cancel" onClick={cancelNewTodo} style={{ background: "gold", margin: "20px" }} />
                            <input type="button" value="Add" onClick={addNewTodo} />
                        </form>
                    </div>

                    :

                    <div style={{ height: "400px", overflowY: "scroll", border: "3px solid gray" }}>
                       
                        Todos - User {props.idForTodos}
                        
                        {props.idForTodos <= 10 ?  //החרגה ליוזרים חדשים שנוספו שאין להם משימות
                           <input type="button" value="Add" style={{ background: "gold", marginLeft: "100px" }} onClick={openNewTodo} />  : <h3 style={{color: "red"}}>No todos found for this user...</h3> } 
                        <ul>
                            {



                                todosUserData.map(item => {
                                    return <li key={item.id} style={{ border: "1px solid black", marginBottom: "15px", listStyleType: "none" }}>
                                        Title: {item.title} <br />
                                        Completed: {item.completed.toString()}  {item.completed == false && <input type="button" value="Mark Completed" id={item.id} title={item.title} onClick={markTrue} style={{ background: "gold", marginLeft: "10px" }} />}
                                    </li>
                                })

                            }
                        </ul>
                    </div>
            }

        </div>



    )
}

export default TodosComp