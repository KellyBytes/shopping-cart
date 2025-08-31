import CartItem from './components/CartItem';
import ShoppingCart from './components/ShoppingCart';
import { useCart } from './context/CartContext';
import { useEffect, useState, useRef } from 'react';
import { getItemFromStorage, getParsedItemFromStorage } from './utilities/localStorageFunctions';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const cartRef = useRef(null);

  const { allItems, setItems, setCartItemsFromStorage } = useCart();

  const filteredItems =
    selectedCategory === 'all'
      ? allItems
      : allItems.filter((item) => item.category === selectedCategory);

  useEffect(() => {
    setItems();

    if (
      getParsedItemFromStorage('cartItems')?.length !== 0 &&
      getItemFromStorage('cartItems') !== null
    ) {
      setCartItemsFromStorage();
    }

    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="grid place-items-center py-20">
      <h1 className="lg:text-4xl md:text-3xl text-2xl italic text-gray-500 mb-16 px-10 text-center font-sans">
        Trend Alert: Must-Have Outfits of the Season
      </h1>
      <div className="mb-4 text-gray-500 text-sm">
        <label htmlFor="category" className="mr-2">
          Category:{' '}
        </label>
        <select
          className=" ps-2 border border-gray-200 rounded-md focus:border-gray-300 focus:outline-0"
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="hoodie">Hoodies</option>
          <option value="jacket">Jackets</option>
          <option value="footwear">Footwear</option>
          <option value="accessory">Accessories</option>
        </select>
      </div>
      <div ref={cartRef}>
        <ShoppingCart isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 place-items-start gap-10 lg:px-6 md:px-8">
        {/* {allItems?.map((item) => { */}
        {filteredItems.length > 0 ? (
          filteredItems?.map((item) => {
            return <CartItem key={item.id} item={item} />;
          })
        ) : (
          <p className="lg:col-start-2 lg:col-span-1 md:col-span-2 text-center text-indigo-300 text text-4xl mt-20">
            Sorry, no items...
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
