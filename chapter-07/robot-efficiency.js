import { roadGraph, findRoute, goalOrientedRobot } from './robot.js';
import { compareRobots } from './compare-robots.js';

// Pick up first, then deliver
// Always move to the shortest route first
function pickFirstDeliverLaterRobot({ robotCurrentLocation, parcels }, route) {
  if (route.length == 0) {
    const parcelsToPickUp = parcels.filter((p) => p.currentLocation != robotCurrentLocation);
    const parcelsToMap = parcelsToPickUp.length > 0 ? parcelsToPickUp : parcels;
    const routes = parcelsToMap.map(({ currentLocation, deliveryAddress }) => {
      const location = currentLocation !== robotCurrentLocation ? currentLocation : deliveryAddress;
      return findRoute(roadGraph, robotCurrentLocation, location);
    });
    route = routes.reduce(
      (shortestRoute, route) => (route.length < shortestRoute.length ? route : shortestRoute),
      routes[0]
    );
  }

  return { direction: route[0], memory: route.slice(1) };
}

compareRobots(goalOrientedRobot, [], pickFirstDeliverLaterRobot, []);
