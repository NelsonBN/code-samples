import http from 'k6/http';
import { check } from 'k6';


export let options = {
    vus: 50,
    duration: '5s',
};


export default () => {
    let res = http.get('https://test.k6.io/');

    check(res, {
        'status was 200': (r) => r.status === 200,
    });
}