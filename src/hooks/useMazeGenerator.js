import { useEffect, useState } from 'react';
import { imageUrls } from '../services/imageList';

const useMazeGenerator = (number) => {
  const [maze, setMaze] = useState(null);
  const [currentRoom, setCurrentRoom] = useState({});

  useEffect(() => {
    const maze = generateMaze(number);
    setCurrentRoom(maze.head);
    const furthestRoomId = findFurthestRoom(maze, maze.head);
    const furthestRoom = getRoom(maze, furthestRoomId);
    console.log(furthestRoom);

    const updatedFurthestRoom = {
      ...furthestRoom,
      adjacentRooms: [1000],
    };
    console.log(updatedFurthestRoom);

    let node = maze.head;
    while (node) {
      if (node.id === furthestRoom.id) {
        node.adjacentRooms = updatedFurthestRoom.adjacentRooms;
        break;
      }
      node = node.next;
    }
    console.log(maze);

    setMaze(maze);
  }, []);

  useEffect(() => {
    if (maze) {
      console.log(maze);
    }
  }, [maze]);

  class Node {
    constructor(id, imageUrl) {
      this.id = id;
      this.imageUrl = imageUrl;
      this.next = null;
    }
  }

  class Maze {
    constructor(node) {
      this.head = node;
    }
  }

  const generateAdjacent = (number) => {
    const adjacentRooms = [];
    for (let i = 0; i < 3; i++) {
      const roomNumber = Math.floor(Math.random() * number);
      if (!adjacentRooms.includes(roomNumber)) {
        adjacentRooms.push(roomNumber);
      } else {
        i--;
      }
    }
    return adjacentRooms;
  };

  const generateMaze = (number) => {
    const maze = new Maze(new Node(0, imageUrls[0]));
    maze.head.message = 'Starting room';
    maze.head.adjacentRooms = generateAdjacent(number);
    let node = maze.head;
    for (let i = 1; i < number; i++) {
      node.next = new Node(i, imageUrls[i]);
      node.next.adjacentRooms = generateAdjacent(number);
      node = node.next;
    }
    return maze;
  };

  const setRoom = (number) => {
    let node = maze.head;
    while (node.id !== number) {
      node = node.next;
    }
    setCurrentRoom(node);
  };

  const getRoom = (maze, id) => {
    let node = maze.head;
    while (node.id !== id) {
      node = node.next;
    }
    return node;
  };

  const findFurthestRoom = (maze, firstNode) => {
    const roomQueue = [firstNode.id];
    const visitedRooms = new Set();

    let furthestRoomId = null;

    while (roomQueue.length > 0) {
      const currentRoomId = roomQueue.shift(); // Dequeue the first room
      if (visitedRooms.has(currentRoomId)) continue; // Skip already visited rooms

      // Mark the room as visited
      visitedRooms.add(currentRoomId);

      furthestRoomId = currentRoomId; // Update the furthest room seen so far

      const currentRoom = getRoom(maze, currentRoomId);
      // Enqueue unvisited adjacent rooms
      currentRoom.adjacentRooms.forEach((adjRoomId) => {
        if (!visitedRooms.has(adjRoomId)) {
          roomQueue.push(adjRoomId);
        }
      });
    }

    return furthestRoomId;
  };

  return {
    maze,
    currentRoom,
    setCurrentRoom,
    setRoom,
    getRoom,
    generateMaze,
  };
};

export default useMazeGenerator;
