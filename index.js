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

function postTweet(tweet) {
  T.post("statuses/update", tweet, (err, data) => {
    if (err) {
      console.log(err);
      console.log("Something went wrong!");
      return;
    }

    console.log("Tweeted!!");
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

function getSampleStreamStatus() {
  const stream = T.stream("statuses/sample");

  stream.on("tweet", (tweet) => {
    console.log(tweet.text);
  });
}

function getFilteredStreamStatus(param) {
  const stream = T.stream("statuses/filter", param);

  stream.on("tweet", (tweet) => {
    console.log(tweet);
    console.log(tweet.text);

    postTweet({ status: tweet.text });
  });
}

const tweet = {
  track: "khattakdev",
};
getFilteredStreamStatus(tweet);
