async function insertcomment(client, req, res, session, s_user,s_role) {
  if (!session || !s_user || !s_role) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }
  try {
    const { article_id, text } = req.body;
     console.log(req.body)
    const query =
      "INSERT INTO comment (article_id, username, comment) VALUES ($1, $2, $3)";
    const values = [article_id, s_user, text];

    const qresult = await client.query(query, values);

    if (qresult.rowCount > 0) {
      res.status(200).json({ insertcomment: true });
    } else {
      throw new Error("No rows were affected by the insertion.");
    }
  } catch (error) {
    console.log("Error inserting comment:", error);
    res.status(503).json({ insertcomment: false });
  }
}

export { insertcomment };
