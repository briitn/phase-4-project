import { useState } from "react"
import FormField from "./styles/FormField"
import { useHistory} from "react-router-dom"
import PICTURES from "./pictures"
function Create({setProgress}){

    

    
  const[newUsername, setNewUsername]=useState('')

    const [password, setPassword]
    =useState('')
   
   const [loading, setLoading]=useState(false)

   const history=useHistory()

    function changeSubmit(e){
        e.preventDefault()
        setProgress(20)
        setLoading(true)
        fetch ("/users/signup", {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username:newUsername,
                password,
            
                image_url: PICTURES[Math.floor(Math.random()*6)+1]

            })
        }).then(r=>{setProgress(50);
             if (r.ok) {
                setProgress(100)
            setTimeout(() => {
                setProgress(0)
                history.push('/')
            }, 1000); 
            r.json();
          } else { setLoading(false)
            setProgress(0)
            r.json().then((err) => 
           
            alert(err.errors));
          }})
    }
    
    function changePass(e){

        setPassword(e.target.value)

    }

    function changeUser(e){

        setNewUsername(e.target.value)
      
    }

    return (
        <div className='fox'>
            <span><em id="appName">TextChat</em>
            <img src="/chat.jpeg" id='appLogo' alt="app logo"/></span>
            <p className="sign">Create Account</p>
        <form onSubmit={changeSubmit} className="form">
              <FormField>
           
              <input type='text'
              name="username"
               className="username"
               placeholder="username*"
              value={newUsername}
              onChange={changeUser}
              />
              </FormField>
              <FormField>
         
              <input type='password'
              name="password"
               className="username"
               placeholder="password*"
              value={password}
              onChange={changePass}/>
       </FormField>
          <button type="submit" className="submit" >Submit</button>
           </form> 
           <span className="gotAcc" ><p>Already have an account?<a href="/">Sign in</a></p>
         {loading?<div>'Creating account... please wait' </div>:<div></div>}</span> 
     
        </div>
      
    )
}









export default Create