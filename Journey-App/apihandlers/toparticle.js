async function toparticle(client,req,res,session,s_user,s_role){
  try {
      if (!session || !s_user || !s_role) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }
      const query =
        "select article.article_id,article_content.article_heading,tags.name,article.j_username,article_content.article_img_link from article inner join article_content on article.article_id=article_content.article_id inner join review_status on article.article_id=review_status.article_id inner join tags on tags.tag_id=article.genre_id where status= 'true' order by article_content.time DESC";
      const tresult = await client.query(query);
      console.log(tresult.rows);

      res.json({ message: " top api received", result: tresult.rows });
    } catch (error) {
      console.log("error in showing editor page content:", error);
      res.status(500).json({
        success: false,
        message: "Error showing top of home page content",
      });
    }
}

export{toparticle};