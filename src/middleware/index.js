import {ApiAiClient} from 'api-ai-javascript';
import {applyMiddleware,createStore} from 'redux';

import { ADD_USER_MESSAGE, ADD_FILE_UPLOAD } from "../constants/action-types";
import { addBotMessage } from "../actions/index";

// const accessToken='4fca3b046a854e9aaa6b560f066a2a6b';
const accessToken='01e2f73b25b14ad6b6b3df9c9e1127aa';
const client=new ApiAiClient({accessToken});

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const process_user_message = (next, action) => {
  const { message } = action;
  client.textRequest(message).then(onSuccess)
  function onSuccess(response){
    console.log(response.result)
    console.log(response.result.fulfillment.speech)
    if(response.result.fulfillment.speech.includes("loyal")) {
      const gbqml_query = "SELECT (predicted_eligible_probs[OFFSET(0)].prob) as customer_eligibility_probability FROM ML.PREDICT(MODEL `gotit-analytics.retail_telco_sqlite.customer_eligibility_model`, (select A.*, B.email_address from (SELECT customer_plan_eligibility.customer_key as customer_key, customer_plan_eligibility.customer_life, customer_plan_eligibility.number_of_payments FROM `gotit-analytics`.retail_telco_sqlite.customer_plan_eligibility as customer_plan_eligibility) AS A join (SELECT customer_key, email_address from `gotit-analytics`.retail_telco_sqlite.dim_customer) as B ON A.customer_key = B.customer_key)) WHERE email_address like 'jocelyndavis@allen.com'"
      console.log("Query -")
      console.log(gbqml_query)
    }
    next(addBotMessage(response.result.fulfillment.speech, response.result));
  }
}
const dialogFlowMiddleware = () => next => action =>{
  next(action)
  if(action.type === ADD_USER_MESSAGE){
    process_user_message(next, action)
  }
  else if(action.type === ADD_FILE_UPLOAD){
    delay(2000).then(() => {
      const claim_code = "AB12-CD3EFG-H4IJ5"
      next(addBotMessage("Redeeming Claim Code " + claim_code + "...", null));

      delay(3000).then(() => {
        action = { message: "Redeem a gift card with Claim Code " + claim_code }
        process_user_message(next, action)
      })
    })
  }
}

export default dialogFlowMiddleware;