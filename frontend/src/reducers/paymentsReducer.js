export default function paymentsReducer(state = [], action) {
    switch(action.type) {

        case 'FETCH_PAYMENTS_LEAD':
            console.log([...action.lead]) 
            console.log([...state, ...action.lead]) 
            // initialize newstate for reducer (to add calculated parameter lead.price)
            let newstate =  [...state, ...action.lead];
            // calculating next payment
            newstate.forEach(item=>{
              // get true_investors (without candidate status)
              let true_investors = item.converted + item.processed + item.rejected
              // get count of payed investors
              let count_payed = item.payed
              let price_all = 0;
              let price_payed = 0;

              // Calculating price
              for(let key in item.prices){
                let value = item.prices[key]
                // Calculating price for investors without Candidate status
                if (true_investors >=10){
                    if (true_investors>=key) {
                        price_all += 10*value
                    } else {
                        if (Math.ceil(true_investors/10) === key/10) {
                            price_all += (true_investors+10-key)*value 
                        }
                    }
                }
                // Get payed price
                if (count_payed && true_investors >=10){
                    if (count_payed >= key) {
                        price_payed += 10*value
                    } else {
                        if (Math.ceil(count_payed/10) === key/10) {
                            price_payed += (count_payed+10-key)*value 
                        }
                    }
                }
              }
              // output price without payed prices
              item.price =price_all-price_payed;
            });

            return newstate;

        case 'MESSAGE_NOT_FOUND':
            return [ ...state, ...action.lead];
        default:
          // will NOT execute because of the line preceding the switch.
    }
    return state;
}