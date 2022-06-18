import http from 'k6/http';
import { sleep} from 'k6';


export let options = {
    vus: 50,
    duration: '5s',
};


export default () => {
    let req = [{
        method: 'GET',
        url: 'https://test.k6.io/contacts.php',
    },
    {
        method: 'GET',
        url: 'https://test.k6.io/news.php',
    }];

    let res = http.batch(req);
    sleep(1);
}