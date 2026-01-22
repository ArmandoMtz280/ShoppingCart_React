import { useState, useEffect } from "react"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Item from "./components/item/Item"
import { db } from "./data/db"


console.log(db)

function App() {

  // persistencia

  const initialCart = () => {
      const localStorageCart = localStorage.getItem('cart');
      return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;
  // Se coloca localStorage dentro de useEffect para sincronice los cambios ya que el state es asincrono de lo contrario en LS aprece vacio el arreglo
  useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart)) 
  }, [cart])

  function addToCart(item){

      const itemExist = cart.findIndex(itemCart => itemCart.id === item.id); // -1 No existe, 0 o mayor ya existe
            if(itemExist >= 0){
             // if(cart[itemExist].quantity >= MAX_ITEMS) return
                console.log('Ya existe')
                const updateCart = [...cart]
                      updateCart[itemExist].quantity++
            }else{
                console.log('No existe, agregando...')
              item.quantity = 1  
              setCart([...cart, item])
            }
  }
  // Limpiar Carrito

  function clearCart(e){
      e.preventDefault();
      setCart([])
  }

  // Remover del carrito

  function removefromCart(id){
      console.log('Eliminando...', id)
      setCart((prevCart) => prevCart.filter( item => item.id !== id))
  }

  // Incrementar cantidad

  function increaseQuantity(id){
    console.log('Incrementando....', id)
    const updateCart = cart.map(item => {
        if(item.id === id && item.quantity < MAX_ITEMS){
            return {
              ...item,
              quantity: item.quantity + 1
            }
        }

        return item
    })

    setCart(updateCart)
  }

  // Decrementar cantidad

  function decreaseQuantity(id){
     console.log('Decrementando...', id)
     const updateCart = cart.map(item => {
         if(item.id === id && item.quantity > MIN_ITEMS){
            return {
               ...item,
               quantity: item.quantity - 1
            }
         }

         return item
     })

     setCart(updateCart)
  }

  return (
    <>
        <Header
          cart={cart}
          removefromCart={removefromCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          clearCart={clearCart}
        />

        <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
           
           {
              data.map((guitar) => (

                <Item
                  key={guitar.id}
                  guitar={guitar}
                  setCart={setCart}
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
