import fs from 'fs'
import { resolve } from 'path'

const basePath = resolve()

const filenames = {
  wordList: resolve(basePath, 'src/db/wordList.json'),
  users: resolve(basePath, 'src/db/users.json')
}

export const readDB = (target) => {
  try {
    return JSON.parse(fs.readFileSync(filenames[target], 'utf-8'))
  } catch (err) {
    console.error(err)
  }
}

export const writeDB = (target, data) => {
  try {
    return fs.writeFileSync(filenames[target], JSON.stringify(data))
  } catch (err) {
    console.log(err)
  }
}