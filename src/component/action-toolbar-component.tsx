import React, { useState } from 'react';

import Moment from 'moment';
import { useToast, useMediaQuery } from '@chakra-ui/react';
import copy from 'copy-to-clipboard';

import { useNavigate } from 'react-router-dom';
import {
  addIcon,
  editIcon,
  deleteIcon,
  saveExcelIcon,
  copyClipboardIcon,
  showHideTableIcon,
} from '../assets/images/index';
import ShowHide from './show-hide-component';
import DeletedList from './delete-list-component';
import { getNestedObject } from '../utils/helper';
import { ButtonDefault } from '../constant/component-styles/components';
import { ToolbarContainer } from '../constant/component-styles/toolbar-component-styles';

const button = `hover:bg-secondarydeepo hover:outline-none text-black outline outline-offset-0 outline-[#A6A9B6] bg-[#fff] text-xs rounded-xl px-3 hover:text-white ml-3`;
const disableButton =
  'text-black outline outline-offset-0 outline-[#A6A9B6] bg-[#fff] text-sm rounded-xl px-2 text-black ml-3';

  interface ActionToolbarProps {
    onDownload?: () => void| boolean;
    onDelete?: () => void| boolean;
    copyClipboard?: () => void| boolean;
    onShowHideColumn?: () => void| boolean;
    selectedData: any[];
    navTo?: any; 
    name?: string;
    getToggleHideAllColumnsProps?: any; 
    defaultShow?: any[];
    columns?: any[]; 
    copyItem?: any[]; 
    onEdit?: () => void| boolean;
    displayName?: string; 
  }
