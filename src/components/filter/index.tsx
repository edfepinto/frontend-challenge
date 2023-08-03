import { ReactNode, useState } from "react";
import {
  Flex,
  Box,
  Button,
  Text,
  useBreakpointValue,
  Collapse,
} from "@chakra-ui/react";
import filterConst from "../../common/constants/filter.const";
import useDebouncedCallback from "../../hooks/use-debounced-callback";

import Input from "../input";

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

const Container: React.FC<{ children: ReactNode; isMobile: boolean }> = ({
  children,
  isMobile,
}) => {
  return (
    <Flex
      justify="space-between"
      align="center"
      border="1px"
      borderColor="#A0AEC0"
      borderRadius="lg"
      p="6"
      flexDirection={isMobile ? "column" : "row"}
    >
      {children}
    </Flex>
  );
};

export default function Filter({
  filterFields,
  onFilterChange,
  onFilterReset,
}: FilterProps) {
  const [filter, setFilter] = useState(getDefaultFilterObject(filterFields));
  const debouncedOnFilterChange = useDebouncedCallback(
    onFilterChange,
    filterConst.DEBOUNCE_MS_TIME
  );
  const [isMobileCollapseExpanded, setIsMobileCollapseExpanded] = useState(false);
  const isMobile = useBreakpointValue({ base: true, lg: false });

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

  const toggleFiltersCollapse = () => {
    setIsMobileCollapseExpanded((prevState) => !prevState);
  };

  return (
    <Container isMobile={isMobile}>
      {isMobile && (
        <Button
          onClick={toggleFiltersCollapse}
          colorScheme="blue"
          alignSelf="center"
          width="90%"
          mb={isMobileCollapseExpanded ? 10 : 0}
        >
          Filtros
        </Button>
      )}
      <Collapse
        in={isMobile ? isMobileCollapseExpanded : true}
        style={{ width: "100%" }}
        animateOpacity
      >
        <Flex
          direction={isMobile ? "column" : "row"}
          alignItems={isMobile && "center"}
        >
          {filterFields.map((field) => (
            <Box
              key={field.name}
              pr={isMobile ? 0 : 10}
              mb={isMobile ? 10 : 0}
              flex={1}
              w={isMobile && "90%"}
            >
              <Text>{field.label}:</Text>
              <Input
                name={field.name}
                value={filter[field.name]}
                onChange={handleChange}
              />
            </Box>
          ))}
          <Box alignSelf={isMobile ? "center" : "flex-end"}>
            <Button colorScheme="red" onClick={handleClearFilters}>
              Limpar filtros
            </Button>
          </Box>
        </Flex>
      </Collapse>
    </Container>
  );
}
