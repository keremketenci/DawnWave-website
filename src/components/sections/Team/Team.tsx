// components
import { CoFounderCard } from "@/components/sections/Team/CoFounderCard";
// import { EmployeeCard } from "@/components/sections/Team/EmployeeCard";
import { WantedCard } from "@/components/sections/Team/WantedCard";

// components ui
import { Separator } from "@/components/ui/shadcn/separator";

export function Team() {
  return (
    <div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-2 gap-y-4 lg:gap-y-0">
          <CoFounderCard />
        </div>
      </div>

      <div className="mt-4 lg:mt-0"></div>

      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="col-span-full pb-4 lg:py-2 mx-1">
            <Separator />
          </div>

          <div className="flex flex-col 2xl:flex-row">
            {/* <div className="grid grid-cols-1 lg:flex lg:flex-row lg:justify-center gap-x-2 gap-y-4 2xl:gap-y-0">
                <EmployeeCard />
            </div> */}

            {/* <div className="2xl:hidden col-span-full py-4 lg:py-2 mx-1">
                <Separator />
            </div> */}

            <div className="grid grid-cols-1 lg:flex lg:justify-center lg:ml-2 gap-x-2 gap-y-4 2xl:gap-y-0">
              <WantedCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
