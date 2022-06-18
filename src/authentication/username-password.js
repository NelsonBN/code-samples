import http from "k6/http";
import { check, sleep } from "k6";
import { Counter, Rate, Trend } from "k6/metrics";


const loginData = { // download the data file here: https://test.k6.io/static/examples/users.json
    "users": [
        { "username": "admin", "password": "123" },
        { "username": "test", "password": "1234" },
        { "username": "invaliduser", "password": "password"}
    ]
}


export let options = {
    vus: 2,
    duration: '2s',
};


// Custom metrics
// We instantiate them before our main function
let successfulLogins = new Counter("successful_logins");
let checkFailureRate = new Rate("check_failure_rate");
let timeToFirstByte = new Trend("time_to_first_byte", true);


export default () => {
    let res = http.get("http://test.k6.io/my_messages.php");
    let checkRes = check(res, {
        "Users should not be auth'd. Is unauthorized header present?": (r) => r.body.indexOf("Unauthorized") !== -1
    });

    //extracting the CSRF token from the response
    const vars = {};
    vars["csrftoken"] = res
        .html()
        .find("input[name=csrftoken]")
        .first()
        .attr("value");

    // Record check failures
    checkFailureRate.add(!checkRes);

    let position = Math.floor(Math.random()*loginData.users.length);
    let credentials = loginData.users[position];

    res = http.post("http://test.k6.io/login.php", { login: credentials.username, password: credentials.password, redir: '1', csrftoken: `${vars["csrftoken"]}` });
    checkRes = check(res, {
        "is logged in welcome header present": (r) => r.body.indexOf("Welcome, admin!") !== -1
    });

    // Record successful logins
    if (checkRes) {
        successfulLogins.add(1);
    }

    // Record check failures
    checkFailureRate.add(!checkRes, { page: "login" });

    // Record time to first byte and tag it with the URL to be able to filter the results in Insights
    timeToFirstByte.add(res.timings.waiting, { ttfbURL: res.url });

    sleep(10);
}