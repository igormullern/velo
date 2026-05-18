import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import pg from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { Database } from './schema'

// Carrega o .env da raiz do projeto de forma explícita,
// independente do process.cwd() no momento da execução do Playwright
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../../../../.env'), override: true })

const dialect = new PostgresDialect({
    pool: new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        max: 10
    })
})

export const db = new Kysely<Database>({
    dialect
})
