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
/*
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

    it('given user, return all messages for that user', (done) => {

        var userid = 'betsy';
        var expected = ['good evening 1....','nice day outside 1....','good morning 2...','hello 2....'];        
	
        var p = db.getUserMessages(conn, userid);
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

    it('add user to Slack', (done) => {

        var userid = 'janet';
        var teamid = 'alpha1';
        var password = 'beta';
        var email = 'janet@example.com';
        var expected = ['janet@example.com'];        
	
        var p = db.addSlackUser(conn, teamid, userid, password, email);
        p.then(
            (val) => {
                try {
                    var actual = val;
                    //console.log(expected,actual);
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
                console.log(err);
                done(err);
            }        
        );        
    });*/

    it('add user message to Slack', (done) => {

        var userId = 'alice';
        var teamId = 'Team3';
        var message = 'an experimental message';        
	
        var p = db.addUserMessage(conn, userId, teamId, message);
        p.then(
            (val) => {
                try {
                    var actual = val;
                    var expected = actual.indexOf(message);
                    asserts(expected >= 0);
                    done();                    
                }
                catch (x) {
                    done(x);
                }

                //done();
            },
            (err) => {
                console.log(err);
                done(err);
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