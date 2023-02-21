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
2. Download dependencies with `ǹpm install` 
3. Run with `node index.js`

## How to install (docker) 
Currently there's no docker image avaible, please look back later.

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
