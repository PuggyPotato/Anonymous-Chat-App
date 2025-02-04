import { useEffect, useState } from "react"
import Message from "./Message"




function App(){
  const [message,setMessage] = useState("")
  const [prevMessage,setPrevMessage] = useState([])

  useEffect(() =>{
    fetch("http://localhost:3000/getMessage")
    .then(response =>{
      if(!response.ok){
        throw new Error("Network Response was not ok")
      }
      return response.json();
    })
    .then(data => setPrevMessage(data))
    .catch(error => console.log("Error:",error))



  },[])

  function sendMessage(event){
    event.preventDefault()
    fetch("http://localhost:3000/sendMessage",{
      method:"POST",
      headers:{"Content-Type":"Application/json"},
      body: JSON.stringify({message})
    })
    .then(response =>{
      if(!response.ok){
        throw new Error("Network response was not ok")
      }
      return response.json()
    })
    .then(data => console.log(data))
    .catch(error => console.log("Error",error))
  }


  return(
    <>
      <div className=" h-screen flex justify-center items-center">


        <form className="border-2 h-150 w-100" onSubmit={sendMessage}>

          <div className="border-2 h-135 p-3 gap-y-3 flex flex-col break-all" >
            
          </div>


              <div id="sendMessageBar" className="relative top-[0%] border-2 h-15 items-center flex">
                <button className="h-10 w-10 border-2 cursor-pointer">#<img/></button>
                <div className="absolute top-2">
                    <textarea className="absolute border-2 rounded-lg left-10 w-76.5 h-10 top-0 pl-2 pt-1" 
                              placeholder="Send Message..."
                              value={message}
                              onChange={(e) =>setMessage(e.target.value)}/>
                </div>
                <button className="absolute border-2 rounded-full w-10 h-10 right-2 cursor-pointer" type="submit">#</button>
            </div>
        </form>
      </div>
    </>
  )
}

export default App