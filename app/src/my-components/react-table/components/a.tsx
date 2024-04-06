import { Stack, TextField, TextFieldProps } from '@mui/material';
import { Column, Table } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

export function Filter({ column, table }: { column: Column<any, unknown>; table: Table<any> }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === 'number' ? (
    <Stack justifyContent="center" alignItems="center" flexDirection="row" gap={1}>
      <DebouncedInput
        type="number"
        fullWidth
        InputProps={{
          inputProps: {
            min: Number(column.getFacetedMinMaxValues()?.[0] ?? ''),
            max: Number(column.getFacetedMinMaxValues()?.[1] ?? ''),
          },
        }}
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={(value: any) =>
          column.setFilterValue((old: [number, number]) => [value, old?.[1]])
        }
        placeholder={`Min ${
          column.getFacetedMinMaxValues()?.[0] ? `(${column.getFacetedMinMaxValues()?.[0]})` : ''
        }`}
      />{' '}
      <DebouncedInput
        type="number"
        fullWidth
        InputProps={{
          inputProps: {
            min: Number(column.getFacetedMinMaxValues()?.[0] ?? ''),
            max: Number(column.getFacetedMinMaxValues()?.[1] ?? ''),
          },
        }}
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={(value: any) =>
          column.setFilterValue((old: [number, number]) => [old?.[0], value])
        }
        placeholder={`Max ${
          column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''
        }`}
        className="w-24 border shadow rounded"
      />
    </Stack>
  ) : (
    <DebouncedInput
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={(value: any) => column.setFilterValue(value)}
      placeholder="Search..."
    />
  );
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<TextFieldProps, 'onChange'>) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <TextField
      variant="standard"
      {...props}
      value={value}
      onChange={(e: any) => setValue(e.target.value)}
    />
  );
}
