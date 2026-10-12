import { Suspense } from "react";
import FirstHomePage from "./compontes/Fhom";
import OneSction from "./compontes/OneSction";
import TwoScton from "./compontes/TwoScton";
import ThereSction from "./compontes/ThereSction";


export default function Home() {
  return (
    <div className="bg-[#f0f5f0]">
      <FirstHomePage/>
      <div>
        <Suspense fallback={<p>পণ্য লোড হচ্ছে...</p>}>
        <OneSction />
      </Suspense>
      </div>
      <div>
        <Suspense fallback={<p>পণ্য লোড হচ্ছে...</p>}>
        <TwoScton/>
      </Suspense>
      </div>
      <div>
        <Suspense fallback={<p>পণ্য লোড হচ্ছে...</p>}>
        <ThereSction/>
      </Suspense>
      </div>
    </div>
  );
}
