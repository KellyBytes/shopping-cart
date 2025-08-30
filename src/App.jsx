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
      <h1 className="lg:text-5xl md:text-4xl text-3xl italic text-gray-500 mb-16 px-10 text-center font-sans">
        Trend Alert: Must-Have Outfits of the Season
      </h1>
      <div className="mb-4 text-gray-500 text-lg">
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
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 place-items-start gap-10 xl:px-6 px-10">
        {/* {allItems?.map((item) => { */}
        {filteredItems.length > 0 ? (
          filteredItems?.map((item) => {
            return <CartItem key={item.id} item={item} />;
          })
        ) : (
          <p className="col-start-2 text-center text-indigo-300 text text-4xl mt-20">
            Sorry, no items...
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
