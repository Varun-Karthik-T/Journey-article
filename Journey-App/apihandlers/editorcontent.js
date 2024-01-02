async function editorcont(client, req, res, session, s_user, s_role) {
  if (!session || !s_user || !s_role) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  try {
    let eresult = null;
    if (s_role == "editor") {
      const q =
        "SELECT * FROM article INNER JOIN article_content ON article.article_id = article_content.article_id INNER JOIN review_status ON article.article_id = review_status.article_id INNER JOIN tags on article.genre_id=tags.tag_id WHERE status = 'false' ORDER BY article_content.time ASC";
      eresult = await client.query(q);
      console.log(eresult.rows);
    }

    res.json({ message: "received", result: eresult.rows });
  } catch (error) {
    console.log("error in showing editor page content:", error);
    res.status(500).json({
      success: false,
      message: "Error showing editor page content",
    });
  }
}

export { editorcont };
