async function searchresult(client, req, res, session, s_user, s_role) {
  if (!session || !s_user || !s_role) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  const { search, tag, sort } = req.body;

  try {
    let qresult = null;
    let query =
      "SELECT * FROM article " +
      "INNER JOIN article_content ON article.article_id = article_content.article_id " +
      "INNER JOIN review_status ON article.article_id = review_status.article_id INNER JOIN tags on article.genre_id=tags.tag_id " +
      "INNER JOIN (SELECT article_id, COUNT(r_username) AS like_count FROM likes GROUP BY article_id) AS l " +
      "ON l.article_id = article.article_id " +
      "WHERE review_status.status = $1";

    const values = ["true"];

    if (search) {
      query +=
        " AND article_content.article_heading ILIKE $" + (values.length + 1);
      values.push(`%${search}%`);
    }

    if (tag) {
      query +=
        " AND article.genre_id IN (SELECT tag_id FROM tags WHERE name = $" +
        (values.length + 1) +
        ")";
      values.push(tag);
    }

    if (sort) {
      if (sort === "date-descending") {
        query += " ORDER BY review_status.publish_time DESC";
      } else if (sort === "date-ascending") {
        query += " ORDER BY review_status.publish_time ASC";
      } else if (sort === "popularity-ascending") {
        query += " ORDER BY l.like_count DESC";
      } else if (sort === "popularity-descending") {
        query += " ORDER BY l.like_count ASC";
      }
    }

    qresult = await client.query(query, values);
    res.json({ message: "Search API received", result: qresult.rows });
  } catch (error) {
    console.log("Error searching:", error);
    res.status(500).json({
      success: false,
      message: "Error searching article",
    });
  }
}

export { searchresult };
