/* eslint-disable react/jsx-key */
import React from 'react';
import { Box, Button, Flex, Select, Stack, Text, Table, TableContainer, Tbody, Thead, Tr, Th, Td, TableCaption, Skeleton } from '@chakra-ui/react';
import { DataSearch } from '../data-search';
import { Column, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';

import { TbChevronsLeft, TbChevronLeft, TbChevronRight, TbChevronsRight } from 'react-icons/tb';
import { TiArrowUnsorted, TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

interface IDataTable<Data extends object> {
    columns: Column<Data>[];
    data: Data[];
    loading?: boolean;
    searchTitle?: string;
}

export function DataTable<Data extends object>({ columns, data, loading, searchTitle }: IDataTable<Data>) {
    const tableInstance = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        setPageSize,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex, globalFilter, pageSize },
        setGlobalFilter,
    } = tableInstance;

    if(loading) {
        return (
            <Stack>
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
            </Stack>
        );
    }

    return (
        <>
            <DataSearch title={searchTitle} value={globalFilter} setValue={setGlobalFilter} disabled={!(page.length > 0)} />
            <TableContainer backgroundColor={'white'} border={'1px'} borderColor={'primary.100'} borderRadius={'lg'}>
                <Table variant='simple' {...getTableProps()}>
                    {!(page.length > 0) && <TableCaption>No hay datos que mostrar</TableCaption>}
                    <Thead>
                        {// Loop over the header rows
                            headerGroups.map(headerGroup => (
                            // Apply the header row props
                                <Tr {...headerGroup.getHeaderGroupProps()}>
                                    {// Loop over the headers in each row
                                        headerGroup.headers.map(column => (
                                        // Apply the header cell props
                                            <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                <Flex align={'center'}>
                                                    {// Render the header
                                                        column.render('Header')}
                                                    <Box mb={'1'} ml={'2'} color={'primary.200'}>
                                                        {column.disableSortBy ? undefined :
                                                            column.isSorted ?
                                                                column.isSortedDesc
                                                                    ? <TiArrowSortedDown />
                                                                    : <TiArrowSortedUp />
                                                                : <TiArrowUnsorted />
                                                        }
                                                    </Box>
                                                </Flex>
                                            </Th>
                                        ))}
                                </Tr>
                            ))}
                    </Thead>
                    <Tbody {...getTableBodyProps()}>
                        {
                            page.map(row => {
                                prepareRow(row);
                                return (
                                    <Tr {...row.getRowProps()}>
                                        {
                                            row.cells.map(cell => {
                                                // Apply the cell props
                                                return (
                                                    <Td {...cell.getCellProps()}>
                                                        {// Render the cell contents
                                                            cell.render('Cell')}
                                                    </Td>
                                                );
                                            })}
                                    </Tr>
                                );
                            })
                        }
                    </Tbody>
                </Table>
            </TableContainer>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
                <Stack direction={{ base: 'column', sm: 'row' }} align='center' my={'2'} mx={'0.5'}>
                    <Stack
                        spacing={1} direction='row' align='center' mr={'1'}
                        justifyContent={{ base: 'center', sm: 'flex-start' }}
                    >
                        <Button _hover={{ boxShadow: 'none' }}
                            backgroundColor='primary.400' size='sm'
                            onClick={() => gotoPage(0)} disabled={!canPreviousPage}
                        >
                            <TbChevronsLeft color='white' />
                        </Button>
                        <Button _hover={{ boxShadow: 'none' }}
                            backgroundColor='primary.400' size='sm'
                            onClick={() => previousPage()} disabled={!canPreviousPage}
                        >
                            <TbChevronLeft color='white' />
                        </Button>
                        <Button _hover={{ boxShadow: 'none' }}
                            backgroundColor='primary.400' size='sm'
                            onClick={() => nextPage()} disabled={!canNextPage}
                        >
                            <TbChevronRight color='white' />
                        </Button>
                        <Button _hover={{ boxShadow: 'none' }} backgroundColor='primary.400' size='sm' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                            <TbChevronsRight color='white' />
                        </Button>
                    </Stack>
                    <Text color={'primary.400'} display={{base: 'none', sm: 'initial'}} fontSize='sm'>Pág <strong>{pageIndex + 1}</strong> de <strong>{pageOptions.length}</strong></Text>
                </Stack>
                <Flex justifyContent={'center'} alignItems={'center'}>
                    <Text mr={'1'} color={'primary.400'} fontSize='sm'>Mostrar</Text>
                    <Select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}
                        focusBorderColor='primary.400' bg={'white'} variant={'outline'} disabled={pageSize > page.length}
                    >
                        {
                            [10, 25, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>{pageSize}</option>
                            ))
                        }
                    </Select>
                </Flex>
            </Flex>
            <Box display={{base: 'initial', sm: 'none'}}>
                <Text textAlign={'center'} color={'primary.400'} fontSize='sm'>
                Pág <strong>{pageIndex + 1}</strong> de <strong>{pageOptions.length}</strong>
                </Text>
            </Box>
        </>
    );
}
