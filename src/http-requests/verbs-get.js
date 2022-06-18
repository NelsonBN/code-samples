import http from 'k6/http';
import { check } from 'k6';


export default () => {
    let res = http.get('https://test.k6.io/contacts.php');

    check(res, {
        'status was 200': (r) => r.status === 200,
    });
}
