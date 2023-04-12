import { Fragment, useEffect } from 'react';


function Hashtags({ tagName, postArray, setPostArray, setTagName}){
useEffect(()=>{
    if (postArray===undefined){
        fetch('/hashtags')
            .then(res=>res.json())
            .then(res=>{
                setTagName(res[0]?.hashtags[0].name)
                setPostArray(res)})
        }
        
},[])

console.log(postArray)

const mapPostArray=postArray?.map(item=>{
 return (
 <div key={item.id} className="container">
  <img src={item.user.image_url} 
  alt='userImage'
   className='profilePic'/>
  <b> {item.user.username}</b> 
   <p>{item.bark}</p>
        </div>
    )
})
          
const observer= new IntersectionObserver((entries)=>{
    entries?.forEach((entry)=>{

        if(entry.isIntersecting){
            entry.target.classList.add('show')
        }
        else {entry.target.classList.remove('show')}
    })
})

useEffect(() => {
    const hiddenElements = document.querySelectorAll(".container");
    hiddenElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      hiddenElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [observer]);
return (
    <Fragment>
       <div className="box">
        <a href='/homepage'>←Go back</a>
        <p>{tagName}</p>
        {mapPostArray}
    </div></Fragment>
)
}





export default Hashtags