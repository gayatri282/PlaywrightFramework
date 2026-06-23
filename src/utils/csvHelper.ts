
import fs from "fs"
import { parse } from 'csv-parse/sync'

export class csvHelper {
    
    static readCsv(filepath: string): Record<string, string>[] {

        return parse(fs.readFileSync(filepath, "utf-8"), {
            columns: true,
            skip_empty_lines: true,
            trim: true,
        }) as Record<string, string>[];
    }
}

