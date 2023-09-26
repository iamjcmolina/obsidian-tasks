import { TaskGroups } from './TaskGroups';
import type { TaskGroup } from './TaskGroup';

export class QueryResult {
    public readonly taskGroups: TaskGroups;
    public readonly totalTasksCountBeforeLimit: number = 0;

    private _searchErrorMessage: string | undefined = undefined;

    constructor(groups: TaskGroups, totalTasksCountBeforeLimit: number) {
        this.taskGroups = groups;
        this.totalTasksCountBeforeLimit = totalTasksCountBeforeLimit;
    }

    public get searchErrorMessage(): string | undefined {
        return this._searchErrorMessage;
    }

    private set searchErrorMessage(value: string | undefined) {
        this._searchErrorMessage = value;
    }

    public get totalTasksCount(): number {
        return this.taskGroups.totalTasksCount();
    }

    public totalTasksCountDisplayText() {
        const tasksCount = this.totalTasksCount;
        const tasksCountBeforeLimit = this.totalTasksCountBeforeLimit;
        if (tasksCount === tasksCountBeforeLimit) {
            const pluralised = `task${tasksCount !== 1 ? 's' : ''}`;
            return `${tasksCount} ${pluralised}`;
        } else {
            return `${tasksCount} of ${tasksCountBeforeLimit} task${tasksCountBeforeLimit !== 1 ? 's' : ''}`;
        }
    }

    public get groups(): TaskGroup[] {
        return this.taskGroups.groups;
    }

    static fromError(message: string): QueryResult {
        const result = new QueryResult(new TaskGroups([], []), 0);
        result._searchErrorMessage = message;
        return result;
    }
}
