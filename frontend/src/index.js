import CartScreen from './screens/CartScreen';
import Error404Screen from './screens/Error404Screen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { hideLoading, parseRequestUrl, showLoading } from './utils';
import Header from './components/Header';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';


const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
  '/order/:id': OrderScreen,
  // '/cart/:id': CartScreen,
  '/cart':CartScreen,
  '/signin': SigninScreen,
  '/register': RegisterScreen,
  '/profile': ProfileScreen,
  '/shipping':ShippingScreen,
  '/payment':PaymentScreen,
  '/placeorder':PlaceOrderScreen,
  '/dashboard': DashboardScreen,
  '/productlist':ProductListScreen,
  '/product/:id/edit':ProductEditScreen,
  '/orderlist': OrderListScreen,
};
const router = async () => {
  showLoading();
  // parse the url into 3 different parts:
  const request = parseRequestUrl();
  // abstract the main url that is present at the end :
  const parseUrl = (request.resource ? `/${request.resource}` : '/')
    + (request.id ? '/:id' : '')
    + (request.verb ? `/${request.verb}` : '');

  // after abstracting use router object to get the screen to be displayed:
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render();
  await Header.after_render();

  const main = document.getElementById('main-container');
  // acording to screen we call the render function of corresponding screen:
  main.innerHTML = await screen.render();
  if(screen.after_render) await screen.after_render();
  hideLoading();
  
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
