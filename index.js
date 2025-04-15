// Requiring express, which runs as our server.
const express= require("express");

// Initiates our app and calls express.
const app= express();

const fs = require('fs');

// Requiring winston, which runs as our logger.
const winston = require('winston');

// Create logger using npm winston logger libray
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'add-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
  
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

  // CONSTANTS:

  // Create constant that adds number 1 and number 2
const add= (n1,n2) => {
    return n1+n2;
}
  // Create constant that subtracts number 1 and number 2
const subtract= (n1,n2) => {
    return n1-n2;
}

  // Create constant that multiplies number 1 and number 2
const multiply= (n1,n2) => {
    return n1*n2;
}

  // Create constant that adds number 1 and number 2
const divide= (n1,n2) => {
  return n1/n2;
}

// Create constant that returns the remainder of number 2 divided by number 1
const modulo= (n1, n2) => {
    return n1%n2;
}

// Create constant that exponentiates number 1 by number 2 (number 1 to the power of number 2)
const exponentiate= (n1, n2) => {
    return Math.pow(n1, n2);
}

// Create constant that returns the lowest value of number 1 and number 2
const minimum= (n1, n2) => {
    return Math.min(n1, n2);
}

// Create constant that returns the highest value of number 1 and number 2
const maximum= (n1, n2) => {
    return Math.max(n1, n2);
}

// Create constant that returns a random number within a range of number 1 and number 2 (eg: random number in range (10, 20))
const randomRange= (n1, n2) => {
    return Math.floor(Math.random() * (n2 - n1 + 1)) + n1;
}

// Create constant that returns the square root of given number (eg: square root of 4 = 2)
const squareRoot= (n1) => {
    return Math.sqrt(n1);
}


// FUNCTIONS: 

// Customise a specific error case for n1 and n2 in a reusable function (following DRY principle)
// This function applies for services with 2 parameters
function isNumberNan(n1, n2) {
    if (isNaN(n1)) {
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 incorrectly defined");
    }

    // If number1 or number2 is not a number, log and throw parsing error
    if (n1 === NaN || n2 === NaN) {
        console.log();
        throw new Error("Parsing Error");
    }
}


// Logs HTTP Request and Status results in a reusable function (following DRY principle)
function returnHttpRequestStatus(res, result) {
    res.status(200).json({ statuscode: 200, data: result });
}

// Logs errors in a reusable function (following DRY principles)
function logError(error, res) {
    console.error(error);
    res.status(500).json({ statuscode: 500, msg: error.toString() });
}


// APP SERVICE METHODS:

// Adds number 1 and number 2 if the input is correct 
app.get("/add", (req,res)=>{
    try{
      // convert input from string to number
    const n1= parseFloat(req.query.n1);
    const n2=parseFloat(req.query.n2);
    
    // Call reusable function that checks whether n1 and n2 are a Nan
    isNumberNan(n1, n2);

    // Leave a log reporting that n1 and n2 have been received for the addition service
    logger.info('Parameters '+n1+' and '+n2+' received for addition service');
    const result = add(n1,n2);

    // Return status code of http request and result
    returnHttpRequestStatus(res, result); 
    } catch(error) { 
        logError(error, res);
      }
});

// Subtracts number 1 and number 2 (number1-number2) if the input is correct 
app.get("/subtract", (req,res)=>{
  try{
    // convert input from string to number
  const n1= parseFloat(req.query.n1);
  const n2=parseFloat(req.query.n2);
  
  // Customise a specific error case for n1 and n2  
  isNumberNan(n1, n2);

  // Leave a log reporting that n1 and n2 have been received for the subtraction service
  logger.info('Parameters '+n1+' and '+n2+' received for subtraction service');
  const result = subtract(n1,n2);

  // Return status code of http request and result
  returnHttpRequestStatus(res, result); 
} catch(error) { 
    logError(error, res);
    }
});

// Mulltiplies number 1 and number 2 if the input is correct 
app.get("/multiply", (req,res)=>{
  try{
    // convert input from string to number
  const n1= parseFloat(req.query.n1);
  const n2=parseFloat(req.query.n2);

  isNumberNan(n1, n2);

  // Leave a log reporting that n1 and n2 have been received for the multiplication service
  logger.info('Parameters '+n1+' and '+n2+' received for multiplication service');
  const result = multiply(n1,n2);

    // Return status code of http request and result
    returnHttpRequestStatus(res, result); 
  } catch(error) { 
    logError(error, res);
    }
});

// Performs division with number 1 and number 2 (number1/number2) if the input is correct 

