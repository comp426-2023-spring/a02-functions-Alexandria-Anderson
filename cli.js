#!/usr/bin/env node
import moment from 'moment-timezone'
import minimist from 'minimist';
import fetch from 'node-fetch';

const args = minimist(process.argv.slice(2));

if (process.argv[2] === '-h'){
    console.log(
    'Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE\n'+
    '-h            Show this help message and exit.\n'+
    '-n, -s        Latitude: N positive; S negative.\n'+
    '-e, -w        Longitude: E positive; W negative.\n'+
    '-z            Time zone: uses tz.guess() from moment-timezone by default.\n'+
    '-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.\n'+
    '-j            Echo pretty JSON from open-meteo API and exit.\n'
    );
    process.exit(0);
}

//if statements that loop through proces.argv, finding the flag


if (process.argv[2] === '-z'){
    const timezone = moment.tz.guess();
}

//some clues here:https://github.com/comp426-2023-spring/schedule/blob/main/06-manipulating-data.md
//let URL = galo.sh.getdata();