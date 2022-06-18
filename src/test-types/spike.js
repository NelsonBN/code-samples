import { sleep } from 'k6';
import http from 'k6/http';

/*
           ________
         _|        |_
        /            \
*/
export let options = {
    stages:[
        { duration: '20s', target: 5 }, // Ramp-up of traffic from 0 to 5 users over 20 seconds
        { duration: '1m', target: 5 }, // Stay at 5 users for 1 minute
        { duration: '10s', target: 30 }, // Ramp-up of traffic from 5 to 30 users over 10 seconds
        { duration: '1m', target: 30 }, // Stay at 30 users for 1 minute
        { duration: '10s', target: 5 }, // Ramp-down to 5 users over 10 seconds
        { duration: '10s', target: 0 }, // Ramp-down to 0 users over 10 seconds
    ],
    thresholds: {
        'http_req_duration': ['p(95)<500'], // 99% of requests must complete below 500ms
    }
};


export default () => {
    let res = http.get('https://test.k6.io/');

    sleep(1);
}