import { ReactNode, useState } from "react";
import { Flex, Box, Button, Text } from "@chakra-ui/react";
import filterConst from "../../common/constants/filter.const";
import useDebouncedCallback from "../../hooks/use-debounced-callback";

import Input from "../input"

interface FilterField {
  name: string;
  label: string;
}

interface FilterProps {
  onFilterChange?: (filterChanges: any) => void;
  onFilterReset?: () => void;
  filterFields: FilterField[];
}

function getDefaultFilterObject(filterFields: FilterField[]) {
  return filterFields
    .map((filterField) => filterField.name)
    .reduce((acc, key) => ({ ...acc, [key]: "" }), {});
}

const Container: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Flex
    justify="space-between"
    align="center"
    border="1px"
    borderColor="#A0AEC0"
    borderRadius="lg"
    p="6"
  >
    {children}
  </Flex>
);

export default function Filter({ filterFields, onFilterChange, onFilterReset }: FilterProps) {
  const [filter, setFilter] = useState(getDefaultFilterObject(filterFields));
  const debouncedOnFilterChange = useDebouncedCallback(
    onFilterChange,
    filterConst.DEBOUNCE_MS_TIME
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
    debouncedOnFilterChange({ [name]: value });
  };

  const handleClearFilters = () => {
    const clearFilterObject = getDefaultFilterObject(filterFields);
    setFilter(clearFilterObject);
    onFilterReset();
  };

  return (
    <Container>
      {filterFields.map((field) => (
        <Box key={field.name} pr="10" flex={1}>
          <Text>{field.label}:</Text>
          <Input
            name={field.name}
            value={filter[field.name]}
            onChange={handleChange}
          />
        </Box>
      ))}
      <Box alignSelf={"flex-end"}>
        <Button colorScheme="red" onClick={handleClearFilters}>
          Limpar filtros
        </Button>
      </Box>
    </Container>
  );
}
