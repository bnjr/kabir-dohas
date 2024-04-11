import { generateEmbeddings, searchEmbeddings } from './embeddings'
import { llm } from './llm'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function main() {
  try {
    console.log('Welcome to the Doha Search Program!')
    console.log('Enter a search query or type "exit" to quit.')

    rl.question('Search query: ', async (search) => {
      if (search.toLowerCase() === 'exit') {
        console.log('Exiting the program. Goodbye!')
        rl.close()
        process.exit(0)
      }

      try {
        console.log('Generating embeddings for the search query...')
        const searchEmbedding = await generateEmbeddings(search)

        console.log('Searching for relevant dohas...')
        const dohas = await searchEmbeddings(searchEmbedding)

        if (dohas && dohas.length > 0) {
          console.log('Relevant dohas found.')
          console.log('') // Add a blank line for readability

          console.log('Generating response...')

          // Call the llm function with the relevant dohas and user query
          await llm(
            dohas.map((doha) => `Doha number ${doha.id}: ${doha.doha_hi}`),
            search,
          )

          console.log('') // Add a blank line for readability
          rl.question('Do you want to search again? (yes/no): ', (answer) => {
            if (answer.toLowerCase() === 'yes') {
              main() // Restart the program for another search
            } else {
              console.log('Exiting the program. Goodbye!')
              rl.close()
              process.exit(0)
            }
          })
        } else {
          console.log('No relevant dohas found.')
          console.log('') // Add a blank line for readability
          rl.question('Do you want to search again? (yes/no): ', (answer) => {
            if (answer.toLowerCase() === 'yes') {
              main() // Restart the program for another search
            } else {
              console.log('Exiting the program. Goodbye!')
              rl.close()
              process.exit(0)
            }
          })
        }
      } catch (error) {
        console.error('Error processing search:', error)
        console.log('') // Add a blank line for readability
        rl.question('Do you want to search again? (yes/no): ', (answer) => {
          if (answer.toLowerCase() === 'yes') {
            main() // Restart the program for another search
          } else {
            console.log('Exiting the program. Goodbye!')
            rl.close()
            process.exit(0)
          }
        })
      }
    })
  } catch (error) {
    console.error('Error in main program:', error)
    process.exit(1)
  }
}

main()
