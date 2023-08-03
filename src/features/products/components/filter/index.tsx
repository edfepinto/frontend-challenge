import Filter from "../../../../components/filter";

interface ProductsFilterProps {
  onFilterChange?: (filterChanges: any) => void;
  onFilterReset?: () => void;
}

export default function ProductsFilter({
  onFilterChange,
  onFilterReset,
}: ProductsFilterProps) {
  const filterFields = [
    {
      name: "name",
      label: "Nome",
    },
    {
      name: "reference",
      label: "Referência",
    },
    {
      name: "manufacturer",
      label: "Fabricante",
    },
  ];

  return (
    <Filter
      filterFields={filterFields}
      onFilterChange={onFilterChange}
      onFilterReset={onFilterReset}
    />
  );
}
