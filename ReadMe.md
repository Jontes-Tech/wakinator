# Wakinator
Ever wanted to power on one of your computers, but can't be bothered to press the power button?
Wakinator is a Wake-On-Lan utility running on a home server to wake your computers from shutdown or sleep.

## How to install (native)
Dependencies:
- Node.JS
- NPM
- Git

Steps:
1. Download Wakinator Server with `git clone https://github.com/Jontes-Tech/wakinator` 
2. Download dependencies with `npm install` 
3. Run with `node index.js`

## How to install (docker) 
Currently there's no docker image avaible, please look back later.

## What are keys?
Keys are like passwords, one for each of your devices, that gives access to your wakinator server.

## Features
### Developer API
Featuring the easy-to-use developer api, simply HTTP POST to /api/wake with a JSON body like this:
```json
{
  "passwd": "UNHASHED API KEY",
  "target": {
    "ipadress": "ip",
    "macadress": "mac adress",
    "port": 9,
  }
}
```

## The Configuration
This is an example configuration
```json
{
 "version": "1.0.0",
 "keys": [
 ],
 "hosts": {
  "jontes-main-desktop": {
   "friendlyname": "Jonte's Main Desktop",
   "macadress": "2C:F0:5D:0A:14:E3",
   "port": 9
  },
  "john-doe-new-laptop": {
   "friendlyname": "John Doe's Laptop",
   "macadress": "24-E9-23-20-44-33",
   "port": 4
  }
 },
 "port": 3009
}
```
Notice the lack empty `keys` array. It will get populated on first launch, or if you run wakinator with the --add-keys argument.

Furthermore, version is set to 1.0.0. This is the version of Wakinator the configuration was written for. You will recieve a warning in wakinator logs if you have a deprecated configuration file. Any option between 1.0.0 and the latest version is fine as of February 2023.

### Deleting Keys
If you stopped using a device to control your wake-on-lan devices, you want to delete it.