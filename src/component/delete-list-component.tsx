import React, { useMemo } from 'react';
import Moment from 'moment';
interface DeletedListProps {
  datas: any[]; 
  columnsData: any[]; 
}

function DeletedList(props: DeletedListProps) {
  const { datas, columnsData } = props;

  const columns = useMemo(() => datas, []);
  const data = useMemo(() => columnsData, []);

  return (
    <table className="table-auto w-full">
      <thead className=" bg-thead">
        <tr>
          {data.map((col, idx) => {
            return (
              <th key={idx} className="uppercase text-sm px-5 py-1.5">
                {col.Header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className={`${columns.length > 5 ? 'overflow-y-scroll' : 'overflow-y-hidden'}`}>
        {columns.map((col, columnindx) => (
          <tr key={columnindx}>
            {col.cells.map((cell: any, idx: number) => (
              <td
                key={idx}
                className={`text-base pl-5 border-b hover:bg-slate-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} `}
              >
                {typeof cell.value === 'number'
                  ? cell.value
                  : Moment(cell.value, Moment.ISO_8601, true).isValid()
                  ? Moment(cell.value).format('DD MMM YYYY')
                  : cell.value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DeletedList;
