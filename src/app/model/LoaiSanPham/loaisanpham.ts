import { TheDb } from '../thedb';

/**
 *
 * @export
 * @class LoaiSanPham
 */
export class LoaiSanPham {
    maloaisanpham: number;
    tenloaisanpham: string;
    phantramloinhuan: number;
    madonvitinh: number;

    public fromRow(row: object): LoaiSanPham {
        this.maloaisanpham = row['maloaisanpham'];
        this.tenloaisanpham = row['tenloaisanpham'];
        this.phantramloinhuan = row['phantramloinhuan'];
        this.madonvitinh = row['madonvitinh'];
        return this;
    }

    public static get(maloaisanpham: number): Promise<LoaiSanPham> {
        const sql = 'SELECT * FROM loaisanpham WHERE maloaisanpham = $maloaisanpham';
        const values = { $maloaisanpham: maloaisanpham };

        return TheDb.selectOne(sql, values)
            .then((row) => {
                if (row) {
                    return new LoaiSanPham().fromRow(row);
                } else {
                    throw new Error('Expected to find 1 LoaiSanPham. Found 0.');
                }
            });
    }

    public static getAll(): Promise<LoaiSanPham[]> {
        const sql = `SELECT * FROM loaisanpham ORDER BY tenloaisanpham`;
        const values = {};

        return TheDb.selectAll(sql, values)
            .then((rows) => {
                const ListLoaiSanPham: LoaiSanPham[] = [];
                for (const row of rows) {
                    const loaisanpham = new LoaiSanPham().fromRow(row);
                    ListLoaiSanPham.push(loaisanpham);
                }
                return ListLoaiSanPham;
            });
    }

    public insert(): Promise<void> {
        const sql = `
            INSERT INTO loaisanpham (tenloaisanpham, phantramloinhuan, madonvitinh)
            VALUES($tenloaisanpham, $phantramloinhuan, $madonvitinh)`;

        const values = {
            $name: this.tenloaisanpham,
            $phantramloinhuan: this.phantramloinhuan,
            $madonvitinh: this.madonvitinh
        };

        return TheDb.insert(sql, values)
            .then((result) => {
                if (result.changes !== 1) {
                    throw new Error(`Expected 1 loaisanpham to be inserted. Was ${result.changes}`);
                } else {
                    this.maloaisanpham = result.lastID;
                }
            });
    }

    public update(): Promise<void> {
        const sql = `
            UPDATE loaisanpham
               SET phantramloinhuan = $phantramloinhuan
             WHERE maloaisanpham = $maloaisanpham`;

        const values = {
            $phantramloinhuan: this.phantramloinhuan,
        };

        return TheDb.update(sql, values)
            .then((result) => {
                if (result.changes !== 1) {
                    throw new Error(`Expected 1 loaisanpham to be updated. Was ${result.changes}`);
                }
            });
    }

    public delete(): Promise<void> {
        const sql = `
            DELETE FROM loaisanpham WHERE maloaisanpham = $maloaisanpham`;

        const values = {
            $maloaisanpham: this.maloaisanpham,
        };

        return TheDb.delete(sql, values)
            .then((result) => {
                if (result.changes !== 1) {
                    throw new Error(`Expected 1 loaisanpham to be deleted. Was ${result.changes}`);
                }
            });
    }
}
