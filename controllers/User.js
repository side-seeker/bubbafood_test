const bcrypt = require('bcryptjs/dist/bcrypt');
const salesforce = require('../salesforce')

async function getUsers(req, res) {
    result = await salesforce.query("SELECT Email__c, Password__c, Image_Url__c,  Date_of_Birth__c, Name FROM User__c");
    console.log(result)
    return res.send(result.records)
}

async function postUser(req, res) {
    console.log("Posting a User")
    const email = req.params.email;
    const password = req.params.password
    const dob= req.params.dob;
    const salt= await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(password, salt)

    salesforce.sobject('User__c').create({
        Email__c: email,
        Password__c: secPass,
        Date_of_birth__c: dob
    }, (err, res) => {
        if (err || !res.success) { return console.error(err, res); }
        console.log("Created record id : " + res.id);
    })
    return res.send()
}
async function loginUser(req, res) {
    console.log("Checking for the user")
    const email= req.params.email
    const password= req.params.password
    const salt= await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(password, salt)

    console.log(email);
    result= await salesforce.query("SELECT Email__c, Password__c, Image_Url__c FROM User__c WHERE Email__c= '"+email+"'");
    console.log(result);
    console.log(result.totalSize);
    const passwordCompare= bcrypt.compare(secPass, String(result.Password__C));
    if(passwordCompare){
        console.log("User found")
        console.log(result);
    }
    else{
        console.log("User not found")
    }
}

module.exports = {
    getUsers,
    postUser,
    loginUser
}