async function likes(client,req,res,id,s_user,s_role,session){
    try{
      if (!session || !s_user || !s_role) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }
      const q2="select * from article inner join likes on article.article_id=likes.article_id where article.article_id=$1";
      let value=[id];
      const result1= await client.query(q2,value);
      if(result1.rows==0){
        const q3="insert into likes values($1,$2)";
        let value1=[s_user,id];
        await client.query(q3,value1);
      }
      else{
        const q4="delete from likes where article_id=$1";
        await client.query(q4,value);
      }}
      catch(error){
        console.log("error in showing likes content:",error);
        res.status(500).json({
          success: false,
          message: 'Error showing like content',
        })
      }
      res.json({ message: " liked the article", id: id, user: s_user });
}

export{likes}