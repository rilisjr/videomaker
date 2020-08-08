const readLine = require('readline-sync')
function start() { 
    const content = {} //content nesse caso é o termo digitado
    content.searchTerm = askAndReturnSearchTerm()
    content.prefix = askAndReturnPrefix()
    //quando executar a função "ask..." ele irá injetar um valor dentro do search
    function askAndReturnSearchTerm()  {
        return readLine.question('Digite o que deseja procurar na wikipedia: ')
    }
    // o importante é que no final ele injeta o content dentro da propriedade "searchterm"
    function askAndReturnPrefix() {
         const prefixes = ['Who is', 'What is', 'how to do'] //vai retornar um dos indices 0, 1 ou 2
         const selectedPrefixIndex = readLine.keyInSelect(prefixes, 'Chose one option')
         const selectedPrefixText = prefixes[selectedPrefixIndex]

         return selectedPrefixText
    }

console.log()
}

start()