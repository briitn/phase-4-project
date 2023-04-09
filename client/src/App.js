
import './App.css';
import {Route, Switch} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { useEffect, useState } from 'react';
import Create from './Create';
import Home from './Homepage'
import Hashtags from './HandleHashtags';
function App() {
  const [postArray, setPostArray]=useState()
  

  const [userStuff, setUserStuff]=useState()
  const [id, setId]=useState('')
  const [tagName, setTagName]=useState()


  useEffect(()=>{
    fetch("/home")
    .then(res=>res.json())
    .then(res=>{

      setId(res.id)
      setUserStuff([res])})},[])
 

  return (
   <BrowserRouter>
   <Switch>
    <Route exact path='/'>
     
      <Login  setUserStuff= {setUserStuff}/>
    </Route>
    <Route exact path='/create'>
      <Create />
    </Route>
    <Route exact path='/homepage'>
<Home userStuff={userStuff} setUserStuff={setUserStuff} 
 setTagName={setTagName} setPostArray={setPostArray} id={id} tagName={tagName}
 />
    </Route>
 <Route exact path='/HandleHashtags'>
  <Hashtags   tagName={tagName} setPostArray={setPostArray} postArray={postArray} setTagName={setTagName} />

 </Route>
   </Switch>
   </BrowserRouter>
  );
}

export default App;
// 