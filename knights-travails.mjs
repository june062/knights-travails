class Vertex {
  constructor(data) {
    this.data = data;
    this.previous = null;
    this.steps = 0;
    this.adjacentIndices = [];
  }
  addAdjacentIndices(vertex) {
    if (this.adjacentIndices.includes(vertex)) {
      return;
    }
    this.adjacentIndices.push(vertex);
    vertex.addAdjacentIndices(this);
  }
  depthFirstSearch(vertex, startVertex, visitedVertices = []) {
    if (vertex.data === startVertex.data) {
      return vertex;
    }
    visitedVertices.push(startVertex);

    for (let element of startVertex.adjacentIndices) {
      if (element.data === vertex.data) {
        return element;
      } else if (visitedVertices.includes(element) === true) {
        continue;
      } else {
        this.depthFirstSearch(vertex, element, visitedVertices);
      }
    }
    return null;
  }
  breadthFirstSearch(startingVertex, vertexToFind) {
    let queue = [];
    let visitedVertices = [];
    if (startingVertex.data === vertexToFind.data) {
      return startingVertex;
    } else {
      visitedVertices.push(startingVertex);
      queue.push(startingVertex);
    }
    while (queue.length !== 0) {
      let currentVertex = queue[0];
      queue.splice(0, 1);
      innerLoop: for (let element of currentVertex.adjacentIndices) {
        if (visitedVertices.includes(element)) {
          continue innerLoop;
        } else if (element.data === vertexToFind.data) {
          return element;
        } else {
          visitedVertices.push(element);
          queue.push(element);
        }
      }
    }
    return null;
  }
}

class weightedGraphVertex {
  constructor(name) {
    this.name = name;
    this.routes = new Map();
  }
  addRoute(city, price) {
    this.routes.set(city, price);
  }
}
let chicago = new weightedGraphVertex("chicago");
let elPaso = new weightedGraphVertex("elPaso");
let denver = new weightedGraphVertex("denver");
let boston = new weightedGraphVertex("boston");
let atlanta = new weightedGraphVertex("atlanta");

atlanta.addRoute(boston, 100);
atlanta.addRoute(denver, 160);
boston.addRoute(chicago, 120);
boston.addRoute(denver, 180);
chicago.addRoute(elPaso, 80);
denver.addRoute(chicago, 40);
denver.addRoute(elPaso, 140);
elPaso.addRoute(boston, 100);

function shortestPath(startingCity, finalDestination) {
  let cheapestPriceTable = new Map();
  let cheapestPreviosStopOverCityTable = new Map();
  let visitedCities = new Map();
  let unvisitedCities = [];

  cheapestPriceTable.set(startingCity, 0);
  let currentCity = startingCity;

  while (currentCity) {
    visitedCities.set(currentCity, "visited");
    unvisitedCities.splice(unvisitedCities.indexOf(currentCity), 1);
    for (let [key, value] of currentCity.routes) {
      if (!visitedCities.has(key) && !unvisitedCities.includes(key)) {
        unvisitedCities.push(key);
      }
      let passingThroughCurrentCity =
        cheapestPriceTable.get(currentCity) + value;
      if (
        !cheapestPriceTable.has(key) ||
        passingThroughCurrentCity < cheapestPriceTable.get(key)
      ) {
        cheapestPriceTable.set(key, passingThroughCurrentCity);
        cheapestPreviosStopOverCityTable.set(key, currentCity);
      }
    }
    if (unvisitedCities.length > 0) {
      currentCity = unvisitedCities.reduce((city, minCity) => {
        return (
          cheapestPriceTable.get(city) < cheapestPriceTable.get(minCity)
            ? city
            : minCity,
          unvisitedCities[0]
        );
      });
    } else {
      currentCity = null;
    }
  }
  let shortestPath = [];
  currentCity = finalDestination;
  while (currentCity !== startingCity) {
    shortestPath.push(currentCity.name);
    currentCity = cheapestPreviosStopOverCityTable.get(currentCity);
  }
  shortestPath.push(startingCity.name);
  return shortestPath.reverse();
}

