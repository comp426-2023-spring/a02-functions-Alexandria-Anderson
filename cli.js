#!/usr/bin/env node
import moment from 'moment-timezone'
import minimist from 'minimist';
import fetch from 'node-fetch';



// Get command-line arguments
const args = minimist(process.argv.slice(2));
// Put args onto STDOUT
//console.log(args)
if (process.argv[2] === '-h'){ //works
    console.log(
    'Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE\n'+
    '    -h            Show this help message and exit.\n'+
    '    -n, -s        Latitude: N positive; S negative.\n'+
    '    -e, -w        Longitude: E positive; W negative.\n'+
    '    -z            Time zone: uses tz.guess() from moment-timezone by default.\n'+
    '    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.\n'+
    '    -j            Echo pretty JSON from open-meteo API and exit.\n'
    );
    process.exit(0);
}
//makeing the timezone default if not defined
let timezone = args.z;
if (args.z === undefined){
    timezone = moment.tz.guess();
   // console.log(timezone)
}
//defaulting d to tommorrow
if (args.d === undefined){
    args.d = 1;
}
//validating long and lat
let lat = parseFloat(args.n);

let long = parseFloat(args.e);
//if (args.n < 0 || args.e < 0 || args.s > 0 || args.w > 0){
   if (args.n !== undefined){
     lat = parseFloat(args.n);
} else {
     lat = -parseFloat(args.s);
} 
if (args.e !== undefined){
     long = parseFloat(args.e);
} else {
     long = -parseFloat(args.w);
}
//}
//reformating long and lat
console.log(lat)
console.log(long)
//creating URL to send to API
let timezoneP = timezone.replace("/", "%2F");
let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&daily=precipitation_hours,&timezone=${timezoneP}`

const response = await fetch(url) //Works!!
const data = await response.json();
console.log(JSON.stringify(data))
if (data.daily !== undefined){
if (data.daily.precipitation_hours[args.d] > 0){//Works!! Determines if you need galoshes for the given day
    console.log("You might need your galoshes");
} else if (data.daily.precipitation_hours[args.d] === 0){
    console.log("You will not need your galoshes")
}
}
if (args.d === 0){
    //const response = await fetch(url)
    console.log('today');
} else if (args.d === 1 || args.d === undefined){
   // url.replace('&current_weather=true&', '&')
    console.log('tomorrow');
} else if (args.d >= 2 || args.d <= 6){
    console.log(`in ${args.d} days.`)
}

if (args.j){//WIP
   /* should echo the JSON that your app ingested
    from Open-Meteo onto STDOUT and exit 0. If you 
    do not pass further parameters, this should 
    return an error from the API. There should be 
    no default input for the location variables.*/
    if (args.length === 2){
        throw console.error("No arguments");
    } else {
        console.log(data); 
        process.exit(0)}
   

}


// need function to take in parcipitation and tell whether or not you need galoshes

//some clues here:https://github.com/comp426-2023-spring/schedule/blob/main/06-manipulating-data.md


