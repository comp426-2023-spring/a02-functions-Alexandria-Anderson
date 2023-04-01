#!/usr/bin/env node
import moment from 'moment-timezone'
import minimist from 'minimist';
import fetch from 'node-fetch';
import fs from 'fs';


// Get command-line arguments
const args = minimist(process.argv.slice(2));
// Put args onto STDOUT
console.log(args)
// Get a URL


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

if (args.n < 0 || args.e < 0 || args.s > 0 || args.w > 0){
    console.log("invalid")
   // process.exit(1);
}

 
if (args.d === 0){
    console.log('today');
} else if (args.d === 1 || args.d === undefined){
    console.log('tomorrow');
} else if (args.d >= 2 || args.d <= 6){
    console.log(`in ${args.d} days.`)
}

/*if (argc === 4 && args.n !== undefiend && args.w !== undefiend){
    //return tommorrows weather and get the timezone. 
}

if (argc === 5 && args.n !== undefiend && args.w !== undefiend && args.z !== undefiend){
    //return tommorrows weather
}

if (argc === 6 && args.n !== undefiend && args.w !== undefiend && args.z !== undefiend && args.d === 0){
    //return todays weather
}
*/
if (args.z === undefined){
    const timezone = moment.tz.guess();
   console.log(timezone)
} else {
    const timezone = args.z
    console.log(timezone)
    
}

// need function to take in parcipitation and tell whether or not you need galoshes

//some clues here:https://github.com/comp426-2023-spring/schedule/blob/main/06-manipulating-data.md


//building URL
let lat = null;
if (args.n !== undefined){
     lat = parseFloat(args.n);
} else {
     lat = parseFloat(args.s);
}
let long = null;
if (args.e !== undefined){
     long = parseFloat(args.e);
} else {
     long = parseFloat(args.w);
}

//rewriting timezone
let timezoneP = args.z.replace("/", "%2F");

timezoneP = timezoneP.replace("Y", "_Y")

console.log(timezoneP)

let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=${timezoneP}`

const response = await fetch(url)
// Store the response JSON data in an object
const data = await response.json();
// Echo back the data to SDOUT
let dataString = JSON.stringify(data);
console.log(data);

if (args.j !== undefined){
   /* should echo the JSON that your app ingested
    from Open-Meteo onto STDOUT and exit 0. If you 
    do not pass further parameters, this should 
    return an error from the API. There should be 
    no default input for the location variables.*/
}