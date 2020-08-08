const algorithmia = require('algorithmia')
const algorithmiaApikey = require('../credentials/algorithmia.json').apiKey
const sentenceBondaryDetection = require('sbd')

async function robot(content) {
    await fetchContentFromWikipedia(content)
    sanitizeContent(content)
    breakContentIntoSentences(content)

    async function fetchContentFromWikipedia(content) {
        const algotithmiaAuthenticated = algorithmia(algorithmiaApikey) //autentificação
        const wikipediaAlgorithm = algotithmiaAuthenticated.algo('web/WikipediaParser/0.1.2') //define o augoritmo
        const wikipediaResponde = await wikipediaAlgorithm.pipe(content.searchTerm) // executa o augoritmo
        const wikipediaContent = wikipediaResponde.get() // captura o que existe 

        content.sourceContentOriginal = wikipediaContent.content
    }
  function sanitizeContent(content) {
    const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal)
    const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdown)

    content.sourceContentSanitized = withoutDatesInParentheses

    function removeBlankLinesAndMarkdown(text) {
      const allLines = text.split('\n')

      const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
        if (line.trim().length === 0 || line.trim().startsWith('=')) {
          return false
        }

        return true
      })

      return withoutBlankLinesAndMarkdown.join(' ')
    }
  }

  function removeDatesInParentheses(text) {
    return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
  }
  function breakContentIntoSentences(content) {
      content.sentences = []

      const sentences = sentenceBondaryDetection.sentences(content.sourceContentSanitized)
      sentences.forEach((sentences) => {
          content.sentences.push({
              text: sentences,
              keyword: [],
              images: []
          })
      })
  }

}

module.exports = robot