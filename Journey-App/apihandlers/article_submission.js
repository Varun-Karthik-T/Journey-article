async function article_submit(client, req, res, s_user, s_role, session) {
  if (!session || !s_user || !s_role) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  const { title, content, imageLink, tag } = req.body;

  try {
    const insertArticleQuery =
      "INSERT INTO article (genre_id, j_username) VALUES ((SELECT tag_id FROM tags WHERE name = $1), $2) RETURNING article_id";
    const insertArticleValues = [tag, s_user];

    const articleResult = await client.query(
      insertArticleQuery,
      insertArticleValues
    );
    const articleId = articleResult.rows[0].article_id;

    const insertContentQuery = `
        INSERT INTO article_content (article_id, article_heading, article_content, article_img_link, time)
        VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)`;

    const contentValues = [articleId, title, content, imageLink];
    await client.query(insertContentQuery, contentValues);
    
    res.status(200).json({
      success: true,
      message: "Article created successfully!",
      title: title,
      content: content,
      imageLink: imageLink,
      tag: tag,
      username: s_user,
      role: s_role,
    });
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({
      success: false,
      message: "Error creating article",
    });
  }
}

export { article_submit };
