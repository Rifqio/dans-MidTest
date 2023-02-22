exports.GetUser = async (req, res) => {
  if (!req.headers.authorization) {
    return res.json({message: "Unauthorized"})
  }
  const { _id, name, email } = req.user;
  return res.status(200).json({ id: _id, name, email });
};
