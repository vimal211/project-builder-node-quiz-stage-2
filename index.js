const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { questionSC, optionSC, answerSC } = require("./schema");

let dburl =
  "mongodb+srv://Vimal211:vimal123@vimalcluster.afqw9.mongodb.net/Quiz?retryWrites=true&w=majority";

app.use(express.json());
mongoose.connect(dburl);

app.get("/", async (req, res) => {
  try {
    const ques = await questionSC.find();
    const ans = await answerSC.find();
    const opt = await optionSC.find();
    if (ques) {
      const result = ques.map((ques) => {
        const answer = ans.find((a) => a.id === ques.id);
        const option = opt.find((o) => o.id === ques.id);
        if (answer && option) {
          let obj = {
            question: ques.question,
            optionA: option.optionA,
            optionB: option.optionB,
            optionC: option.optionC,
            optionD: option.optionD,
            answer: answer.answer,
          };
          return obj;
        }
      });
      res.json({
        data: result,
      });
    } else {
      res.json({
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: error,
    });
  }
});

app.post("/question", async (req, res) => {
  try {
    const question = await questionSC.create(req.body);
    res.json({
      message: "Data Inserted",
    });
  } catch (error) {
    res.json({
      message: "Data not Inserted",
    });
  }
});

app.post("/answer", async (req, res) => {
  try {
    const answer = await answerSC.create(req.body);
    res.json({
      message: "Data Inserted",
    });
  } catch (error) {
    res.json({
      message: "Data not Inserted",
    });
  }
});

app.post("/option", async (req, res) => {
  try {
    const options = await optionSC.create(req.body);
    res.json({
      message: "Data Inserted",
    });
  } catch (error) {
    res.json({
      message: "Data not Inserted",
    });
  }
});

app.listen(3000, () => console.log("server is running"));
