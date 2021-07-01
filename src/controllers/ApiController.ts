import { Request, Response } from "express";
import axios from 'axios';

interface Author {
    name: string,
    lastname: string,
}

interface Price {
    currency: string,
    amount: number,
    decimals: number,
}

interface Product {
    id: string,
    title: string,
    price: Price
    picture: string,
    condition: string,
    location?: string,
    free_shipping: boolean
    sold_quantity?: number,
    description?: string
}

interface SearchResults {
    author: Author,
    categories: string[],
    items: Array<Product>
}

export class Api {
    public searchItems(req: Request, res: Response) {

        let query:string = req.query.q as string;
        if (!query) {
            return res.status(400).send('Missing search query parameter');
        }

        // call api
        axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
        .then(response => {
            const author: Author = {
                name: 'Juan',
                lastname: 'Andrade',
            };
            let categories: string[] = [];
            let products: Array<Product> = [];
            
            // retrive categories
            if (response.data.filters.length > 0) {
                if (response.data.filters[0].values.length > 0) {
                    response.data.filters[0].values[0].path_from_root.forEach((category: any) => {
                        categories.push(category.name);
                    });
                }
            }

            // retrive products
            response.data.results.forEach((product: any) => {
                const price: Price = {
                    currency: product.currency_id,
                    amount: product.price,
                    decimals: 0
                };
                products.push({
                    id: product.id,
                    title: product.title,
                    price: price,
                    location: product.address.state_name,
                    picture: product.thumbnail,
                    condition: product.condition,
                    free_shipping: product.shipping.free_shipping,
                });
            });
            
            const SearchResults: SearchResults = {
                author: author,
                categories: categories,
                items: products,
            }
            return res.status(200).send(SearchResults);
        })
        .catch(() => {
            return res.status(503).send('Error retriving the search items, please try again');
        })
    }

    public itemDetails(req: Request, res: Response) {
        axios.get(`https://api.mercadolibre.com/items/${req.params.itemId}`)
        .then(response => {
            const itemsDetails: any = response.data;
            axios.get(`https://api.mercadolibre.com/items/${req.params.itemId}/description`)
            .then(response => {
                const productPrice: Price = {
                    currency: itemsDetails.currency_id,
                    amount: itemsDetails.price,
                    decimals: 0
                }

                const Product: Product = {
                    id: itemsDetails.id,
                    title: itemsDetails.title,
                    price: productPrice,
                    picture: itemsDetails.pictures[0].url,
                    condition: itemsDetails.condition,
                    free_shipping: itemsDetails.shipping.free_shipping,
                    sold_quantity: itemsDetails.sold_quantity,
                    description: response.data.plain_text
                }
                return res.status(200).send(Product);
            })
            .catch(error => {
                return res.status(503).send("impossible to get the item details, try again.");
            })
        })
        .catch((error) => {
            return res.status(503).send("impossible to get the item details, try again.");
        });
    }
}