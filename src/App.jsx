import CurrencyConverter from "./Component/CurrencyConverter"

//https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json



function App() {
  
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-black">
        <div className="container">
          <CurrencyConverter />
        </div>
      </div>
    </>
  );
}

export default App
