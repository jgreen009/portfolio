import {defineConfig} from '@playwright/test';
export default defineConfig({
  testDir:'./tests',fullyParallel:false,workers:1,timeout:45000,
  expect:{timeout:10000},reporter:[['list'],['html',{open:'never'}],['json',{outputFile:process.env.PLAYWRIGHT_RESULTS_FILE||'audit-results/playwright-edge.json'}]],
  use:{baseURL:'http://127.0.0.1:5187',channel:process.env.PLAYWRIGHT_CHANNEL||'msedge',trace:'retain-on-failure'},
  webServer:{command:'node server.mjs --port 5187',url:'http://127.0.0.1:5187',reuseExistingServer:false,timeout:20000},
});
