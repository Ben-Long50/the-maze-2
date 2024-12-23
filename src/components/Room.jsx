import useMazeGenerator from '../hooks/useMazeGenerator';
import { imageUrls } from '../services/imageList';
import Portal from './Portal';

const Room = () => {
  const maze = useMazeGenerator(imageUrls.length);

  return (
    <div
      className="font-logo flex h-dvh w-dvw items-center object-fill"
      style={{
        backgroundImage: `url(${imageUrls[maze.currentRoom.id]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex h-full w-dvw flex-col justify-around py-8 pb-32">
        <h1 className="text-center text-6xl font-semibold">
          {maze.currentRoom.message && maze.currentRoom.message}
        </h1>
        <div className="flex grow justify-evenly gap-40">
          {maze.currentRoom.adjacentRooms &&
            maze.currentRoom.adjacentRooms.map((room) => {
              return (
                <Portal
                  key={room}
                  id={room}
                  maze={maze.maze}
                  currentRoom={maze.currentRoom}
                  getRoom={maze.getRoom}
                  onClick={() => maze.setRoom(room)}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Room;
