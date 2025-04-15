import {create} from 'zustand'
import { updateProducts } from '../../../backend/controllers/product.controllers'

export const useProductStore = create((set)=>({
    products:[],
    setPoducts: (products)=>set({products}),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill in all fields." }
        }
    
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
    
        const data = await res.json()
    
        set((state) => ({
            products: [...(state.products || []), data.data]
        }))
    
        return {
            success: true,
            message: "Product created successfully."
        }
    },
    fetchProducts: async ()=>{
        const res = await fetch("/api/products")
        const data = await res.json()
        set({products: data.data})
    },
    deleteProduct: async (pid) => {
		const res = await fetch(`/api/products/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };
        
		set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
		return { success: true, message: data.message };
	},
    updateProducts: async (pid) =>{
        const res = fetch(`/api/products/${pid}`,{
            method:"PUT"
        })
    }
}))