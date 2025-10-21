import CartButtons from './CartButtons';

const CartItem = ({ item, fromCart }) => {
  const { id, name, imageUrl, price } = item;

  return (
    <div
      id={id}
      className="group relative flex flex-col gap-y-2 border border-zinc-200 rounded-md bg-zinc-50  py-24 xl:px-16 px-12"
    >
      <div
        className={`${
          fromCart ? '' : 'h-58 xl:h-64'
        } w-full flex items-center justify-center overflow-hidden`}
      >
        <img
          src={imageUrl}
          alt="Product Image"
          loading="lazy"
          className={`${
            !fromCart &&
            'max-h-58 aspect-auto group-hover:-translate-y-2 transition-all duration-500'
          }`}
        />
      </div>
      <div className="absolute bottom-5 left-5">
        <h1 className={`text-zinc-700 ${fromCart && 'text-sm'}`}>{name}</h1>
        <span className={`text-pink-400 ${fromCart && 'text-sm'}`}>
          ${price}
        </span>
      </div>
      <CartButtons item={item} fromCart={fromCart} />
    </div>
  );
};

export default CartItem;
