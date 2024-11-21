import "./home.scss";
import { ICommercialLogicProps } from "./home-logic";
import { PaginationUI, TableUI } from "@/bus/shared/ui/molecules";

export const CommercialView = (props: ICommercialLogicProps) => {
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
          initialLimit={5}
          initialPage={1}
          onPageChange={props.handlePageChange}
        />
      </div>
    </div>
  );
};
