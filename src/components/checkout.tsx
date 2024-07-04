import {
    Stripe,
    StripeElements,
    loadStripe
} from "@stripe/stripe-js"

export async function checkout(lineItems: any[]) {
    let stripe: Stripe;
    let elements:StripeElements;
    const el = document.getElementById('payment') as HTMLElement | null;
    const btn = document.getElementById('btn') as HTMLButtonElement | null;
    const container = document.querySelector('.container')

    try 
    {
        const stripepromise = fetch('api/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: lineItems[0].price, 
                quantity: lineItems[0].quantity,
                name: lineItems[0].name
            })
        });
        
        stripe = await loadStripe(process.env.NEXT_PUBLIC_API_KEY as string) as Stripe;

        if (!!container) {
            // Hide the container only after successful API fetch
            const res = await stripepromise; // Wait for response
            if (res.ok) {
                container.classList.add('hide');
            }
            else {
                throw new Error('Failed to fetch payment information');
            }
            const data = await res.json();

            elements = stripe?.elements({
                clientSecret: data.clientSecret,
                loader: 'auto'
            })
            
            const payment = elements?.create('payment', {
                layout: 'accordion'
            })
            if (el) {
                payment.mount(el);
            }
            
            btn?.addEventListener('click',async () => {
                const result = await stripe?.confirmPayment({
                    elements,
                    redirect: 'if_required',
                    confirmParams: {
                        return_url: 'http://localhost:3000'
                    }
                })

                if(result) {
                    alert("Payment Successful")
                }
            })
        }
        
    } catch(error) {
        console.error('Error during checkout process:', error);
    }  
}