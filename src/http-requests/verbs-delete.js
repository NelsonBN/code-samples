import http from 'k6/http';
import { check } from 'k6';


export default () => {
    let res = http.del('http://dummy.restapiexample.com/api/v1/delete/2');

    check(res, {
        'status was 200': (r) => r.status === 200,
    });
}
