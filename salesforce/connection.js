const salesforce = require('jsforce')

const conn = new salesforce.Connection({
    loginUrl: 'https://softronixitsolution5-dev-ed.develop.my.salesforce.com'
})

conn.login('shyam@soft.com', 'Sozo@123nHsxMRMGxFFuEPBGmYU6YUjV', (err, res) => {
    if (err) {
        console.log("Error Occurred")
        console.log(err)
        return
    }
    console.log("User ID: " + res.id);
    console.log("Org ID: " + res.organizationId);
})


module.exports = {
    conn
}