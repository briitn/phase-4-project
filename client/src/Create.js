import { useState } from "react"
import FormField from "./styles/FormField"
import { useHistory} from "react-router-dom"

function Create(){

    const PICTURES=[
        '/public/duck.jpg', '/public/mario.webp', '/public/imposter.jpeg' ,"/public/pizza.jpg", '/public/water-melon.png', "/public/butterfly.jpeg"
       ]

       console.log(PICTURES)
  const[newUsername, setNewUsername]=useState('')
    const [imageUrl, setImageUrl]=useState('')
    const [password, setPassword]
    =useState('')
   
   const [loading, setLoading]=useState(false)

   const history=useHistory()

    function changeSubmit(e){
        e.preventDefault()
     
        fetch ("/users/signup", {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username:newUsername,
                password,
            
                image_url: PICTURES[Math.floor(Math.random()*3)+1]

            })
        }).then(r=>{if (r.ok) {
            
            setLoading(true)
            setTimeout(() => {
                history.push('/')
            }, 1000); 
            r.json();
          } else {
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