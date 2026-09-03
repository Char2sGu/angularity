<!-- Generated from the package README by scripts/generate-docs.mjs. Do not edit. -->

Models everything in your application as globally accessible commands and events, enabling a fully event-driven architecture that is reactive, declarative, decoupled, and type-safe.

This package consists of multiple entry points:

- `@angularity/command-flow` — foundation artifacts.
- `@angularity/command-flow/process-flow` — abstraction for modeling async processes.
- `@angularity/command-flow/query-flow` — abstraction for modeling reactive data queries.
- `@angularity/command-flow/debugger` — debugger for tracing commands and events.

```sh
npm i @angularity/{core,command-flow}
```

### `@angularity/command-flow`

Foundation:

- `Command`
  {{ JSDoc.description("packages/command-flow/src/index.ts#Command") }}
- `CommandEvent`
  {{ JSDoc.description("packages/command-flow/src/index.ts#CommandEvent") }}
- `CommandBus`
  {{ JSDoc.description("packages/command-flow/src/index.ts#CommandBus") }}
- `CommandEventBus`
  {{ JSDoc.description("packages/command-flow/src/index.ts#CommandEventBus") }}

Factories:

- `createCommandType`
  {{ JSDoc.description("packages/command-flow/src/index.ts#createCommandType") }}
- `createCommandEventType`
  {{ JSDoc.description("packages/command-flow/src/index.ts#createCommandEventType") }}

Handlers:

- `onCommand`
  {{ JSDoc.description("packages/command-flow/src/index.ts#onCommand") }}
- `onEvent`
  {{ JSDoc.description("packages/command-flow/src/index.ts#onEvent") }}

Facade:

- `useCommand`
  {{ JSDoc.description("packages/command-flow/src/index.ts#useCommand") }}

Flow:

- `Flow`
  {{ JSDoc.description("packages/command-flow/src/index.ts#Flow") }}
- `FlowEffect`
  {{ JSDoc.description("packages/command-flow/src/index.ts#FlowEffect") }}
- `createFlow`
  {{ JSDoc.description("packages/command-flow/src/index.ts#createFlow") }}
- `provideFlows`
  {{ JSDoc.description("packages/command-flow/src/index.ts#provideFlows") }}

### `@angularity/command-flow/process-flow`

Foundation:

- `Process`
  {{ JSDoc.description("packages/command-flow/process-flow/src/index.ts#Process") }}
- `ProcessStarted`
  {{ JSDoc.description("packages/command-flow/process-flow/src/index.ts#ProcessStarted") }}
- `ProcessCompleted`
  {{ JSDoc.description("packages/command-flow/process-flow/src/index.ts#ProcessCompleted") }}
- `ProcessFailed`
  {{ JSDoc.description("packages/command-flow/process-flow/src/index.ts#ProcessFailed") }}

Factories:

- `createProcessType`
  {{ JSDoc.description("packages/command-flow/process-flow/src/index.ts#createProcessType") }}
- `createProcessTypeWithEvents`
  {{ JSDoc.description("packages/command-flow/process-flow/src/index.ts#createProcessTypeWithEvents") }}

Handlers:

- `onProcess`
  {{ JSDoc.description("packages/command-flow/process-flow/src/index.ts#onProcess") }}

Facade:

- `useProcess`
  {{ JSDoc.description("packages/command-flow/process-flow/src/index.ts#useProcess") }}
- `useProcessPending`
  {{ JSDoc.description("packages/command-flow/process-flow/src/index.ts#useProcessPending") }}
- `useProcessError`
  {{ JSDoc.description("packages/command-flow/process-flow/src/index.ts#useProcessError") }}

### `@angularity/command-flow/query-flow`

Foundation:

- `Query`
  {{ JSDoc.description("packages/command-flow/query-flow/src/index.ts#Query") }}
- `QueryActivated`
  {{ JSDoc.description("packages/command-flow/query-flow/src/index.ts#QueryActivated") }}
- `QueryResolved`
  {{ JSDoc.description("packages/command-flow/query-flow/src/index.ts#QueryResolved") }}
- `QueryErrored`
  {{ JSDoc.description("packages/command-flow/query-flow/src/index.ts#QueryErrored") }}
- `QueryInactivated`
  {{ JSDoc.description("packages/command-flow/query-flow/src/index.ts#QueryInactivated") }}
- `DisposeQuery`
  {{ JSDoc.description("packages/command-flow/query-flow/src/index.ts#DisposeQuery") }}

Factories:

- `createQueryType`
  {{ JSDoc.description("packages/command-flow/query-flow/src/index.ts#createQueryType") }}
- `createQueryTypeWithEvents`
  {{ JSDoc.description("packages/command-flow/query-flow/src/index.ts#createQueryTypeWithEvents") }}

Handlers:

- `onQuery`
  {{ JSDoc.description("packages/command-flow/query-flow/src/index.ts#onQuery") }}

Facade:

- `useQuery`
  {{ JSDoc.description("packages/command-flow/query-flow/src/index.ts#useQuery") }}
- `useQueryLoading`
  {{ JSDoc.description("packages/command-flow/query-flow/src/index.ts#useQueryLoading") }}

### `@angularity/command-flow/debugger`

- `provideCommandFlowDebugger`
  {{ JSDoc.description("packages/command-flow/debugger/src/index.ts#provideCommandFlowDebugger") }}
- `COMMAND_ID_GENERATOR`
  {{ JSDoc.description("packages/command-flow/debugger/src/index.ts#COMMAND_ID_GENERATOR") }}
- `COMMAND_FLOW_DEBUGGER_FILTER`
  {{ JSDoc.description("packages/command-flow/debugger/src/index.ts#COMMAND_FLOW_DEBUGGER_FILTER") }}
