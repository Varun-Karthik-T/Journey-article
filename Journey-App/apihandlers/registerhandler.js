async function registerapi(client, req, res) {
  const { username, fullname, password, phone, role } = req.body;
  
  try {
    const test1 = 'select username from journalist where username=$1';
    const test2 = 'select username from reader where username=$1';
    const test3 = 'select username from editor where username=$1';
    const value = [username];

    const r1 = await client.query(test1, value);
    const r2 = await client.query(test2, value);
    const r3 = await client.query(test3, value);

    if (r1.rows.length === 0 && r2.rows.length === 0 && r3.rows.length === 0) {
      let test, insertResult;
      if (role === 'journalist' || role === 'reader') {
        test = `insert into ${role}(username,name,password,mobile) values($1,$2,$3,$4)`;
        const insertValues = [username, fullname, password, phone];
        insertResult = await client.query(test, insertValues);
      }

      if (insertResult && insertResult.rowCount > 0) {
        res.json({ success: true, message: 'Registration successful', role });
      } else {
        res.json({ success: false, message: 'Failed to register', role });
      }
    } else {
      res.json({ success: false, message: 'Already Registered', role });
    }
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ success: false, message: 'An error occurred during registration', role });
  }
}

export { registerapi };
