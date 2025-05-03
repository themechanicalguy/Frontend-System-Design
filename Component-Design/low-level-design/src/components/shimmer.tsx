const Shimmer = () => {
  let dummy = new Array(20).fill(0);

  return dummy.map(() => {
    return (
      <div className="border-2 border-b-black ">
        <div className="h-56 w-56 bg-gray-100"></div>
      </div>
    );
  });
};

export default Shimmer;