app.get("/divide", (req,res)=>{
  try{
    // convert input from string to number
  const n1= parseFloat(req.query.n1);
  const n2=parseFloat(req.query.n2);

  // Customise a specific error case for n1 and n2  
  isNumberNan(n1, n2);


  // Check if the denominator (n1) is 0, and if it is, throw a divide by zero error
  if (n1 === 0) {
    console.log()
    throw new Error("Cannot divide by zero!")
  }

  // Leave a log reporting that n1 and n2 have been received for the division service
  logger.info('Parameters '+n1+' and '+n2+' received for division service');
  const result = divide(n1,n2);

  // Return status code of http request and result
  returnHttpRequestStatus(res, result); 
} catch(error) { 
    logError(error, res);
    }
});

// Performs modulo operation on number 1 and number 2 if the input is correct
app.get("/modulo", (req,res)=>{
    try{
      // convert input from string to number
    const n1= parseFloat(req.query.n1);
    const n2=parseFloat(req.query.n2);
    
    // Call reusable function that checks whether n1 and n2 are a Nan
    isNumberNan(n1, n2);

    // Leave a log reporting that n1 and n2 have been received for the modulo service
    logger.info('Parameters '+n1+' and '+n2+' received for modulo service');
    const result = modulo(n1,n2);

    // Return status code of http request and result
    returnHttpRequestStatus(res, result); 
    } catch(error) { 
        logError(error, res);
      }
});

// Exponentiates number 1 by number 2 if the input is correct
app.get("/exponentiate", (req,res)=>{
    try{
      // convert input from string to number
    const n1= parseFloat(req.query.n1);
    const n2=parseFloat(req.query.n2);
    
    // Call reusable function that checks whether n1 and n2 are a Nan
    isNumberNan(n1, n2);

    // Leave a log reporting that n1 and n2 have been received for the exponentiation service
    logger.info('Parameters '+n1+' and '+n2+' received for exponentiation service');
    const result = exponentiate(n1,n2);

    // Return status code of http request and result
    returnHttpRequestStatus(res, result); 
    } catch(error) { 
        logError(error, res);
      }
});

// Gets the lowest value of number 1 and number 2 if the input is correct 
app.get("/minimum", (req,res)=>{
    try{
      // convert input from string to number
    const n1= parseFloat(req.query.n1);
    const n2=parseFloat(req.query.n2);
    
    // Call reusable function that checks whether n1 and n2 are a Nan
    isNumberNan(n1, n2);

    // Leave a log reporting that n1 and n2 have been received for the minimum service
    logger.info('Parameters '+n1+' and '+n2+' received for minimum service');
    const result = minimum(n1,n2);

    // Return status code of http request and result
    returnHttpRequestStatus(res, result); 
    } catch(error) { 
        logError(error, res);
      }
});

// Gets the highest value of number 1 and number 2 if the input is correct 
app.get("/maximum", (req,res)=>{
    try{
      // convert input from string to number
    const n1= parseFloat(req.query.n1);
    const n2=parseFloat(req.query.n2);
    
    // Call reusable function that checks whether n1 and n2 are a Nan
    isNumberNan(n1, n2);

    // Leave a log reporting that n1 and n2 have been received for the maximum service
    logger.info('Parameters '+n1+' and '+n2+' received for maximum service');
    const result = maximum(n1,n2);

    // Return status code of http request and result
    returnHttpRequestStatus(res, result); 
    } catch(error) { 
        logError(error, res);
      }
});

app.get("/randomrange", (req,res)=>{
    try{
      // convert input from string to number
    const n1= parseFloat(req.query.n1);
    const n2=parseFloat(req.query.n2);
    
    // Call reusable function that checks whether n1 and n2 are a Nan
    isNumberNan(n1, n2);

    // Leave a log reporting that n1 and n2 have been received for the randomrange service
    logger.info('Parameters '+n1+' and '+n2+' received for random range service');
    const result = randomRange(n1,n2);

    // Return status code of http request and result
    returnHttpRequestStatus(res, result); 
    } catch(error) { 
        logError(error, res);
      }
});

app.get("/squareroot", (req,res)=>{
    try{
      // convert input from string to number
    const n1= parseFloat(req.query.n1);
    
    // Check whether input is a NaN
    if (isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
  }

    // Leave a log reporting that n1 and n2 have been received for the squareroot service
    logger.info('Parameters '+n1+' and received for square root service');
    const result = squareRoot(n1);

    // Return status code of http request and result
    returnHttpRequestStatus(res, result); 
    } catch(error) { 
        logError(error, res);
      }
});

// Initiates our port constant, which can be changed here
const port=3040;

// Tells app to listen to our port variable as well as details where to see the query results
app.listen(port,()=> {
    console.log("Hello, I'm listening to port " +port);
    console.log("You can see my results on Postman or at http://localhost:" + port)
})
