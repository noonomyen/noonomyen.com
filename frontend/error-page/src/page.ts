const STATUS_MAP: {
    [key: number]: string
} = {
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    418: "I'm a teapot",
    421: "Misdirected Request",
    422: "Unprocessable Entity",
    423: "Locked",
    424: "Failed Dependency",
    425: "Too Early",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    451: "Unavailable For Legal Reasons",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    510: "Not Extended",
    511: "Network Authentication Required"
};

const status_code_str = document.title;
const status_code = Number(status_code_str);
let status_name = "Unknown Error";

if (status_code in STATUS_MAP) {
    status_name = STATUS_MAP[status_code];
};

document.title = status_code_str + " " + status_name;
(document.getElementById("status") as HTMLSpanElement).innerText = status_code_str;
(document.getElementById("status-name") as HTMLSpanElement).innerText = status_name;

if (status_code > 399 && status_code < 500) {
    (document.getElementById("client-icon") as HTMLSpanElement).classList.remove("hidden");
} else if (status_code > 499 && status_code < 600) {
    (document.getElementById("server-icon") as HTMLSpanElement).classList.remove("hidden");
} else {
    (document.getElementById("error-icon") as HTMLSpanElement).classList.remove("hidden");
};

(document.getElementById("URL") as HTMLParagraphElement).innerText = location.href;
const date = new Date();
let client_time = date.getFullYear().toString();
client_time += "-" + (date.getUTCMonth() + 1).toString().padStart(2, "0");
client_time += "-" + date.getUTCDate().toString().padStart(2, "0");
client_time += " " + date.getUTCHours().toString().padStart(2, "0");
client_time += ":" + date.getUTCMinutes().toString().padStart(2, "0");
client_time += ":" + date.getUTCSeconds().toString().padStart(2, "0");
client_time += " UTC";
(document.getElementById("client-time") as HTMLParagraphElement).innerText = client_time;
