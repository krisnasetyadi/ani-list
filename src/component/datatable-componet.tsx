import React, { useEffect, useState , ThHTMLAttributes  } from 'react';

// import XLSX from 'xlsx';
import Moment from 'moment';
import Swal from 'sweetalert2';
// import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { observer } from 'mobx-react-lite';
import { Button, Skeleton, Stack, Fade } from '@chakra-ui/react';
import { useTable, useRowSelect, usePagination, useSortBy, Column} from 'react-table';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { ArrowSmUpIcon, ArrowSmDownIcon } from '@heroicons/react/outline';
// import Input from './input-component';
// import Select from './select-component';
import Checkbox from './checkbox-component';
// import TableComponent from './table-component';
// import DatePicker from './datepicker-component';
import Toolbar from './action-toolbar-component';
import LoadingHover from './loading-hover-component';
import { calculateText, hasProperty } from '../utils/helper';
import { useQuery } from '@apollo/client';
import { jsx, css, Global, ClassNames } from '@emotion/react'
import {
  ButtonNavTable, ButtonNavTable2, ButtonPage, HiddenSpan, 
  NavContainer, SpanBold, SpanText, Table, Td, Thead, 
  Tr, Ul, TableContainer } from '../constant/component-styles/datatable-component-style';
import { ButtonSm } from '../constant/component-styles/components';
import { VariablesProps } from '../screens/list-screen';

interface ActionProps {
  action: {
    [key: string]: boolean | undefined;
    add?: boolean;
    edit?: boolean;
    delete?: boolean;
    'copy-to-clipboard'?: boolean;
    'show-hide-column'?: boolean;
    'save-to-excel'?: boolean;
  };
}
interface DatatableComponentProps {
  columns?: any[];
  limit?: number;
  toolbar?: ActionProps;
  to?: string ;
  api?: Promise<any> ;
  checkbox?: boolean;
  displayName?: string ;
  name?: string ;
  filters?: any[]  ;
  identifierProperties ?: string ;
  query?: any | any[];
  dataaa: any | any[];
  total: number;
  setVariables: React.Dispatch<React.SetStateAction<VariablesProps>>
}

interface LinkProps {
  pathname: string;
  state?: {
    anime_type: string;
  };
}

interface CellProps {
  row: any,
  value: any
}

