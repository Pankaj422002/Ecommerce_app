const CheckoutSteps = {
    render: (props)=>{
        return `
        <div class="checkout-steps">
            <div class="${props.step1? 'active':''}">
                ${props.isactivated.step1? `<a href="/#/shipping">Shipping</a>`:'Shipping'}  
            </div>
            <div class="${props.step2? 'active':''}">
                ${props.isactivated.step2? `<a href="/#/payment">Payment</a>`:'Payment'}
            </div>
            <div class="${props.step3? 'active':''}">
                ${props.isactivated.step3? `<a href="/#/placeorder">Place Order</a>`:'Place Order'}          
            </div>
        </div>
        `;
    },
};
export default CheckoutSteps;