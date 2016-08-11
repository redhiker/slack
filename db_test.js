
var asserts = require('assert');
var db = require('./db.js');

describe('Db module', () => {

    var conn = db.connection("test.db");

    before(() => {
        db.transaction();
    });
    after(() => {
        db.rollback();
    });    

    it('given team name, return all channels for that team', () => {

        var teamName = 'Yankees';
        var expected = ['orange','blue','red'];
        var actual = db.getChannels(conn, teamName);
        asserts(actual, expected);
        
    });

});