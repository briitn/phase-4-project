import { useState } from "react"
import FormField from "./styles/FormField"
import { useHistory } from "react-router-dom"
function Login({setUserStuff}){

    const history= useHistory()
    const [username, setUsername]=useState('')

    const [password, setPassword]=useState('')

    function changeSubmit(e){
        e.preventDefault()
        fetch("http://localhost:3000/users/login",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                username,
                password
            }
            )
        })
        .then((res)=>{
            if (res.ok){
                res.json().then((res)=>{setUserStuff([res])
                   history.push('/Home')
                 
                })
            }
            else {
                res.json().then((err) => {
                alert(err.errors)})
            }

        })

       
    }

    function changePass(e){

        setPassword(e.target.value)
    
    }

    function changeUser(e){

        setUsername(e.target.value)
      
    }
    return (
        
        <div className='fox'>
      
       
        <h1 className="appName"> <i>Text chat</i>
       </h1>
        <form onSubmit={changeSubmit} className="form">
            <FormField>
            <label> Username:</label>
            <input type='text'
            name="username"

            value={username}
            onChange={changeUser}
            />
            </FormField>
            <FormField>
        <label>

            Password:
        </label>
            <input type='text'
            name="password"

            value={password}
            onChange={changePass}/>
     </FormField>
           <button type="submit" >Login</button>
          
           </form> 
        
        <a href='./create'>Create an account</a>
        </div>
      
    )
}
















export default Login