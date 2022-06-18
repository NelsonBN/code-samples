import { sleep } from 'k6';
import http from 'k6/http';

/* Good strategy to test chaos engineering
         ________
        |        |
        |        |
*/
export let options = {
    stages:[
        { duration: '2m', target: 400 }, // Ramp-up of traffic from 0 to 400 users over 2 minutes
        { duration: '3h56m', target: 400 }, // Stay at 400 users for ~4 hours
        { duration: '2m', target: 0 }, // Scale down to 0 users over 2 minutes (Optional)
    ]
};


export default () => {
    let res = http.get('https://test.k6.io/');

    sleep(1);
}