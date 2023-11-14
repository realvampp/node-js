// цей файл потрібно буде дописати...

// не звертайте увагу на цю функцію
// вона потрібна для того, щоб коректно зчитувати вхідні данні
function readHttpLikeInput() {
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for (; ;) {
        try {
            fs.readSync(0 /*stdin fd*/, buffer, 0, 1);
        } catch (e) {
            break; /* windows */
        }
        if (buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10)
                break;
            was10++;
        } else
            was10 = 0;
        res += new String(buffer);
    }

    return res;
}

let contents = readHttpLikeInput();

// ось цю функцію, власне, і треба написати
function parseTcpStringAsHttpRequest(string) {
    let lines = string.split('\n');
    let method = lines[0].match(/[A-Z]*(?=\s)/)
    let uri = lines[0].match(/\/[\w?=/]+/)
    lines = lines.slice(1)
    let headers = {}
    for (let line of lines) {
        let header = line.match(/[\w-]+:\s.+/)
        if (!header) {
            break;
        }
        lines = lines.slice(1)
        header = header[0].split(':')
        headers[`${header[0]}`] = header[1].trim()
    }
    let body = lines.slice(1).join(' ').trim()
    return {
        method: method[0],
        uri: uri[0],
        headers: headers,
        body: body,
    };
}

http = parseTcpStringAsHttpRequest(contents);
console.log(JSON.stringify(http, undefined, 2));