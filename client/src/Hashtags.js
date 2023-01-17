

function Hashtags({ tagName, postArray, setPostArray}){
   
    console.log(postArray)
if (postArray===undefined){


    fetch('http://localhost:3000/hashtags')
    .then(res=>res.json())
    .then(res=>{
        setPostArray(res)})
}


const mapPostArray=postArray?.map(item=>{
 
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