function ActionToolbar(props: ActionToolbarProps) {
  const {
    onDownload ,
    onDelete,
    copyClipboard,
    onShowHideColumn,
    selectedData,
    navTo,
    getToggleHideAllColumnsProps,
    columns = [],
    copyItem = [],
    onEdit,
    displayName,
  } = props;

  const navigate = useNavigate();
  const [isLarge] = useMediaQuery('(min-width: 1224px)');
  const [onOpen, setOnOpen] = useState(false);
  const [showHide, setShowHide] = useState(false);
  const toast = useToast();

  const onCopy = () => {
    let text = '';
    copyItem.forEach(val => {
      text += `${val.Header}\t`;
    });
    selectedData.forEach(i => {
      text += '\n';
      const props = { ...i.original };
      copyItem.forEach(col => {
        const getValue = getNestedObject(props, col.id.split('.'));

        const getVal =
          typeof getValue === 'number'
            ? getValue
            : Moment(getValue, Moment.ISO_8601, true).isValid()
            ? Moment(getValue).format('DD-MMM-YYYY')
            : getValue;

        text += `${
          getVal
            ? getVal
                .toString()
                .replace(/(?:\r\n|\r|\n)/gm, '')
                .trim()
            : '-'
        }\t`;
      });
    });
    copy(text, {
      format: 'text/plain',
    });
    toast({
      title: 'Copied !',
      status: 'success',
      variant: 'subtle',
      position: 'top',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <ToolbarContainer>
      {onDownload && (
        <ButtonDefault className={button} onClick={onDownload}>
          <div className={`${isLarge ? 'h-3.5 w-3.5 mr-2' : ''} hover:text-red-200 `}>
            <img src={saveExcelIcon} alt="add icon" className={`${isLarge ? '' : 'h-4 pl-1'} mr-2 drop-shadow-md`} />
          </div>
          {isLarge ? 'Save to Excel' : ''}
        </ButtonDefault>
      )}
      {onEdit && (
        <ButtonDefault
          className={`${selectedData.length !== 1 ? disableButton : button}`}
          onClick={() => navigate(`${navTo?.path}/${selectedData?.find(i => i).original.id}/edit`)}
          disabled={selectedData.length !== 1}
        >
          <div className={`${isLarge ? 'h-5 w-5 mr-2' : ''} hover:text-red-200`}>
            <img src={editIcon} alt="add icon" className={`${isLarge ? '' : 'h-4 pl-1'} mr-2 drop-shadow-md`} />
          </div>
          {isLarge ? 'Update' : ''}
        </ButtonDefault>
      )}
      {onDelete && (
        <ButtonDefault
          className={`${selectedData.length === 0 ? disableButton : button}`}
          onClick={() => setOnOpen(!onOpen)}
          disabled={selectedData.length === 0}
        >
          <div className={`${isLarge ? 'h-5 w-5 mr-2' : ''} hover:text-red-200`}>
            <img src={deleteIcon} alt="add icon" className={`${isLarge ? '' : 'h-4 pl-1'} mr-2 drop-shadow-md`} />
          </div>
          {isLarge ? 'Delete' : ''}
        </ButtonDefault>
      )}

      {copyClipboard && (
        <ButtonDefault
          className={`${selectedData.length === 0 ? disableButton : button}`}
          onClick={onCopy}
          disabled={selectedData.length === 0}
        >
          <div className={`${isLarge ? 'h-5 w-5 mr-2' : ''} hover:text-red-200`}>
            <img
              src={copyClipboardIcon}
              alt="add icon"
              className={`${isLarge ? '' : 'h-4 pl-1'} mr-2 drop-shadow-md`}
            />
          </div>
          {isLarge ? 'Copy to Clipboard' : ''}
        </ButtonDefault>
      )}
      {onShowHideColumn && (
        <>
          <ButtonDefault className={button} onClick={() => setShowHide(!showHide)}>
            <div className={`${isLarge ? 'h-5 w-5 mr-2' : ''} hover:text-red-200`}>
              <img
                src={showHideTableIcon}
                alt="add icon"
                className={`${isLarge ? '' : 'h-4 pl-1'} mr-2 drop-shadow-md`}
              />
            </div>
            {isLarge ? 'Show / Hide Column(s)' : ''}
          </ButtonDefault>
          <ShowHide
            getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
            visible={showHide}
            columns={columns.filter(i => i.id !== 'selection')}
            onClose={() => setShowHide(!showHide)}
          />
        </>
      )}
      {onOpen && (
        <div
          className=" main-modal fixed w-full h-200 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="border shadow-lg modal-container bg-white w-[80%] mx-auto rounded-xl z-50 overflow-y-auto py-4 px-2">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className={`${isLarge ? 'text-md' : 'text-sm'} font-bold`}>Are you sure to delete this data ?</p>
                <div className="flex-1" />
                <ButtonDefault
                  // _hover={{
                  //   shadow: 'md',
                  //   transform: 'translateY(-5px)',
                  //   transitionDuration: '0.2s',
                  //   transitionTimingFunction: 'ease-in-out',
                  // }}
                  type="button"
                  // size={`${isLarge ? 'sm' : 'xs'} `}
                  // px={isLarge ? 8 : 4}
                  className={`${
                    isLarge ? '' : 'text-sm'
                  } rounded-full border border-primarydeepo bg-[#fff] hover:bg-[#E4E4E4] text-[#184D47] font-bold`}
                  onClick={() => setOnOpen(!onOpen)}
                >
                  Cancel
                </ButtonDefault>
                <ButtonDefault
                  // _hover={{
                  //   shadow: 'md',
                  //   transform: 'translateY(-5px)',
                  //   transitionDuration: '0.2s',
                  //   transitionTimingFunction: 'ease-in-out',
                  // }}
                  type="submit"
                  // size={`${isLarge ? 'sm' : 'xs'} `}
                  // px={isLarge ? 8 : 4}
                  className={`${
                    isLarge ? '' : 'text-sm'
                  } ml-4 rounded-full bg-[#eb6058] drop-shadow-md text-[#fff] hover:text-[#E4E4E4] hover:bg-[#b74b44] font-bold`}
                  onClick={() => {
                    onDelete && onDelete();
                    setOnOpen(!onOpen);
                  }}
                >
                  Delete
                </ButtonDefault>
              </div>
              <div
                className={`my-5 ${
                  selectedData.length > 5 ? 'overflow-y-auto' : ''
                } flex justify-center overflow-x-auto `}
              >
                <DeletedList datas={selectedData} columnsData={columns} />
              </div>
            </div>
          </div>
        </div>
      )}
    </ToolbarContainer>
  );
}

export default ActionToolbar;
