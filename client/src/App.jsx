import { useState } from "react"





function App(){
  const [message,setMessage] = useState("")

  function sendMessage(event){
    
  }


  return(
    <>
      <div className=" h-screen flex justify-center items-center">
          <form className="border-2 h-150 w-100" onSubmit={sendMessage}>




              <div id="sendMessageBar" className="relative top-[90%] border-2 h-15 items-center flex">
                  <button className="h-10 w-10 border-2">#<img/></button>
                  <div className="absolute top-2">
                    <textarea className="absolute border-2 rounded-lg left-10 w-76.5 h-10 top-0 pl-2 pt-1" placeholder="Send Message..."/>
                  </div>
                  <button className="absolute border-2 rounded-full w-10 h-10 right-2" type="submit">#</button>
              </div>
          </form>
      </div>
    </>
  )
}

export default App