function DataTable(props: DatatableComponentProps) {
  const {
    columns: propsColumn = [],
    limit = 10,
    toolbar,
    to,
    api,
    checkbox,
    displayName,
    name,
    filters,
    identifierProperties = 'id',
    query,
    dataaa,
    total,
    setVariables
  } = props;
  
console.log('dataaa', propsColumn.length)

  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [pages, setPages] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [datas, setDatas] = useState([]);
  const [totalData, setTotalData] = useState(50);
  const [autoWidth, setAutoWidth] = useState(0);
  const [columnId, setColumnId] = useState<string>('');
  const [loadingHover, setLoadingHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [isDesc, setIsDesc] = useState(false);

  const [defaultSort, setDefaulSort] = useState({
    sort_by: 'id',
    sort_order: 'desc',
  });

  const [filter, setFilter] = useState<any[]>([]);

  useEffect(() => {
    setLastPage(Math.ceil(total / 10));
  }, [total, limit]);

  console.log('lastPage', lastPage)
  const data = React.useMemo(() => dataaa ? dataaa : [], [JSON.stringify(dataaa)]);
  console.log('propsColumn', propsColumn)
  const columns = React.useMemo(
    () =>
      propsColumn.map(d => {
        console.log('dddd', d)
        return {
          Header: d.header,
          accessor: d.value,
          width: d.width,
          Cell: (props : CellProps) => {
            const { value, row } = props;
            console.log('propsss', props)
            if (d.type === 'date') {
              return Moment(value).format('DD MMM YYYY');
            }
            if (d.type === 'link' && to) {
              const link:LinkProps  = {
                pathname: `/${to}/${row.original[identifierProperties]}/show`,
                state: {
                  anime_type: 'Your anime type',
                },
              };
              return (
                <Link
                  type="button"
                  style={{color: 'blue'}}
                  to={link}
                >
                  {value}
                </Link>
              );
            }
            if (d.width === 'auto') {
              setAutoWidth(calculateText(value)[0] / 1.5);

              return calculateText(value)[1];
            }
            if (d.type === 'multi-value') {
              return <td>{`${value} - ${row.original[d.obj][d.secondValue]}`}</td>;
            }

            return value;
          },
        };
      }),
    [JSON.stringify(propsColumn), to]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    getToggleHideAllColumnsProps,
    allColumns,
  } = useTable({ columns, data }, useSortBy, usePagination, useRowSelect, hooks => {
    if (checkbox) {
      hooks.visibleColumns.push(column => {
        return [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }: any) => {
              return (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            )},
          },
          ...column,
        ];
      });
    }
  });

  useEffect(() => {
    if (Array.isArray(filters)) {
      setFilter([...filters]);
    }
  }, [filters]);

  const changePage = (page: any) => {
    setPages(page);
    setVariables((prev: any) => ({ ...prev, page }));
  };

  const isActionToolbarExclude = (action: string) => {
    let force = false;
    let exclude = false;
    if (toolbar) {
      if (hasProperty(toolbar, 'action')) {
        force = true;
        if (
          !hasProperty(toolbar.action, action) ||
          (hasProperty(toolbar.action, action) && toolbar.action[action] === false)
        ) {
          exclude = true;
        } else {
          exclude = false;
        }
      }
    }
    return [force, exclude];
  };
  const checkPermissionAction = (action: string): string | undefined => {
    let act;
    switch (action) {
      case 'view':
        act = 'view';
        break;
      case 'delete':
        act = 'delete';
        break;
      case 'save-to-excel':
        act = 'SaveDataToExcel';
        break;
      case 'copy-to-clipboard':
        act = 'CopyToClipboard';
        break;
      case 'show-hide-column':
        act = 'ShowHideColumn';
        break;
      default:
        break;
    }
    return act;
  };

  const enableAction = (action: string): string | boolean | undefined | void => {
    const actions = {
      add: 'add',
      view: 'view',
      edit: 'edit',
      delete: 'delete',
      'save-to-excel': 'download',
      'show-hide-column': 'showHideColumn',
      'copy-to-clipboard': 'copyClipboard',
    };
    if (Object.keys(actions).includes(action)) {
      const [force, status] = isActionToolbarExclude(action);
      if (!force) {
        return checkPermissionAction(action);
      }
      return !status;
    }
    return false;
  };
  const renderToolbar = () => {
    if (toolbar) {
      return (
        enableAction('view') ||
        enableAction('save-to-excel') ||
        enableAction('copy-to-clipboard') ||
        enableAction('edit') ||
        enableAction('delete') ||
        enableAction('add') ||
        enableAction('show-hide-column')
      );
    }
    return false;
  };

  const deleteData = () => {
    // Promise.allSettled(
    //   selectedFlatRows.map(d => {
    //     return new Promise((resolve, reject) => {
    //       api
    //         .delete(d.original[identifierProperties])
    //         .then(r => resolve(r))
    //         .catch(e => reject(e));
    //     });
    //   })
    // )
    //   .then(res => {
    //     const success = [];
    //     const failed = [];
    //     res.forEach(result => {
    //       if (result.status === 'fulfilled') {
    //         success.push(true);
    //         setLoadingHover(false);
    //       } else {
    //         result.reason.data.error.api.map(m => failed.push(m));
    //         failed.push(true);
    //         setLoadingHover(false);
    //       }
    //     });

    //     if (failed.length > 0) {
    //       Swal.fire({ text: 'There is some problem occured', icon: 'error' });
    //     } else {
    //       Swal.fire({ text: 'Data Deleted Successfully', icon: 'success' });
    //     }
    //     setVariables(prev => ({
    //       ...prev,
    //       offset: 0,
    //     }));
    //   })
    //   .catch(error => {
    //     Swal.fire({ text: error?.message || 'Something Went Wrong', icon: 'error' });
    //   });
  };

  const download = (): void => {
    // setLoadingHover(true);
    // const wb = XLSX.utils.table_to_book(document.getElementById('mytable'), {
    //   sheet: `${displayName}`,
    // });
    // const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
    // function s2ab(data) {
    //   const buf = new ArrayBuffer(data.length);
    //   const view = new Uint8Array(buf);
    //   // eslint-disable-next-line no-bitwise, no-plusplus
    //   for (let i = 0; i < data.length; i++) view[i] = data.charCodeAt(i) & 0xff;
    //   return buf;
    // }
    // setTimeout(() => {
    //   setLoadingHover(false);
    // }, 500);
    // return saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), `${displayName}.xlsx`);
  };

  const onReset = () => {
    // reset();
    setIsSort(false);
    setIsDesc(false);
    setVariables({
      perPage: 10,
      page: 1,
      offset: 0,
      sort_by: 'id',
      sort_order: 'desc',
    });
  };
  const onSubmit = (data: any) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const dt in data) {
      if (Object.hasOwnProperty.call(data, dt)) {
        if (!data[dt]) {
          delete data[dt];
        }
        if (data[dt] === '') {
          setVariables({
            perPage: 10,
            page: 1,
            offset: 0,
            ...defaultSort,
          });
          delete data[dt];
        }
        if (data[dt] instanceof Date) {
          if (dt.toLowerCase().includes('to')) {
            data[dt] = Moment(data[dt]).endOf('day').format('YYYY-MM-DD');
          } else {
            data[dt] = Moment(data[dt]).startOf('day').format('YYYY-MM-DD');
          }
        } else {
          // eslint-disable-next-line no-unused-expressions
          data[dt];
        }
      }
    }
    setVariables({
      perPage: 10,
      offset: 0,
      ...data,
    });
  };

  const onSortChange = (column: any) => {
    setColumnId(column.id);
    if (isSort) {
      setIsDesc(!isDesc);

      setDefaulSort({
        sort_by: column.id ? column.id.toLowerCase() : 'id',
        sort_order: isDesc ? 'desc' : 'asc',
      });
    }
  };
  const onChangeHeader = () => {
    if (isSort && isDesc) {
      return isDesc ? 'desc' : 'asc';
    }
    return '';
  };

   {/* {download() && (
        <div style={{ display: 'none' }}> */}
          {/* <TableComponent
            id="mytable"
            data={data}
            columns={allColumns.filter(i => i.id !== 'selection' && i.isVisible === true)}
            keys={data.filter(i => i[columns.map(i => i.accessor)])}
            header={propsColumn.filter(i => i.value)}
          /> */}
        {/* </div>
      )} */}

  return (
    <div>
      {filter && filter.length !== 0 && (
        <div>
          <div className="flex">
            <h1 className="font-bold text-xl">{displayName}</h1>
          </div>
          <div>
            <form>
              <div className="px-4">
                <div className="grid grid-cols-6 gap-4 mt-4">
                  {filter.map((item, idx) => {
                    // if (item.type === 'date_picker') {
                    //   return (
                    //     <div className={item.col ? `col-span-${item.col}` : ''} key={`component${idx}`}>
                    //       <DatePicker
                    //         name={item.name}
                    //         label={item.label}
                    //         placeholder={item.placeholder}
                    //         register={register}
                    //         control={control}
                    //         errors={errors}
                    //       />
                    //     </div>
                    //   );
                    // }
                    // if (item.type === 'select') {
                    //   return (
                    //     <div className={item.col ? `col-span-${item.col}` : ''} key={`component${idx}`}>
                    //       <Select
                    //         name={item.name}
                    //         label={item.label}
                    //         placeholder={item.label}
                    //         options={item.data}
                    //         register={register}
                    //         control={control}
                    //         errors={errors}
                    //         disabled={item.disabled}
                    //       />
                    //     </div>
                    //   );
                      // eslint-disable-next-line no-else-return
                    // } else {
                    //   return (
                        // <div className={item.col ? `col-span-${item.col}` : ''} key={`component${idx}`}>
                        //   <Input
                        //     name={item.name}
                        //     label={item.label}
                        //     maxLength={item.max}
                        //     register={register}
                        //     control={control}
                        //   />
                        // </div>
                      // );
                    // }
                  })}
                </div>
              </div>
              <div className="col-md-3 offset-md-9 px-0">
                <div className="flex justify-end mt-3 px-4 py-3">
                  <Button
                    _hover={{
                      shadow: 'md',
                      transform: 'translateY(-5px)',
                      transitionDuration: '0.2s',
                      transitionTimingFunction: 'ease-in-out',
                    }}
                    type="button"
                    size="sm"
                    px={8}
                    className="rounded-full border border-primarydeepo bg-[#fff] hover:bg-[#E4E4E4] text-[#184D47] font-bold"
                    onClick={() => onReset()}
                  >
                    Reset
                  </Button>
                  <Button
                    _hover={{
                      shadow: 'md',
                      transform: 'translateY(-5px)',
                      transitionDuration: '0.2s',
                      transitionTimingFunction: 'ease-in-out',
                    }}
                    type="submit"
                    size="sm"
                    px={8}
                    className="ml-4 rounded-full bg-primarydeepo drop-shadow-md text-[#fff] hover:text-[#E4E4E4] font-bold"
                    onClick={(onSubmit)}
                  >
                    Filter
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {renderToolbar() && filter.length !== 0 && (
        <Toolbar
          selectedData={selectedFlatRows}
          defaultShow={propsColumn}
          getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
          columns={allColumns}
          navTo={{ path: to, id: (selectedFlatRows?.find(i => i)?.original as { id: string })?.id }}
          displayName={displayName}
          name={name}
          // onAdd={enableAction('add')}
          // onEdit={enableAction('edit')}
          // copyItem={allColumns.filter(i => i.id !== 'selection' && i.isVisible === true)}
          // copyClipboard={enableAction('copy-to-clipboard')}
          // view={enableAction('view')}
          // onDelete={enableAction('delete') && deleteData}
          // onDownload={enableAction('save-to-excel') && download}
          // onShowHideColumn={enableAction('show-hide-column')}
        />
      )}
      {loadingHover && <LoadingHover text="Please Wait..." />}
        
        <TableContainer>
          <div
            className={`${
              !loading && data.length <= 0 ? 'overflow-hide' : 'overflow-x-auto'
            } w-full bg-white no-scrollbar::-webkit-scrollbar no-scrollbar`}
          >
            <div className="scrollbar-x-auto">
              <Table {...getTableProps()}>
                <Thead>
                {/* key={idxgroup} */}
                  {headerGroups.map((headerGroup, idxgroup) => (
                    <tr  {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column, columnidx) => (
                        <th
                          {...column.getHeaderProps()}
                          className={`${column.id === 'selection' ? 'px-6 w-20' : 'px-3'} py-3`}
                          // width={column.width === 'auto' ? autoWidth : ''}
                        >
                          <div
                            // className="flex"
                            onClick={() => {
                              if (column.id !== 'selection') {
                                setIsSort(true);
                                onSortChange(column);
                              }
                            }}
                          >
                            <div style={column.id !== 'selection' ? {textAlign: 'center'} : {}}>{column.render('Header')}</div>
                            <div style={{margin: 'auto'}}>
                              {isSort && column.id === columnId && column.id !== 'selection' ? (
                                onChangeHeader() === 'desc' && isDesc ? (
                                  <ArrowSmUpIcon className="ml-2 h-4 stroke-[#eb6058]" />
                                ) : (
                                  <ArrowSmDownIcon className="ml-2 h-4 stroke-[#eb6058]" />
                                )
                              ) : (
                                ''
                              )}
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </Thead>

                {data.length > 0 ? (
                  <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                      prepareRow(row);
                      return (
                        <Tr
                          isEven={ i % 2 === 0}
                          {...row.getRowProps()}>
                          {row.cells.map((cell, idx) => (
                            <Td
                              isSelection={cell.column.id === 'selection' ? true : false}
                              {...cell.getCellProps()}
                            >
                              {cell.render('Cell')}
                            </Td>
                          ))}
                        </Tr>
                      );
                    })}
                  </tbody>
                ): (
                  <tbody>
                     <tr>
                      <td colSpan={checkbox ? columns.length + 1 : columns.length} style={{ textAlign: 'center' }}>no content available</td>
                    </tr>
                  </tbody>
                ) }
              </Table>

              {loading && (
                <Stack>
                  <div className="flex p-3 gap-2">
                    <Skeleton height="20px" width="5%" />
                    <Skeleton height="20px" width="95%" />
                  </div>
                  <div className="flex p-3 gap-2">
                    <Skeleton height="20px" width="5%" />
                    <Skeleton height="20px" width="95%" />
                  </div>
                  <div className="flex p-3 gap-2">
                    <Skeleton height="20px" width="5%" />
                    <Skeleton height="20px" width="95%" />
                  </div>
                  <div className="flex p-3 gap-2">
                    <Skeleton height="20px" width="5%" />
                    <Skeleton height="20px" width="95%" />
                  </div>
                </Stack>
              )}
            </div>
          </div>

          <NavContainer aria-label="Table navigation">
            <SpanText>
              {totalData <= 0 ? null : (
                <>
                  Showing <SpanBold>{`${limit * (pages - 1) + 1} - `}</SpanBold>
                  <SpanBold>
                    {pages * limit > totalData ? totalData : pages * limit}
                  </SpanBold>{' '}
                  of <SpanBold>{totalData}</SpanBold>
                </>
              )}
            </SpanText>
            <Ul>
              <li>
                <ButtonSm
                  type="button"
                  disabled={pages === 1}
                  onClick={() => (pages === 1 ? {} : changePage(pages - 1))}
                >
                  <HiddenSpan>Previous</HiddenSpan>
                  <ChevronLeftIcon style={{width: '5px', height: '5px'}}/>
                </ButtonSm>
              </li>
              {lastPage > 7 && pages >= 4 && (
                <>
                  <li>
                    <ButtonNavTable
                      type="button"
                      onClick={() => changePage(1)}
                    >
                      1
                    </ButtonNavTable>
                  </li>
                  <li>
                    <ButtonNavTable
                      type="button"
                    >
                      ...
                    </ButtonNavTable>
                  </li>
                </>
              )}
              {Array(
                lastPage > 7 && lastPage - pages < 3 ? 5 : lastPage > 7 && pages >= 4 ? 3 : lastPage > 7 ? 5 : lastPage
              )
                .fill('')
                .map((_, i) => {
                  const p =
                    lastPage > 7 && lastPage - pages < 3 ? lastPage - 4 : lastPage > 7 && pages >= 4 ? pages - 1 : 1;
                  return (
                    <li key={i}>
                      <ButtonNavTable2
                        type="button"
                        disabled={pages === i + p}
                        onClick={() => changePage(i + p)}
                        isDisabled={pages === i + p}
                      >
                        {i + p}
                      </ButtonNavTable2>
                    </li>
                  );
                })}
              {lastPage > 7 && lastPage - pages >= 3 && (
                <>
                  <li>
                    <ButtonPage
                      type="button"
                      className="py-2 px-3 mr-1 ml-0.5 leading-tight text-black rounded-lg bg-gray-100 hover:bg-gray-700 hover:text-white"
                    >
                      ...
                    </ButtonPage>
                  </li>
                  <li>
                    <ButtonPage
                      type="button"
                      onClick={() => changePage(lastPage)}
                      className="py-2 px-3 leading-tight text-black rounded-lg bg-gray-100 hover:bg-gray-700 hover:text-white"
                    >
                      {lastPage}
                    </ButtonPage>
                  </li>
                </>
              )}
              <li>
                <ButtonPage
                  type="button"
                  disabled={pages === lastPage}
                  onClick={() => (pages === lastPage ? {} : changePage(pages + 1))}
                  className="block py-2 px-3 leading-tight text-gray-500 bg-white disabled:text-gray-300 disabled:hover:bg-white hover:bg-gray-100 hover:text-gray-700"
                >
                  <HiddenSpan>Next</HiddenSpan>
                  {totalData <= 0 ? null : <ChevronRightIcon style={{width: '5px', height: '5px'}} />}
                </ButtonPage>
              </li>
            </Ul>
          </NavContainer>
        </TableContainer>
    </div>
  );
}

export default DataTable;
