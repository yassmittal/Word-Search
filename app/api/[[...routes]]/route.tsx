/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { pinata } from 'frog/hubs'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

const matchedWords = ["socrerer", "magician","warlock","cast","magic","alchemist","spell","wizard","witch"]

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // hub: pinata()
})

app.frame('/', (c) => {
  const { status } = c
  return c.res({
    action: "/picker",
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/game.jpg`,
    intents: [
      <TextInput placeholder="Your Word..." />,
      <Button value="checkWord">Check Word</Button>,
      status === 'response' && <Button.Reset>Back</Button.Reset>,
    ],
  })
})

app.frame('/picker', (c) => {

  const {frameData , verified} = c;


  const { inputText = "", status } = frameData || {};

  if(verified){
  let imgURL ;

  let toMatchText = inputText.toLowerCase();

  const isYouWon = matchedWords.includes(toMatchText);

  if(isYouWon){
    imgURL = `${process.env.NEXT_PUBLIC_SITE_URL}/WinImg.png`;
  }else{
    imgURL = `${process.env.NEXT_PUBLIC_SITE_URL}/looseImg.png`;
  }
  return c.res({
    image: imgURL,
    imageAspectRatio: "1:1",
    intents: [
      status === 'response' && <Button.Reset>Back</Button.Reset>,
    ],
  })
}else{
  return c.res({
    action: "/",
    image: (
      <div style={{fontSize: "40px", color: "white" , display: "flex" , justifyContent: "center" , alignItems: "center" , height: "100%" , background: "black"}}>
        <p>
        Invalid User, I guess your are not signed in.
        </p>
      </div>
    ),
    intents: [
      <Button>Try Again</Button>
    ],
  })

}

})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
