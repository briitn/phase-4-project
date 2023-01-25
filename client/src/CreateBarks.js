import { useState } from "react"


 function CreateBarks({  barks,
setBarks, userId}){

    
    const [message, setMessage]=useState('')

    function sendMessages(e){

        e.preventDefault()
     
    
    if (message.includes('#')){
        let test= message.split('#')
   // if multiple hashtags, create post then loop through and create each hashtag
    if (test.length>2){
        fetch('http://localhost:3000/posts',
        {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(
                {
              
                  user_id: userId ,
                  bark: message 
              
                }
            )
        })
      // async to make sure post get created first then hashtags
    setTimeout(() => {
        for (let i=1; i<test.length; i++){
  
       
            fetch(`http://localhost:3000/multiple/`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(
                    {
                
                      name: test[i]
                    }
                )
        
            })
            .then(res=>res.json())
            .then(res=>{
              
                    setBarks([ res, ...barks])
             
                  
              
       
            })
        
       
       }}
    , 1000); } 
    //if only one tag, create tag first then create and associate the post
       else{
        for (let i=1; i<test.length; i++){

        fetch(`http://localhost:3000/hashtags/`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(
                    {
                        user_id: userId ,
                        bark: message,
                        name: test[i]
                 
                    }
                )
        
            })
            .then(res=>res.json())
            .then(res=>{
           
                setBarks([ res, ...barks])
          
        
            })

       }}
       
   
        
    }
    // if no tag, simply create post
    else {
        fetch('http://localhost:3000/posts',
        {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(
                {
              
                  user_id: userId ,
                  bark: message 
              
                }
            )
        })
        .then(res=>res.json())
        .then(res=>{
       
    setBarks([res,...barks])
  
         })}
         
 
           }


return (<div className="textBox">

<div >   <textarea placeholder="Type message.." name="msg" value={message}
        onChange={(e)=>{
            setMessage(e.target.value)
        }}></textarea>
        <button onClick={sendMessages} >send</button></div>
  
     
</div>)

 }




 export default CreateBarks