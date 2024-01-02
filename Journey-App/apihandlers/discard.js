async function discard(client,req,res,id,s_user,s_role,session){
    try{
      if (!session || !s_user || !s_role) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }
      const q7="DELETE FROM article WHERE article_id = $1";
      const q10="DELETE FROM article_content WHERE article_id = $1";
      const q9="DELETE FROM review_status WHERE article_id = $1";
      let valuee=[id];
      console.log(await client.query(q9,valuee))
      console.log(await client.query(q10,valuee))
      console.log(await client.query(q7,valuee))
      const q8="select * from article inner join article_content on article.article_id=article_content.article_id inner join review_status on article.article_id=review_status.article_id where article.article_id=$1";
      const check1= await client.query(q8,valuee);
      if(check1.rows==0){res.json({ message: " discard api received", id: id, user: s_user,success: true });}
      else{res.json({ message: " discard api received", id: id, user: s_user,success: false });}}
      catch(error){
        console.log("error in discarding:",error);
        res.status(500).json({
          success: false,
          message: 'Error in discarding',
        })
      }
}

export{discard};