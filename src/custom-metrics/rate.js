import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';


export let options = {
    vus: 50,
    duration: '5s',
};


export let customSuccessRate = new Rate('custom_success_rate');
export let customFailRate = new Rate('custom_fail_rate');

export default () => {
    let res = http.get('https://test.k6.io/contacts.php');

    customSuccessRate.add(res.status > 0 && res.status <= 399); // Success requests
    customFailRate.add(res.status == 0 || res.status > 399); // Fail requests

    check(res, {
        'status was 200': (r) => r.status === 200,
    });
}
