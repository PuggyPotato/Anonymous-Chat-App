


function Message({Messages}){



    return(
        <>  
            <div className=" m-0 p-0">
                    <p className="text-xs m-0 text-slate-300">Anonymous User</p>
            
                <div className="border-2  w-auto max-w-60  h-auto rounded-lg  pt-1 pl-2 flex justify-start ">
                    <h2 className="break-words">{Messages}</h2>
                </div>
            </div>
        </>
    )
}


export default Message