const Portal = (props) => {
  const room =
    props.id === 1000
      ? { imageUrl: '/present.jpg' }
      : props.getRoom(props.maze, props.id);

  return (
    <button
      className="relative z-10 mt-auto w-full max-w-[700px]"
      onClick={props.onClick}
    >
      <img className="w-full" src="/portal.png" alt="Portal" />
      <div className="aspect absolute left-1/2 top-1/2 aspect-square w-4/5 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
        <img
          className="scale-[260%] opacity-70"
          src={room.imageUrl}
          alt="Room preview"
        />
      </div>
    </button>
  );
};

export default Portal;
