import { useEffect, useState } from "react"

function Hashtags({id, tagName, postArray, setPostArray}){
    console.log(postArray)

if (postArray===undefined){


    fetch('http://localhost:3000/hashtags/')
    .then(res=>res.json())
    .then(res=>{console.log(res)
        setPostArray(res)})
}

console.log(postArray)
const mapPostArray=postArray?.map(item=>{
   console.log(item.hashtags[0].name)
    return (
        <div key={item.id} className="container">
<img src={item.user.image_url} className='profilePic'/>
<b> {item.user.username}</b> 
<p>{item.bark}</p>
        </div>
    )
})

return (
    <div className="box">
        <p>#{tagName}</p>
        {mapPostArray}
    </div>
)
}





export default Hashtags