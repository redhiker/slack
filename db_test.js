var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
var asserts = require('assert');
var db = require('./db.js');

describe('Db module', () => {

    var conn = db.connection("./slack.db");
    

    after(() => {
        //db.rollback();
    });    

    it('given team name, return all members for that team', (done) => {

        var teamName = 'Team2';
        var expected = ['betsy'];        
	
        var p = db.getTeamMembers(conn, teamName);
        p.then(
            (val) => {
                try {
                    var actual = val;
                    console.log(expected,actual);
                    //asserts(actual, expected);
                    asserts.deepEqual(actual,expected);
                    done();                    
                }
                catch (x) {
                    console.log('failed test due to exception......');
                    done(x);
                }

                //done();
            },
            (err) => {
                console.log('failed test due to error.......');
            }        
        );

        
        
    });

    /*it('given user name, return all messages for that user', () => {

        var userName = 'Yankees';
        var expected = ['orange','blue','red'];
        //var actual = ['orange','blue','red'];
        var actual = db.getUserMessages(conn, userName);
        asserts(actual, expected);
        
    });*/

});