import "./dialog.scss";
import { ICommercialLogicProps } from "./dialog-logic";
import { PaginationUI, TableUI } from "@/bus/shared/ui/molecules";

export const DialogView = (props: ICommercialLogicProps) => {
  return (
    <div className="home">
      {props?.hasData ? (
        <div>
          <TableUI
            dataSource={props?.data}
            scroll={{ x: 1000, y: 445 }}
            size="small"
            columns={props?.columns}
            onChange={props?.onChangeTable}
          />
        </div>
      ) : (
        <div>cargando...</div>
      )}
      <div className="home__pagination">
        <PaginationUI
          id="pagination"
          initialLimit={10}
          initialPage={1}
          onPageChange={props.handlePageChange}
        />
      </div>
    </div>
  );
};
