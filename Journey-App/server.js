import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import { dbconnect } from "./dbconnect.js";
import { loginapi, s_user, s_role } from "./apihandlers/loginhandler.js";
import { registerapi } from "./apihandlers/registerhandler.js";
import { article_submit } from "./apihandlers/article_submission.js";
import { editorcont } from "./apihandlers/editorcontent.js";
import { toparticle } from "./apihandlers/toparticle.js";
import { searchresult } from "./apihandlers/search.js";
import { fetchlike } from "./apihandlers/fetchlike.js";
import { articlepage } from "./apihandlers/articlepage.js";
import { likes } from "./apihandlers/likes.js";
import { discard } from "./apihandlers/discard.js";
import { publish } from "./apihandlers/publish.js";
import { comment } from "./apihandlers/fetchcomment.js";
import { insertcomment } from "./apihandlers/insertcomment.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use(
  session({
    secret: "abcde",
    resave: false,
    saveUninitialized: false,
  })
);

async function startServer() {
  try {
    const client = await dbconnect();
    console.log("Database connection established");

    // login api handling - success
    app.post("/login", async (req, res) => {
      await loginapi(client, req, res, req.session);
    });

    //new user register - success
    app.post("/register", async (req, res) => {
      await registerapi(client, req, res);
    });

    //article submission - success
    app.post("/submit", async (req, res) => {
      await article_submit(client, req, res, s_user, s_role, session);
    });

    // review page for editor content - success
    app.get("/review", async (req, res) => {
      await editorcont(client, req, res, session, s_user, s_role);
    });

    // searching - half done
    app.post("/search", async (req, res) => {
      await searchresult(client, req, res, session, s_user, s_role);
    });

    app.get("/top", async (req, res) => {
      await toparticle(client, req, res, session, s_user, s_role);
    });

    // check whether the article is liked or not

    app.post("/fetchlike", async (req, res) => {
      //Request: article id
      //Response: A boolean whether the article is liked or not
      await fetchlike(client, req, res, session, s_user, s_role);
    });

    app.post("/like", async (req, res) => {
      //Request: article id
      //To-DO: Like the article, if it is already present unlike the article
      //Response: None, maybe just a success message
      const { id } = req.body;
      await likes(client, req, res, id, s_user, s_role, session);
    });

    app.post("/article", async (req, res) => {
      await articlepage(client, req, res, session, s_user, s_role);
    });

    app.post("/publish", async (req, res) => {
      //I send the article id, change it's status to reviewed and return success:true
      const { id } = req.body;
      await publish(client, req, res, id, s_user, s_role, session);
    });

    app.post("/discard", async (req, res) => {
      //I send the article id, delete that article from the table and return success:true
      const { id } = req.body;
      await discard(client, req, res, id, s_user, s_role, session);
    });

    app.post("/comments", async (req, res) => {
      await comment(client, req, res);
    });

    app.post("/addcomment", async (req, res) => {
      insertcomment(client, req, res, session, s_user, s_role);
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    app.get("/signout", async (req, res) => {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          res.status(500).json({
            success: false,
            message: "An error occurred during logout",
          });
        } else {
          // Send a success response
          res.json({ success: true, message: "Logout successful" });
        }
      });
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer();
