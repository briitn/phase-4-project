import { useState } from "react"
import FormField from "./styles/FormField"
import { useHistory } from "react-router-dom"
import Input from "./styles/Input"
import Button from "./styles/Button"
function Login({setUserStuff, setProgress}){

    const history= useHistory()
    const [username, setUsername]=useState('')
    const [loading, setLoading]=useState(false)
    const [password, setPassword]=useState('')

    function changeSubmit(e){
        
        e.preventDefault()
        setProgress(20)
        setLoading(true)
        fetch("/users/login",
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
            setProgress(50)
            if (res.ok){
                setProgress(100)
                res.json().then((res)=>{setUserStuff([res])
                    setProgress(0)
                   history.push('/homepage')
                 
                })
            }
            else {
                setLoading(false)
                setProgress(0)
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
        <p className="sign" align="center">Sign in</p>
         <form onSubmit={changeSubmit} className="form">
             <FormField>
             
             <Input type='text'
             name="username"
             placeholder="Username"
             value={username}
             onChange={changeUser}
             />
             </FormField>
             <FormField>
       
             <Input type='text'
             name="password"
           
              placeholder="Password"
             value={password}
             onChange={changePass}/>
      </FormField>
            {loading?<Button>Signing you in...</Button>:<Button>
             Sign in</Button>}
             <p  className='sc'> <a  href='./create'>Create an account</a> </p>
            </form> 
      
       
         </div>
      
    )
}
















export default Login