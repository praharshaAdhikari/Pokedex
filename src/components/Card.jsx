const Card = ({ name, image, type }) => {
  return (
    <div class="w-72 bg-white rounded-xl duration-500 shadow-xl flex flex-col items-center">
      <img src={image} alt={name} class="h-64 w-64 object-cover rounded-t-xl" />
      <div class="px-4 py-3 w-72 bg-gray-100">
        <p class="text-2xl font-bold text-black truncate block uppercase">
          {name}
        </p>
        <div class="flex items-center">
          <p class="text-lg font-semibold text-black cursor-auto my-3 capitalize">
            Type: {type}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
