import { useEffect, useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons';
import { convertDateNumberToString } from '@/helpers/EventsDateConverter';

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

}));

interface RowData {
  name: string;
  location: string;
  endTime: string;
  startTime: string;
}

interface TableSortProps {
  events: RowData[];
  totalEvents: RowData[]
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="left" ml="sm">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center >
            <Icon size="0.8rem" stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th >
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();

  return data.filter((item) =>
    // check if typeof item[key] === 'string' and then use toLowerCase()

    keys(item).some((key) => {
      if (typeof item[key] === 'string') {
        return item[key].toLowerCase().includes(query);
      }
    })

  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {

      if (typeof a[sortBy] === 'number') {

        if (payload.reversed) {
          // @ts-ignore
          return b[sortBy] - a[sortBy];
        }

        // @ts-ignore
        return a[sortBy] - b[sortBy];

      }


      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}


export function EventTable({ events, totalEvents }: TableSortProps) {


  const [data, setData] = useState(events);
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(events);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);


  useEffect(() => {

    setData(events)
    setSortedData(events)

  }, [events])

  useEffect(() => {

    if (search.length == 0) {
      setData(events)
      setSortedData(data)

    }

  }, [search])

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    const sortedData = sortData(totalEvents, { sortBy, reversed: reverseSortDirection, search: value }).slice(0, 9);
    setSortedData(sortedData);

  };

  const rows = sortedData.map((row) => (
    <tr key={row.name + row.startTime}>
      <td>{row.name}</td>
      <td>{row.location}</td>
      <td>{convertDateNumberToString(row.startTime)}</td>
      <td>{convertDateNumberToString(row.endTime)}</td>
    </tr>
  ));

  return (
    <ScrollArea p={"xl"}>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table p="xl" horizontalSpacing="md" verticalSpacing="xs" miw={700} sx={{ tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <Th
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Event Name
            </Th>
            <Th
              sorted={sortBy === 'location'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('location')}
            >
              Location
            </Th>
            <Th
              sorted={sortBy === 'startTime'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('startTime')}
            >
              Start Date
            </Th>
            <Th
              sorted={sortBy === 'endTime'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('endTime')}
            >
              End Date
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr style={{ padding: 40 }}>
              {/* <td colSpan={Object.keys(data[0]).length ?? 4}> */}
              <Text weight={500} align="center">
                Nothing found
              </Text>
              {/* </td> */}
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
