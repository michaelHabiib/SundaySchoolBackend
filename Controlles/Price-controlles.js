import Price from "../Modal/Price";

export const AddNewPricePlan = async(req,res,next) => {
    const {planTitle,PlanPrice,PlanLength,featuers} = req.body
    const price = new Price({
        planTitle,
        PlanPrice,
        PlanLength,
        featuers
    });
    try {
    await price.save()
    return res.status(201).json({price, message : 'Price Added sucssfuly'})
    } catch (error) {
        console.log(error);
    }
}