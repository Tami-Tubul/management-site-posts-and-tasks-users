import axios from 'axios'
import { useEffect, useState } from 'react'
import PostsComp from './Posts'
import TodosComp from './Todos'
import UserComp from './User'

const UsersComp = () => {


    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [todos, setTodos] = useState([])

  
    //For case 2
    const [searchVal, setSearchVal] = useState("")
    const [filterSearchUsers, setFilterSearchUsers] = useState([])

    //For case 5 
    const [idForTodosAndPosts, setIdForTodosAndPosts] = useState(0)

    //For case 8
    const [newUser, setNewUser] = useState({ id: 0, name: "", email: "", address: { street: "", city: "", zipcode: "" } })
    const [isOpen, setIsOpen] = useState(false)


    useEffect(async () => {
       
        let resp_users = await axios.get("https://jsonplaceholder.typicode.com/users")
        let resp_posts = await axios.get("https://jsonplaceholder.typicode.com/posts")
        let resp_todos = await axios.get("https://jsonplaceholder.typicode.com/todos")

        setUsers(resp_users.data)
        setPosts(resp_posts.data)
        setTodos(resp_todos.data)
        
    }, [])



    const filterUsers = (e) => {

        setSearchVal(e.target.value)

        let val = e.target.value

        let filUsers = users.filter(item => {
            return (item.name.toLowerCase().includes(val.toLowerCase())) || (item.email.toLowerCase().includes(val.toLowerCase()))
        })
        setFilterSearchUsers(filUsers)
    }


    const openNewUser = () => {
        setIsOpen(true)
        setIdForTodosAndPosts(0)
        setNewUser({ id: users.findLast(x => x).id + 1, name: "", email: "", address: { street: "", city: "", zipcode: "" } }) //ריקון הסטייס בכל הוספת יוזר שלא יתווסף הערך הקודם אם לא הושלם בשדות

    }

    const addNewUser = () => {
        if ((newUser.name || newUser.email) != "")   //לא מאפשר הוספת יוזר ריק 
        {
            setUsers([...users, newUser])
            setIsOpen(false)
        }
    }

    const cancelNewUser = () => {
        setIsOpen(false)
    }

    //עשיתי את זה בספלייס
    // const updateTodos = (obj) =>{
    //     let updateArr = todos.map(item => {
    //         return obj.id == item.id ? obj : item
    //     })
    //  setTodos([...updateArr])
    // }

   
   
    const addNewPost = (obj) => {
        posts.map(x => {   //מעלה את המזהה ב1 כדי למנוע כפילות ID
            if (x.id >= obj.id)
                x.id++
        })
        posts.splice((obj.id - 1), 0, obj)
        setPosts([...posts])
    }


    const addNewTodo = (obj) => {
        todos.map(x => {   //מעלה את המזהה ב1 כדי למנוע כפילות ID
            if (x.id >= obj.id)
                x.id++
        })
        todos.splice((obj.id - 1), 0, obj)
        setTodos([...todos])
    }


    return (
        <div>

            <div style={{ width: "49%", border: "3px solid gray", textAlign: "left", float: "left" }}>
                Search

                <input type="search" style={{ margin: "10px" }} onChange={filterUsers} />

                <input type="button" value="Add" style={{ background: "gold" }} onClick={openNewUser} />

                {
                    searchVal.length == 0 ?

                        users.map(item => {
                            let fil = todos.filter(x => item.id === x.userId)
                            return <UserComp key={item.id} userdata={item} todosUser={fil} updateUser={(userID, obj) => { return users.splice(userID - 1, 1, obj), setUsers([...users]), alert("Updated!") }} deleteUser={userID => { return setUsers(users.filter(x => x.id !== userID)), setIdForTodosAndPosts(0) }} TodosAndPostsID={id => setIdForTodosAndPosts(id)} isRed={item.id == idForTodosAndPosts ? "#F8CBAD" : "white"}/>
                        }) :

                        filterSearchUsers.map(item => {
                            let fil = todos.filter(x => item.id === x.userId)
                            return <UserComp key={item.id} userdata={item} todosUser={fil} updateUser={(userID, obj) => { return users.splice(userID - 1, 1, obj), setUsers([...users]), alert("Updated!") }} deleteUser={userID => { return setUsers(users.filter(x => x.id !== userID)), setFilterSearchUsers(users.filter(x => x.id !== userID)), setIdForTodosAndPosts(0) }} TodosAndPostsID={id => setIdForTodosAndPosts(id)} isRed={item.id == idForTodosAndPosts ? "#F8CBAD" : "white"}/>
                        })

                }

            </div>


            <div style={{ width: "49%", textAlign: "left", float: "right" }}>

                {
                    isOpen && idForTodosAndPosts == 0 ?
                        <div>
                            Add New User <br />
                            <form style={{ border: "3px solid gray", height: "100px", textAlign: "center", paddingTop: "50px" }}>

                                <label htmlFor="id_name"> Name: </label>
                                <input id="id_name" type="text" onChange={e => setNewUser({ ...newUser, id: users.findLast(x => x).id + 1, name: e.target.value })} /><br />
                                
                                <label htmlFor="id_email"> Email: </label>
                                <input id="id_email" type="text" onChange={e => setNewUser({ ...newUser, id: users.findLast(x => x).id + 1, email: e.target.value })} /><br />
                                
                                <input type="button" value="Cancel" onClick={cancelNewUser} style={{ background: "gold", margin: "20px" }} />
                                <input type="button" value="Add" onClick={addNewUser} />
                            </form>
                        </div>

                        : idForTodosAndPosts > 0 &&
                        <div>
                            {

                                <TodosComp todosData={todos.filter(x => x.userId == idForTodosAndPosts)} idForTodos={idForTodosAndPosts} MarkTask={obj => { return todos.splice((obj.id - 1), 1, obj), setTodos([...todos]) }} addTodo={addNewTodo} />

                            }

                            <br />

                            {

                                <PostsComp postsData={posts.filter(x => x.userId == idForTodosAndPosts)} idForPosts={idForTodosAndPosts} addPost={addNewPost} /> 

                            }
                        </div>
                }
            </div>




        </div>

    )
}

export default UsersComp