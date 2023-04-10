
import './App.css';
import {Route, Switch} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { Fragment, useEffect, useState } from 'react';
import Create from './Create';
import Home from './Homepage'
import Hashtags from './HandleHashtags';
function App() {
  const [postArray, setPostArray]=useState()
  const [progress, setProgress] = useState(0);

  const [userStuff, setUserStuff]=useState()
  const [id, setId]=useState('')
  const [tagName, setTagName]=useState()


  useEffect(()=>{
    fetch("/home")
    .then(res=>res.json())
    .then(res=>{

      setId(res.id)
      setUserStuff([res])})},[])
 
      const divStyle = {
        width: `${progress}%`, 
        height: `${3}px`,
  
          backgroundColor: 'black',
        };
  return (
    <Fragment>
         <div style={divStyle}></div>
   <BrowserRouter>
   <Switch>
    <Route exact path='/'>
     
      <Login  setUserStuff= {setUserStuff} setProgress={setProgress}/>
    </Route>
    <Route exact path='/create'>
      <Create setProgress={setProgress} />
    </Route>
    <Route exact path='/homepage'>
<Home userStuff={userStuff} setUserStuff={setUserStuff} setProgress={setProgress}
 setTagName={setTagName} setPostArray={setPostArray} id={id} tagName={tagName}
 />
    </Route>
 <Route exact path='/HandleHashtags'>
  <Hashtags   tagName={tagName} setPostArray={setPostArray}
   postArray={postArray} setTagName={setTagName} setProgress={setProgress} />

 </Route>
   </Switch>
   </BrowserRouter></Fragment>
  );
}

export default App;
// 