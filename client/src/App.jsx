import { useEffect, useRef, useState } from "react"
import Message from "./Message"
import {io} from "socket.io-client"




function App(){
  const socket = useRef(null)
  const [message,setMessage] = useState("")
  const [prevMessage,setPrevMessage] = useState([])

   // Create a ref for the message container
   const messagesEndRef = useRef(null);

   // Function to scroll to bottom
   const scrollToBottom = () => {
     const messageContainer = document.querySelector('.message-container'); // Add this class to your container
     if (messageContainer) {
         messageContainer.scrollTo({
             top:messageContainer.scrollHeight,
             behavior:"smooth"
         }) 
        }}


  const handleKeyDown = (event) => {
  
    if (event.keyCode === 13 || event.which === 13 && !event.shiftKey) {
      sendMessage(event); // Send the message
      event.preventDefault();
    }
  };

  useEffect(() =>{
      socket.current = io("https://anonymous-chat-app-h7mo.onrender.com")
      socket.current.on("newMessage",(newMessage) =>{
        setPrevMessage((prevMessage) =>[...prevMessage,newMessage])
      })

      return() =>{
        document.removeEventListener("keydown",handleKeyDown)
        socket.current.disconnect();
      }
  },[])

  function sendMessage(event){
    event.preventDefault();
    if(message.trim() == ""){
      return;
    }
    else if(message.length > 250){
      alert("Bro stop spamming")
      return;
    }
    else if(isValidWord(message)){
    socket.current.emit("newMessage",message);
    setMessage("")
    }
    else{
      alert("STOP!")
    }
  }

  function isValidWord(str) {
    // Matches any word with Unicode letters, including accented characters
    const regex = /^[A-Za-zÀ-ÿ]+$/;
    return regex.test(str);
  }
  
  
  function changeMessage(event){
    if(event.key == "Enter"){
     
    }
    else{
      setMessage(event.target.value)
    }
  }

  useEffect(() => {
    scrollToBottom();
    }, [prevMessage]); // Will trigger when messages update


  return(
    <>
      <div className=" h-screen flex justify-center items-center overflow-hidden border-white text-white">


        <form className="border-2 h-150 w-100 bg-black rounded-lg" onSubmit={sendMessage} >

          <div className="border-2 h-135 p-3 gap-y-2 flex flex-col break-words scrollable overflow-y-auto message-container"  >
                      
                        {prevMessage.length > 0 ? (
              prevMessage.map((item,key) =>{
                return <Message Messages={item} key={key}></Message>
              } )
            ):(
              <p>No Messages.Dont Spam Please T_T</p>
            )}
            <div ref={messagesEndRef} />
          </div>


              <div id="sendMessageBar" className="relative top-[0%] border-2 h-15 items-center flex rounded-lg">
                <div className="absolute top-2">
                    <input className="absolute border-2 rounded-lg left-2 lg:w-84 w-80  h-10 top-0 pl-2 pt-0 resize-none " 
                              placeholder="Send Message..."
                              value={message}
                              onChange={changeMessage} onKeyDown={handleKeyDown} />
                </div>
                <button className="absolute border-2 rounded-full w-10 h-10 right-1 cursor-pointer" type="submit"><img src="./send.png" className="w-5 h-5 ml-2.5 color-white"></img></button>
            </div>
        </form>
      </div>
    </>
  )
}

export default App