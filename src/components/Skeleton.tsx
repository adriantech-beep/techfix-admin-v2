const Skeleton = () => {
  return (
    <div className="flex flex-col gap-2 ">
      <div className="skeleton h-4 w-3/4 bg-stone-200 mt-2"></div>
      <div className="skeleton h-4 w-1/2 bg-stone-200 mt-2"></div>
    </div>
  );
};

export default Skeleton;
