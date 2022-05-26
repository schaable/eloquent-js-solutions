var roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  'Marketplace-Farm',
  'Marketplace-Post Office',
  'Marketplace-Shop',
  'Marketplace-Town Hall',
  'Shop-Town Hall',
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map((r) => r.split('-'))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

export var roadGraph = buildGraph(roads);

export var VillageState = class VillageState {
  constructor(robotCurrentLocation, parcels) {
    this.robotCurrentLocation = robotCurrentLocation;
    this.parcels = parcels; // undelivered parcels [{currentLocation: '', deliveryAddress: ''}, ...]
  }

  // moving the robot creates a new VillageState rather than modifying the current state
  move(destination) {
    if (!roadGraph[this.robotCurrentLocation].includes(destination)) {
      return this; // the robot can't move
    } else {
      let parcels = this.parcels
        // move the parcels at the robot's current location to the destination
        .map((p) => {
          if (p.currentLocation != this.robotCurrentLocation) return p;
          return { currentLocation: destination, deliveryAddress: p.deliveryAddress };
        })
        // drop the parcels that have to be delivered at the new location
        .filter((p) => p.currentLocation != p.deliveryAddress);
      return new VillageState(destination, parcels);
    }
  }
};

export function runRobot(state, robot, memory, debug = true) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      debug && console.log(`Done in ${turn} turns`);
      return turn;
    }
    // a robot should return an action containing the next direction and the new memory
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    debug && console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

export function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.robotCurrentLocation]) };
}

VillageState.random = function (parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let deliveryAddress = randomPick(Object.keys(roadGraph));
    let currentLocation;
    do {
      currentLocation = randomPick(Object.keys(roadGraph));
    } while (currentLocation == deliveryAddress);
    parcels.push({ currentLocation, deliveryAddress });
  }
  return new VillageState('Post Office', parcels);
};

// route that passes through all places in the village
var mailRoute = [
  "Alice's House",
  'Cabin',
  "Alice's House",
  "Bob's House",
  'Town Hall',
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  'Shop',
  "Grete's House",
  'Farm',
  'Marketplace',
  'Post Office',
];

// this robot goes through a predefined route that connects all places ()
export function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}

export function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      // if we find a route, return it
      // the route taken is constructed by appending the new place to the current route
      if (place == to) return route.concat(place);
      // if the place is not yet explored, add it to the work list
      if (!work.some((w) => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

export function goalOrientedRobot({ robotCurrentLocation, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.currentLocation != robotCurrentLocation) {
      // if the parcel is elsewhere, we find a route to pick it up
      route = findRoute(roadGraph, robotCurrentLocation, parcel.currentLocation);
    } else {
      // if the parcel is in the same place as the robot, we find a route to deliver it
      route = findRoute(roadGraph, robotCurrentLocation, parcel.deliveryAddress);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}
