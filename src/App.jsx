import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Item from "./components/item/Item"
import { useCart } from "./hooks/useCart"




function App() {

  const {data,
        cart,
        addToCart,
        clearCart,
        removefromCart,
        increaseQuantity,
        decreaseQuantity,
        isEmpty,
        cartTotal} = useCart();



  return (
    <>
        <Header
          cart={cart}
          removefromCart={removefromCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          clearCart={clearCart}
          isEmpty={isEmpty}
          cartTotal={cartTotal}
        />

        <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

            {
              data.map((guitar) => (

                <Item
                  key={guitar.id}
                  guitar={guitar}
                  addToCart={addToCart}
                />
                  
              ))
            }
                

        </div>
        </main>

        <Footer />
      
    </>
  )
}

export default App
