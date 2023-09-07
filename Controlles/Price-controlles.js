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
export const GetALLPricesPlans = async (req,res,next) => {
    try {
        const PricePlans = await Price.find()
        return res.status(200).json({PricePlans})
    } catch (error) {
        console.log(error);
    }
}
export const DeletePricePlan = async (req, res, next) => {
    const id = req.params.id
    try {
        console.log(id);
        const deletedPlan = await Price.findByIdAndRemove(id)
        if(!deletedPlan){
            return res.status(404).json({message : 'No Blog With this ID'})
        }
        return res.status(200).json({message : 'Deleted Sucssfully', deletedPlan})
    } catch (error) {
        console.log(error);
    }
}

export const UpdatePrice = async (req, res, next) => {
    const { 
        planTitle,
        PlanPrice,
        PlanLength,
        featuers} = req.body;
    const id = req.params.id
  
    try {
        console.log(id);
      const plan = await Price.findById({_id : id});
        console.log(plan);
      if (!plan) {
        return res.status(404).json({ message: 'Price Plan not found' });
      }
  
      // Update Blog properties
      plan.planTitle = planTitle;
      plan.PlanPrice = PlanPrice;
      plan.PlanLength = PlanLength;
      plan.featuers = featuers;
  
      await plan.save();
  
      return res.status(200).json({ message: 'Price Plan updated successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };