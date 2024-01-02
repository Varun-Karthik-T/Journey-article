async function comment (client,req,res){
try{
    const {id} = req.body;
    const query = "SELECT * from Comment where article_id=$1";
    const values =[id];
    const qresult= (await client.query(query,values));
    res.json(qresult.rows);
    }
    catch(error){
      console.log("Error fetching comment:",error);
      res.status(500).json({fetchcomment:false});
    }
}

export {comment}