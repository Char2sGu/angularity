# @angularity/command-flow

Models everything in your application as globally accessible commands and events, enabling a fully event-driven architecture that is reactive, declarative, decoupled, and type-safe.

This package consists of multiple entry points:

- `@angularity/command-flow` — foundation artifacts.
- `@angularity/command-flow/process-flow` — abstraction for modeling async processes.
- `@angularity/command-flow/query-flow` — abstraction for modeling reactive data queries.
- `@angularity/command-flow/debugger` — debugger for tracing commands and events.

```sh
npm i @angularity/{core,command-flow}
```

## API

### `@angularity/command-flow`

Foundation:

- `Command`
- `CommandEvent`
- `CommandBus`
- `CommandEventBus`

Factories:

- `createCommandType`
- `createCommandEventType`

Handlers:

- `onCommand`
- `onEvent`

Facade:

- `useCommand`

Flow:

- `Flow`
- `FlowEffect`
- `createFlow`
- `provideFlows`

### `@angularity/command-flow/process-flow`

Foundation:

- `Process`
- `ProcessStarted`
- `ProcessCompleted`
- `ProcessFailed`

Factories:

- `createProcessType`
- `createProcessTypeWithEvents`

Handlers:

- `onProcess`

Facade:

- `useProcess`
- `useProcessPending`
- `useProcessError`

### `@angularity/command-flow/query-flow`

Foundation:

- `Query`
- `QueryActivated`
- `QueryResolved`
- `QueryErrored`
- `QueryInactivated`
- `DisposeQuery`

Factories:

- `createQueryType`
- `createQueryTypeWithEvents`

Handlers:

- `onQuery`

Facade:

- `useQuery`
- `useQueryLoading`

### `@angularity/command-flow/debugger`

- `provideCommandFlowDebugger`
- `COMMAND_ID_GENERATOR`
- `COMMAND_FLOW_DEBUGGER_FILTER`
