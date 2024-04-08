import APIFeatures from "./apiFeatures";

export const getAll = (Model) => async (req, res, next) => {
  try {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};

    const features = new APIFeatures(Model.find(filter), req.query)
      .search()
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  } catch (err) {
    // Pass the error to the global error handling middleware
    next(err);
  }
};
