import { sleep } from 'k6';
import http from 'k6/http';


/*
          _________
         /         \
        /           \
*/
export let options = {
    stages:[
        { duration: '10s', target: 20 }, // Ramp-up of traffic from 0 to 20 users over 10 seconds
        { duration: '1m', target: 20 }, // Stay at 20 users for 1 minute
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