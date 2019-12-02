var responseUtils = require('../../.././helpers/response_utilities.js');

module.exports = (app, passport, database) => {
    
    app.get('/api/getUsername', (req, res) => {
        //INSERT INTO `clientusers` (`id`, `uuid`, `hwid`, `username`, `updated_time`) VALUES (NULL, 'uuid', 'hwid', 'username', NOW());
        var uuid = req.query.uuid;

        //SELECT * FROM `hwidban` WHERE hwid = 'testhwid'
        database.query("SELECT * FROM `usermap` WHERE uuid = '" + uuid + "'", function (err, result, fields) {

            if (err) {
                throw err;
            }
            
            var toReturn = result[0];
            //If we don't exist in the database, pretend we do. Just incase.
            if(toReturn == undefined) {
                responseUtils.notFound(res, "User not found!");
                return;
            }
            
            //delete the fields we don't need
            delete toReturn.hwid;
            delete toReturn.updated_time;
            
            console.log(toReturn);
            responseUtils.success(res, toReturn);

        });
    });
    
}