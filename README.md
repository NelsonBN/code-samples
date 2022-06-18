# K6 test samples
Code samples to tests with K6


## Additional tools

### k6 browser records
To record user intereractions with the browser, you can use as script in K6
- [Official documentation](https://k6.io/docs/test-authoring/recording-a-session/browser-recorder)
- [Chrome extension](https://chrome.google.com/webstore/detail/k6-browser-recorder/phjdhndljphphehjpgbmpocddnnmdbda?hl=en)
- [Firefox extension](https://addons.mozilla.org/en-US/firefox/addon/k6-browser-recorder/)


## Prepare environment
```bash
npm init -y
npm install k6
```


## Runs the tests

Basic usage
```bash
k6 run load-test.js
```

Specifying number of users `--vus <number>` and duration `--duration <seconds>`
```bash
k6 run basic.js --vus 15 --duration 120s
```
