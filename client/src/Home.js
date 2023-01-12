
import {Fragment, useEffect, useState} from 'react'
import { Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
 import CreateTweets from './CreateTweets'

function Home({userStuff, setUserStuff,setCurrentUser, id, setTagId, holdTagPosts,setTagName, tagId, setPostArray}){

const [allowBark, setAllowBark]=useState(false)
const [barks, setBarks]=useState()
const [profilePic, setProfilePic]=useState('')
const [newUserName, setNewUserName]=useState('')

const history=useHistory()
useEffect(()=>{
    fetch("http://localhost:3000/home")
.then(res=>res.json())
.then(res=>{  setCurrentUser(res.username)
  
    setUserStuff([res])})
}, [])
useEffect(()=>{
    fetch("http://localhost:3000/posts")
.then(res=>res.json())
.then(res=>{  setBarks(res)

    })
}, [userStuff])
function changeProfilePic(e){
    e.preventDefault()
    fetch(`http://localhost:3000/users/`,{
method:"PATCH",
headers:{"Content-Type":"application/json"},
body:  JSON.stringify(
    {
        image_url: profilePic
    }
)})
.then(res=>res.json())
.then(res=>{  setUserStuff([res])
})}

console.log(userStuff)
function changeUsername(e){
    e.preventDefault()
    fetch(`http://localhost:3000/users/`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body:  JSON.stringify(
            {
                username: newUserName
            }
        )})
        .then((res)=>{
            if (res.ok){
                res.json().then((res)=>{setUserStuff([res])
              
                })
            }
            else {
                res.json().then((err) => {
               alert(err.errors)})
            }

        })

       
    }
    
console.log(userStuff)
const [editPic, setEditPic]=useState(false)
    const mapUserStuff=userStuff?.map(item=>{
     console.log(item)
        return(
            <div key={item.id}>
                <img className='profilePic'src={item.image_url}/>
               <button          onClick={(e)=>{setEditPic(true)}}>Edit Profile</button>
               {editPic?<div>
                <form onSubmit={changeProfilePic}>
                <span>New Profile Picture:</span>
                <input type='text'
              
                value={profilePic}
                onChange={(e)=>{
                    setProfilePic(e.target.value)
                }}
                />
                </form>
                <form onSubmit={changeUsername}>
                <span>New Username</span>
                <input type='text'
                value={newUserName}
                onChange={(e)=>
                {setNewUserName(e.target.value)}}/>
                </form>
          
               </div>:<div></div>}
                <p><b>@{item.username}</b></p>
         

</div>
     

        )
      
    })
   
    const mapBarks=barks?.map(item=>{

        return (
            <div key={item.id} className="container" onMouseOver={(e)=>{
                item.hashtags.map(item=>{
setTagName(item.name)
                    setTagId(item.id)
                    
                  })
            }}>
                <img src={item.user.image_url}
                className='profilePic' />
              <b> {item.user.username}</b> 
              <div> {item.bark?.split("#")[0]}  <span className='tag' onClick={(e)=>{
                   fetch(`http://localhost:3000/sessions/${tagId}`)
                   .then(res=>res.json())
                   .then(res=>setPostArray(res))
                 history.push('/hashtags')
              }}>{item.hashtags.map(item=>{
                holdTagPosts.push(item)
                return `#${item.name}`
              })}</span></div>
            
         

            </div>
        )
    })
const filterBarks=barks?.filter(item=>{
   return item.hashtags
})
console.log(filterBarks)
    return(
       <Fragment>

{mapUserStuff}
       <div className='box'>
   
      
   {mapBarks}
    
    <CreateTweets id={id} allowBark={allowBark} setAllowBark={setAllowBark} barks={barks}
    setBarks={setBarks} />
   </div>

<p onClick={(e)=>{
   
    if (window.confirm("Are you sure you want to logout?")){
    fetch("http://localhost:3000/logout",
    {
        method: "DELETE"
    })
   history.push('/')}
}}>Logout</p>

  <p onClick={(e)=>{
   
    if( window.confirm("Are you sure you want to delete your account?")){
    fetch(`http://localhost:3000/users/`,
    {
        method: "DELETE"
    })
   history.push('/')}
}}>Delete Account</p>
    
       </Fragment>
    )

}





export default Home