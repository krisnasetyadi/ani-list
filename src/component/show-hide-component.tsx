  import React from 'react';
  import RightSideBar from './right-sidebar-component';
  import Checkbox from './checkbox-component'; // Import the CheckboxComponentProps interface
  interface CheckboxComponentProps {
    disable?: boolean; 
    indeterminate?: boolean | undefined;
  }
  interface ShowHideComponentProps {
    visible: boolean;
    onClose: () => void;
    columns: any[];
    getToggleHideAllColumnsProps: () => CheckboxComponentProps;
  }

  function ShowHide(props: ShowHideComponentProps) {
    const { visible, onClose, columns, getToggleHideAllColumnsProps } = props;

    return (
      <RightSideBar isOpen={visible} onClose={onClose}>
        <div className="pl-3 pt-3">
          <div>
            <div className="place-content-center py-1">
              <Checkbox {...(getToggleHideAllColumnsProps())} />{' '}
              <label className="uppercase" style={{ userSelect: 'none', paddingBottom: '2px' }}>
                <strong>Select All</strong>
              </label>
            </div>
            {columns.map((column: any, idx: number) => {
              return (
                <div key={idx} className="mt-1.5">
                  <span>
                    <Checkbox
                      {...column.getToggleHiddenProps()}
                      type="checkbox"
                      style={{ width: '16px', height: '16px' }}
                      disable={columns.filter((i) => i.isVisible).length === 1 ? column.isVisible : false}
                    />
                    <label className="ml-2 uppercase" style={{ userSelect: 'none', paddingBottom: '2px' }}>
                      {column.Header}
                    </label>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </RightSideBar>
    );
  }

  export default ShowHide;
