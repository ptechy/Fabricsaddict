import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";


// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonPaypalWrapper = ({ currency, showSpinner, amount,  confirm }) => {


    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
    
            { (showSpinner && isPending) && <div className="spinner" /> }

            <script src="https://www.paypal.com/sdk/js?client-id=AS0XhkqGKtnUh_8HiiuDkupz4EQJ8bhaIyiK_fAAWN7R_icFe3qcMTTDq-p-pjNIg91uEK-IjEyyNIYN&currency=EUR"></script>
            <PayPalButtons
                style={{"layout":"vertical"}}
                disabled={false}
                forceReRender={[amount, currency, {"layout":"vertical"}]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function () {
                        confirm(data.orderID); 
                    });
                }}
            />
        </>
    );
}

export default ButtonPaypalWrapper
