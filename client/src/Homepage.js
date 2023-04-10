
import {Fragment, useEffect, useState} from 'react'
import Hashtags from 'react-highlight-hashtags';

import { useHistory } from 'react-router-dom'
 import CreateBarks from './CreateBarks'
import PICTURES from './pictures';
function Home({userStuff, setUserStuff, id,  setTagName, setPostArray}){

const [editProfile, setEditProfile]=useState(false)
const [barks, setBarks]=useState()
const [profilePic, setProfilePic]=useState('')
const [newUserName, setNewUserName]=useState('')
const [hideButton, setHideButton]= useState('')
const history=useHistory()

useEffect(() => {
    const interval = setInterval(async () => {
      const response = await fetch('/posts');
      const data = await response.json();
      setBarks(data);
    }, 1000); // fetch new posts every second
  
    return () => clearInterval(interval);
  }, []);
  




function changeUserstuff(e){
    e.preventDefault()
    fetch(`/users/`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body:  JSON.stringify(
            
            {
              username: newUserName,
                image_url: profilePic
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


 
useEffect(()=>{
    if (newUserName.trim() || profilePic.trim() ){
        setHideButton(true)
 }
 else {
    setHideButton(false)
 }
}, [newUserName,profilePic])


    const mapUserStuff=userStuff?.map(item=>{
   
        return(
            <div key={item.id}>
                <img className='profilePic'src={item.image_url}
                alt='userImage'/>
               <button          onClick={(e)=>{setEditProfile(true)}}>Edit Profile</button>
               {editProfile?<div>
                <button onClick={()=>{setEditProfile(false)}}>x</button>
                <form onSubmit={changeUserstuff} className='editStuff'>
                
                    <div>
                <span>New Profile Picture:</span>
                
              {PICTURES.map(item=>{
                
                return (<li onClick={(e)=>{setProfilePic(item)}} key={Math.random()}>

                <img src={item} className='profilePic'/>
              </li>)})}
                </div>
                <div>
                <span> New Username:  </span>
                 <input type='text'
                value={newUserName}
                onChange={(e)=>
                {setNewUserName(e.target.value)}}/>
              </div>
               { hideButton?<button>Submit</button>
               :<button disabled={true}>Submit</button>} 
               </form>
            
          
               </div>:<div></div>}
                <p><b>@{item.username}</b></p>
         

</div>
     

        )
      
    })

let test;
setTimeout(() => {
    test= document.querySelectorAll(".makes")
}, 100); 

console.log(profilePic)
    const mapBarks=barks?.map(item=>
        { setTimeout(() => {
            for (const element of test) {
                for (const items of element.children){
               items.addEventListener("click", function(e){
                console.log(e.target.textContent)
                 setTagName(e.target.textContent)
                 fetch(`tagsesh/`, {
                  method:"POST",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify({
                  name:e.target.textContent
             
                  })
              })
                 .then(res=>res.json())
                 .then(res=>{
             
             setPostArray(res)
             });
              setTimeout(() => {
                 history.push('/HandleHashtags')
              },500); 
               })
                }
               }    
        }, 250);
     


  return (
            <div key={item.id} className="container" >
                <img src={item.user.image_url}
                alt='userImage'
                className='profilePic' />
              <b> {item.user.username}</b> 
             <div className='makes'><Hashtags >{item.bark}</Hashtags></div> 
            </div>
            )
       
    })


    return(
       <Fragment>
        <header>
        <span>
            <img src="/chat.jpeg" id='appLogoHome' alt="app logo"/></span>
<button id='logout' onClick={(e)=>{
   
    if (window.confirm("Are you sure you want to logout?")){
    fetch("/logout",
    {
        method: "DELETE"
    })
   history.push('/')}
}}>Logout</button>

  <button id='delete'onClick={(e)=>{
   if( window.confirm("Are you sure you want to delete your account?")){
    fetch(`users/`,
    {
        method: "DELETE"
    })
   history.push('/')}
}}>Delete Account</button>
    </header>
        {mapUserStuff}
       <footer className='box'>
       {mapBarks}
     <CreateBarks  barks={barks} setBarks={setBarks} userId={id} />
   </footer>

       </Fragment>
    )

}





export default Home