
# Twitter to Micro.blog

Convert tweets from a Twitter achive into markdown posts to import into Micro.blog (or anywhere really).

So this:

![](tweet.png)

Becomes:

`1583079656760410112.md`

```
---
date: 2022-10-20T13:56:19+00:00
categories: Imported Tweets
---

"You could not live with your own failure. Where did that bring you? Back to me"

![](https://pbs.twimg.com/media/Ffg6jkDXkAARD4p.jpg)
```

### Requirements

- Node - It was tested with node version 14.7 because that's what I had set at the time but should work with any recent version.
- A Twitter archive ([How to download your Twitter archive and Tweets](https://help.twitter.com/en/managing-your-account/how-to-download-your-twitter-archive))

## Usage

Note: This script does not interact with the Twitter API so all tweets you want to convert must be in your archive.

[Download your Twitter archive](https://help.twitter.com/en/managing-your-account/how-to-download-your-twitter-archive), unzip it and find `data/tweet.js`. Open that file and remove the `window.YTD.tweet.part0 = ` part from the top of the file. Rename it to `tweets.json` and move it into the root of this project. You then have two options:

### 1a. Convert all tweets in your archive

Set `convertAllTweets` to `true` in `index.js`

### 1b. Convert selected tweets

Get the tweet IDs you want to import and add them to the `idsToFind` array at the top of `index.js`. Tweet IDs are the last part of a tweet URL: https://twitter.com/username/status/**1583079656760410112**. It should then look something like this:

```
const idsToFind = [
    '1583079656760410112',
]
```

### 2. Set categories

The script defaults to setting the category as "Import Tweets" but you can leave it blank to have no categories, or add multiple comma-separated:

```
// One category
const categories = "Imported Tweets, My Custom Category"

// Multiple categories
const categories = "Imported Tweets, My Custom Category"

// No category
// const categories = ""
```

### 3. Convert

Run `node index.js` and your selected tweets will be output into `/export` (replies will be output to `/export/replies`):

```
/export
    1583079656760410112.md
    /replies
        1583079656760410114.md
```

## Contributing

If something is broken with how this works then by all means submit a pull request however this script works for my exact purpose - it's mostly here for reference in case someone else wants to do something similar.