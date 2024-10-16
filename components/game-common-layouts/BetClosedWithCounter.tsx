 
import { Transition, TransitionChild } from "@headlessui/react"; 
export default function BetClosedWithCounter({isClosed, finalCounter} : {isClosed: boolean, finalCounter: number}) { 

  const showBetClosed = isClosed || finalCounter && finalCounter != null;
  return ( 
    <Transition show={showBetClosed}  >

      <div className=" absolute w-screen h-screen max-h-screen overflow-y-hidden z-50">
        {/* The `show` prop controls all nested `TransitionChild` components. */}
        <Transition show={isClosed}>
          <TransitionChild>
            <div className="fixed inset-y-1/2 h-1/2 bottom-0 w-screen bg-red-800 transition duration-300 data-[closed]:translate-y-full"></div>
          </TransitionChild>

          <TransitionChild>
            <div className="fixed -inset-y-1/2 h-1/2 top-0 w-screen bg-red-900 transition duration-300 data-[closed]:-translate-y-full">
              {/* ... */}
            </div>
          </TransitionChild>

          <TransitionChild >
            <div className="fixed inset-0 w-screen h-screen z-40 bg-black/30 transition duration-500 data-[closed]:opacity-0">
              <div className="relative w-screen flex flex-col justify-center items-center h-full">
                <h1 className="text-8xl  bg-gradient-to-b from-white to-white/25  line-through inline-block text-transparent bg-clip-text">
                  Bet Closed
                </h1>
              </div>
            </div>
          </TransitionChild>
        </Transition>
        <Transition
          show={
          finalCounter && finalCounter != null && finalCounter > 0
          }
          enter="transition ease-in-out duration-300"
          enterFrom="-translate-y-full"
          enterTo="translate-y-0"
          leave="transition ease-in-out duration-300"
          leaveFrom="translate-y-0"
          leaveTo="-translate-y-full"
        >
          <div className="absolute top-0 z-30 left-0 flex flex-col gap-6 max-h-svh w-screen p-4 h-full justify-center items-center">
            <div className="text-white text-[400px] animate-ping ">
              {finalCounter ?? 0}
            </div>
          </div>
        </Transition>
      </div> 
      </Transition>
  );
}
