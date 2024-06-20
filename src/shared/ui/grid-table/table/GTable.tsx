import React, { FC } from "react";

import GTCol from "@/shared/ui/grid-table/table-column/GTCol";
import GTRow from "@/shared/ui/grid-table/table-row/GTRow";
import GTBody from "@/shared/ui/grid-table/table-body/GTBody";
import GTHead from "@/shared/ui/grid-table/table-head/GTHead";

import scss from "./style.module.scss";

interface IParams {
  children: React.ReactNode;
  className?: string;
  mobileScaleText?: boolean;
  style?: React.CSSProperties;
}

const GTable: FC<IParams> & {
  Body: typeof GTBody;
  Row: typeof GTRow;
  Col: typeof GTCol;
  Head: typeof GTHead;
} = ({ children, style, className = "", mobileScaleText = false }) => {
  const classes = `grid ${className} ${mobileScaleText ? scss.MobileScaleText : ""}`;

  return (
    <div style={style} className={classes}>
      {children}
    </div>
  );
};

GTable.Row = GTRow;
GTable.Col = GTCol;
GTable.Body = GTBody;
GTable.Head = GTHead;

export default GTable;
