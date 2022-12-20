import { getProduct } from "../api";
import Rating from "../components/Rating";
import { getCartItems, setCartItems } from "../localStorage";
import { hideLoading, parseRequestUrl, showLoading } from "../utils";

const ProductScreen = {
    after_render : ()=>{
        const request = parseRequestUrl();
        document.getElementById("add-button").addEventListener('click',
        async ()=>{
            // document.location.hash = `/cart/${request.id}`; 
            const product = await getProduct(request.id);
            const item = {
                product: product._id, /* here product,name,image,price,qty on left hand side are " keywords " that must be of same name */
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty: 1,
            };
            
            let cartItems = getCartItems();
            const existItem = cartItems.find(x=>x.product === request.id);
            if(existItem){
                //
            }else{
                cartItems = [...cartItems, item];
            }
            setCartItems(cartItems);

            document.location.hash = '/cart';
        }
        );
    },
    render : async() => {
        const request = parseRequestUrl();
        showLoading();
        const product = await getProduct(request.id);
        if(product.error){
            return (`<div>${product.error}</div>`)
        }
        hideLoading();
        return `
            <div class="content">
                <div class="back-to-result">
                    <a href="/#/">Back to result</a>
                </div>
                <div class="details">
                    <div class="details-image">
                        <img src="${product.image}" alt="${product.name}"/>
                    </div>
                    <div class="details-info">
                        <ul>
                            <li>
                                <h1>${product.name}</h1>
                            </li>
                            <li>
                                ${Rating.render({
                                    value:product.rating,
                                    text: `${product.numReviews} reviews`,
                                })}
                            </li>
                            <li>
                                Price:<strong>$${product.price}</strong>
                            </li>
                            <li>
                                Description: 
                                <div>
                                    ${product.description}
                                </div>
                            </li>

                        </ul>
                    </div>
                    <div class="details-action">
                        <ul>
                            <li>
                                Price:$${product.price}
                            <li>
                            <li>
                                Status:
                                ${product.countInStock > 0 
                                    ? `<span class="success"> In Stock </span>`
                                    : `<span class="error">Unavailable </span>`
                                }
                            </li>
                            <li>
                                <button class="fw primary" id="add-button">Add to Cart</div>
                            </li>
                        </ul>
                    </div>   
                </div>
            </div>
        `;
    },
};
export default ProductScreen;