export interface User{
    id:number
    nom:string
    email:string
    password:string
    profile:string
}


export interface Client {

   nom:string
   email:string
   password:string
   address:string
}


export interface Product {
     id:number
     designation:string
     price:string
     qte:number
     image:string
}


export interface Command{
   id:number
   qte:number

}
