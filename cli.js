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

if (process.argv[process.argv.indexOf('-n')] < 0 || process.argv[process.argv.indexOf('-e')] < 0 || process.argv[process.argv.indexOf('-s')] > 0 || process.argv[process.argv.indexOf('-w')] > 0){
    process.exit(1);
}
if (process.argv[2] === '-j'){
   /* should echo the JSON that your app ingested
    from Open-Meteo onto STDOUT and exit 0. If you 
    do not pass further parameters, this should 
    return an error from the API. There should be 
    no default input for the location variables.*/
}

if (process.argv[process.argv.indexOf('-d')] === 0){
    console.log('today');
} else if (process.argv[process.argv.indexOf('-d')] === 1 || process.argv[process.argv.indexOf('-d')]=== undefined){
    console.log('tomorrow');
} else if (process.argv[process.argv.indexOf('-d')] >= 2 || process.argv[process.argv.indexOf('-d')] <= 6){
    console.log(`in ${process.argv[process.argv.indexOf('-d')]} days.`)
}

if (process.argv[2] === '-z'){
    const timezone = moment.tz.guess();
}

// need function to take in parcipitation and tell whether or not you need galoshes

//some clues here:https://github.com/comp426-2023-spring/schedule/blob/main/06-manipulating-data.md
//let URL = galo.sh.getdata();