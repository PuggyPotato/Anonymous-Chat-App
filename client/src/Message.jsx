


function Message({Messages}){



    return(
        <>  
            <div className=" m-0 p-0 ">
                    <p className="text-xs m-0 text-slate-300 ">Anonymous User</p>
            
                <div className="border-2 w-auto min-w-30  max-w-85 mt-0 h-auto rounded-lg  pt-1 pl-2 flex justify-start pr-2 ">
                    <h2 className="break-words sm:break-all">{Messages}</h2>
                    
                </div>
                
                
            </div>
            
        </>
    )
}


export default Message