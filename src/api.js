
// ------------- AUTH ----------------//        

export const login = (email = "321@ab.cd", password = "a1") =>
    fetch(`${process.env.REACT_APP_GATEWAY_ADRESS}/auth/signin`,
        {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        }
    )
        .then(res => res.json())
        .catch(err => console.error(err))

export const verify = (token) =>
    fetch(`${process.env.REACT_APP_GATEWAY_ADRESS}/auth/verify`,
        {
            method: 'POST',
            body: JSON.stringify({
                token
            }),
            headers: { 'Content-Type': 'application/json' }
        }
    )
        .then(res => res.json())
        .catch(err => console.error(err))


export const register = ({ email, password, phone }) =>
    fetch(
        `${process.env.REACT_APP_GATEWAY_ADRESS}/auth/signup`,
        {
            method: "POST",
            body: JSON.stringify({
                // "email": email,
                // "password": password,
                //"phone":phone
                email: "321@ab.cd",
                password: "a1",
                phone: 1234567,
            }),
            headers: { "Content-Type": "application/json" },
        }
    )
        .then((res) => res.json())
        .then((res) => res)
        .catch((err) => console.error(err));





// ------------- PRODUCTS ----------------//        

export const fetchProducts = (params = {}) =>
    fetch(`${process.env.REACT_APP_GATEWAY_ADRESS}/products?${paramsObjectToString(params)}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then((res) => res)
        .catch(err => console.error(err))

export const getProductByAuthorId = (authorId) =>
    fetch(`${process.env.REACT_APP_GATEWAY_ADRESS}/products/getProductByAuthorId/${authorId}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then((res) => res)
        .catch(err => console.error(err))


export const fetchProduct = (_id) =>
    fetch(`${process.env.REACT_APP_GATEWAY_ADRESS}/products/${_id}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then((res) => res)
        .catch(err => console.error(err))


export const fetchCreateProduct = (
    {
        name,
        description,
        price,
        condition,
        category,
        images,
        location,
    },
    token,
) =>
    fetch(`${process.env.REACT_APP_GATEWAY_ADRESS}/products`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                description,
                price,
                condition,
                category,
                images,
                location,
                token
            }),
        })
        .then((res) => res.json())
        .then((res) => res)
        .catch(err => console.error(err))

export const fetchUpdateProduct = (
    {
        _id,
        name,
        description,
        price,
        condition,
        category,
        images,
        location,
    },
    token,
) =>
    fetch(`${process.env.REACT_APP_GATEWAY_ADRESS}/products/${_id}`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                description,
                price,
                condition,
                category,
                images,
                location,
                token
            }),
        })
        .then((res) => res.json())
        .then((res) => res)
        .catch(err => console.error(err))




// ------------- CATEGORIES ----------------//        

export const fetchCategories = (params = {}) =>
    fetch(`${process.env.REACT_APP_GATEWAY_ADRESS}/categories`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then((res) => res)
        .catch(err => console.error(err))

export const fetchCategory = (_id) =>
    fetch(`${process.env.REACT_APP_GATEWAY_ADRESS}/categories/${_id}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then((res) => res)
        .catch(err => console.error(err))




export const getUser = (userId) =>
    fetch(`${process.env.REACT_APP_GATEWAY_ADRESS}/users/${userId}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
    )
        .then(res => res.json())
        .catch(err => console.error(err))



// ------------- UTILS ----------------//        

const paramsObjectToString = (params = {}) => {
    const paramsArray = [];
    Object.keys(params).map(key => paramsArray.push(`${key}=${params[key]}`))
    return paramsArray.join('&');
}