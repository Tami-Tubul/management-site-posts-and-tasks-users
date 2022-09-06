import {useEffect, useState} from 'react'


const UserComp = (props) =>{
     
    //props.userdata -- אובייקט של יוזר
    //props.todosUser -- מערך של משימות של יוזר
    //props.isRed -- צבע אדום ליוזר

    const [user,setUser] = useState({})
    const [todosUser,setTodosUser] = useState([])
    
    const [showMoreData, setShowMoreData] = useState(false)
        

    useEffect(()=>{

        setUser(props.userdata)
        setTodosUser(props.todosUser)

    },[props])

    const changeStyleUser = () =>{        
      
        props.TodosAndPostsID(user.id) //שליחת מזהה של יוזר לאבא לשינוי צבע והצגת משימות ופוסטים שלו
       
    }

    return(
            
      <div style={{border: todosUser.filter(x => x.completed == false).length > 0 ? "3px solid red" : "3px solid green" , margin:"10px" , background: props.isRed}}>

           <label onClick={changeStyleUser} >ID: {user.id} </label><br/>
           
           <form>

               <label htmlFor="id_name"> Name: </label>
               <input type="text" id="id_name" value={user.name || ''} name="name" onChange={e => setUser({...user , name: e.target.value})}/> <br/>

               <label htmlFor="id_email"> Email: </label>
               <input type="email" id="id_email" value={user.email || ''} name="email" onChange={e => setUser({...user , email: e.target.value})}/> <br/>

               <div style={{background:"gray" , margin:"10px", width:"100px"}} onMouseOver={() => setShowMoreData(true)} onClick={() => setShowMoreData(false) }>Other Data</div>

              {/* Other Data */}
               {
                   showMoreData &&

                    <div style={{border:"1px solid black" , background:"lightgray", margin:"0px 150px 10px 150px",padding:"8px", textAlign:"left"}} >

        
                            <label htmlFor="id_street"> Street: </label>
                            <input type="text" id="id_street" value={user.address?.street} name="street" onChange={e => setUser({...user , address:{...user.address , street: e.target.value}})}/> <br/>
                
                            <label htmlFor="id_city"> City: </label>
                            <input type="text" id="id_city" value={user.address?.city} name="city" onChange={e => setUser({...user , address:{...user.address , city: e.target.value}})}/> <br/>
                
                            <label htmlFor="id_zipcode"> Zip Code: </label>
                            <input type="text" id="id_zipcode" value={user.address?.zipcode} name="zipcode" onChange={e => setUser({...user , address:{...user.address , zipcode: e.target.value}})} /> <br/>
                            
              
                </div>

               }
               


               <input type="button" value="Update" style={{background:"gold"}} onClick={() => props.updateUser(user.id,user)}/>
               <input type="button" value="Delete" style={{background:"gold"}} onClick={() => props.deleteUser(user.id) }/>

           </form>
           <br/>


        </div>
    )
}

export default UserComp