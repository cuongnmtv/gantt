import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let tasks = [
            { id: 1, text: "Lên kế hoạch", start_date: "2017-04-15 00:00", duration: 3, progress: 0, priority: 2, open: true, users: ["John", "Mike", "Anna"] },
            { id: 2, text: "Triển khai", start_date: "2017-04-18 00:00", duration: 3, progress: 0.4, priority: 1, open: true },
            { id: 3, text: "Thực hiện", start_date: "2017-04-21 00:00", duration: 2, progress: 1, priority: 3, open: true }
        ];
        let links = [
            { id: 1, source: 1, target: 2, type: "0" },
            { id: 2, source: 2, target: 3, type: "0" }
        ];
        return { tasks, links };
    }
}