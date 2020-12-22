var db = require('../config/connection')
var collection = require('../config/collections')
const shortId = require('shortid')


module.exports = {
    shortenUrl: (userData) => {
        return new Promise( (resolve, reject) => {
            userData.shortUrl = shortId.generate()
            userData.clicks=0
             db.get().collection(collection.URL_COLLECTION).insertOne(userData).then((data) => {
                resolve(data.ops[0])
            })
            
        })
    },
    getUrlHistory: () => {
        return new Promise(async (resolve, reject) => {
            let details = await db.get().collection(collection.URL_COLLECTION).find().toArray()
            resolve(details)
        })
    },
    findUrl: (short) => {
        return new Promise(async (resolve, reject) => {
            let url = await db.get().collection(collection.URL_COLLECTION).findOne({ shortUrl: short })
            resolve(url)
        })
    },
    incrementClicks: (short) => {
        return new Promise(async (resolve, reject) => { 
            db.get().collection(collection.URL_COLLECTION)
                .updateOne({ shortUrl: short },
                    {
                        $inc:{clicks:1}
                    }).then(() => {
                        
                    })
        })
    }
}