let chessboard = [
  [
    new Vertex([0, 0]),
    new Vertex([0, 1]),
    new Vertex([0, 2]),
    new Vertex([0, 3]),
    new Vertex([0, 4]),
    new Vertex([0, 5]),
    new Vertex([0, 6]),
    new Vertex([0, 7]),
  ],
  [
    new Vertex([1, 0]),
    new Vertex([1, 1]),
    new Vertex([1, 2]),
    new Vertex([1, 3]),
    new Vertex([1, 4]),
    new Vertex([1, 5]),
    new Vertex([1, 6]),
    new Vertex([1, 7]),
  ],
  [
    new Vertex([2, 0]),
    new Vertex([2, 1]),
    new Vertex([2, 2]),
    new Vertex([2, 3]),
    new Vertex([2, 4]),
    new Vertex([2, 5]),
    new Vertex([2, 6]),
    new Vertex([2, 7]),
  ],
  [
    new Vertex([3, 0]),
    new Vertex([3, 1]),
    new Vertex([3, 2]),
    new Vertex([3, 3]),
    new Vertex([3, 4]),
    new Vertex([3, 5]),
    new Vertex([3, 6]),
    new Vertex([3, 7]),
  ],
  [
    new Vertex([4, 0]),
    new Vertex([4, 1]),
    new Vertex([4, 2]),
    new Vertex([4, 3]),
    new Vertex([4, 4]),
    new Vertex([4, 5]),
    new Vertex([4, 6]),
    new Vertex([4, 7]),
  ],
  [
    new Vertex([5, 0]),
    new Vertex([5, 1]),
    new Vertex([5, 2]),
    new Vertex([5, 3]),
    new Vertex([5, 4]),
    new Vertex([5, 5]),
    new Vertex([5, 6]),
    new Vertex([5, 7]),
  ],
  [
    new Vertex([6, 0]),
    new Vertex([6, 1]),
    new Vertex([6, 2]),
    new Vertex([6, 3]),
    new Vertex([6, 4]),
    new Vertex([6, 5]),
    new Vertex([6, 6]),
    new Vertex([6, 7]),
  ],
  [
    new Vertex([7, 0]),
    new Vertex([7, 1]),
    new Vertex([7, 2]),
    new Vertex([7, 3]),
    new Vertex([7, 4]),
    new Vertex([7, 5]),
    new Vertex([7, 6]),
    new Vertex([7, 7]),
  ],
];

