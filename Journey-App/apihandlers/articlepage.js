async function articlepage(client, req, res, session, s_user, s_role) {
  try {
    const { id } = req.body;

    let query =
      "SELECT * from article_content INNER JOIN article ON article_content.article_id = article.article_id INNER JOIN review_status ON article.article_id = review_status.article_id where article.article_id=$1";
    let values = [id];

    const qresult = (await client.query(query, values)).rows[0];
    console.log(qresult);
    let q2 = "SELECT name from tags where tag_id=$1";
    let v2 = [qresult.genre_id];
    const qresult2 = (await client.query(q2, v2)).rows[0];

    const q3 = "Select * from likes where article_id=$1";
    const v3 = [id];

    const qresult3 = (await client.query(q3, v3)).rowCount;

    res.json({
      id: qresult.article_id,
      title: qresult.article_heading,
      role: s_role,
      content: qresult.article_content,
      img: qresult.article_img_link,
      tag: qresult2,
      journalist: qresult.j_username,
      editor: qresult.e_username,
      review: qresult.status,
      j_time: qresult.time,
      e_time: qresult.publish_time,
      like_count: qresult3,
    });
  } catch (error) {
    console.log("Error showing article:", error);
  }
}

export { articlepage };
