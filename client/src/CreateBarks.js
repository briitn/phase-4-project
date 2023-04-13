import { useState } from "react"


function CreateBarks({ barks, setBarks, userId, setProgress }) {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
  
    const splitMsgs = message.split(' ');
  
    async function sendMessages(e) {
      e.preventDefault();
      setProgress(20);
  
      const updatedTags = splitMsgs.filter((item) => item.charAt(0) === '#');
      setTags(updatedTags);
  console.log(updatedTags)
      if (updatedTags.length === 0) {
        setProgress(50);
        try {
          const res = await fetch('/posts/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user_id: userId,
              bark: message,
            }),
          });
  
          setProgress(100);
          const data = await res.json();
  
          if (res.ok) {
            setBarks([data, ...barks]);
            setMessage('');
            setProgress(0);
          } else {
            alert(data.errors);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (updatedTags) {
        setProgress(50);
        try {
          const res = await fetch('/hashtags', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              tags: updatedTags,
              user_id: userId,
              bark: message,
            }),
          });
  
          setProgress(100);
          const data = await res.json();
  
          if (res.ok) {
            setBarks([data, ...barks]);
            setMessage('');
            setProgress(0);
          } else {
            alert(data.errors);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  
    return (
      <div className="textBox">
        <div>
          <textarea
            placeholder="Type message.."
            name="msg"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></textarea>
          {message.trim() ? (
            <button onClick={sendMessages}>send</button>
          ) : (
            <button disabled={true}>send</button>
          )}
        </div>
      </div>
    );
  }
  




 export default CreateBarks