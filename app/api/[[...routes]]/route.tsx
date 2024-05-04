/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

const matchedWords = ["socrerer", "magician","warlock","cast","magic","alchemist","spell","wizard","witch"]

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
})


app.frame('/', (c) => {
  const { status } = c
  return c.res({
    action: "/picker",
    image: "http://localhost:3000/game.jpg",
    intents: [
      <TextInput placeholder="Your Word..." />,
      <Button value="checkWord">Check Word</Button>,
      status === 'response' && <Button.Reset>Back</Button.Reset>,
    ],
  })
})

app.frame('/picker', (c) => {
  const { inputText = "", status} = c
  let imgURL ;

  let toMatchText = inputText.toLowerCase();

  const isYouWon = matchedWords.includes(toMatchText);

  if(isYouWon){
    imgURL = "http://localhost:3000/WinImg.png";
  }else{
    imgURL = "http://localhost:3000/looseImg.png";
  }
  return c.res({
    image: imgURL,
    imageAspectRatio: "1:1",
    intents: [
      status === 'response' && <Button.Reset>Back</Button.Reset>,
    ],
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
