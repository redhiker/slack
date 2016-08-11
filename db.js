/*
table users
id
name
password
email

table teamusers
iduserid fk
teamid fk

table channels
id
name
teamid pk
description

table messages
id
userid
channelid
teamid
description
type (team,private)
*/
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

var filename = 'scratch.db';
var dbexists = false;
try {
    fs.accessSync(filename);
    dbexists = true;
} catch (ex) {
    dbexists = false;
}

var db = new sqlite3.Database('test.db');


function createDatabase(){
    console.log('in create database');
};

function connection() {
    if (!dbexists) {
        createDatabase();
    };

    console.log('in connection');
};

function transaction() {
    console.log('in transaction');
};

function rollback() {
    console.log('in rollback');
};

function getChannels(conn, teamName) {

    return ['orange','blue','red'];
    
};

exports.getChannels = getChannels;
exports.connection = connection;
exports.transaction = transaction;
exports.rollback = rollback;