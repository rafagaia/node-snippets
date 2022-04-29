function grabTweets(API_URL, _) {
    //integrate with Twitter API
    //like that RaspPi WebServer Facepy+Twitter Bot
    // project you aced at
    // Dr. Bina Ramammurthy's class
}

grabTweets('twitter/raphgaia', (error, raphTweets) => {
    if (error) {
        throw Error;
    }
    displayTweets(raphTweets)
    grabTweets('twitter/elonmusk', (error, elonTweets) => {
        if (error) {
            throw Error;
        }
        displayTweets(elonTweets)
        grabTweets('twitter/vitalikpucitin', (error, vitalikTweets) => {
            if (error) {
                throw Error;
            }
            displayTweets(vitalikTweets);
        })
    })
});