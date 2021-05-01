require("dotenv").config();
const Twit = require("twit");

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const params = {
  q: "#100daysofcode",
  count: 5,
};

function getTweets() {
  T.get("search/tweets", params, (err, data) => {
    if (err) {
      console.log("Something went wrong!");
      return;
    }

    const tweet = data.statuses;

    for (const key of tweet) {
      console.log(key.text);
      console.log();
    }
  });
}

function getFollowers() {
  T.get("followers/list", (err, data) => {
    if (err) {
      console.log("Something went wrong!");
      return;
    }

    const users = data.users;

    for (const key of users) {
      console.log(key.screen_name);
      console.log();
    }
  });
}
