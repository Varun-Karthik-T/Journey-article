async function fetchlike(client, req, res, session, s_user, s_role) {
  if (!session || !s_user || !s_role) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  try {
    const { id } = req.body; // Assuming req.body holds the article_id as a string
    let query = "SELECT * FROM get_likes($1,$2)";
    let value = [s_user, id];
    const qresult = await client.query(query, value);

    if (qresult.rows.length > 0) {
      res.json({ like: true, id: id, user: s_user });
    } else {
      res.json({ like: false });
    }
  } catch (error) {
    console.log("Error fetching like ", error);
    res.status(500).json({
      success: false,
      message: "Error showing editor page content",
      error: error.message,
    });
  }
}

export { fetchlike };
