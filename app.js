const express = require("express")
const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  const logEntry = {
    timestamp: new Date(),
    method: req.method,
    path: req.path,
    query: req.query,
    headers: req.headers,
    body: req.body,
  }

  // Convert the log entry to a JSON string
  const logString = JSON.stringify(logEntry) + "\n"

  // Write the log entry to a file
  fs.appendFile("logs.json", logString, (err) => {
    if (err) {
      console.error("Error writing log entry to file:", err)
    }
  })

  next()
})

app.get("/log", (req, res) => {
  fs.readFile("logs.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err)
      res.status(500).send("Error reading file")
      return
    }

    const jsonData = JSON.parse(data)
    res.json(jsonData)
  })
})

app.get("/", (req, res) => res.type("html").json({ load: true }))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>
`
