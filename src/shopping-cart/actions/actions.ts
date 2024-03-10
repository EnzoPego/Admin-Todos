

/*
cookie: cart {
    'uui-123-1 : 4'
    'uui-123-2 : 1'
    'uui-123-3 : 2'
}
*/

import { getCookie, hasCookie, setCookie } from "cookies-next"


// Obtiene el contenido del carrito desde las cookies
export const getCookieCart =():{ [id:string]: number } => {

    if ( hasCookie ('cart') ) {
        const cookieCart = JSON.parse(getCookie('cart') as string ?? '{}')
        return cookieCart
    }

    return{}
}

// Agrega un producto al carrito
export const addProductToCart = (id: string) => {

    const cookieCart = getCookieCart()

    if( cookieCart[id] ){
        cookieCart[id] += 1
    }else{
        cookieCart[id] = 1
    }
    setCookie('cart', JSON.stringify(cookieCart))
    
}


// Elimina un producto específico del carrito
export const removeProuductFromCart = (id:string) =>{
    
    const cookieCart = getCookieCart()
    
    if( cookieCart[id] ){
        delete cookieCart[id]
    }
    setCookie('cart', JSON.stringify(cookieCart))
}


// Reduce la cantidad de un producto en el carrito
export const removeSingleItemFromCart = ( id: string ) => {
    
    const cookieCart = getCookieCart()
    
    if (cookieCart[id] >=2 ){
        cookieCart[id] -= 1
    }else{
        delete cookieCart[id]
    }
    setCookie('cart', JSON.stringify(cookieCart))
}