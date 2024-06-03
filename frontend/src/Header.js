function Header()
{
    return(
        <div >
            <div className="grid grid-cols-5 my-8 text-slate-500 gap-2 text-base ">
            <p className="col-span-2">PRODUCT DETAILS</p>
            <p className="col-span-1 mx-28 flex justify-center">QUANTITY</p>
            <p className="col-span-1 mx-28 flex justify-center">PRICE</p>
            <p className="col-span-1 mx-28 flex justify-center">TOTAL</p>
            </div>
           
        </div>
    )
}
export default Header