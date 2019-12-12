import 'core-js/es/reflect';
import 'core-js/proposals/reflect-metadata';

import 'zone.js/dist/zone';
// The following import fixes zone issues when Electron callbacks are used eg. Menu's.
import 'zone.js/dist/zone-patch-electron';

if (process.env.ENV === 'production') {
    // Production
} else {
    // Development
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
