import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export const SkeltonCard = () => {
  return (
    <Box
      maxW="sm"
      w={{ base: "calc(50% - 15px / 2)", md: `calc(33.33333% - 30px * 2 / 3)` }}
    >
      <Skeleton height="150px" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
    </Box>
  );
};
