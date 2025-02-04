import { useEffect, useRef, useState } from "react"
import Message from "./Message"
import {io} from "socket.io-client"




function App(){
  const socket = useRef(null)
  const [message,setMessage] = useState("")
  const [prevMessage,setPrevMessage] = useState([])

  useEffect(() =>{
      socket.current = io("http://localhost:3000")
      socket.current.on("newMessage",(newMessage) =>{
        setPrevMessage((prevMessage) =>[...prevMessage,newMessage])
        console.log(newMessage)
      })
  },[])

  function sendMessage(event){
    event.preventDefault();
    socket.current.emit("newMessage",message)
  }
  
  function addImage(){
    
  }



  return(
    <>
      <div className=" h-screen flex justify-center items-center overflow-hidden">


        <form className="border-2 h-150 w-100 bg-rose-200" onSubmit={sendMessage} >

          <div className="border-2 h-135 p-3 gap-y-2 flex flex-col break-all scrollable overflow-y-auto" >
            {prevMessage.length > 0 ? (
              prevMessage.map((item,key) =>{
                return <Message Messages={item} key={key}></Message>
              } )
            ):(
              <p>No Messages.</p>
            )}
          </div>


              <div id="sendMessageBar" className="relative top-[0%] border-2 h-15 items-center flex">
                <button className="h-10 w-10 border-2 cursor-pointer" type="button" onClick={addImage}>#<img/></button>
                <div className="absolute top-2">
                    <textarea className="absolute border-2 rounded-lg left-10 w-76.5 h-10 top-0 pl-2 pt-1" 
                              placeholder="Send Message..."
                              value={message}
                              onChange={(e) =>setMessage(e.target.value)}/>
                </div>
                <button className="absolute border-2 rounded-full w-10 h-10 right-1 cursor-pointer" type="submit"><img src="/sendIcon.png" className="w-5 h-5 ml-2"></img></button>
            </div>
        </form>
      </div>
    </>
  )
}

export default App