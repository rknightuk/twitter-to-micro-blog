const fs = require('fs')

const convertAllTweets = false

const idsToFind = [
	// tweet ids here - must be strings
]

// Can have multiple comma-separated categories
// e.g. "Category One, Category Two, Category Three"
// if left empty/null, no categories will be applied
const categories = "Imported Tweets"


let rawdata = fs.readFileSync('tweets.json');
let tweets = JSON.parse(rawdata);

// https://stackoverflow.com/questions/13132964/how-to-format-twitter-facebook-feed-date-with-javascript
const twitterDateToDate = (date) => {
  var b = date.split(/[: ]/g);
  var m = {jan:0, feb:1, mar:2, apr:3, may:4, jun:5, jul:6,
           aug:7, sep:8, oct:9, nov:10, dec:11};

  return new Date(Date.UTC(b[7], m[b[1].toLowerCase()], b[2], b[3], b[4], b[5]));
}

outputTweet = (tweet) => {
	const tweetDate = twitterDateToDate(tweet.created_at)

	let content = tweet.full_text

	tweet.entities.urls.forEach(url => {
		content = content.replace(url.url, `[${url.expanded_url}](${url.expanded_url})`)
	})

	let attachments = ''

	if (tweet.entities.media)
	{
		tweet.entities.media.forEach(media => {
			if (media.type === 'photo')
			{
				content = content.replace(media.url, '')
				const multiple = tweet.extended_entities.media.length > 1
				attachments = tweet.extended_entities.media.map(ex => {
					return multiple ? `<img src="${ex.media_url}">` : `![](${ex.media_url})`
				}).join("\n")
				if (multiple)
				{
					attachments = `<div class="photogrid">\n${attachments}\n</div>`;
				}
			}
		})
	}

	const outputCategories = categories ? `\ncategories: ${categories}` : ''

	const body = `---
date: ${tweetDate.toISOString().replace('.000Z', '+00:00')}${outputCategories}
---

${content}

${attachments}
	`;

	try {
	  fs.writeFileSync(`./export/${tweet.id}.md`, body);
	} catch (err) {
	  console.error(err);
	}
}

tweets.forEach(r => {
	if (convertAllTweets)
	{
		outputTweet(r.tweet)
	} else if (idsToFind.includes(r.tweet.id))
	{
		outputTweet(r.tweet)
	}
})