// import MarqueeText from "react-marquee-text";

// interface IProduct {
//     nameBn: string
//     categoryIcon: string
//     today: number
//     change: {
//         dir: string
//         pct: string
//     }
// }

// const Marquee =async () => {
//     const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products')
//     const data: IProduct[] = await res.json()
//    console.log(data);

//     return (
//         <div>
//             <div className="w-full overflow-hidden border-y border-gray-200">
//                 <MarqueeText direction="right" duration={10}>
//                 <div className="group flex w-max animate-marqree gap-8">
//                     {
//                         data.map((product, ind) => <div key={ind} className="flex gap-2">
//                             <p>{product.categoryIcon}</p>
//                            <h1>{product.nameBn}</h1>
//                            <p>{`${product.today} টাকা/কেজি `}</p>
//                         </div>)
//                     }
//                 </div>
//                 </MarqueeText>
//             </div>
//         </div>
//     );
// };

// export default Marquee;

import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";


interface IProduct {
  nameBn: string;
  categoryIcon: string;
  today: number;
  change: {
    dir: string;
    pct: string;
  };
}

const Marquee = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );

  const products: IProduct[] = await res.json();

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white py-3">
      <MarqueeText
        direction="right"
        duration={10}
        pauseOnHover={true}
       
      >
        <div className="flex w-max items-center gap-8">
          {products.map((product, ind) => {
            const isUp = product.change.dir.toLowerCase() === "up";

            return (
              <div
                key={ind}
                className="flex shrink-0 items-center gap-2 whitespace-nowrap"
              >
                <span className="text-xl">{product.categoryIcon}</span>

                <h1 className="text-lg font-medium text-gray-800">
                  {product.nameBn}
                </h1>

                <p className="text-lg text-gray-800">
                  {product.today} টাকা/কেজি
                </p>

                <span
                  className={`flex items-center gap-1 text-lg font-bold ${
                    isUp ? "text-red-500" : "text-green-600"
                  }`}
                >
                  <span>{isUp ? "▲" : "▼"}</span>
                  <span>{product.change.pct}%</span>
                </span>

                <span className="ml-5 h-8 w-px bg-gray-200" />
              </div>
            );
          })}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;
