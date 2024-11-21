import "./table.scss";
import { BadgeUI, TitleSubtitleUI, TextUI } from "../../atoms/index";
import { FC_UI } from "../../core/enums";
import Column from "antd/es/table/Column";
import { Table, ConfigProvider, BadgeProps } from "antd";
import { configAnt } from "@/bus/shared/lib/ant";

export interface ITableUI {
  dataSource: any[];
  scroll: object;
  size: any;
  columns: any;
  className?: string;
  FC?: () => void;
  onChange?: (dataSource: any) => void;
}

export const TableUI = (props: ITableUI): JSX.Element => {
  let { dataSource } = props;
  const { scroll, size, columns, className, onChange, FC } = props;


  const setAttribute = (attribute: string) => {
    return attribute?.substring(1, attribute.length) ?? "";
  };

  const handleDataSource = (item: any, value: any, column: any): void => {
    dataSource = dataSource.map((data) => {
      if (data.key === item.key) {
        if (
          FC_UI.INPUT_NUMBER_UI === column.FC ||
          FC_UI.DATE_PICKER_UI === column.FC
        ) {
          return { ...data, [column.dataIndex]: value };
        }
      }
      return data;
    });

    onChange && onChange(dataSource);
  };

  const handleColumn = (column: any, record: any): FC_UI => {
    const dynamic = column?.dataSource?.selectFC
      ? column.dataSource.selectFC(record)
      : false;
    const basic = column.FC;
    return dynamic || basic;
  };

  const isDisabled = (column: any, record: any): boolean => {
    const dynamic = column?.dataSource?.isDisabled
      ? column.dataSource.isDisabled(record)
      : false;
    return dynamic;
  };

  const isShow = (column: any, record: any): boolean => {
    const dynamic = column?.dataSource?.isShow
      ? column.dataSource.isShow(record)
      : true;
    return dynamic;
  };

  const text = (column: any, record: any): string => {
    const dynamic = column?.dataSource?.text
      ? column.dataSource.text(record)
      : "";
    return dynamic.toString();
  };
  const status = (column: any, record: any): BadgeProps["status"] => {
    const dynamic = column?.dataSource?.status
      ? column.dataSource.status(record)
      : "";
    return dynamic.toString();
  };

  const title = (column: any, record: any): string => {
    const dynamic = column?.dataSource?.title
      ? column.dataSource.title(record)
      : "";
    return dynamic.toString();
  };
  const id = (column: any, record: any): string => {
    const dynamic = column?.dataSource?.id ? column.dataSource.id(record) : "";
    return dynamic.toString();
  };

  const build = (column: any, record: any): boolean => {
    const dynamic = column?.dataSource?.build
      ? column.dataSource.build(record)
      : null;
    return dynamic;
  };

  return (
    <ConfigProvider theme={configAnt}>
      {
        <Table
          className={`${className} table-core`}
          dataSource={dataSource}
          pagination={false}
          scroll={scroll}
          size={size}
        >
          {columns?.map((column: any) => (
            <Column
              key={column.key}
              title={column.title}
              align={column.align}
              width={column.width}
              fixed={column.fixed}
              dataIndex={column.dataIndex}
              render={(_, record: any) =>
                (handleColumn(column, record) === FC_UI.TITLE_SUBTITLE_UI &&
                  isShow(column, record) && (
                    <TitleSubtitleUI
                      id={id(column, record)}
                      title={title(column, record)}
                      subtitle={
                        record[setAttribute(column.dataSource.subtitle)]
                      }
                    />
                  )) ||
                /* (handleColumn(column, record) === FC_UI.SELECT_STATUS_COLOR_UI &&
                isShow(column, record) && (
                  <SelectStatusColorUI
                    id={record[setAttribute(column.dataSource.id)]}
                    defaultValue={column.dataSource.defaultValue}
                    width={column.dataSource.width}
                    dataSource={column.dataSource.dataSource}
                    value={record[setAttribute(column.dataSource.value)]}
                    fontSize="11px"
                  />
                )) || */
                /* (handleColumn(column, record) === FC_UI.SELECT_UI &&
                isShow(column, record) && (
                  <SelectUI
                    id={record[setAttribute(column.dataSource.id)]}
                    defaultValue={column.dataSource.defaultValue}
                    width={column.dataSource.width}
                    dataSource={column.dataSource.dataSource}
                    disabled={isDisabled(column, record)}
                    fontSize="11px"
                  />
                )) || */
                /* (handleColumn(column, record) === FC_UI.LINK_UI &&
                isShow(column, record) && (
                  <LinkUI
                    id={record[setAttribute(column.dataSource.id)]}
                    text={record[setAttribute(column.dataSource.text)]}
                    disabled={isDisabled(column, record)}
                    onClick={() => column.dataSource.onClick(record)}
                  />
                )) || */
                /* (handleColumn(column, record) === FC_UI.INPUT_NUMBER_UI &&
                isShow(column, record) && (
                  <div>
                    <InputNumberUI
                      id={record[setAttribute(column.dataSource.id)]}
                      defaultValue={parseFloat(
                        record[setAttribute(column.dataSource.value)].toString()
                      )}
                      value={record[setAttribute(column.dataSource.value)]}
                      onChange={(value: number) =>
                        handleDataSource(record, value, column)
                      }
                      disabled={isDisabled(column, record)}
                      fontSize="11px"
                      calculateWidthByDigit={5}
                    />
                  </div>
                )) || */
                (handleColumn(column, record) === FC_UI.BADGE_UI &&
                  isShow(column, record) && (
                    <BadgeUI
                      id={id(column, record)}
                      status={status(column, record)}
                      text={text(column, record)}
                    />
                  )) ||
                (handleColumn(column, record) === FC_UI.TEXT_UI &&
                  isShow(column, record) && (
                    <TextUI
                      id={id(column, record)}
                      text={text(column, record)}
                      textAlign={column.dataSource.textAlign}
                      className={column?.dataSource?.className}
                    />
                  )) ||
                /* (handleColumn(column, record) === FC_UI.USER_TEXT_UI &&
                isShow(column, record) && (
                  <UserTextUI
                    id={record[setAttribute(column.dataSource.id)]}
                    text={record[setAttribute(column.dataSource.text)]}
                    size={column.dataSource.size}
                    backgroundColor={column.dataSource?.backgroundColor}
                  />
                )) || */
                /* (handleColumn(column, record) === FC_UI.LIST_ICON_TABLE_UI &&
                isShow(column, record) && (
                  <ListIconTableUI
                    id={record[setAttribute(column.dataSource.id)]}
                    alerts={record[setAttribute(column.dataSource.alerts)]}
                  />
                )) || */
                (handleColumn(column, record) === FC_UI.ACTION &&
                  isShow(column, record) && (
                    <div id={id(column, record)}>
                      {column.dataSource?.element || build(column, record)}
                    </div>
                  )) ||
                /* (handleColumn(column, record) === FC_UI.DATE_PICKER_UI &&
                isShow(column, record) && (
                  <DatePickerUI
                    id={record[setAttribute(column.dataSource.id)]}
                    placeholder={column.dataSource.placeholder}
                    defaultValue={
                      record[setAttribute(column.dataSource.defaultValue)]
                    }
                    width={column.dataSource.width}
                    onChangeBasic={(value: string) =>
                      handleDataSource(record, value, column)
                    }
                    isTable={true}
                  />
                )) || */
                /* (handleColumn(column, record) === FC_UI.TAG_UI &&
                isShow(column, record) && (
                  <TagUI
                    id={record[setAttribute(column.dataSource.id)]}
                    text={column.dataSource.text}
                    color={column.dataSource.color}
                  />
                )) || */
                (handleColumn(column, record) === FC_UI.FREE &&
                  isShow(column, record) && (
                    <div>{column?.element || build(column, record)}</div>
                  ))
              }
            />
          ))}
        </Table>
      }
    </ConfigProvider>
  );
};
