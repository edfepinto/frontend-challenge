import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Spinner,
  Flex,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export interface Column {
  key: string;
  label: string;
  isImage?: boolean;
}

export interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
  isLoading?: boolean;
  handleEdit?: (item: Record<string, any>) => void;
  handleDelete?: (item: Record<string, any>) => void;
}

const Container: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Box
    border="1px"
    borderColor="#A0AEC0"
    borderRadius="lg"
    my="6"
    px="5"
    overflow="auto"
    flex={1}
  >
    {children}
  </Box>
);

export default function Table({
  columns,
  data,
  isLoading,
  handleEdit,
  handleDelete,
}: TableProps) {
  if (isLoading) {
    return (
      <Container>
        <Flex justify="center" align="center" height="100%">
          <Spinner size="lg" />
        </Flex>
      </Container>
    );
  }

  return (
    <Container>
      <ChakraTable variant="simple" style={{borderCollapse:"separate", borderSpacing:"0 1rem"}}>
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column.key}>{column.label}</Th>
            ))}
            {handleEdit && <Th></Th>}
            {handleDelete && <Th></Th>}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id} bgColor="#E2E8F0">
              {columns.map((column) => (
                <Td key={column.key}>
                  {column.isImage ? (
                    <Image
                      src={item[column.key]}
                      alt="Product Image"
                      boxSize="50px"
                      objectFit="cover"
                    />
                  ) : (
                    item[column.key]
                  )}
                </Td>
              ))}
              {handleEdit && (
                <Td>
                  <IconButton
                    aria-label="Edit"
                    icon={<FaEdit />}
                    onClick={() => handleEdit(item)}
                  />
                </Td>
              )}
              {handleDelete && (
                <Td>
                  <IconButton
                    aria-label="Delete"
                    icon={<FaTrash />}
                    onClick={() => handleDelete(item)}
                  />
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </Container>
  );
}
