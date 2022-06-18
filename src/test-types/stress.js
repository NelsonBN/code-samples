import { sleep } from 'k6';
import http from 'k6/http';

/*
             _________
           _/         \
         _/            \
        /               \
*/
export let options = {
    stages:[
        { duration: '10s', target: 5 }, // Ramp-up of traffic from 0 to 5 users over 10 seconds
        { duration: '30s', target: 5 }, // Stay at 5 users for 30 seconds
        { duration: '10s', target: 10 }, // Ramp-up of traffic from 5 to 10 users over 10 seconds
        { duration: '30s', target: 10 }, // Stay at 10 users for 30 seconds
        { duration: '10s', target: 15 }, // Ramp-up of traffic from 10 to 15 users over 10 seconds
        { duration: '30s', target: 15 }, // Stay at 15 users for 30 seconds
        { duration: '10s', target: 20 }, // Ramp-up of traffic from 15 to 20 users over 10 seconds
        { duration: '30s', target: 20 }, // Stay at 20 users for 30 seconds
        { duration: '10s', target: 25 }, // Ramp-up of traffic from 20 to 25 users over 10 seconds
        { duration: '30s', target: 25 }, // Stay at 25 users for 30 seconds
        { duration: '10s', target: 30 }, // Ramp-up of traffic from 25 to 30 users over 10 seconds
        { duration: '30s', target: 30 }, // Stay at 30 users for 30 seconds
        { duration: '10s', target: 20 }, // Ramp-down to 20 users over 10 seconds
        { duration: '10s', target: 10 }, // Ramp-down to 10 users over 10 seconds
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