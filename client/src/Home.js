
import {Fragment, useEffect, useState} from 'react'

import { useHistory } from 'react-router-dom'
 import CreateBarks from './CreateBarks'

function Home({userStuff, setUserStuff, id,  setTagName, setPostArray}){


const [barks, setBarks]=useState()
const [profilePic, setProfilePic]=useState('')
const [newUserName, setNewUserName]=useState('')

const history=useHistory()
// initial fetch to get posts and runs again if user updated their name or profile picture
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
// username and profile input fields appear if true
const [editProfile, setEditProfile]=useState(false)
    const mapUserStuff=userStuff?.map(item=>{
   
        return(
            <div key={item.id}>
                <img className='profilePic'src={item.image_url}
                alt='userImage'/>
               <button          onClick={(e)=>{setEditProfile(true)}}>Edit Profile</button>
               {editProfile?<div>
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
            <div key={item.id} className="container" >
                <img src={item.user.image_url}
                alt='userImage'
                className='profilePic' />
              <b> {item.user.username}</b> 
              <div> {item.bark.split("#")[0]}  <span className='tag' >{item.hashtags.map(item=>{
                
                return (<span key={item.id} onClick={(e)=>{
                setTagName(item.name)
                    fetch(`http://localhost:3000/tagsesh/`, {
                     method:"POST",
                     headers: {"Content-Type": "application/json"},
                     body: JSON.stringify({
                     name: item.name
         
                     })
                 })
                    .then(res=>res.json())
                    .then(res=>{
               
               setPostArray(res)
            })
                  history.push('/hashtags')
               }}>#{item.name}</span>)
              })}</span></div>
            
         

            </div>
        )
    })


    return(
       <Fragment>

{mapUserStuff}
       <div className='box'>
   
      
   {mapBarks}
    
    <CreateBarks  barks={barks} setBarks={setBarks} userId={id} />
   </div>
<div className='bottom'>
<button onClick={(e)=>{
   
    if (window.confirm("Are you sure you want to logout?")){
    fetch("http://localhost:3000/logout",
    {
        method: "DELETE"
    })
   history.push('/')}
}}>Logout</button>

  <button onClick={(e)=>{
   
    if( window.confirm("Are you sure you want to delete your account?")){
    fetch(`http://localhost:3000/users/`,
    {
        method: "DELETE"
    })
   history.push('/')}
}}>Delete Account</button>
    </div>
       </Fragment>
    )

}





export default Home