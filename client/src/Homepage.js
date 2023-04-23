
import {Fragment, useEffect, useState} from 'react'
import Button from './styles/Button';

import Input from './styles/Input';

import { useHistory } from 'react-router-dom'
 import CreateBarks from './CreateBarks'
import PICTURES from './pictures';
function Home({userStuff, setUserStuff, id,  setTagName, setPostArray, setProgress}){
const [isSelected, setIsSelected]=useState(false)
const [editProfile, setEditProfile]=useState(false)
const [barks, setBarks]=useState()
const [profilePic, setProfilePic]=useState('')
const [newUserName, setNewUserName]=useState('')
const [hideButton, setHideButton]= useState('')

const history=useHistory()

useEffect(() => {
fetch('/posts')
.then(r=>r.json())
.then(r=>{setBarks(r)})
    const interval = setInterval(async () => {
      const response = await fetch('/posts');
      const data = await response.json();
      setBarks(data);
  
    }, 1000);


  return () => clearInterval(interval);
  }, [userStuff]);
  


function changeUserstuff(e){
    setProgress(20);
    setProgress(50);
    e.preventDefault();
    fetch(`/users/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: newUserName,
            image_url: profilePic
        })
    })
    .then((res) => {
        if (res.ok) {
            setProgress(100);
            res.json().then((res) => {
                setUserStuff([res]);
                setProgress(0);
            });
        } else {
            res.json().then((err) => {
                alert(err.errors);
                setProgress(0);
            });
        }
    });
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
              <div><img className='profilePic'src={item.image_url}
                alt='userImage'/></div>
                    <button className='editBtn' onClick={(e)=>{setEditProfile(true)}}>Edit Profile</button>
               {editProfile?<div>
                <button onClick={()=>{setEditProfile(false)}}>x</button>
                <form onSubmit={changeUserstuff} className='editStuff'>
                
                    <div >
                <span>New Profile Picture:</span>
                <div className='homepage__pictures' >  {PICTURES.map(item=>{
                return (
              <img src={item} className='profilePic' onClick={(e)=>{setProfilePic(item)
                e.target.style.transform='scale(1.20'}} key={Math.random()} />
              )})}</div>
             
                </div>
                <div>
                 <input type='text'
                 placeholder='New username'
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

  

        const handleHashtagClick = (hashtag) => {
          setProgress(50)
            fetch(`tagsesh/`, {
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                name:hashtag
           
                })
            })
            .then(r=>r.json())
            .then(r=>{
             setProgress(0)
             setPostArray(r)
            history.push('/HandleHashtags')
             ; 
           })
          
              
           

          };
          
      const mapBarks = barks?.map((item) => {
            return (
              <div key={item.id} className="container">
  <img
    src={item.user.image_url}
    alt="userImage"
    className="profilePic"
  />
  <b   style={{ cursor:'pointer'}}>{item.user.username}</b>
  <div className="makes">
    {item.bark.split(/\s+/).map((text, index) => {
      if (text.startsWith("#")) {
      
        return (
          <>
          <span
            key={`${item.id}-${index}`}
            className="hashtag"
            style={{color:'blue', cursor:'pointer'}}
            onClick={() => handleHashtagClick(text)}
          >
            <em></em>
            {text}
          </span><em>&#160;</em></>
        );
      } else {
        return <span key={`${item.id}-${index}`} className='noTag'>{text} <em>  </em></span>;
      }
    })}
  </div>
</div>
            );
          });
          
          const observer= new IntersectionObserver((entries)=>{
            entries?.forEach((entry)=>{
        
                if(entry.isIntersecting){
                    entry.target.classList.add('show')
                }
                else {entry.target.classList.remove('show')}
            })
        })
        
        const hiddenElements=document.querySelectorAll('.container')
        hiddenElements.forEach((el)=>{observer.observe(el)}) 

    return(
       <Fragment>
     
        <header>
<span><button id='logout' onClick={(e)=>{
   
    if (window.confirm("Are you sure you want to logout?")){
    fetch("/logout",
    {
        method: "DELETE"
    })
   history.push('/')}
}}>Logout</button><button id='delete'onClick={(e)=>{
  if( window.confirm("Are you sure you want to delete your account?")){
   fetch(`users/`,
   {
       method: "DELETE"
   })
  history.push('/')}
}}>Delete Account</button></span>

 <span></span> 
    </header>
        {mapUserStuff}
     
       <section className='box'>
       {mapBarks}
     
   </section>
   <CreateBarks  barks={barks} setBarks={setBarks} userId={id}  setProgress={setProgress}/> 
       </Fragment>
    )

}





export default Home