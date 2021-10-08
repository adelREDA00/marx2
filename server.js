const express = require('express');
const app = express();
const Exapi = require('request');
app.listen(5500, () => {
    console.log(`Starting server at 5500 `);
  });
  app.use(express.static('./public/css'));

    app.get('/predict/:Na',async (request,response)=>{
        const name = request.params.Na

        Exapi(`https://api.nationalize.io?name=${name}`,async (error,predictions)=>{
            const data =await JSON.parse(predictions.body)
            response.json(data)
        })

      })
