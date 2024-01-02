app.get("/top", async (req, res) => {
      try{
        if (!session || !s_user || !s_role) {
          res.status(401).json({ success: false, message: 'Unauthorized' });
          return;}
        const query = "select * from article natural join article_content natural join review_status where status= 'reviewed' order by article_content.time DESC";
        const tresult= await client.query(query);
        console.log(tresult.rows);
  
        res.json({ message: " top api received",result:tresult.rows });}
        catch(error){
          console.log("error in showing editor page content:",error);
          res.status(500).json({
            success: false,
            message: 'Error showing top of home page content',
          })
        }
      res.json({ message: " top api received" });
    });