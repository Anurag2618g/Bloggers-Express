import express from "express";
import bodyParser from "body-parser";

let arrTitle = [];
let arrText = [];
let timeStamp = [];

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

function deleteArr(index) {
  arrText.splice(index);
  arrTitle.splice(index);
  timeStamp.splice(index);
}

app.get("/", (req,res) => {
  res.render("index.ejs", {
    titles: arrTitle,
    contents: arrText,
    timestamp: timeStamp,
  });
});

app.get("/newpost", (req,res) => {
    res.render("newPost.ejs");
  });

app.post("/submit", (req,res) => {
  const t1 = req.body.title;
  const t2 = req.body.content;
  const t3 = new Date().toLocaleString();
  arrTitle.push(t1);
  arrText.push(t2);
  timeStamp.push(t3);
  res.redirect("/");
});

app.post("/delete", (req,res) => {
  const j = req.body.index;
  deleteArr(j);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  arrTitle.push("I Tried to Impress my Date with my Culinary Skills, and I Burned Water" , "I Pretended to Be a Penguin on a Job Interview - Now I'm the New Zoo Attraction");
  arrText.push("Hey fellow foodies, gather 'round for a tale of culinary calamity that would make Gordon Ramsay shed a tear. So, picture this: a romantic dinner date with my crush, a beautifully set table, candles, and soft music playing in the background. I decided to take charge of the kitchen and show off my alleged culinary skills, thinking I'd impress my date with a homemade meal. What could go wrong, right? As we embarked on this culinary adventure, I decided to start with something easy - boiling water for pasta. Sounds foolproof, doesn't it? But it turns out, I have a knack for defying the odds." , "Hello, my adoring fans! Allow me to regale you with the audacious tale of how my penguin impersonation turned me into the zoo's most celebrated attraction. One day, in a moment of pure genius, I transformed into the charismatic Penguin Pretender. I walked into the zoo, flaunting my exceptional penguin moves, honks, and all. The interview panel was dumbstruck, offering me a job right then and there. Fast forward to today, I'm the star of the show! My skills as the dazzling Penguin Pretender are unrivaled, drawing crowds from all over. I have a VIP enclosure, a daily 'Penguin Spectacle,' and a fervent fan following. My message to you? Dare to be extraordinary, and let your talents shine.");
  timeStamp.push(new Date().toLocaleString(), new Date().toLocaleString());
});
  