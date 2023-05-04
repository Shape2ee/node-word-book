import { readDB, writeDB } from "../dbController.js"
import { v4 } from 'uuid'

const getWordList = () => readDB('wordList')
const setWordList = (data) => writeDB('wordList', data)

const wordListRoute = [
  {
    method: 'get',
    route: '/wordList',
    handler: (req, res) => {
      const wordList = getWordList()
      res.send(wordList)
    }
  },
  {
    method: 'post',
    route: '/wordList',
    handler: ({ body }, res) => {
      try { 
        const wordList = getWordList()
        const newWord = {
          id: v4(),
          userId: body.userId,
          word: body.word,
          text: body.text,
          timetamp: Date.now()
        }
        wordList.unshift(newWord)
        setWordList(wordList)
        res.send(newWord)
      } catch (err) {
        console.error(err)
      }
    }
  },
  {
    method: 'delete',
    route: '/wordList/:id',
    handler: ({ params: { id }, query: { userId } }, res) => {
      try { 
        const wordList = getWordList()
        const targetIndex = wordList.findIndex(word => word.id === id)
        if (targetIndex < 0) throw '메시지가 없습니다.'
        if (wordList[targetIndex].userId !== userId) throw '사용자가 다릅니다.'

        wordList.splice(targetIndex, 1)
        setWordList(wordList)
        res.send(id)
      } catch (err) {
        console.error(err)
      }
    }
  },
  {
    method: 'put',
    route: '/wordList/:id',
    handler: ({ body, params: { id } }, res) => {
      try { 
        const wordList = getWordList()
        const targetIndex = wordList.findIndex(word => word.id === id)
        if (targetIndex < 0) throw '메시지가 없습니다.'
        if (wordList[targetIndex].userId !== body.userId) throw '사용자가 다릅니다.'
        const newWord = {
          ...wordList[targetIndex],
          word: body.word,
          text: body.text,
          timetamp: Date.now()
        }
        wordList.splice(targetIndex, 1, newWord)
        setWordList(wordList)
        res.send(newWord)
      } catch (err) {
        console.error(err)
      }
    }
  }
]

export default wordListRoute