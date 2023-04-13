
import {Fragment, useEffect, useState} from 'react'
import Hashtags from 'react-highlight-hashtags';
import TopLoadingBar from 'react-top-loading-bar';



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

    const interval = setInterval(async () => {
      const response = await fetch('/posts');
      const data = await response.json();
      setBarks(data);
  
    }, 2000); // fetch new posts every 2 seconds


  return () => clearInterval(interval);
  }, []);
  


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

console.log(barks)
 
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
                return (<li onClick={(e)=>{setProfilePic(item)
                e.target.style.transform='scale(1.20'}} key={Math.random()}>
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

  

        const handleHashtagClick = (hashtag) => {
          setProgress(50)
            fetch(`tagsesh/`, {
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                name:hashtag
           
                })
            })
               .then(res=>{
                setProgress(100)
                res.json()})
               .then(res=>{
           setProgress(0)
           setPostArray(res)
           history.push('/HandleHashtags')
           ; 
           });
          
              
           

          };
          
          const mapBarks = barks?.map((item) => {
console.log(item.bark)
          
            return (
              <div key={item.id} className="container">
  <img
    src={item.user.image_url}
    alt="userImage"
    className="profilePic"
  />
  <b>{item.user.username}</b>
  <div className="makes">
    {item.bark.split(/\s+/).map((text, index) => {
      if (text.startsWith("#")) {
        console.log(item.bark)
        return (
          <div id='stupid'>
          <span
            key={`${item.id}-${index}`}
            className="hashtag"
            style={{color:'blue'}}
            onClick={() => handleHashtagClick(text)}
          >
            <em></em>
            {text}
          </span><em>&#160;</em></div>
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
     <CreateBarks  barks={barks} setBarks={setBarks} userId={id}  setProgress={setProgress} />
   </footer>

       </Fragment>
    )

}





export default Home