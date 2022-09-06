import { useState, useEffect } from 'react'

const PostsComp = (props) => {

    //props.postsData --- מערך של פוסטים פר יוזר
    //props.idForPosts --- מזהה של יוזר

    const [postsUserData, setPostsUserData] = useState([])
    const [newPost, setNewPost] = useState({ userId: 0, id: 0, title: "", body: "" })
    const [isOpen, setIsOpen] = useState(false)


    useEffect(() => {

        setPostsUserData(props.postsData)

    }, [props])


    const openNewPost = () => {     
        setIsOpen(true)
        setNewPost({ userId: 0, id: postsUserData.findLast(x => x).id + 1, title: "", body: "" }) //ריקון הסטייס בכל הוספת פוסט שלא יתווסף הערך הקודם אם לא הושלם בשדות
    }

    const addNewPost = () => {
       
        if((newPost.title || newPost.body) != "")   //לא מאפשר הוספת פוסט ריק 
        {
            props.addPost(newPost) //שליחת הפוסט החדש לאבא שיעדכן בסטייט הראשי
            setIsOpen(false)
        }

    }

    const cancelNewPost = () => {
        setIsOpen(false)
    }



    return (

        <div>
            {
                isOpen ?
                    <div>
                        New Post - User {props.idForPosts} <br />
                        <form style={{ border: "3px solid gray", height: "100px", textAlign: "center", paddingTop: "50px" }}>

                             <label htmlFor="id_titlePost"> Title: </label>
                             <input id="id_titlePost" type="text" onChange={e => setNewPost({ ...newPost, userId: props.idForPosts, id: postsUserData.findLast(x => x).id + 1, title: e.target.value})} /><br />
                             
                             <label htmlFor="id_bodyPost"> Body: </label>
                             <input id="id_bodyPost" type="text" onChange={e => setNewPost({ ...newPost, userId: props.idForPosts, id: postsUserData.findLast(x => x).id + 1, body: e.target.value })} /><br />
                            
                             <input type="button" value="Cancel" onClick={cancelNewPost} style={{ background: "gold", margin: "20px" }} />
                             <input type="button" value="Add" onClick={addNewPost} />
                        </form>
                    </div>

                    :


                    <div style={{ height: "400px", overflowY: "scroll", border: "3px solid gray" }}>
                        
                        Posts - User {props.idForPosts}
                      
                       {props.idForPosts <= 10 ? //החרגה ליוזרים חדשים שנוספו שאין להם פוסטים
                        <input type="button" value="Add" onClick={openNewPost} style={{ background: "gold", marginLeft: "100px" }} /> : <h3 style={{color: "red"}}>No posts found for this user...</h3>}
                        
                        <ul>
                            {

                                postsUserData.map(item => {
                                    return <li key={item.id} style={{ border: "1px solid black", marginBottom: "15px", listStyleType: "none" }}>
                                        Title: {item.title} <br />
                                        Body: {item.body}
                                    </li>
                                })

                            }
                        </ul>
                    </div>
            }
        </div>


    )
}

export default PostsComp