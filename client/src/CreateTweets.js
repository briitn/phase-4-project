import { useState } from "react"


 function CreateTweets({ id, barks,
setBarks}){

    const [refresh, setRefresh]=useState(false)
    const [message, setMessage]=useState('')
    console.log(barks)
    function sendMessages(e){

        e.preventDefault()
     
 
    if (message.includes('#')){
        let test= message.split('#')
    
       console.log(test)
       for (let i=1; i<test.length; i++){
        console.log(test[i])
        setTimeout(() => {
            fetch("http://localhost:3000/hashtags",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(
                    {
                  bark: message,
                  user_id: id,
                      name: test[i]
                    }
                )
        
            })
            .then(res=>res.json())
            .then(res=>{
                console.log(barks)
                setBarks([ res,...barks])
                console.log(barks)
            })
        }, 1000);
       
       }
       
   
        
    }
    else {
        fetch('http://localhost:3000/posts',
        {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(
                {
              
                  user_id: id ,
                  bark: message 
              
                }
            )
        })
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
    setBarks([res,...barks])
  
         })}
         
 
           }
console.log(barks)

return (<div className="textBox">

<div >   <textarea placeholder="Type message.." name="msg" value={message}
        onChange={(e)=>{
            setMessage(e.target.value)
        }}></textarea>
        <button onClick={sendMessages} >send</button></div>
  
     
</div>)

 }




 export default CreateTweets