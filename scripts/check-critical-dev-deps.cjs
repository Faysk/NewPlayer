'use strict';
// Offline regression guard: six reviewed critical dev-dependency overrides (#5).
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const lock = JSON.parse(fs.readFileSync(path.join(root, 'package-lock.json'), 'utf8'));
const expected = {
  'proxy-addr': '2.0.8',
  'websocket-driver': '0.7.5',
  'pbkdf2': '3.1.3',
  'sha.js': '2.4.12',
  'cipher-base': '1.0.5',
  'form-data': '2.5.4'
};
let errors = 0;
if (lock.lockfileVersion !== 1) {
  console.error('Expected legacy npm lockfile v1; review compatibility before upgrading');
  errors++;
}
for (const [name, version] of Object.entries(expected)) {
  const manifest = (pkg.overrides || {})[name];
  const pinned = (lock.dependencies || {})[name];
  if (manifest !== version || !pinned || pinned.version !== version) {
    console.error(name + ': expected ' + version + '; manifest=' + (manifest || 'missing') + ', lock=' + ((pinned && pinned.version) || 'missing'));
    errors++;
  }
}
if (errors) {
  console.error('Critical development-dependency guard failed: ' + errors + ' mismatches');
  process.exitCode = 1;
} else {
  console.log('Critical development-dependency overrides: 6/6 lockfile v1 pins verified');
}
