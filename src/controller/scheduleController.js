
export const getSchedule = (req,res) => {
    console.log('getSchedule!');
  return  res.render("schedule", {pageTitle:"스케줄 샘플"});
}
