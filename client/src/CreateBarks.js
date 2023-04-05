import { useState } from "react"


 function CreateBarks({  barks,
setBarks, userId}){
    const[tags, setTags]=useState([])
 
    
    const [message, setMessage]=useState('');

    const splitMsgs=message.split(' ');
  
   
    function sendMessages(e){
        e.preventDefault();
        splitMsgs.map(item=> {
        if (item.charAt(0)==='#'){
            tags.push(item)
        }
            })
      
            console.log(tags)
        if (tags.length===0){
            fetch(`/posts/`,{
                            method:"POST",
                            headers:{"Content-Type":"application/json"},
                            body: JSON.stringify(
                                {
                                    user_id: userId ,
                                   bark: message
                                }
                            )
                    
                        })
                        .then((res)=>{
                            if (res.ok){
                                res.json().then((res)=>{setBarks([res, ...barks])
                              setMessage('')
                                })
                            }
                            else {
                                res.json().then((err) => {
                                   
                               alert(err.errors)})
                }
            })}else if (tags.length!=0) {
                fetch("/hashtags",
            {method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(
                {
                tags,
                 user_id:userId,
                 bark: message
                }
            )
            
            
            })
            .then(res=>res.json())
            .then(res=>{
            
             setBarks([res,...barks])
            })
 }}


return (<div className="textBox">

<div> <textarea placeholder="Type message.." name="msg" value={message}
        onChange={(e)=>{
            setMessage(e.target.value)
        }}></textarea>
      {message.trim()?<button  onClick={sendMessages} >send</button>:<button disabled={true}>send</button>}</div>
  </div>)

 }




 export default CreateBarks