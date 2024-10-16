import React from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
} from "@chakra-ui/react"; 
import { ISelectionPayout } from "@/utils/types/game-types";

type IKenoPayoutTable = {
  payoutsArray: ISelectionPayout[];
};
function KenoPayoutTable({ payoutsArray }: IKenoPayoutTable) {
  return (
    <Card
      className="w-full"
      variant={"filled"}
      shadow={"lg"}
      bg={"red.600"}
      color={"white"}
    >
      <CardHeader>
        <Heading size="md">Payouts</Heading>
      </CardHeader>

      <CardBody className="px-4">
        <Stack
          divider={<StackDivider className="animate-bounce" />}
          spacing="4"
        >
          {payoutsArray.map((payout) => (
            <Box key={payout.numberSelection}>
              <Heading size="xs" className="animate-pulse">
                Hits {payout.numberSelection} : Payout {payout.payoutMultiplier}
              </Heading>
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

export default KenoPayoutTable;
