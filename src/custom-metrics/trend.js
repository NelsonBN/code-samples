import http from 'k6/http';
import { check } from 'k6';
import { Trend } from 'k6/metrics';


export let options = {
    vus: 50,
    duration: '5s',
};


export let customDuraction = new Trend('custom_duraction');

export default () => {
    let res = http.get('https://test.k6.io/contacts.php');

    customDuraction.add(res.timings.duration);

    check(res, {
        'status was 200': (r) => r.status === 200,
    });
}
