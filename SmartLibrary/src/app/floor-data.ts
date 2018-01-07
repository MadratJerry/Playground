import { InMemoryDbService } from 'angular-in-memory-web-api';
export class FloorData implements InMemoryDbService {
  createDb() {
    let floor = [
      { name: "L1", id: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
      { name: "L2", id: [1, 2, 3, 4, 5, 6, 7] }
    ]
    return { floor };
  }
}
