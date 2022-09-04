import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import { Data } from '@/types/db'

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, '../database/db.json')

console.log('data path --->', file)

const adapter = new JSONFile<Data>(file)

const db = new Low<Data>(adapter)

export default db