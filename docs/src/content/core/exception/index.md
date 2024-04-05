# {{ NgDocPage.title }}

In Angularity, JavaScript runtime errors are divided into two categories: Errors and Exceptions.

- Exceptions are instances of the `Exception` class, and are intentionally produced and are expected to be caught and appropriately handled.
- Errors are all the errors that are not instances of `Exception`, and are considered as critical errors that should never happen and typically breaks the application, such as `TypeError`. The occurrence of such an error implies something is wrong within the application that awaits fixes.

To create a type of exception, declare a class that extends from the `Exception` class.

```ts
class EntityNotFoundException extends Exception {}
```

Additional customizations can apply to add contextual properties or generate uniformed error messages:

```ts
class EntityNotFoundException extends Exception {
  constructor(
    readonly type: Type<any>,
    readonly id: string,
  ) {
    super(`${type.name} of id ${id} is not found.`);
  }
}
```

It is worthy to note that both Exceptions and Errors are instances of `Error`. The way to distinguish them is `instanceof Exception` instead of `instanceof Error`.

```ts
catch (e) {
  const isException = e instanceof Exception;
  const isError = !(e instanceof Exception);
}
```

A recommended way to compose the catch block is to exhaust all the exceptions that are expected to be caught and re-throw the error if none of the exceptions are matched:

```ts
catch (e) {
  if (e instanceof SomeException) {
    doSomething();
  } else if (e instanceof AnotherException) {
    doSomething();
  } else {
    throw e
  }
}
```

All Angularity libraries follow this convention for producing errors, and it is recommended to also follow such convention in applications that uses Angularity.
