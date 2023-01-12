import {useState, useEffect} from 'react'
import Friends from './Friends'
import Messages from './CreateBarks'
function Search({currentUser, userStuff, setId, id, friendArray, allUsers}){
  
    const [username, setUsername]=useState('')
  
  const [friend, setFriend]=useState('')
  const findFriend=friendArray[0]?.find(item=>{return (item.name===friend)})
   

const emptyArray=[]
userStuff?.map(item=>{
    for (let i=0; i<item.friends.length; i++)
        emptyArray.push(item.friends[i].name)
  
      })
 
      const filterUsers=allUsers?.filter(item=>item.username.includes(username))
const mapFilterUsers=filterUsers?.map(item=>{
    

    return(
        <div key={item.id} onMouseOver={(e)=>{
            setFriend(item.username)
        }}>
            <ul>
                <li className='lists'>
                <img src={item.image_url} className='profilePic'/>
              
               <div>@{item.username}</div>

          {emptyArray.includes(item.username)?<button onClick={(e)=>{
        
  
     
       setId(findFriend.id)
          }}>message</button>: <button className='btn'
                  onClick={(e)=>{ 
                    e.preventDefault() 
                    fetch(`http://localhost:3000/request`,
                  {
                      method:"POST",
                      headers: {"Content-type": "application/json"},
                      body: JSON.stringify(
                          {
                           requester: currentUser, 
                           user_id: item.id
                          }
                      )
                  })
                                      }}>Add friend</button>}
                 
                </li>
                </ul>

        </div>

    )
})
console.log(id)
return (
    <div>
    <form >
    <input  type='text' placeholder='Search..'
    value={username}
    onChange={(e)=>setUsername(e.target.value)
        
    }/>

</form>
 
   
    </div>
)
}





export default Search