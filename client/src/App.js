import logo from './logo.svg';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { useEffect, useState } from 'react';
import Create from './Create';
import Home from './Home'
import Hashtags from './Hashtags';
function App() {
  const [postArray, setPostArray]=useState()
  const [tagId, setTagId]=useState('')
  const [username, setUsername]=useState('')
  const [userStuff, setUserStuff]=useState()
  const [id, setId]=useState('')
  const [tagName, setTagName]=useState()
  const holdTagPosts=[]
  useEffect(()=>{
    fetch("http://localhost:3000/home")
    .then(res=>res.json())
    .then(res=>{
      setUsername(res.username)
      setId(res.id)
      setUserStuff([res])})},[])
 

  return (
   <BrowserRouter>
   <Switch>
    <Route exact path='/'>
     
      <Login  setUserStuff= {setUserStuff}/>
    </Route>
    <Route exact path='/create'>
      <Create username={username} setUsername={setUsername}/>
    </Route>
    <Route exact path='/home'>
<Home userStuff={userStuff} setUserStuff={setUserStuff} 
 setTagId={setTagId} holdTagPosts={holdTagPosts} tagId={tagId} setTagName={setTagName} setPostArray={setPostArray} id={id} postArray={postArray}
 />
    </Route>
 <Route exact path='/hashtags'>
  <Hashtags id={tagId} holdTagPosts={holdTagPosts}  tagName={tagName} setPostArray={setPostArray} postArray={postArray} />

 </Route>
   </Switch>
   </BrowserRouter>
  );
}

export default App;
// 