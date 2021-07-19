const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { chatRouter } = require("./routes/chat");
const { usersRouter } = require("./routes/users");
const { loginRouter } = require("./routes/login");

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use("/api/newMessage", chatRouter);
app.use("/api/addUser", usersRouter);
app.use("/api/loginUser", loginRouter);

//const CONNECTION_URL = process.env.MONGODB_URL;
const CONNECTION_URL =
  "mongodb+srv://user-1234:vikky1234@first-mern-app.0oqw7.mongodb.net/whatsapp-clone?retryWrites=true&w=majority";

app.get("/", (req, res) => {
  res.send("Whatsapp Clone");
});

const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Successfully connected to MongoDB on PORT ${PORT}`)
    );
  })
  .catch((ex) => {
    console.log(ex.message);
  });

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.APP_KEY,
  secret: process.env.APP_SECRET,
  cluster: process.env.APP_CLUSTER,
  useTLS: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected for monitoring!");
  const messageCollections = db.collection("chatdatas");
  const changeStream = messageCollections.watch();
  changeStream.on("change", (change) => {
    if (change.operationType === "update") {
      const messageDetails = change.updateDescription.updatedFields;
      let messageId, newMessageDetails;
      if (messageDetails.__v === 1) {
        messageId = "messageData";
        newMessageDetails = messageDetails[messageId][0];
      } else {
        messageId = "messageData." + (messageDetails.__v - 1);
        newMessageDetails = messageDetails[messageId];
      }
      pusher.trigger(
        "messages",
        "inserted",
        JSON.stringify({
          name: newMessageDetails.name,
          message: newMessageDetails.message,
          timeStamp: newMessageDetails.timeStamp,
          messageType: newMessageDetails.messageType,
        })
      );
    } else {
      console.log("Error triggering Pusher!");
    }
  });
});

mongoose.set("useFindAndModify", false);
