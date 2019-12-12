import { Component } from '@angular/core';
import * as fs from 'fs';

// tslint:disable-next-line:no-implicit-dependencies
// import { Menu, MenuItemConstructorOptions, OpenDialogOptions, remote } from 'electron';
import { OpenDialogOptions, remote } from 'electron';
import { Hero } from './model/hero';
import { Settings } from './model/settings';
import { TheDb } from './model/thedb';

// Importing style.scss allows webpack to bundle stylesheet with application
import '../assets/sass/style.scss';
import { LoaiSanPham } from './model/LoaiSanPham/loaisanpham';

@Component({
    selector: 'mycmp-app',
    templateUrl: 'app.component.html',
})
export class AppComponent {
    public heroes: Hero[];
    public ListLoaiSanPham: LoaiSanPham[];

    constructor() {
        Settings.initialize();

        if (fs.existsSync(Settings.dbPath)) {
            this.openDb(Settings.dbPath);
        } else if (Settings.hasFixedDbLocation) {
            this.createDb(Settings.dbPath);
        } else {
            this.createDb();
        }
    }

    public openDb(filename: string) {
        TheDb.openDb(filename)
            .then(() => {
                if (!Settings.hasFixedDbLocation) {
                    Settings.dbPath = filename;
                    Settings.write();
                }
            })
            .then(() => {
                this.getLoaisanpham();
            })
            .catch((reason) => {
                // Handle errors
                console.log('Error occurred while opening database: ', reason);
            });
    }

    public async createDb(filename?: string) {
        if (!filename) {
            const options: OpenDialogOptions = {
                title: 'Create file',
                defaultPath: remote.app.getPath('documents'),
                filters: [
                    {
                        name: 'Database',
                        extensions: ['db'],
                    },
                ],
            };
            filename = await remote.dialog.showSaveDialogSync(remote.getCurrentWindow(), options);
        }

        if (!filename) {
            return;
        }

        TheDb.createDb(filename)
            .then((dbPath) => {
                if (!Settings.hasFixedDbLocation) {
                    Settings.dbPath = dbPath;
                    Settings.write();
                }
            })
            .then(() => {
                this.getLoaisanpham();
            })
            .catch((reason) => {
                console.log(reason);
            });
    }

    public getLoaisanpham(){
        LoaiSanPham.getAll()
                   .then((ListLoaiSanPham) => {
                        this.ListLoaiSanPham = ListLoaiSanPham;
                    })
    }

    // public onMenu(hero: Hero) {
    //     const menu = this.initMenu(hero);
    //     menu.popup({});
    // }

    // private deleteLoaisanpham(loaisanpham: LoaiSanPham) {
    //     loaisanpham.delete();
    //     this.getLoaisanpham();
    // }

    // private initMenu(hero: Hero): Menu {
    //     const template: MenuItemConstructorOptions[] = [
    //         {
    //             label: `Delete ${hero.name}`,
    //             click: () => this.deleteHero(hero),
    //         },
    //     ];

    //     return remote.Menu.buildFromTemplate(template);
    // }
}
