import { useState } from "react"
import FormField from "./styles/FormField"
import { useHistory} from "react-router-dom"
function Create(){
  const[newUsername, setNewUsername]=useState()
    const [imageUrl, setImageUrl]=useState('')
    const [password, setPassword]=useState('')
   const [loading, setLoading]=useState(false)
   const history=useHistory()

    function changeSubmit(e){
        e.preventDefault()
     
        fetch ("http://localhost:3000/signup", {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username:newUsername,
                password,
            
                image_url: imageUrl

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

    function changeProfilePic(e){
        setImageUrl(e.target.value)
    }
    return (
        <div className='fox'>
      
       

        <form onSubmit={changeSubmit} className="form">
            <FormField>
            <label> Username:</label>
            <input type='text'
            name="username"

            value={newUsername}
            onChange={changeUser}
            />
            </FormField>
            <FormField>
        <label>

            Password:
        </label>
            <input type='password'
            name="password"

            value={password}
            onChange={changePass}/>
     </FormField>
     
     <FormField>
        <label>

            Profile picture:
        </label>
            <input type='url'
            name="imageUrl"

            value={imageUrl}
            onChange={changeProfilePic}/>
     </FormField>
    
           <button type="submit" >Submit</button>
         
           </form> 
         
       {loading?<div>'Account succesfully created. Redirecting to sign in page...' </div>:<div></div>}
        </div>
      
    )
}









export default Create