import http from 'k6/http';
import { check, sleep } from 'k6';

export default () => {
    let res = http.get('https://test.k6.io/contacts.php');

    check(res, {
        'is status 200 - news': (r) => r.status === 200,
    });

    sleep(1);
}