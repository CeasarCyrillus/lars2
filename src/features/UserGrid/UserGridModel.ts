import {AdminDTO} from "@backend/dto/AdminDTO";
import {ColDef} from "ag-grid-community";

type RowModel = AdminDTO
export const colDefs: ColDef<RowModel>[] = [
  {
    field: "name",
  }
]