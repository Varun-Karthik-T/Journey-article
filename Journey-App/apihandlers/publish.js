async function publish(client,req,res,id,s_user,s_role,session){
    try{
    if (!session || !s_user || !s_role) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
     }  
    console.log(s_user,id)
    const q5="update review_status set status='true',e_username=$2,publish_time=CURRENT_TIMESTAMP where article_id=$1";
    let value=[id,s_user];
    let aid = [id]
    console.log(await client.query(q5,value))
    const q6="select status from review_status where article_id=$1";
    let result = await client.query(q6,aid);
    const status = result.rows[0].status;
    
    if(status=='true'){res.json({ message: " publish api received", id: id, user: s_user,success: true });}
    else{res.json({ message: " publish api not received", id: id, user: s_user,success: false });}
    }
    catch(error){
      console.log("error in publishing:",error);
      res.status(500).json({
        success: false,
        message: 'Error publishing',
      })
    }
}

export{publish};