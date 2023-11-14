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

function outputHttpResponse(statusCode, statusMessage, headers, body) {
    let out = `HTTP/1.1 ${statusCode} ${statusMessage}\n${JSON.stringify(headers, undefined, 1)}\n\n${body}`
    console.log(out);
}

function processHttpRequest($method, $uri, $headers, $body) {
    // ... проаналізувати вхідні дані, обчислити результат
    // та спеціальною командою красиво вивести відповідь
    let statusCode = 200;
    let statusMessage = "OK"
    let headers = {
        Date: new Date(),
        Server: 'Apache/2.2.14 (Win32)',
        'Content-Length': 1,
        Connection: 'Closed',
        'Content-Type': 'text/html; charset=utf-8',
    }
    let body;
    if (!(/GET/.test($method) && /(\?nums=)/.test($uri))) {
        statusCode = 400;
        statusMessage = 'Bad Request'
        body = 'bad request'
        headers['Content-Length'] = body.length
        outputHttpResponse(statusCode, statusMessage, headers, body);
        return;
    }
    if (!/(\/sum)/.test($uri)) {
        statusCode = 404;
        statusMessage = 'Not Found'
        body = 'not found'
        headers['Content-Length'] = body.length
        outputHttpResponse(statusCode, statusMessage, headers, body);
        return;
    }
    let nums = $uri.match(/(\d,?)+/)
    nums = nums[0].split(',')
    let sum = nums.reduce((total, curr) => total + curr / 1
        , 0)
    body = sum + '';
    headers['Content-Length'] = body.length
    outputHttpResponse(statusCode, statusMessage, headers, body);
}

function parseTcpStringAsHttpRequest($string) {
    let lines = $string.split('\n');
    let method = lines[0].match(/[A-Z]*(?=\s)/)
    let uri = lines[0].match(/\/[\w?=/,]+/)
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
processHttpRequest(http.method, http.uri, http.headers, http.body);
