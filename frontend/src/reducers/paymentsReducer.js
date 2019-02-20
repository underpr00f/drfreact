export default function paymentsReducer(state = {leads: "", loading: true}, action) {
    switch(action.type) {

        case 'FETCH_PAYMENTS_LEAD':
            // initialize newstate for reducer (to add calculated parameter lead.price)
            let newstate =  [...action.leads];
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
            return { ...state, leads: [...newstate], loading: false }
        case 'LEAD_NOT_FOUND':
            return {...state, loading: false, error: "Not found"};
        default:
          // will NOT execute because of the line preceding the switch.
    }
    return state;
}