// loginhandler.js

let s_user = null; 
let s_role = null;

async function loginapi(client, req, res, session) {
  const { username, password, role } = req.body;

  try {
    let text, values;
    if (role === 'editor') {
      text = 'SELECT username FROM editor WHERE username = $1 AND password = $2';
      values = [username, password];
    } else if (role === 'journalist') {
      text = 'SELECT * FROM journalist WHERE username = $1 AND password = $2';
      values = [username, password];
    } else if (role === 'reader') {
      text = 'SELECT * FROM reader WHERE username = $1 AND password = $2';
      values = [username, password];
    }

    const result = await client.query(text, values);

    console.log(result.rows);

    if (result.rows.length > 0) {
      session.username = username;
      session.role = role;
      s_user = session.username;
      s_role = session.role;

      res.json({ success: true, message: 'Login successful', role: role });
    } else {
      res.json({ success: false, message: 'Login unsuccessful', role: role });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
}

export { loginapi, s_user, s_role };
