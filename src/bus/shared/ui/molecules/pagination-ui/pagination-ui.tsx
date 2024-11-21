import "./pagination.scss";
import {  useEffect, useState } from "react";
import { ButtonUI, InputUI } from "../../atoms";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export interface IPaginationUI {
  id: string;
  initialPage?: number;
  initialLimit: number;
  onPageChange: (pagination: { limit: number; offset: number }) => void;
}

export const PaginationUI = (props: IPaginationUI) => {
  const { id, initialPage = 1, initialLimit, onPageChange } = props;
  const [page, setPage] = useState(initialPage);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const initialOffset = initialLimit * (initialPage - 1);
    onPageChange({ limit: initialLimit, offset: initialOffset });
  }, []);

  // Actualiza la paginación cuando cambia la página
  const updatePagination = (newPage: number) => {
    if (newPage > 0) {
      const newOffset = initialLimit * (newPage - 1); // Calcula el offset en función de la página
      setOffset(newOffset);
      onPageChange({ limit: initialLimit, offset: newOffset });
    } else {
      // Si la página es 0 o el input está vacío
      setOffset(0);
      onPageChange({ limit: 0, offset: 0 });
    }
  };

  // Maneja el clic en el botón "Siguiente"
  const handleNext = () => {
    const newPage = page + 1;
    setPage(newPage);
    updatePagination(newPage);
  };

  // Maneja el clic en el botón "Atrás"
  const handleBack = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      updatePagination(newPage);
    }
  };

  // Maneja el cambio en el input de la página
  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPage(inputValue === "" ? 0 : Number(inputValue)); // Permite que el input esté vacío temporalmente
  };

  // Al presionar Enter o salir del input, actualiza la paginación
  const handlePageInputBlur = () => {
    updatePagination(page); // Llama a la función de actualización con el valor del input
  };

  return (
    <div key={id} className="pagination">
      <ButtonUI
        id={`${id}_back`}
        className="pagination__button"
        type="text"
        size="small"
        icon={<LeftOutlined />}
        onClick={handleBack}
        disabled={page <= 1}
      />

      {/* InputUI para el número de página */}
      <InputUI
        value={page === 0 ? "" : page} 
        onChange={handlePageInputChange}
        onBlur={handlePageInputBlur} 
        onPressEnter={handlePageInputBlur} 
        size="small"
        name="asdf"
        maxLength={3}
        id={`${id}_pagination`}
        className={"pagination__pag"}
      />

      <ButtonUI
        id={`${id}_next`}
        className="pagination__button"
        type="text"
        size="small"
        icon={<RightOutlined />}
        onClick={handleNext}
      />
    </div>
  );
};
