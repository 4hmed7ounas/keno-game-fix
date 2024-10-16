import React, { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { IOddTypeSelection } from "@/utils/types/odd-management";

const PayoutTable = (props: { kenoPayouts: IOddTypeSelection[] }) => {
  const { kenoPayouts } = props;
  const [currentPayoutSelection, setCurrentPayoutSelection] = useState(10);
  const [fade, setFade] = useState(false);
 

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // Trigger fade-out

      setTimeout(() => {
        setFade(false); // Trigger fade-in

        // Update the current selection, resetting back to 10 if it reaches 1
        setCurrentPayoutSelection((prevSelection) => 
          prevSelection > 1 ? prevSelection - 1 : 10
        );
      }, 500); // Duration of fade-out transition
    }, 2500); // Interval duration includes time for fade-out and display

    return () => clearInterval(interval);
  }, []);

  const currentPayouts = kenoPayouts.filter(kP => kP.selection === currentPayoutSelection && kP.odd > 0);

  return (
    <Box className={`bg-transparent w-full ${fade ? "fade-out" : "fade-in"}`}>
      <Heading color={"orange"} className="font-extrabold">
        Select {currentPayoutSelection} Numbers
      </Heading>
      <div className={`payout-table ${fade ? "fade-out" : "fade-in"}`}>
        <table className="min-w-full font-bold text-amber-600 text-3xl">
          <thead>
            <tr>
              <th className="py-2 text-start">Hits</th>
              <th className="py-2 text-start">Pays</th>
            </tr>
          </thead>
          <tbody>
            {currentPayouts.map((cPayout) => (
              <tr key={cPayout.hit}>
                <td className="py-2 text-start">{cPayout.hit}</td>
                <td className="py-2 text-start">{cPayout.odd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default PayoutTable;
