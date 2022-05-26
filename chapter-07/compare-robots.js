import { routeRobot, goalOrientedRobot, runRobot, VillageState } from './robot.js';

function compareRobots(robot1, memory1, robot2, memory2) {
  let steps1 = 0;
  let steps2 = 0;
  for (let i = 0; i < 100; i += 1) {
    const state = VillageState.random();
    steps1 += runRobot(state, robot1, memory1, false);
    steps2 += runRobot(state, robot2, memory2, false);
  }

  console.log(`${robot1.name} took an average of ${steps1 / 100} turns per task`);
  console.log(`${robot2.name} took an average of ${steps2 / 100} turns per task`);
}

compareRobots(routeRobot, [], goalOrientedRobot, []);
