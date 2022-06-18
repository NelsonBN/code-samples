import http from 'k6/http';
import { check } from 'k6';
import { Counter } from 'k6/metrics';


export let options = {
    vus: 50,
    duration: '5s',
};


export let customTotalRequests = new Counter('custom_total_requests');

export default () => {
    let res = http.get('https://test.k6.io/contacts.php');

    customTotalRequests.add(1);

    check(res, {
        'status was 200': (r) => r.status === 200,
    });
}
