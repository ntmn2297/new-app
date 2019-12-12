# Changelog

## 1.0.10 (2019-08-20)
- Upgrade Angular to 8.2.2
- Upgrade Electron to 6.0.3
  - `dialog.dialog.showSaveDialog()` is now returning a Promise containing a path. Now using `dialog.showSaveDialogSync()` to use the old synchronous behaviour.
- Upgrade all packages.

## 1.0.9 (2019-07-27)
- Upgrade Angular to 8.1.2
- Upgrade Electron to 5.0.7
  - A breaking change in Electron 4+ made Angulars change detection fail when using Electrons (popup)menu's. This has been fixed in zone.js 0.10.0
  - A breaking change was introduced by Electron 5+ by changing the default for nodeIntegration from `true` to `false`. An extra parameter has to be added to new BrowserWindow() to set nodeIntegration to `true`:
      ```
      new BrowserWindow(
         ...
         webPreferences: {
	        nodeIntegration: true
         }
      )
      ```
- An upgrade of `core-js` to 3+ introduces a few issues that require updates to `polyfill.ts`:
   - A new import in `polyfill.ts` is required to fix an application error:
   ```
      import 'core-js/proposals/reflect-metadata';
   ```
   - Path of import of `reflect` has changed:
      ```
      import 'core-js/es/reflect';  // 'es7' has changed into 'es'
      ```
- Added `codelyzer` (checks code style of Angular) and fixed a few linting errors.

### Note:
Electron 4+ has introduced some more issues with ChangeDetection of Angular. See issue [31668](https://github.com/angular/angular/issues/31668). The following code lines will break ChangeDetection:
- Declaring `Menu`:
   ```
   import { remote } from 'electron';
   const { Menu } = remote;
   ```
- Accessing Electrons `remote` before Angulars `ngZone` has been created:
   ```
   class MyClass {
       static userDataPath = remote.app.getPath('userData'); // Or any other access to remote
   }
   ```


## 1.0.8 (2019-03-09)
- Downgraded to Electron 3.1.6. Electron 4+ breaks Angular's change detection ([#1200](https://github.com/angular/zone.js/issues/1200)) when using Electron Menus.
- Remove changeDetector (which resolved the above issue, but wasn't needed in Electron 3+)

## 1.07 (2019-03-03)
- Upgrade packages.
- Note: Keep electron at 4.0.3, else sqlite will not bind correctly. See electron-builder issue [#3660](https://github.com/electron-userland/electron-builder/issues/3660)
- Remove obsolete parameter from menu.popup()
- Add ChangeDetectorRef.detectChanges() to fix table not being updated after deletion of Hero.
- Fix check if app is in devMode. Bug introduced in [050a38e](https://github.com/pamtbaau/electron-angular-sqlite-bootstrap-webpack/commit/050a38eaf30c429cd45957336a497fed5570111d)

## 1.06 (2019-01-09)
- Mac: Fixed testing if app is in development mode
- Update of README

## 1.05 (2018-12-09)
- Upgrade npm packages

## 1.04 (2018-10-25)
- Upgrade npm packages

## 1.03 (2018-06-21)
- Upgrade npm packages

## 1.0.2 (2018-03-07)
- Chores on webpack config files
- Upgraded awesome-typescript-loader to 5.0.0-0 fixing Webpack 4.0 incompatibility

## 1.0.1 (2018-03-5)
- **Webpack**: Upgrade to Webpack 4.0
- **Angular**: Remove @angular/http (deprecated)