function knightsTravails(start, end) {
  if (
    start[0] > 7 ||
    start[0] < 0 ||
    start[1] > 7 ||
    start[1] < 0 ||
    end[0] > 7 ||
    end[0] < 0 ||
    end[1] > 7 ||
    end[1] < 0
  ) {
    throw new Error("Must enter a valid chess square");
  }
  let current;
  let queue = [];
  let visited = [];
  chessboard[start[0]][start[1]].steps = 0;

  if (start === end) {
    return "We got there in 0 steps!";
  } else {
    queue.push(chessboard[start[0]][start[1]]);
  }
  while (queue.length > 0) {
    current = queue[0];
    queue.splice(0, 1);
    visited.push(current);
    if (current === end) {
      return "You reached the end";
    }
    let col = current.data[0];
    let row = current.data[1];

    for (let i = 0; i < 8; i++) {
      if (i == 0) {
        if (
          current.data[0] + 2 > 7 ||
          current.data[0] + 2 < 0 ||
          current.data[1] + 1 > 7 ||
          current.data[1] + 1 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col + 2][row + 1].data) ===
          JSON.stringify(end)
        ) {
          chessboard[col + 2][row + 1].previous = current;
          chessboard[col + 2][row + 1].steps = 1 + current.steps;

          console.log(
            `You reached the end in ${chessboard[col + 2][row + 1].steps} steps`
          );

          displayKnightsPath(
            chessboard[start[0]][start[1]],
            chessboard[end[0]][end[1]]
          );

          return;
        } else if (visited.includes(chessboard[col + 2][row + 1])) {
          continue;
        } else {
          chessboard[col + 2][row + 1].previous = current;
          chessboard[col + 2][row + 1].steps = 1 + current.steps;

          queue.push(chessboard[col + 2][row + 1]);

          continue;
        }
      }
      if (i == 1) {
        if (
          current.data[0] + 2 > 7 ||
          current.data[0] + 2 < 0 ||
          current.data[1] - 1 > 7 ||
          current.data[1] - 1 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col + 2][row - 1].data) ===
          JSON.stringify(end)
        ) {
          chessboard[col + 2][row - 1].previous = current;
          chessboard[col + 2][row - 1].steps = 1 + current.steps;

          console.log(
            `You found the end in ${chessboard[col + 2][row - 1].steps} steps`
          );

          displayKnightsPath(
            chessboard[start[0]][start[1]],
            chessboard[end[0]][end[1]]
          );

          return;
        } else if (visited.includes(chessboard[col + 2][row - 1])) {
          continue;
        } else {
          chessboard[col + 2][row - 1].previous = current;
          chessboard[col + 2][row - 1].steps = 1 + current.steps;

          queue.push(chessboard[col + 2][row - 1]);
          continue;
        }
      }
      if (i == 2) {
        if (
          current.data[0] + 1 > 7 ||
          current.data[0] + 1 < 0 ||
          current.data[1] + 2 > 7 ||
          current.data[1] + 2 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col + 1][row + 2].data) ===
          JSON.stringify(end)
        ) {
          chessboard[col + 1][row + 2].previous = current;
          chessboard[col + 1][row + 2].steps = 1 + current.steps;

          console.log(
            `You reached the end in ${chessboard[col + 1][row + 2].steps} steps`
          );

          displayKnightsPath(
            chessboard[start[0]][start[1]],
            chessboard[end[0]][end[1]]
          );

          return;
        } else if (visited.includes(chessboard[col + 1][row + 2])) {
          continue;
        } else {
          chessboard[col + 1][row + 2].previous = current;
          chessboard[col + 1][row + 2].steps = 1 + current.steps;
          queue.push(chessboard[col + 1][row + 2]);
          continue;
        }
      }
      if (i == 3) {
        if (
          current.data[0] + 1 > 7 ||
          current.data[0] + 1 < 0 ||
          current.data[1] - 2 > 7 ||
          current.data[1] - 2 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col + 1][row - 2].data) ===
          JSON.stringify(end)
        ) {
          chessboard[col + 1][row - 2].previous = current;
          chessboard[col + 1][row - 2].steps = 1 + current.steps;

          console.log(
            `You reached the end in ${chessboard[col + 1][row - 2].steps} steps`
          );

          displayKnightsPath(
            chessboard[start[0]][start[1]],
            chessboard[end[0]][end[1]]
          );

          return;
        } else if (visited.includes(chessboard[col + 1][row - 2])) {
          continue;
        } else {
          chessboard[col + 1][row - 2].previous = current;
          chessboard[col + 1][row - 2].steps = 1 + current.steps;
          queue.push(chessboard[col + 1][row - 2]);
          continue;
        }
      }
      if (i == 4) {
        if (
          current.data[0] - 2 > 7 ||
          current.data[0] - 2 < 0 ||
          current.data[1] + 1 > 7 ||
          current.data[1] + 1 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col - 2][row + 1].data) ===
          JSON.stringify(end)
        ) {
          chessboard[col - 2][row + 1].previous = current;
          chessboard[col - 2][row + 1].steps = 1 + current.steps;

          console.log(
            `You reached the end n ${chessboard[col - 2][row + 1].steps} steps`
          );

          displayKnightsPath(
            chessboard[start[0]][start[1]],
            chessboard[end[0]][end[1]]
          );

          return;
        } else if (visited.includes(chessboard[col - 2][row + 1])) {
          continue;
        } else {
          chessboard[col - 2][row + 1].previous = current;
          chessboard[col - 2][row + 1].steps = 1 + current.steps;
          queue.push(chessboard[col - 2][row + 1]);
          continue;
        }
      }
      if (i == 5) {
        if (
          current.data[0] - 2 > 7 ||
          current.data[0] - 2 < 0 ||
          current.data[1] - 1 > 7 ||
          current.data[1] - 1 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col - 2][row - 1].data) ===
          JSON.stringify(end)
        ) {
          chessboard[col - 2][row - 1].previous = current;
          chessboard[col - 2][row - 1].steps = 1 + current.steps;

          console.log(
            `You reached the end in ${chessboard[col - 2][row - 1].steps} steps`
          );

          displayKnightsPath(
            chessboard[start[0]][start[1]],
            chessboard[end[0]][end[1]]
          );

          return;
        } else if (visited.includes(chessboard[col - 2][row - 1])) {
          continue;
        } else {
          chessboard[col - 2][row - 1].previous = current;
          chessboard[col - 2][row - 1].steps = 1 + current.steps;
          queue.push(chessboard[col - 2][row - 1]);
          continue;
        }
      }
      if (i == 6) {
        if (
          current.data[0] - 1 > 7 ||
          current.data[0] - 1 < 0 ||
          current.data[1] + 2 > 7 ||
          current.data[1] + 2 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col - 1][row + 2].data) ===
          JSON.stringify(end)
        ) {
          chessboard[col - 1][row + 2].previous = current;
          chessboard[col - 1][row + 2].steps = 1 + current.steps;

          console.log(
            `You found the end in ${chessboard[col - 1][row + 2].steps} steps`
          );

          displayKnightsPath(
            chessboard[start[0]][start[1]],
            chessboard[end[0]][end[1]]
          );

          return;
        } else if (visited.includes(chessboard[col - 1][row + 2])) {
          continue;
        } else {
          chessboard[col - 1][row + 2].previous = current;
          chessboard[col - 1][row + 2].steps = 1 + current.steps;
          queue.push(chessboard[col - 1][row + 2]);
          continue;
        }
      }
      if (i == 7) {
        if (
          current.data[0] - 1 > 7 ||
          current.data[0] - 1 < 0 ||
          current.data[1] - 2 > 7 ||
          current.data[1] - 2 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col - 1][row - 2].data) ===
          JSON.stringify(end)
        ) {
          chessboard[col - 1][row - 2].previous = current;
          chessboard[col - 1][row - 2].steps = 1 + current.steps;

          console.log(
            `You found the end in ${chessboard[col - 1][row - 2].steps} steps`
          );

          displayKnightsPath(
            chessboard[start[0]][start[1]],
            chessboard[end[0]][end[1]]
          );

          return;
        } else if (visited.includes(chessboard[col - 1][row - 2])) {
          continue;
        } else {
          chessboard[col - 1][row - 2].previous = current;
          chessboard[col - 1][row - 2].steps = 1 + current.steps;
          queue.push(chessboard[col - 1][row - 2]);
          continue;
        }
      }
    }
  }
}
function displayKnightsPath(start, end) {
  let shortestPath = [];
  let current = end;
  while (JSON.stringify(current.data) !== JSON.stringify(start.data)) {
    shortestPath.push(current.data);
    current = current.previous;
  }
  shortestPath.push(start.data);
  shortestPath.reverse().forEach((element) => {
    console.log(element);
  });
}
knightsTravails([0, 0], [7, 7]);
