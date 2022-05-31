import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import testDbData from "./dbData.json";
import testCoinData from "./coinmarketapi.json";
function App() {
  const [coinData, setCoinData] = useState([]);

  useEffect(() => {
    const load = async () => {
      // const coinData = await axios.get("http://localhost/coinmarket");
      // const dbData = await axios.get("http://localhost/userdata");
      console.log(testCoinData);
      console.log(testDbData);
      const coinData = testCoinData.map((coin) => {
        const index = testDbData.map((e) => e.TokenId).indexOf(coin.id.toString());
        if (index !== -1) {
          return { ...coin, Quantity: testDbData[index].Quantity, WalletId: testDbData[index].WalletId };
        }
        return { ...coin, Quantity: 0, WalletId: null };
      });
      console.log(coinData);
      setCoinData(coinData);
    };

    load();
  }, []);

  return (
    <div className='w-screen h-screen bg-gray-100'>
      <div className='w-full flex mx-auto bg-white flex-col h-full'>
        <h1 className='flex w-full justify-center pb-5'>Deneme</h1>

        <div className='flex w-full flex-col bg-blue-500 overflow-auto h-full'>
          {coinData.map((item) => (
            <Link key={item.id} to={`/coin/${item.id}`}>
              <div className='w-full py-5 flex bg-green-400 border-b justify-evenly items-center'>
                <div className='flex px-10'>
                  <img
                    className='w-20 h-20'
                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`}
                    alt=''
                  />
                </div>

                <div className='flex flex-col px-10'>
                  <h4>{item.name}</h4>
                  <div className='flex'>
                    <p>${item.quote.USD.price.toFixed(2)}</p>
                    <p className='text-red-500 pl-2'>{item.quote.USD.volume_change_24h.toFixed(2)}%</p>
                  </div>
                </div>

                <div className='flex flex-col px-10'>
                  <div key={`${item.walletId} ${item.TokenId}`}>
                    <h4>
                      {item.Quantity} {item.symbol}
                    </h4>
                    <p>${item.Quantity != 0 ? item.Quantity * item.quote.USD.price : 0}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
