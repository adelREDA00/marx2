const express = require('express');
const app = express();
const Exapi = require('request');


const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening to port ${port}`));

  app.use(express.static('./public/css'));



    app.get('/predict/:Na',async (request,response)=>{
        const name = request.params.Na
        
        Exapi(`https://api.nationalize.io?name=${name}`,async (error,predictions)=>{
            const data =await JSON.parse(predictions.body)
            response.json(data)
        })


      })
      
      
      
      //geting the country info 

      app.get('/Fid/:first',async (request,response)=>{
       const fi =  request.params.first 

        Exapi(` http://api.worldbank.org/v2/country/${fi}?format=json`,async (error,code)=>{

          const FICountry =await JSON.parse(code.body)
          response.json(FICountry)
      })

      })