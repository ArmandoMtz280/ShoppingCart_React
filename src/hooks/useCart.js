import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db"

export const useCart = () => {

    
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

    // State derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0 ), [cart]) /** */


    return {

        data,
        cart,
        addToCart,
        clearCart,
        removefromCart,
        increaseQuantity,
        decreaseQuantity,
        isEmpty,
        cartTotal
    }

}