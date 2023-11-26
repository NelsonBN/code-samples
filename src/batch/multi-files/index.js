import GetContacts from './contacts.js';
import GetNews from './news.js'; 
import { group } from 'k6';


export let options = {
    scenarios: {
        contacts: {
            executor: 'constant-vus', // Execute a scenario with constant number of VUs
            exec: 'contacts',
            vus: 10,
            duration: '40s'
        },
        news: {
            executor: 'per-vu-iterations', // Execute each VU iteration a fixed number of times
            exec: 'news',
            vus: 20,
            iterations: 40,
            maxDuration: '20s',
            startTime: '10s'
        }
    }
};


export function contacts() {
    group('Endpoint to get contacts', () => {
        GetContacts();
    });
}

export function news() {
    group('Endpoint to get news', () => {
        GetNews();
    });
}
