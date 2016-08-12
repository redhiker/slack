var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
var asserts = require('assert');
var db = require('./db.js');

describe('Db module', () => {

    var conn = db.connection("./test.db");
    

    after(() => {
        //db.rollback();
    });    

    it('given team name, return all channels for that team', () => {

        var teamName = 'Team1';
        var expected = ['orange','blue','red'];
        var actual = db.getChannels(conn, teamName);
        //var actual = ['orange','blue','red'];
        asserts(actual, expected);
        
    });

    it('given user name, return all messages for that user', () => {

        var userName = 'Yankees';
        var expected = ['orange','blue','red'];
        //var actual = ['orange','blue','red'];
        var actual = db.getUserMessages(conn, userName);
        asserts(actual, expected);
        
    });

});