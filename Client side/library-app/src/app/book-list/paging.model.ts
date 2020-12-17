export class Paging {
    TotalCount?: number;
    PageSize: number = 5;
    CurrentPage: number = 1;
    TotalPages?: number;
    HasNext?: boolean;
    HasPrevious?: boolean
}