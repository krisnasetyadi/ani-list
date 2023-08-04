import {
  UseColumnOrderInstanceProps,
  UseExpandedHooks,
  UseExpandedInstanceProps,
  UseExpandedOptions,
  UseRowSelectHooks,
  UseRowSelectInstanceProps,
  UseRowSelectOptions,
  UseSortByHooks,
  UseSortByInstanceProps,
  UseSortByOptions,
} from 'react-table';

declare module 'react-table' {
  export interface TableOptions<D extends Record<string, unknown>>
    extends UseExpandedOptions<D>,
            UseRowSelectOptions<D>,
            UseSortByOptions<D> {}

  export interface Hooks<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseExpandedHooks<D>,
            UseRowSelectHooks<D>, 
            UseSortByHooks<D> {}

  export interface TableInstance<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseColumnOrderInstanceProps<D>,
            UseExpandedInstanceProps<D>,
            UseRowSelectInstanceProps<D>,
            UseSortByInstanceProps<D> {}
}
