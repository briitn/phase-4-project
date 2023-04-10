import { useState } from "react"


 function CreateBarks({  barks,
setBarks, userId,setProgress}){
    const[tags, setTags]=useState([])
 const [loading, setLoading]=useState(false)

    const [message, setMessage]=useState('');

    const splitMsgs=message.split(' ');
  
   
    function sendMessages(e){
        e.preventDefault();
        setProgress(20)
       
        splitMsgs.map(item=> {
        if (item.charAt(0)==='#'){
            tags.push(item)
        }
            })
      
     
        if (tags.length===0){
            setProgress(50)
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
                        .then((res)=>{setProgress(100)
                            if (res.ok){
                                res.json().then((res)=>{setBarks([res, ...barks])
                              setMessage('')
                              setProgress(0)
                                })
                            }
                            else {
                                res.json().then((err) => {
                                    setProgress(0)
                               alert(err.errors)})
                }
            })}else if (tags.length!=0) { setProgress(50)
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
            .then((res)=>{setProgress(100)
                if (res.ok){
                    res.json().then((res)=>{setBarks([res, ...barks])
                  setMessage('')
                  setProgress(0)
                    })
                }
                else {
                    res.json().then((err) => {
                        setProgress(0)
                   alert(err.errors)})
    }})}}


return (<div className="textBox">

<div> <textarea placeholder="Type message.." name="msg" value={message}
        onChange={(e)=>{
            setMessage(e.target.value)
        }}></textarea>
      {message.trim()?<button  onClick={sendMessages} >send</button>:<button disabled={true}>send</button>}</div>
  </div>)

 }




 export default CreateBarks